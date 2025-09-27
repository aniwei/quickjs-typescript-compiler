import path from 'node:path'
import * as ts from 'typescript'
import { Atom, AtomTable } from './atoms'
import { FunctionDef, createEmptyModuleRecord } from './functionDef'
import { FunctionBytecode, type Instruction } from './functionBytecode'
import { ScopeManager } from './scopeManager'
import { ScopeKind } from './scopes'
import { Var, VarKind, ClosureVar, VarDeclarationKind } from './vars'
import { Opcode, OpFormat, PC2Line, BytecodeTag, FunctionKind, JSMode, env, type OpcodeDefinition } from './env'
import { getOpcodeDefinition, getOpcodeName } from './utils/opcode'

const PC2LINE_BASE = PC2Line.PC2LINE_BASE
const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

export interface CompilerOptions {
  atomTable?: AtomTable
}

interface FunctionContextSnapshot {
  functionDef: FunctionDef
  scopeManager: ScopeManager
  closureVarIndices: Map<Atom, number>
  localVarIndices: Map<Atom, number>
  argumentIndices: Map<Atom, number>
  nextLocalSlot: number
  stackDepth: number
  maxStackDepth: number
  currentSourceNode: ts.Node | null
  currentStatementNode: ts.Node | null
  suppressDebugRecording: boolean
  currentOffset: number
  instructionOffsets: number[]
  labelCounter: number
  labelPositions: Map<string, number>
  pendingJumps: Array<{ index: number; label: string; opcode: Opcode }>
  lineColCache: { offset: number; line: number; column: number }
  recordedStatementPositions: Set<number>
  hasExplicitReturn: boolean
}

interface EmitDebugInfoOptions {
  tsSourcePos?: number
}

export class Compiler {
  private readonly sourceFile: ts.SourceFile
  private readonly program: ts.Program
  private readonly checker: ts.TypeChecker

  private readonly atomTable: AtomTable
  private currentFunction!: FunctionDef
  private scopeManager!: ScopeManager
  private readonly closureVarIndices = new Map<Atom, number>()
  private readonly localVarIndices = new Map<Atom, number>()
  private readonly argumentIndices = new Map<Atom, number>()
  private nextLocalSlot = 0
  private moduleAtom!: Atom

  private stackDepth = 0
  private maxStackDepth = 0
  private currentSourceNode: ts.Node | null = null
  private currentStatementNode: ts.Node | null = null
  private suppressDebugRecording = false

  private currentOffset = 0
  private readonly instructionOffsets: number[] = []
  private labelCounter = 0
  private readonly labelPositions = new Map<string, number>()
  private readonly pendingJumps: Array<{ index: number; label: string; opcode: Opcode }> = []
  private readonly sourceUtf8: Uint8Array
  private readonly utf8OffsetByPos: Uint32Array
  private readonly normalizedPosByPos: Uint32Array
  private lineColCache = { offset: 0, line: 0, column: 0 }
  private readonly recordedStatementPositions = new Set<number>()
  private hasExplicitReturn = false
  private moduleHoistInsertionIndex: number | null = null

  constructor(private readonly fileName: string, private readonly sourceCode: string, options: CompilerOptions = {}) {
    this.atomTable = options.atomTable ?? new AtomTable()
    this.sourceFile = ts.createSourceFile(
      this.fileName,
      this.sourceCode,
      ts.ScriptTarget.ES2020,
      true
    )

    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
    }

    const host = ts.createCompilerHost(compilerOptions)
    host.getSourceFile = (fileName, languageVersion) => {
      if (fileName === this.fileName) {
        return this.sourceFile
      }
      return undefined
    }

    this.program = ts.createProgram([this.fileName], compilerOptions, host)
    this.checker = this.program.getTypeChecker()

    const { strippedSource, normalizedPosByPos } = this.computeDebugSourceMapping(this.sourceCode)
    this.normalizedPosByPos = normalizedPosByPos

    const encoder = new TextEncoder()
    this.sourceUtf8 = encoder.encode(strippedSource)
    this.utf8OffsetByPos = new Uint32Array(strippedSource.length + 1)
    let utf8Offset = 0
    let index = 0
    this.utf8OffsetByPos[0] = 0
    while (index < strippedSource.length) {
      const codePoint = strippedSource.codePointAt(index) ?? 0
      const step = codePoint > 0xffff ? 2 : 1
      utf8Offset += this.getUtf8ByteLength(codePoint)
      for (let j = 1; j <= step; j++) {
        const target = index + j
        if (target <= strippedSource.length) {
          this.utf8OffsetByPos[target] = utf8Offset
        }
      }
      index += step
    }
  }

  compile(): FunctionDef {
    this.resetCodegenState()
    const evalAtom = this.atomTable.getAtomId('_eval_')
    const rootFunction = new FunctionDef(evalAtom, this.sourceCode, this.fileName)
    this.currentFunction = rootFunction
    this.scopeManager = new ScopeManager(rootFunction)

    const moduleFileName = this.toModuleFileName(path.relative(process.cwd(), this.fileName) || this.fileName)
    this.moduleAtom = this.atomTable.getAtomId(moduleFileName)
    if (!rootFunction.module) {
      rootFunction.module = createEmptyModuleRecord()
    }
    rootFunction.module.moduleName = this.moduleAtom

  rootFunction.bytecode.jsMode = JSMode.JS_MODE_STRICT
  rootFunction.bytecode.funcKind = FunctionKind.JS_FUNC_ASYNC
    rootFunction.bytecode.argumentsAllowed = true
    rootFunction.bytecode.hasSimpleParameterList = false
    rootFunction.bytecode.hasDebug = true
    rootFunction.bytecode.filename = this.moduleAtom

  this.pushScope(ScopeKind.Function)
    this.withStatementNode(this.sourceFile, () => {
      this.emitModulePrologue()
    })
    ts.forEachChild(this.sourceFile, (node) => this.visitNode(node))
    this.withoutDebugRecording(() => {
      this.withStatementNode(this.sourceFile, () => {
        this.emitOpcode(Opcode.OP_undefined)
        this.emitReturnOpcode()
      })
    })
    this.popScope()

    this.injectModuleHoistedDefinitions(rootFunction)

    this.resolvePendingJumps()

    this.finalizeFunction(rootFunction)
    return rootFunction
  }

  private resetCodegenState() {
    this.closureVarIndices.clear()
    this.localVarIndices.clear()
    this.argumentIndices.clear()
    this.nextLocalSlot = 0
    this.stackDepth = 0
    this.maxStackDepth = 0
    this.currentOffset = 0
    this.instructionOffsets.length = 0
    this.labelCounter = 0
    this.labelPositions.clear()
    this.pendingJumps.length = 0
    this.currentSourceNode = null
    this.currentStatementNode = null
    this.lineColCache = { offset: 0, line: 0, column: 0 }
    this.recordedStatementPositions.clear()
    this.hasExplicitReturn = false
  }

  private toModuleFileName(filePath: string): string {
    const ext = path.extname(filePath)
    const base = filePath.slice(0, filePath.length - ext.length)
    switch (ext) {
      case '.ts':
      case '.tsx':
        return `${base}.js`
      case '.mts':
        return `${base}.mjs`
      case '.cts':
        return `${base}.cjs`
      default:
        return filePath
    }
  }

  private saveCurrentFunctionContext(): FunctionContextSnapshot {
    return {
      functionDef: this.currentFunction,
      scopeManager: this.scopeManager,
      closureVarIndices: new Map(this.closureVarIndices),
      localVarIndices: new Map(this.localVarIndices),
      argumentIndices: new Map(this.argumentIndices),
      nextLocalSlot: this.nextLocalSlot,
      stackDepth: this.stackDepth,
      maxStackDepth: this.maxStackDepth,
      currentSourceNode: this.currentSourceNode,
      currentStatementNode: this.currentStatementNode,
      suppressDebugRecording: this.suppressDebugRecording,
      currentOffset: this.currentOffset,
      instructionOffsets: [...this.instructionOffsets],
      labelCounter: this.labelCounter,
      labelPositions: new Map(this.labelPositions),
      pendingJumps: this.pendingJumps.map((entry) => ({ ...entry })),
      lineColCache: { ...this.lineColCache },
      recordedStatementPositions: new Set(this.recordedStatementPositions),
      hasExplicitReturn: this.hasExplicitReturn,
    }
  }

  private restoreFunctionContext(snapshot: FunctionContextSnapshot) {
    this.currentFunction = snapshot.functionDef
    this.scopeManager = snapshot.scopeManager
    this.restoreMap(this.closureVarIndices, snapshot.closureVarIndices)
    this.restoreMap(this.localVarIndices, snapshot.localVarIndices)
    this.restoreMap(this.argumentIndices, snapshot.argumentIndices)
    this.nextLocalSlot = snapshot.nextLocalSlot
    this.stackDepth = snapshot.stackDepth
    this.maxStackDepth = snapshot.maxStackDepth
    this.currentSourceNode = snapshot.currentSourceNode
    this.currentStatementNode = snapshot.currentStatementNode
    this.suppressDebugRecording = snapshot.suppressDebugRecording
    this.currentOffset = snapshot.currentOffset
    this.instructionOffsets.length = 0
    this.instructionOffsets.push(...snapshot.instructionOffsets)
    this.labelCounter = snapshot.labelCounter
    this.labelPositions.clear()
    for (const [key, value] of snapshot.labelPositions) {
      this.labelPositions.set(key, value)
    }
    this.pendingJumps.length = 0
    for (const entry of snapshot.pendingJumps) {
      this.pendingJumps.push({ ...entry })
    }
    this.lineColCache = { ...snapshot.lineColCache }
    this.recordedStatementPositions.clear()
    for (const value of snapshot.recordedStatementPositions) {
      this.recordedStatementPositions.add(value)
    }
    this.hasExplicitReturn = snapshot.hasExplicitReturn
  }

  private restoreMap<K, V>(target: Map<K, V>, source: Map<K, V>) {
    target.clear()
    for (const [key, value] of source) {
      target.set(key, value)
    }
  }

  private withStatementNode<T>(node: ts.Node, fn: () => T): T {
    const previousStatement = this.currentStatementNode
    this.currentStatementNode = node
    try {
      this.markStatementStart(node)
      return this.withSourceNode(node, fn)
    } finally {
      this.currentStatementNode = previousStatement
    }
  }

  private withSourceNode<T>(node: ts.Node, fn: () => T): T {
    const previous = this.currentSourceNode
    this.currentSourceNode = node
    try {
      return fn()
    } finally {
      this.currentSourceNode = previous
    }
  }

  private markStatementStart(node: ts.Node) {
    if (node === this.sourceFile) return
    if (this.suppressDebugRecording) return
    const tsSourcePos = node.getStart(this.sourceFile, false)
    if (tsSourcePos < 0) return
    // 延迟到首次相关 opcode 发射时再记录调试信息，避免重复
  }

  private visitNode(node: ts.Node): void {
    if (ts.isFunctionDeclaration(node)) {
      this.withStatementNode(node, () => this.compileFunctionDeclaration(node))
      return
    }
    if (ts.isVariableStatement(node)) {
      this.withStatementNode(node, () => this.compileVariableStatement(node))
      return
    }
    if (ts.isForOfStatement(node)) {
      this.withStatementNode(node, () => this.compileForOfStatement(node))
      return
    }
    if (ts.isBlock(node)) {
      this.withStatementNode(node, () => this.compileBlock(node))
      return
    }
    if (ts.isExpressionStatement(node)) {
      this.withStatementNode(node, () => this.compileExpressionStatement(node))
      return
    }
    if (ts.isReturnStatement(node)) {
      this.withStatementNode(node, () => this.compileReturnStatement(node))
      return
    }
    ts.forEachChild(node, (child) => this.visitNode(child))
  }

  private compileVariableStatement(node: ts.VariableStatement) {
    const flags = node.declarationList.flags
    const isConst = (flags & ts.NodeFlags.Const) !== 0
    const isLet = (flags & ts.NodeFlags.Let) !== 0

    for (const declaration of node.declarationList.declarations) {
      this.withSourceNode(declaration, () => {
        if (!ts.isIdentifier(declaration.name)) {
          throw new Error('Destructuring is not supported yet')
        }

        const nameText = declaration.name.text
        const atom = this.atomTable.getAtomId(nameText)

        if ((isConst || isLet) && this.scopeManager.hasBindingInCurrentScope(atom)) {
          throw new Error(`Identifier '${nameText}' has already been declared in this scope`)
        }

        if (isConst && !declaration.initializer) {
          throw new Error(`Missing initializer in const declaration for '${nameText}'`)
        }

        this.declareLexicalVariable(atom, { isConst, isLet })

        if (declaration.initializer) {
          this.compileExpression(declaration.initializer)
          this.emitStoreToLexical(atom)
          return
        }

        if (isConst || isLet) {
          // Lexical declarations without initializer are initialized to undefined
          this.emitOpcode(Opcode.OP_undefined)
          this.emitStoreToLexical(atom)
        }
      })
    }
  }

  private compileFunctionDeclaration(node: ts.FunctionDeclaration) {
    if (!node.name) {
      throw new Error('Function declaration must have a name')
    }
    if (!node.body) {
      throw new Error(`Function '${node.name.text}' is missing a body`)
    }

    const atom = this.atomTable.getAtomId(node.name.text)
    if (this.scopeManager.hasBindingInCurrentScope(atom)) {
      throw new Error(`Identifier '${node.name.text}' has already been declared in this scope`)
    }

    const varIndex = this.declareLexicalVariable(atom, {
      isConst: false,
      isLet: false,
      kind: VarKind.FUNCTION_DECL,
    })
    const variable = this.currentFunction.vars[varIndex]

    const childFunction = this.compileChildFunction(node, atom, { isExpression: false })
    const constantIndex = this.currentFunction.bytecode.addConstant({
      tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE,
      value: childFunction.bytecode,
    })
    variable.funcPoolIndex = constantIndex

    const isModuleTopLevel =
      this.currentFunction.parent === null &&
      this.currentFunction.module !== null &&
      this.scopeManager.currentScope() === this.currentFunction.bodyScope

    if (isModuleTopLevel) {
      return
    }

    if (constantIndex <= 0xff) {
      this.emitOpcode(Opcode.OP_fclosure8, [constantIndex], node)
    } else {
      this.emitOpcode(Opcode.OP_fclosure, [constantIndex], node)
    }
  this.emitStoreToLexical(atom)
  }

  private compileChildFunction(
    node: ts.FunctionDeclaration | ts.FunctionExpression,
    nameAtom: Atom,
    options: { isExpression: boolean }
  ): FunctionDef {
    const parentFunction = this.currentFunction
    const sourcePos = this.toUtf8Offset(node.getStart(this.sourceFile, false))
    const childFunction = new FunctionDef(nameAtom, this.sourceCode, this.fileName, {
      parent: parentFunction,
      isFuncExpr: options.isExpression,
      sourcePos,
    })

    const isAsync = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword) ?? false
    const isGenerator = Boolean(node.asteriskToken)

    let funcKind = FunctionKind.JS_FUNC_NORMAL
    if (isAsync && isGenerator) {
      funcKind = FunctionKind.JS_FUNC_ASYNC_GENERATOR
    } else if (isAsync) {
      funcKind = FunctionKind.JS_FUNC_ASYNC
    } else if (isGenerator) {
      funcKind = FunctionKind.JS_FUNC_GENERATOR
    }

    childFunction.bytecode.jsMode = JSMode.JS_MODE_STRICT
    if (isAsync) {
      childFunction.bytecode.jsMode |= JSMode.JS_MODE_ASYNC
    }
    childFunction.bytecode.funcKind = funcKind
    childFunction.bytecode.hasDebug = true
    childFunction.bytecode.filename = this.moduleAtom
    childFunction.bytecode.argumentsAllowed = true
    childFunction.bytecode.hasSimpleParameterList = true
    childFunction.bytecode.hasPrototype = funcKind === FunctionKind.JS_FUNC_NORMAL
    childFunction.bytecode.newTargetAllowed = true

    parentFunction.appendChild(childFunction)

    const snapshot = this.saveCurrentFunctionContext()
    this.resetCodegenState()
    this.currentFunction = childFunction
    this.scopeManager = new ScopeManager(childFunction)

  this.pushScope(ScopeKind.Function)

    childFunction.definedArgCount = node.parameters.length
    for (let index = 0; index < node.parameters.length; index++) {
      this.compileFunctionParameter(node.parameters[index], index, node.parameters.length)
    }

    if (!node.body || !ts.isBlock(node.body)) {
      throw new Error('Only block bodies are supported for function declarations')
    }

    for (const statement of node.body.statements) {
      this.visitNode(statement)
    }

    if (!this.hasExplicitReturn) {
      this.emitOpcode(Opcode.OP_undefined)
      this.emitReturnOpcode()
    }

    this.popScope()
    this.resolvePendingJumps()
    this.finalizeFunction(childFunction)
    this.restoreFunctionContext(snapshot)

    return childFunction
  }

  private compileFunctionParameter(parameter: ts.ParameterDeclaration, index: number, totalParams: number) {
    if (!ts.isIdentifier(parameter.name)) {
      this.currentFunction.bytecode.hasSimpleParameterList = false
      throw new Error('Only simple identifier parameters are supported')
    }

    if (parameter.dotDotDotToken && parameter.initializer) {
      throw new Error('Rest parameters cannot have initializers')
    }

    if (parameter.dotDotDotToken && index !== totalParams - 1) {
      throw new Error('Rest parameter must be in the last position')
    }

    if (parameter.initializer || parameter.dotDotDotToken) {
      this.currentFunction.bytecode.hasSimpleParameterList = false
    }

    const atom = this.atomTable.getAtomId(parameter.name.text)
    if (this.scopeManager.hasBindingInCurrentScope(atom)) {
      throw new Error(`Duplicate parameter name '${parameter.name.text}'`)
    }

    const variable = new Var(atom, {
      isConst: false,
      isLexical: false,
      isCaptured: false,
      kind: VarKind.NORMAL,
      declarationKind: VarDeclarationKind.Parameter,
    })

    this.currentFunction.addArg(variable)
    this.scopeManager.bindArgumentToCurrentScope(atom, index)
    this.argumentIndices.set(atom, index)

    if (parameter.dotDotDotToken) {
      this.withSourceNode(parameter, () => {
        this.emitOpcode(Opcode.OP_rest, [index], parameter)
        this.emitStoreArgument(index, parameter)
      })
      return
    }

    const initializer = parameter.initializer ?? null

    if (initializer) {
      this.withSourceNode(initializer, () => {
        const skipDefaultLabel = this.createLabel()
        const endLabel = this.createLabel()

        this.emitLoadArgument(index, initializer)
        this.emitOpcode(Opcode.OP_dup, [], initializer)
        this.emitOpcode(Opcode.OP_is_undefined, [], initializer)
        this.emitJump(Opcode.OP_if_false8, skipDefaultLabel)
        this.emitOpcode(Opcode.OP_drop)
        this.compileExpression(initializer)
        this.emitStoreArgument(index, initializer)
        this.emitJump(Opcode.OP_goto8, endLabel)

        this.markLabel(skipDefaultLabel)
        this.emitOpcode(Opcode.OP_drop)
        this.markLabel(endLabel)
      })
    }
  }

  private compileReturnStatement(node: ts.ReturnStatement) {
    if (node.expression) {
      this.compileExpression(node.expression)
    } else {
      this.emitOpcode(Opcode.OP_undefined)
    }
    this.emitReturnOpcode(node)
    this.hasExplicitReturn = true
  }

  private emitReturnOpcode(node?: ts.Node) {
    const opcode = this.getReturnOpcodeForFunction(this.currentFunction.bytecode.funcKind)
    this.emitOpcode(opcode, [], node)
  }

  private getReturnOpcodeForFunction(funcKind: FunctionKind): Opcode {
    switch (funcKind) {
      case FunctionKind.JS_FUNC_ASYNC:
      case FunctionKind.JS_FUNC_ASYNC_GENERATOR:
        return Opcode.OP_return_async
      default:
        return Opcode.OP_return
    }
  }

  private compileBinaryExpression(expression: ts.BinaryExpression) {
    const operator = expression.operatorToken.kind
    switch (operator) {
      case ts.SyntaxKind.PlusToken: {
        this.compileExpression(expression.left)
        this.compileExpression(expression.right)
        this.emitOpcode(Opcode.OP_add, [], expression.operatorToken)
        return
      }
      default:
        throw new Error(`Unsupported binary operator: ${ts.SyntaxKind[operator]}`)
    }
  }

  private compileNumericLiteral(node: ts.NumericLiteral) {
    const value = Number(node.text)
    if (Number.isInteger(value) && value >= -1 && value <= 7) {
      const shortOpcodes = [
        Opcode.OP_push_minus1,
        Opcode.OP_push_0,
        Opcode.OP_push_1,
        Opcode.OP_push_2,
        Opcode.OP_push_3,
        Opcode.OP_push_4,
        Opcode.OP_push_5,
        Opcode.OP_push_6,
        Opcode.OP_push_7,
      ]
      const opcode = shortOpcodes[value + 1]
      this.emitOpcode(opcode)
    } else {
      this.emitOpcode(Opcode.OP_push_i32, [value | 0])
    }
  }

  private compileBlock(node: ts.Block, options: { createScope?: boolean } = {}) {
    const createScope = options.createScope !== false
    if (createScope) {
      this.pushScope(ScopeKind.Block)
    }
    try {
      for (const statement of node.statements) {
        this.visitNode(statement)
      }
    } finally {
      if (createScope) {
        this.popScope()
      }
    }
  }

  private compileExpressionStatement(node: ts.ExpressionStatement) {
    this.compileExpression(node.expression)
    let dropDebug: EmitDebugInfoOptions | undefined
    if (ts.isCallExpression(node.expression)) {
      const callDebugPos = this.getCallExpressionOpenParenPos(node.expression)
      if (callDebugPos !== undefined) {
        dropDebug = { tsSourcePos: callDebugPos }
      }
    }
    this.emitOpcode(Opcode.OP_drop, [], undefined, dropDebug)
  }
  private compileForOfStatement(node: ts.ForOfStatement) {
    if (node.awaitModifier) {
      throw new Error('for await is not supported yet')
    }

  this.pushScope(ScopeKind.Block)

    if (!ts.isVariableDeclarationList(node.initializer)) {
      throw new Error('for-of initializer must be a variable declaration')
    }
    if (node.initializer.declarations.length !== 1) {
      throw new Error('Only single variable declarations are supported in for-of')
    }

    const declaration = node.initializer.declarations[0]
    if (!ts.isIdentifier(declaration.name)) {
      throw new Error('Destructuring in for-of is not supported yet')
    }
    if (declaration.initializer) {
      throw new Error('for-of loop variable cannot have an initializer')
    }

    const nameText = declaration.name.text
    const atom = this.atomTable.getAtomId(nameText)
    if (this.scopeManager.hasBindingInCurrentScope(atom)) {
      throw new Error(`Identifier '${nameText}' has already been declared in this scope`)
    }

    const flags = node.initializer.flags
    const isConst = (flags & ts.NodeFlags.Const) !== 0
    const isLet = (flags & ts.NodeFlags.Let) !== 0

  this.declareLexicalVariable(atom, { isConst, isLet, capture: false })
  const loopVarSlot = this.localVarIndices.get(atom)!
    this.emitSetLocalUninitialized(loopVarSlot)

    this.compileExpression(node.expression)
    this.emitOpcode(Opcode.OP_for_of_start)

    const labelBody = this.createLabel()
    const labelCheck = this.createLabel()

    this.emitJump(Opcode.OP_goto8, labelCheck)

    this.markLabel(labelBody)
    this.emitStoreToLocal(loopVarSlot)

    if (ts.isBlock(node.statement)) {
      this.compileBlock(node.statement, { createScope: false })
    } else {
      this.visitNode(node.statement)
    }

    this.popScope()

    this.markLabel(labelCheck)
    this.emitOpcode(Opcode.OP_for_of_next, [0])
    this.emitJump(Opcode.OP_if_false8, labelBody)
    this.emitOpcode(Opcode.OP_drop)
    this.emitOpcode(Opcode.OP_iterator_close)
  }

  private compileExpression(expression: ts.Expression): void {
    const previous = this.currentSourceNode
    this.currentSourceNode = expression
    try {
      if (ts.isParenthesizedExpression(expression)) {
        this.compileExpression(expression.expression)
        return
      }

      if (ts.isNumericLiteral(expression)) {
        this.compileNumericLiteral(expression)
        return
      }

      if (ts.isArrayLiteralExpression(expression)) {
        this.compileArrayLiteral(expression)
        return
      }

      if (ts.isIdentifier(expression)) {
        this.emitLoadIdentifier(expression)
        return
      }

      if (ts.isBinaryExpression(expression)) {
        this.compileBinaryExpression(expression)
        return
      }

      if (ts.isCallExpression(expression)) {
        this.compileCallExpression(expression)
        return
      }

      throw new Error(`Unsupported expression kind: ${ts.SyntaxKind[expression.kind]}`)
    } finally {
      this.currentSourceNode = previous
    }
  }

  private compileArrayLiteral(expression: ts.ArrayLiteralExpression) {
    const elements = expression.elements
    const values = elements.filter((el) => !ts.isOmittedExpression(el))
    if (values.length !== elements.length) {
      throw new Error('Array holes are not supported yet')
    }
    for (const element of values) {
      this.compileExpression(element as ts.Expression)
    }
    this.emitOpcode(Opcode.OP_array_from, [values.length])
  }

  private compileCallExpression(expression: ts.CallExpression) {
    if (!ts.isPropertyAccessExpression(expression.expression)) {
      throw new Error('Only property access calls are supported for now')
    }

    const propertyAccess = expression.expression
    this.withSourceNode(propertyAccess.expression, () => {
      this.compileExpression(propertyAccess.expression)
    })
    const propertyAtom = this.atomTable.getAtomId(propertyAccess.name.text)
    const propertyOperatorPos = this.getPropertyAccessOperatorPos(propertyAccess)
    const propertyAccessDebug: EmitDebugInfoOptions | undefined = propertyOperatorPos !== undefined
      ? { tsSourcePos: propertyOperatorPos }
      : undefined
    this.emitOpcode(Opcode.OP_get_field2, [propertyAtom], propertyAccess.name, propertyAccessDebug)

    for (const arg of expression.arguments) {
      this.withSourceNode(arg, () => this.compileExpression(arg))
    }
    const callDebugPos = this.getCallExpressionOpenParenPos(expression)
    const callDebug: EmitDebugInfoOptions | undefined = callDebugPos !== undefined
      ? { tsSourcePos: callDebugPos }
      : undefined

    this.emitOpcode(Opcode.OP_call_method, [expression.arguments.length], expression, callDebug)
  }

  private emitLoadArgument(index: number, node?: ts.Node) {
    switch (index) {
      case 0:
        this.emitOpcode(Opcode.OP_get_arg0, [], node)
        return
      case 1:
        this.emitOpcode(Opcode.OP_get_arg1, [], node)
        return
      case 2:
        this.emitOpcode(Opcode.OP_get_arg2, [], node)
        return
      case 3:
        this.emitOpcode(Opcode.OP_get_arg3, [], node)
        return
      default:
        this.emitOpcode(Opcode.OP_get_arg, [index], node)
        return
    }
  }

  private emitStoreArgument(index: number, node?: ts.Node) {
    switch (index) {
      case 0:
        this.emitOpcode(Opcode.OP_put_arg0, [], node)
        return
      case 1:
        this.emitOpcode(Opcode.OP_put_arg1, [], node)
        return
      case 2:
        this.emitOpcode(Opcode.OP_put_arg2, [], node)
        return
      case 3:
        this.emitOpcode(Opcode.OP_put_arg3, [], node)
        return
      default:
        this.emitOpcode(Opcode.OP_put_arg, [index], node)
        return
    }
  }

  private emitLoadIdentifier(identifier: ts.Identifier) {
    const atom = this.atomTable.getAtomId(identifier.text)
    if (this.argumentIndices.has(atom)) {
      this.emitLoadArgument(this.argumentIndices.get(atom)!, identifier)
      return
    }
    if (this.localVarIndices.has(atom)) {
      this.emitLoadLocalCheck(this.localVarIndices.get(atom)!, identifier)
      return
    }
    if (this.closureVarIndices.has(atom)) {
      const index = this.closureVarIndices.get(atom)!
      this.emitOpcode(Opcode.OP_get_var_ref_check, [index], identifier)
      return
    }
    this.emitOpcode(Opcode.OP_get_var, [atom], identifier)
  }

  private emitSetLocalUninitialized(index: number) {
    this.withoutDebugRecording(() => {
      this.emitOpcode(Opcode.OP_set_loc_uninitialized, [index])
    })
  }

  private emitStoreToLocal(index: number) {
    switch (index) {
      case 0:
        this.emitOpcode(Opcode.OP_put_loc0)
        break
      case 1:
        this.emitOpcode(Opcode.OP_put_loc1)
        break
      case 2:
        this.emitOpcode(Opcode.OP_put_loc2)
        break
      case 3:
        this.emitOpcode(Opcode.OP_put_loc3)
        break
      default:
        this.emitOpcode(Opcode.OP_put_loc, [index])
        break
    }
  }

  private emitPutVarRef(index: number) {
    const shortOpcodes = [
      Opcode.OP_put_var_ref0,
      Opcode.OP_put_var_ref1,
      Opcode.OP_put_var_ref2,
      Opcode.OP_put_var_ref3,
    ]
    if (index < shortOpcodes.length) {
      this.emitOpcode(shortOpcodes[index])
    } else {
      this.emitOpcode(Opcode.OP_put_var_ref, [index])
    }
  }

  private emitLoadLocalCheck(index: number, node?: ts.Node) {
    this.emitOpcode(Opcode.OP_get_loc_check, [index], node)
  }

  private createLabel(): string {
    return `L${this.labelCounter++}`
  }

  private markLabel(label: string) {
    this.labelPositions.set(label, this.currentOffset)
  }

  private emitJump(opcode: Opcode, label: string) {
    const index = this.emitOpcode(opcode, [0])
    this.pendingJumps.push({ index, label, opcode })
  }

  private resolvePendingJumps() {
    const instructions = this.currentFunction.bytecode.instructions
    for (const pending of this.pendingJumps) {
      const target = this.labelPositions.get(pending.label)
      if (target === undefined) {
        throw new Error(`Unresolved label ${pending.label}`)
      }
  const def = getOpcodeDefinition(pending.opcode)
      if (!def) {
        throw new Error(`Unknown opcode ${pending.opcode}`)
      }
      const start = this.instructionOffsets[pending.index]
      const baseOffset = this.getJumpBaseOffset(def)
      const offset = target - (start + baseOffset)
      if (def.format === OpFormat.label8) {
        if (offset < -128 || offset > 127) {
          throw new Error('Jump offset out of range for label8')
        }
      }
      const instruction = instructions[pending.index]
      if (instruction.operands.length === 0) {
        instruction.operands.push(offset)
      } else {
        instruction.operands[instruction.operands.length - 1] = offset
      }
    }
  }

  private declareLexicalVariable(atom: Atom, options: { isConst: boolean; isLet: boolean; capture?: boolean; kind?: VarKind }): number {
    const isCaptured = options.capture !== false
    const isLexical = options.isConst || options.isLet
    const declarationKind =
      options.kind === VarKind.FUNCTION_DECL
        ? VarDeclarationKind.Function
        : options.isConst
          ? VarDeclarationKind.Const
          : options.isLet
            ? VarDeclarationKind.Let
            : VarDeclarationKind.Var
    const variable = new Var(atom, {
      isConst: options.isConst,
      isLexical,
      isCaptured,
      kind: options.kind ?? VarKind.NORMAL,
      declarationKind,
    })
    const varIndex = this.currentFunction.addVar(variable)
    this.scopeManager.bindVariable(varIndex, atom, declarationKind)
    if (isCaptured) {
      this.registerClosureVar(atom, varIndex, { ...options, kind: variable.kind })
    } else {
      const slot = this.nextLocalSlot++
      variable.localSlot = slot
      this.localVarIndices.set(atom, slot)
    }
    return varIndex
  }

  private registerClosureVar(atom: Atom, varIndex: number, options: { isConst: boolean; isLet: boolean; capture?: boolean; kind?: VarKind }) {
    if (this.closureVarIndices.has(atom)) return
    const closureVar = new ClosureVar(atom, {
      isLocal: true,
      isArgument: false,
      isConst: options.isConst,
      isLexical: options.isConst || options.isLet,
      kind: options.kind === VarKind.FUNCTION_DECL ? VarKind.NORMAL : options.kind ?? VarKind.NORMAL,
      varIndex,
    })
    const closureIndex = this.currentFunction.bytecode.addClosureVar(closureVar)
    this.closureVarIndices.set(atom, closureIndex)
  }

  private emitStoreToLexical(atom: Atom) {
    const slot = this.localVarIndices.get(atom)
    if (slot !== undefined) {
      this.emitStoreToLocal(slot)
      return
    }
    const closureIndex = this.closureVarIndices.get(atom)
    if (closureIndex === undefined) {
      throw new Error('Unknown lexical variable')
    }
    this.emitPutVarRef(closureIndex)
  }

  private emitModulePrologue() {
    this.withoutDebugRecording(() => {
      this.emitOpcode(Opcode.OP_push_this)
      const conditionalOpcode = env.supportsShortOpcodes ? Opcode.OP_if_false8 : Opcode.OP_if_false
      const skipReturnLabel = this.createLabel()
      this.emitJump(conditionalOpcode, skipReturnLabel)
      const returnIndex = this.emitOpcode(Opcode.OP_return_undef)
      this.moduleHoistInsertionIndex = returnIndex
      this.markLabel(skipReturnLabel)
    })
  }

  private injectModuleHoistedDefinitions(func: FunctionDef) {
    if (!func.module) {
      return
    }
    const hoisted = this.buildHoistedDefinitionInstructions(func)
    if (hoisted.length === 0) {
      return
    }
    const insertionIndex = func === this.currentFunction && this.moduleHoistInsertionIndex !== null ? this.moduleHoistInsertionIndex : 0
    this.insertInstructions(func, insertionIndex, hoisted)
    if (func === this.currentFunction) {
      this.moduleHoistInsertionIndex = null
    }
  }

  private buildHoistedDefinitionInstructions(func: FunctionDef): Instruction[] {
    const instructions: Instruction[] = []

    for (let index = 0; index < func.args.length; index++) {
      const arg = func.args[index]
      if (arg.funcPoolIndex >= 0) {
        instructions.push(this.buildFclosureInstruction(arg.funcPoolIndex))
        instructions.push({ opcode: Opcode.OP_put_arg, operands: [index] })
      }
    }

    const bodyScope = func.bodyScope
    for (let varIndex = 0; varIndex < func.vars.length; varIndex++) {
      const variable = func.vars[varIndex]
      if (variable.funcPoolIndex < 0) {
        continue
      }
      if (bodyScope >= 0 && variable.scopeLevel !== bodyScope) {
        continue
      }
      instructions.push(this.buildFclosureInstruction(variable.funcPoolIndex))
      if (variable.isCaptured) {
        const closureIndex = this.closureVarIndices.get(variable.name)
        if (closureIndex === undefined) {
          throw new Error(`Hoisted captured variable missing closure index for ${varIndex}`)
        }
        instructions.push(this.buildPutClosureInstruction(closureIndex))
      } else {
        if (variable.localSlot < 0) {
          throw new Error(`Hoisted variable missing local slot for index ${varIndex}`)
        }
        instructions.push(this.buildStoreToLocalInstruction(variable.localSlot))
      }
    }

    return instructions
  }

  private buildPutClosureInstruction(index: number): Instruction {
    const shortOpcodes = [
      Opcode.OP_put_var_ref0,
      Opcode.OP_put_var_ref1,
      Opcode.OP_put_var_ref2,
      Opcode.OP_put_var_ref3,
    ]
    if (index < shortOpcodes.length) {
      return { opcode: shortOpcodes[index], operands: [] }
    }
    return { opcode: Opcode.OP_put_var_ref, operands: [index] }
  }

  private buildFclosureInstruction(constantIndex: number): Instruction {
    if (env.supportsShortOpcodes && constantIndex <= 0xff) {
      return { opcode: Opcode.OP_fclosure8, operands: [constantIndex] }
    }
    return { opcode: Opcode.OP_fclosure, operands: [constantIndex] }
  }

  private buildStoreToLocalInstruction(slot: number): Instruction {
    switch (slot) {
      case 0:
        return { opcode: Opcode.OP_put_loc0, operands: [] }
      case 1:
        return { opcode: Opcode.OP_put_loc1, operands: [] }
      case 2:
        return { opcode: Opcode.OP_put_loc2, operands: [] }
      case 3:
        return { opcode: Opcode.OP_put_loc3, operands: [] }
      default: {
        if (env.supportsShortOpcodes && slot <= 0xff) {
          return { opcode: Opcode.OP_put_loc8, operands: [slot] }
        }
        return { opcode: Opcode.OP_put_loc, operands: [slot] }
      }
    }
  }

  private insertInstructions(func: FunctionDef, index: number, instructions: Instruction[]) {
    if (instructions.length === 0) {
      return
    }

    const bytecode = func.bytecode
    const delta = instructions.reduce((sum, ins) => sum + this.getInstructionSize(ins), 0)
    const insertionOffset = this.getInstructionOffset(func, index)

    bytecode.instructions.splice(index, 0, ...instructions)

    if (func === this.currentFunction) {
      const { offsets, totalSize } = this.recomputeInstructionOffsets(bytecode.instructions)
      this.instructionOffsets.length = offsets.length
      for (let i = 0; i < offsets.length; i++) {
        this.instructionOffsets[i] = offsets[i]
      }
      this.currentOffset = totalSize

      for (const pending of this.pendingJumps) {
        if (pending.index >= index) {
          pending.index += instructions.length
        }
      }

      for (const [label, position] of this.labelPositions) {
        if (position >= insertionOffset) {
          this.labelPositions.set(label, position + delta)
        }
      }
    }

    for (const entry of bytecode.lineNumberTable) {
      if (entry.pc >= insertionOffset) {
        entry.pc += delta
      }
    }
  }

  private recomputeInstructionOffsets(instructions: Instruction[]): { offsets: number[]; totalSize: number } {
    const offsets = new Array<number>(instructions.length)
    let offset = 0
    for (let i = 0; i < instructions.length; i++) {
      offsets[i] = offset
      offset += this.getInstructionSize(instructions[i])
    }
    return { offsets, totalSize: offset }
  }

  private getInstructionOffset(func: FunctionDef, index: number): number {
    if (func === this.currentFunction && this.instructionOffsets[index] !== undefined) {
      return this.instructionOffsets[index]
    }
    let offset = 0
    for (let i = 0; i < index && i < func.bytecode.instructions.length; i++) {
      offset += this.getInstructionSize(func.bytecode.instructions[i])
    }
    return offset
  }

  private getInstructionSize(instruction: Instruction): number {
    const def = getOpcodeDefinition(instruction.opcode)
    if (!def) {
      throw new Error(`Unknown opcode: ${instruction.opcode}`)
    }
    return def.size
  }

  private getNormalizedPosition(pos: number): number {
    if (pos <= 0) {
      return 0
    }
    if (pos >= this.normalizedPosByPos.length) {
      return this.normalizedPosByPos[this.normalizedPosByPos.length - 1]
    }
    return this.normalizedPosByPos[pos]
  }

  private emitOpcode(
    opcode: Opcode,
    operands: number[] = [],
    node?: ts.Node | null,
    debugOptions?: EmitDebugInfoOptions
  ): number {
  const def = getOpcodeDefinition(opcode)
    if (!def) {
      throw new Error(`Unknown opcode: ${opcode}`)
    }

    const recordNode = node === null ? null : node ?? this.currentStatementNode ?? this.currentSourceNode
    if (!this.suppressDebugRecording && (recordNode || debugOptions?.tsSourcePos !== undefined)) {
      let tsSourcePos = debugOptions?.tsSourcePos
      if (tsSourcePos === undefined && recordNode) {
        tsSourcePos = recordNode.getStart(this.sourceFile, false)
      }
      if (tsSourcePos !== undefined && tsSourcePos >= 0) {
        const sourcePos = this.toUtf8Offset(tsSourcePos)
        const isStatementRecord = debugOptions?.tsSourcePos === undefined && node === undefined && recordNode === this.currentStatementNode
        if (!isStatementRecord || !this.recordedStatementPositions.has(sourcePos)) {
          if (isStatementRecord) {
            this.recordedStatementPositions.add(sourcePos)
          }
          const { line, column } = this.getLineColumnFromUtf8Offset(sourcePos)
          this.currentFunction.bytecode.recordLineNumber(this.currentOffset, line, column, sourcePos)
          if (!isStatementRecord && this.currentStatementNode) {
            const statementStart = this.currentStatementNode.getStart(this.sourceFile, false)
            if (statementStart >= 0) {
              const statementPos = this.toUtf8Offset(statementStart)
              this.recordedStatementPositions.add(statementPos)
            }
          }
        }
      }
    }

    const { nPop, nPush } = this.getStackEffect(opcode, operands)

    this.stackDepth -= nPop
    if (this.stackDepth < 0) {
      this.stackDepth = 0
    }
    this.stackDepth += nPush
    if (this.stackDepth > this.maxStackDepth) {
      this.maxStackDepth = this.stackDepth
    }

    const instructionIndex = this.currentFunction.bytecode.instructions.length
    this.currentFunction.bytecode.pushOpcode(opcode, operands)
    this.instructionOffsets[instructionIndex] = this.currentOffset
    this.currentOffset += def.size
    return instructionIndex
  }

  private getStackEffect(opcode: Opcode, operands: number[] = []): { nPop: number; nPush: number } {
  const def = getOpcodeDefinition(opcode)
    if (!def) {
      throw new Error(`Unknown opcode: ${opcode}`)
    }

    let nPop = def.nPop
    switch (def.format) {
      case OpFormat.npop:
      case OpFormat.npop_u16:
        nPop += operands[0] ?? 0
        break
      case OpFormat.npopx:
        if (opcode >= Opcode.OP_call0 && opcode <= Opcode.OP_call3) {
          nPop += opcode - Opcode.OP_call0
        } else {
          throw new Error(`Unsupported npopx opcode: ${opcode}`)
        }
        break
      default:
        break
    }

    return { nPop, nPush: def.nPush }
  }

  private getBranchDelta(instruction: Instruction, def: OpcodeDefinition): number {
    const operands = instruction.operands ?? []
    switch (def.format) {
      case OpFormat.label:
      case OpFormat.label8:
      case OpFormat.label16:
      case OpFormat.label_u16:
        return operands[0] ?? 0
      case OpFormat.atom_label_u8:
      case OpFormat.atom_label_u16:
        return operands[1] ?? 0
      default:
        return 0
    }
  }

  private getJumpBaseOffset(def: OpcodeDefinition): number {
    switch (def.format) {
      case OpFormat.label:
      case OpFormat.label8:
      case OpFormat.label16:
      case OpFormat.label_u16:
        return 1
      case OpFormat.atom_label_u8:
      case OpFormat.atom_label_u16:
        return 5
      default:
        return def.size
    }
  }

  private computeStackSize(bytecode: FunctionBytecode): number {
    const instructions = bytecode.instructions
    if (instructions.length === 0) {
      return 0
    }

    if (process.env.DEBUG_STACK === '1') {
      console.log('stack-check: instructions', instructions.map((ins, idx) => ({ idx, opcode: Opcode[ins.opcode] ?? ins.opcode, operands: ins.operands })))
    }

    const offsetToIndex = new Map<number, number>()
    let bytecodeLength = 0
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i]
  const def = getOpcodeDefinition(instruction.opcode)
      if (!def) {
        throw new Error(`Unknown opcode: ${instruction.opcode}`)
      }
      offsetToIndex.set(bytecodeLength, i)
      bytecodeLength += def.size
    }

    const stackLevel = new Array<number>(bytecodeLength).fill(-1)
    const catchPos = new Array<number>(bytecodeLength).fill(-1)
    const worklist: number[] = []
    let worklistIndex = 0
    let stackLenMax = 0

    const opcodeName = (value: number) => Opcode[value] ?? value

    const enqueue = (pos: number, fromOpcode: number, stackLen: number, catchOffset: number) => {
      if (pos < 0 || pos >= bytecodeLength) {
        throw new Error(`bytecode buffer overflow (op=${opcodeName(fromOpcode)}, pc=${pos})`)
      }
      if (stackLen > stackLenMax) {
        stackLenMax = stackLen
      }
      if (stackLevel[pos] !== -1) {
        if (stackLevel[pos] !== stackLen) {
          throw new Error(
            `inconsistent stack size at pc=${pos}: expected ${stackLevel[pos]}, got ${stackLen}`
          )
        }
        if (catchPos[pos] !== catchOffset) {
          throw new Error(
            `inconsistent catch position at pc=${pos}: expected ${catchPos[pos]}, got ${catchOffset}`
          )
        }
        return
      }
      stackLevel[pos] = stackLen
      catchPos[pos] = catchOffset
      worklist.push(pos)
    }

    const resolveCatch = (currentCatch: number, catchLevel: number): number => {
      if (currentCatch < 0) {
        return currentCatch
      }
      if (currentCatch >= bytecodeLength) {
        throw new Error(`invalid catch position ${currentCatch}`)
      }
      const level = stackLevel[currentCatch]
      if (level === -1) {
        return currentCatch
      }
      const index = offsetToIndex.get(currentCatch)
      if (index === undefined) {
        return currentCatch
      }
      const opcode = instructions[index].opcode
      let expectedLevel = level
      if (opcode !== Opcode.OP_catch) {
        expectedLevel += 1
      }
      if (catchLevel === expectedLevel) {
        return catchPos[currentCatch]
      }
      return currentCatch
    }

    enqueue(0, Opcode.OP_invalid, 0, -1)

    while (worklistIndex < worklist.length) {
      const byteOffset = worklist[worklistIndex++]
      const instructionIndex = offsetToIndex.get(byteOffset)
      if (instructionIndex === undefined) {
        continue
      }
      const instruction = instructions[instructionIndex]
      const def = getOpcodeDefinition(instruction.opcode)
      if (!def) {
        throw new Error(`Unknown opcode: ${instruction.opcode}`)
      }

      let stackLen = stackLevel[byteOffset]
      let currentCatch = catchPos[byteOffset]
      let nextOffset = byteOffset + def.size
      if (nextOffset > bytecodeLength) {
        throw new Error(
          `bytecode buffer overflow (op=${opcodeName(instruction.opcode)}, pc=${byteOffset})`
        )
      }

      const { nPop, nPush } = this.getStackEffect(instruction.opcode, instruction.operands)
      if (process.env.DEBUG_STACK === '1') {
        console.log('stack state', {
          pc: byteOffset,
          opcode: opcodeName(instruction.opcode),
          stackLen,
          nPop,
          nPush,
          operands: instruction.operands,
        })
      }
      if (stackLen < nPop) {
        if (process.env.DEBUG_STACK === '1') {
          console.error('stack underflow detail', {
            pc: byteOffset,
            opcode: opcodeName(instruction.opcode),
            stackLen,
            nPop,
            operands: instruction.operands,
          })
        }
        throw new Error(
          `stack underflow at ${opcodeName(instruction.opcode)} (pc=${byteOffset})`
        )
      }
      stackLen = stackLen - nPop + nPush
      if (stackLen > stackLenMax) {
        stackLenMax = stackLen
      }

      let skipFallthrough = false
      switch (instruction.opcode) {
        case Opcode.OP_tail_call:
        case Opcode.OP_tail_call_method:
        case Opcode.OP_return:
        case Opcode.OP_return_undef:
        case Opcode.OP_return_async:
        case Opcode.OP_throw:
        case Opcode.OP_throw_error:
        case Opcode.OP_ret:
          skipFallthrough = true
          break
        case Opcode.OP_goto:
        case Opcode.OP_goto16:
        case Opcode.OP_goto8:
          nextOffset =
            byteOffset + this.getJumpBaseOffset(def) + this.getBranchDelta(instruction, def)
          break
        case Opcode.OP_if_true:
        case Opcode.OP_if_false:
        case Opcode.OP_if_true8:
        case Opcode.OP_if_false8:
          enqueue(
            byteOffset + this.getJumpBaseOffset(def) + this.getBranchDelta(instruction, def),
            instruction.opcode,
            stackLen,
            currentCatch
          )
          break
        case Opcode.OP_catch:
          enqueue(
            byteOffset + this.getJumpBaseOffset(def) + this.getBranchDelta(instruction, def),
            instruction.opcode,
            stackLen,
            currentCatch
          )
          currentCatch = byteOffset
          break
        case Opcode.OP_for_of_start:
        case Opcode.OP_for_await_of_start:
          currentCatch = byteOffset
          break
        case Opcode.OP_drop:
          currentCatch = resolveCatch(currentCatch, stackLen)
          break
        case Opcode.OP_nip:
        case Opcode.OP_nip1:
          currentCatch = resolveCatch(currentCatch, stackLen - 1)
          break
        case Opcode.OP_iterator_close:
          currentCatch = resolveCatch(currentCatch, stackLen + 2)
          break
        case Opcode.OP_nip_catch: {
          if (currentCatch < 0) {
            throw new Error(`nip_catch: no catch op (pc=${byteOffset})`)
          }
          const catchLevel = stackLevel[currentCatch]
          if (catchLevel === -1) {
            throw new Error(`nip_catch: uninitialized catch level (pc=${currentCatch})`)
          }
          stackLen = catchLevel
          const catchInstructionIndex = offsetToIndex.get(currentCatch)
          if (catchInstructionIndex === undefined) {
            throw new Error(`nip_catch: invalid catch target (pc=${currentCatch})`)
          }
          if (instructions[catchInstructionIndex].opcode !== Opcode.OP_catch) {
            stackLen += 1
          }
          stackLen += 1
          if (stackLen > stackLenMax) {
            stackLenMax = stackLen
          }
          currentCatch = catchPos[currentCatch]
          break
        }
        default:
          break
      }

      if (!skipFallthrough) {
        enqueue(nextOffset, instruction.opcode, stackLen, currentCatch)
      }
    }

    return stackLenMax
  }

  private pushScope(kind: ScopeKind = ScopeKind.Block) {
    this.scopeManager.enterScope(kind)
  }

  private popScope() {
    this.scopeManager.leaveScope()
  }

  private buildDebugInfo(func: FunctionDef) {
    const entries = [...func.bytecode.lineNumberTable]
      .filter((entry) => entry.sourcePos >= 0)
      .sort((a, b) => a.pc - b.pc)

    if (entries.length === 0 || entries[0].pc !== 0) {
      entries.unshift({ pc: 0, line: 0, column: 0, sourcePos: 0 })
    }

    const normalized: typeof entries = []
    for (const entry of entries) {
      const previous = normalized[normalized.length - 1]
      if (previous) {
        if (entry.pc === previous.pc) {
          previous.line = entry.line
          previous.column = entry.column
          previous.sourcePos = entry.sourcePos
          continue
        }
        if (entry.sourcePos === previous.sourcePos) {
          continue
        }
      }
      normalized.push({ ...entry })
    }

    if (normalized.length === 0) {
      func.bytecode.pc2line = []
      func.bytecode.pc2column = []
      return
    }

    const lineCache = new Map<number, { line: number; column: number }>()
    const getLineColumn = (sourcePos: number) => {
      let cached = lineCache.get(sourcePos)
      if (!cached) {
        cached = this.getLineColumnFromUtf8Offset(sourcePos)
        lineCache.set(sourcePos, cached)
      }
      return cached
    }

    const pc2line: number[] = []
    const pc2column: number[] = []
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:lineNumberTable', normalized.map((entry) => ({ ...entry })))
    }

    const first = normalized[0]
    const firstPos = getLineColumn(first.sourcePos)
    pc2line.push(...this.encodeULEB128(firstPos.line))
    pc2line.push(...this.encodeULEB128(firstPos.column))
    pc2column.push(...this.encodeULEB128(firstPos.column))

    let lastPc = first.pc
    let lastLine = firstPos.line
    let lastColumn = firstPos.column

    for (let index = 1; index < normalized.length; index++) {
      const entry = normalized[index]
      if (entry.pc < lastPc) {
        continue
      }
      const current = getLineColumn(entry.sourcePos)
      const diffPc = entry.pc - lastPc
      const diffLine = current.line - lastLine
      const diffColumn = current.column - lastColumn

      if (diffPc === 0 && diffLine === 0 && diffColumn === 0) {
        continue
      }

      if (
        diffPc >= 0 &&
        diffPc <= PC2LINE_DIFF_PC_MAX &&
        diffLine >= PC2LINE_BASE &&
        diffLine < PC2LINE_BASE + PC2LINE_RANGE
      ) {
        const op = PC2LINE_OP_FIRST + diffPc * PC2LINE_RANGE + (diffLine - PC2LINE_BASE)
        pc2line.push(op)
      } else {
        pc2line.push(0)
        pc2line.push(...this.encodeULEB128(diffPc))
        pc2line.push(...this.encodeSLEB128(diffLine))
      }

      pc2line.push(...this.encodeSLEB128(diffColumn))
      pc2column.push(...this.encodeSLEB128(diffColumn))

      lastPc = entry.pc
      lastLine = current.line
      lastColumn = current.column
    }

    func.bytecode.pc2line = pc2line
    func.bytecode.pc2column = pc2column
    func.bytecode.source = ''
    func.bytecode.sourceLength = 0
  }

  private finalizeFunction(func: FunctionDef) {
    const lexicalVars = func.vars.filter((variable) => !variable.isCaptured)
    func.bytecode.setVarDefs(lexicalVars)
    func.bytecode.setArgDefs(func.args)
    func.bytecode.stackSize = this.computeStackSize(func.bytecode)
    this.buildDebugInfo(func)
    func.bytecode.argCount = func.args.length
    func.bytecode.definedArgCount = func.definedArgCount
  }

  private encodeULEB128(value: number): number[] {
    const result: number[] = []
    let v = value >>> 0
    do {
      let byte = v & 0x7f
      v >>>= 7
      if (v !== 0) {
        byte |= 0x80
      }
      result.push(byte)
    } while (v !== 0)
    return result
  }

  private encodeSLEB128(value: number): number[] {
    const result: number[] = []
    const v = value | 0
    let zigzag = ((v << 1) ^ (v >> 31)) >>> 0
    do {
      let byte = zigzag & 0x7f
      zigzag >>>= 7
      if (zigzag !== 0) {
        byte |= 0x80
      }
      result.push(byte)
    } while (zigzag !== 0)
    return result
  }

  private getPropertyAccessOperatorPos(node: ts.PropertyAccessExpression): number | undefined {
    const nameStart = node.name.getStart(this.sourceFile, false)
    let pos = this.skipTriviaForward(node.expression.getEnd())
    if (pos >= nameStart) {
      pos = nameStart - 1
    }
    while (pos >= 0 && pos < nameStart) {
      const code = this.sourceCode.charCodeAt(pos)
      if (code === 0x2e) {
        return pos
      }
      if (code === 0x3f && pos + 1 < nameStart && this.sourceCode.charCodeAt(pos + 1) === 0x2e) {
        return pos + 1
      }
      if (!this.isWhitespaceChar(code)) {
        break
      }
      pos += 1
    }
    return undefined
  }

  private getCallExpressionOpenParenPos(node: ts.CallExpression): number | undefined {
    let pos = node.expression.getEnd()
    if (node.typeArguments && node.typeArguments.length > 0) {
      pos = node.typeArguments.end
    }
    while (pos < this.sourceCode.length) {
      pos = this.skipTriviaForward(pos)
      if (pos >= this.sourceCode.length) {
        break
      }
      const code = this.sourceCode.charCodeAt(pos)
      if (code === 0x28) {
        return pos
      }
      if (code === 0x3c) {
        pos = this.skipTypeArgumentSequence(pos)
        continue
      }
      break
    }
    return undefined
  }

  private skipTriviaForward(pos: number): number {
    let current = pos
    while (current < this.sourceCode.length) {
      const code = this.sourceCode.charCodeAt(current)
      if (this.isWhitespaceChar(code)) {
        current += 1
        continue
      }
      if (code === 0x2f && current + 1 < this.sourceCode.length) {
        const next = this.sourceCode.charCodeAt(current + 1)
        if (next === 0x2f) {
          current = this.skipLineComment(current + 2)
          continue
        }
        if (next === 0x2a) {
          current = this.skipBlockComment(current + 2)
          continue
        }
      }
      break
    }
    return current
  }

  private skipLineComment(pos: number): number {
    let current = pos
    while (current < this.sourceCode.length) {
      const code = this.sourceCode.charCodeAt(current)
      if (this.isLineTerminator(code)) {
        return current
      }
      current += 1
    }
    return current
  }

  private skipBlockComment(pos: number): number {
    let current = pos
    while (current < this.sourceCode.length) {
      const code = this.sourceCode.charCodeAt(current)
      if (code === 0x2a && current + 1 < this.sourceCode.length && this.sourceCode.charCodeAt(current + 1) === 0x2f) {
        return current + 2
      }
      current += 1
    }
    return current
  }

  private skipTypeArgumentSequence(pos: number): number {
    let current = pos
    let depth = 0
    while (current < this.sourceCode.length) {
      const code = this.sourceCode.charCodeAt(current)
      if (code === 0x3c) {
        depth += 1
      } else if (code === 0x3e) {
        depth -= 1
        current += 1
        if (depth <= 0) {
          return current
        }
        continue
      } else if (code === 0x27 || code === 0x22) {
        current = this.skipStringLiteral(current)
        continue
      } else if (code === 0x2f && current + 1 < this.sourceCode.length) {
        const next = this.sourceCode.charCodeAt(current + 1)
        if (next === 0x2f) {
          current = this.skipLineComment(current + 2)
          continue
        }
        if (next === 0x2a) {
          current = this.skipBlockComment(current + 2)
          continue
        }
      }
      current += 1
    }
    return current
  }

  private skipStringLiteral(pos: number): number {
    const quote = this.sourceCode.charCodeAt(pos)
    let current = pos + 1
    while (current < this.sourceCode.length) {
      const code = this.sourceCode.charCodeAt(current)
      if (code === quote) {
        return current + 1
      }
      if (code === 0x5c) {
        current += 2
        continue
      }
      current += 1
    }
    return current
  }

  private isWhitespaceChar(code: number): boolean {
    return code === 0x20 || code === 0x09 || code === 0x0b || code === 0x0c || code === 0x0d || code === 0x0a
  }

  private isLineTerminator(code: number): boolean {
    return code === 0x0a || code === 0x0d || code === 0x2028 || code === 0x2029
  }

  private collectStripSegments(source: string, pattern: RegExp, segments: Array<{ start: number; end: number }>) {
    pattern.lastIndex = 0
    for (const match of source.matchAll(pattern)) {
      const index = match.index ?? 0
      const text = match[0]
      if (!text) continue
      segments.push({ start: index, end: index + text.length })
    }
  }

  private computeDebugSourceMapping(source: string): { strippedSource: string; normalizedPosByPos: Uint32Array } {
    const segments: Array<{ start: number; end: number }> = []
    this.collectStripSegments(source, /:\s*[^=;,)]+(?=[=;,)])/g, segments)
    this.collectStripSegments(source, /<\s*[^>]+\s*>/g, segments)
    this.collectStripSegments(source, /\b(interface|type)\s+\w+\s*=\s*[^;]+;?/g, segments)
    this.collectStripSegments(source, /\s+as\s+const\b/g, segments)

    segments.sort((a, b) => a.start - b.start)

    const merged: Array<{ start: number; end: number }> = []
    for (const segment of segments) {
      const start = Math.max(0, Math.min(segment.start, source.length))
      const end = Math.max(start, Math.min(segment.end, source.length))
      if (start === end) {
        continue
      }
      const last = merged[merged.length - 1]
      if (last && start <= last.end) {
        if (end > last.end) {
          last.end = end
        }
        continue
      }
      merged.push({ start, end })
    }

    const normalizedPosByPos = new Uint32Array(source.length + 1)
    const builder: string[] = []
    let removedSoFar = 0
    let segmentIndex = 0
    let current = merged[segmentIndex]

    for (let pos = 0; pos <= source.length; pos++) {
      while (current && pos >= current.end) {
        removedSoFar += current.end - current.start
        segmentIndex += 1
        current = merged[segmentIndex]
      }

      if (current && pos >= current.start) {
        normalizedPosByPos[pos] = current.start - removedSoFar
      } else {
        normalizedPosByPos[pos] = pos - removedSoFar
      }

      if (pos === source.length) {
        break
      }

      if (!(current && pos >= current.start && pos < current.end)) {
        builder.push(source.charAt(pos))
      }
    }

    const strippedSource = builder.join('')
    return { strippedSource, normalizedPosByPos }
  }

  private withoutDebugRecording<T>(fn: () => T): T {
    const previous = this.suppressDebugRecording
    this.suppressDebugRecording = true
    try {
      return fn()
    } finally {
      this.suppressDebugRecording = previous
    }
  }

  private toUtf8Offset(pos: number): number {
    const normalizedPos = this.getNormalizedPosition(pos)
    if (normalizedPos <= 0) {
      return 0
    }
    if (normalizedPos >= this.utf8OffsetByPos.length) {
      return this.utf8OffsetByPos[this.utf8OffsetByPos.length - 1]
    }
    return this.utf8OffsetByPos[normalizedPos]
  }

  private getLineColumnFromUtf8Offset(offset: number): { line: number; column: number } {
    const clampedOffset = Math.max(0, Math.min(offset, this.sourceUtf8.length))
    const cache = this.lineColCache
    let line: number
    let column: number
    if (clampedOffset >= cache.offset) {
      line = cache.line
      column = cache.column
      for (let i = cache.offset; i < clampedOffset; i++) {
        const byte = this.sourceUtf8[i]
        if (byte === 0x0a) {
          line += 1
          column = 0
        } else if (byte < 0x80 || byte >= 0xc0) {
          column += 1
        }
      }
    } else {
      line = 0
      column = 0
      for (let i = 0; i < clampedOffset; i++) {
        const byte = this.sourceUtf8[i]
        if (byte === 0x0a) {
          line += 1
          column = 0
        } else if (byte < 0x80 || byte >= 0xc0) {
          column += 1
        }
      }
    }
    this.lineColCache = { offset: clampedOffset, line, column }
    return { line, column }
  }

  private getUtf8ByteLength(codePoint: number): number {
    if (codePoint <= 0x7f) return 1
    if (codePoint <= 0x7ff) return 2
    if (codePoint <= 0xffff) return 3
    return 4
  }
}

export function createNewCompiler(fileName: string, sourceCode: string, options: CompilerOptions = {}) {
  return new Compiler(fileName, sourceCode, options)
}