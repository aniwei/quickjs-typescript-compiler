import { ensureStatementVisitorsInitialized, getStatementVisitor } from './compiler/visitors/statementVisitors'
import {
  compileBooleanLiteral,
  compileNoSubstitutionTemplateLiteral,
  compileNullLiteral,
  compileNumericLiteral,
  compileStringLiteral,
  compileTemplateExpression,
  compileThisExpression,
} from './compiler/expressions/literals'
import { compileCallExpression, compileNewExpression } from './compiler/expressions/calls'
import { compileArrayLiteralExpression, compileObjectLiteralExpression } from './compiler/expressions/collections'
import {
  compileBinaryExpression,
  compilePostfixUnaryExpression,
  compilePrefixUnaryExpression,
  compilePropertyAccessExpression,
  compileVoidExpression,
} from './compiler/expressions/operators'
import { compileBlockStatement, compileExpressionStatement as compileExpressionStatementNode } from './compiler/statements/simple/index'
import path from 'node:path'
import * as ts from 'typescript'
import { Atom, AtomTable, JSAtom } from './atoms'
import { FunctionDef, ModuleExportType, createEmptyModuleRecord, type ModuleExportEntryLocal } from './functionDef'
import { FunctionBytecode, type Instruction, type ConstantEntry } from './functionBytecode'
import { ScopeManager } from './scopeManager'
import { ScopeKind } from './scopes'
import { Var, VarKind, ClosureVar, VarDeclarationKind } from './vars'
import { Opcode, OpFormat, PC2Line, BytecodeTag, FunctionKind, JSMode, env, type OpcodeDefinition } from './env'
import { getOpcodeDefinition } from './utils/opcode'
import { getIndexedOpcode } from './utils/opcodeVariants'
import { pruneUnusedClosureVars } from './compiler/core/closureVarUtils'
import {
  ControlFlowBuilder,
  ControlFlowTarget,
  ControlFlowTargetKind,
  LoopControlFlowTarget,
  type BreakResolution,
  type ContinueResolution,
} from './controlFlow'

const PC2LINE_BASE = PC2Line.PC2LINE_BASE
const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

const JS_PROP_CONFIGURABLE = 1 << 0
const JS_PROP_WRITABLE = 1 << 1
const DEFINE_GLOBAL_FUNC_VAR = 1 << 6
const DEFINE_GLOBAL_LEX_VAR = 1 << 7

export interface CompilerOptions {
  atomTable?: AtomTable
  referenceJsSource?: string | null
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
  lineColCache: { offset: number; line: number; rawColumn: number }
  recordedStatementPositions: Set<number>
  hasExplicitReturn: boolean
  moduleHoistInsertionIndex: number | null
  moduleHoistLabel: string | null
  controlFlowTargets: ControlFlowTarget[]
  loopCleanupEntries: Array<[string, LoopCleanupInfo]>
}

type LoopCleanupInfo = { kind: 'for-of' | 'for-in' }

type ColumnAdjustment = { startColumn: number; delta: number }

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
  private readonly controlFlow = new ControlFlowBuilder({
    emitGoto: (label) => this.emitGoto(label),
  })
  private readonly loopCleanupByBreakLabel = new Map<string, LoopCleanupInfo>()
  private readonly lexicalInitByScope = new Map<number, { insertionIndex: number }>()
  private readonly sourceUtf8: Uint8Array
  private readonly utf8OffsetByPos: Uint32Array
  private readonly normalizedPosByPos: Uint32Array
  private lineColCache = { offset: 0, line: 0, rawColumn: 0 }
  private columnAdjustments: Map<number, ColumnAdjustment[]> = new Map()
  private readonly recordedStatementPositions = new Set<number>()
  private hasExplicitReturn = false
  private moduleHoistInsertionIndex: number | null = null
  private moduleHoistLabel: string | null = null

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

    const { strippedSource, normalizedPosByPos, columnAdjustments } = this.computeDebugSourceMapping(
      this.sourceCode,
      options.referenceJsSource ?? undefined
    )
    this.normalizedPosByPos = normalizedPosByPos
    this.columnAdjustments = columnAdjustments
    if (options.referenceJsSource !== undefined) {
      const referenceAdjustments = this.computeReferenceColumnAdjustments(strippedSource, options.referenceJsSource)
      this.mergeColumnAdjustments(referenceAdjustments)
    }
    this.sortColumnAdjustments(this.columnAdjustments)

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
    ensureStatementVisitorsInitialized()
    const evalAtom = this.atomTable.getAtomId('_eval_')
    const rootFunction = new FunctionDef(evalAtom, this.sourceCode, this.fileName)
    
    rootFunction.isGlobalVar = true
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
    this.lineColCache = { offset: 0, line: 0, rawColumn: 0 }
    this.recordedStatementPositions.clear()
    this.hasExplicitReturn = false
    this.moduleHoistLabel = null
    this.controlFlow.reset()
    this.loopCleanupByBreakLabel.clear()
    this.lexicalInitByScope.clear()
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
      moduleHoistInsertionIndex: this.moduleHoistInsertionIndex,
      moduleHoistLabel: this.moduleHoistLabel,
      controlFlowTargets: this.controlFlow.createSnapshot(),
      loopCleanupEntries: Array.from(this.loopCleanupByBreakLabel.entries()),
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
    this.moduleHoistInsertionIndex = snapshot.moduleHoistInsertionIndex
    this.moduleHoistLabel = snapshot.moduleHoistLabel
    this.controlFlow.restoreSnapshot(snapshot.controlFlowTargets)
    this.loopCleanupByBreakLabel.clear()
    for (const [label, info] of snapshot.loopCleanupEntries) {
      this.loopCleanupByBreakLabel.set(label, info)
    }
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

  public withSourceNode<T>(node: ts.Node, fn: () => T): T {
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
    if (!ts.isIfStatement(node)) return
    if (process.env.DEBUG_PC2LINE === '1') {
      const tsSourcePos = node.getStart(this.sourceFile, false)
      if (tsSourcePos >= 0) {
        const sourcePos = this.toUtf8Offset(tsSourcePos)
        const { line, column } = this.getLineColumnFromUtf8Offset(sourcePos)
        console.log('pc2line:statement-start-skip', {
          offset: this.currentOffset,
          nodeKind: ts.SyntaxKind[node.kind],
          tsSourcePos,
          sourcePos,
          line,
          column,
        })
      }
    }
  }

  private visitNode(node: ts.Node): void {
    if (ts.isStatement(node)) {
      const visitor = getStatementVisitor(node.kind)
      if (visitor) {
        this.withStatementNode(node, () => visitor(this, node))
        return
      }
    }
    ts.forEachChild(node, (child) => this.visitNode(child))
  }

  public compileStatement(node: ts.Statement): void {
    const visitor = getStatementVisitor(node.kind)
    if (visitor) {
      this.withStatementNode(node, () => visitor(this, node))
      return
    }
    this.withStatementNode(node, () => {
      ts.forEachChild(node, (child) => this.visitNode(child))
    })
  }

  private compileFunctionExpression(node: ts.FunctionExpression) {
    const nameAtom = node.name ? this.atomTable.getAtomId(node.name.text) : this.atomTable.getAtomId('')
    const childFunction = this.compileChildFunction(node, nameAtom, { isExpression: true })
    const constantIndex = this.addFunctionConstant(childFunction)
    this.emitFunctionClosure(constantIndex, node)
  }

  public compileChildFunction(
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

  const startLineColumn = this.getLineColumnFromUtf8Offset(childFunction.sourcePos)
  this.currentFunction.bytecode.recordLineNumber(0, startLineColumn.line, startLineColumn.column, childFunction.sourcePos, 0)

    this.pushScope(ScopeKind.Function)

    const parameters = node.parameters.filter((parameter) => !this.isThisParameter(parameter))

    childFunction.definedArgCount = parameters.length
    for (let index = 0; index < parameters.length; index++) {
      this.compileFunctionParameter(parameters[index], index, parameters.length)
    }

    if (!node.body || !ts.isBlock(node.body)) {
      throw new Error('Only block bodies are supported for function declarations')
    }

    for (const statement of node.body.statements) {
      this.visitNode(statement)
    }

    if (!this.hasExplicitReturn) {
      this.emitVoidReturnOpcode()
    }

    this.popScope()
    this.resolvePendingJumps()
    this.finalizeFunction(childFunction)
    this.restoreFunctionContext(snapshot)

    return childFunction
  }

  private isThisParameter(parameter: ts.ParameterDeclaration): boolean {
    return ts.isIdentifier(parameter.name) && parameter.name.text === 'this'
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

  public emitControlFlowUnwind(target: ControlFlowTarget) {
    switch (target.kind) {
      case ControlFlowTargetKind.Loop:
        this.emitLoopCleanup(target)
        break
      default:
        break
    }
  }

  private emitLoopCleanup(target: LoopControlFlowTarget) {
    const cleanup = this.loopCleanupByBreakLabel.get(target.breakLabel)
    if (!cleanup) {
      return
    }
    switch (cleanup.kind) {
      case 'for-of':
        this.emitOpcode(Opcode.OP_iterator_close)
        break
      case 'for-in':
        this.emitOpcode(Opcode.OP_drop)
        break
      default:
        throw new Error(`Unsupported loop cleanup kind '${cleanup.kind}'`)
    }
  }

  public registerLoopCleanup(breakLabel: string, info: LoopCleanupInfo): void {
    this.loopCleanupByBreakLabel.set(breakLabel, info)
  }

  public clearLoopCleanup(breakLabel: string): void {
    this.loopCleanupByBreakLabel.delete(breakLabel)
  }

  public pushLoopTarget(breakLabel: string, continueLabel: string, options: { labelName?: string } = {}): void {
    this.controlFlow.pushLoop(breakLabel, continueLabel, options)
  }

  public popLoopTarget(): void {
    this.controlFlow.pop(ControlFlowTargetKind.Loop)
  }

  public pushSwitchTarget(breakLabel: string, options: { labelName?: string } = {}): void {
    this.controlFlow.pushSwitch(breakLabel, options)
  }

  public popSwitchTarget(): void {
    this.controlFlow.pop(ControlFlowTargetKind.Switch)
  }

  public pushLabelTarget(labelName: string, breakLabel: string): void {
    this.controlFlow.pushLabel(labelName, breakLabel)
  }

  public popLabelTarget(): void {
    this.controlFlow.pop(ControlFlowTargetKind.Label)
  }

  public resolveBreak(node?: ts.BreakStatement): BreakResolution {
    return this.controlFlow.resolveBreak(node)
  }

  public resolveContinue(node?: ts.ContinueStatement): ContinueResolution {
    return this.controlFlow.resolveContinue(node)
  }

  public emitReturnOpcode(node?: ts.Node) {
    const opcode = this.getReturnOpcodeForFunction(this.currentFunction.bytecode.funcKind)
    this.emitOpcode(opcode, [], node)
  }

  public emitVoidReturnOpcode(node?: ts.Node) {
    const opcode = this.getVoidReturnOpcodeForFunction(this.currentFunction.bytecode.funcKind)
    this.emitOpcode(opcode, [], node)
  }

  public markExplicitReturn(): void {
    this.hasExplicitReturn = true
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

  private getVoidReturnOpcodeForFunction(funcKind: FunctionKind): Opcode {
    switch (funcKind) {
      case FunctionKind.JS_FUNC_ASYNC:
      case FunctionKind.JS_FUNC_ASYNC_GENERATOR:
        return Opcode.OP_return_async
      default:
        return Opcode.OP_return_undef
    }
  }

  public emitStoreIdentifier(atom: Atom, identifier: ts.Identifier) {
    if (this.argumentIndices.has(atom)) {
      this.emitStoreArgument(this.argumentIndices.get(atom)!, identifier)
      return
    }
    if (this.localVarIndices.has(atom) || this.closureVarIndices.has(atom)) {
      this.emitStoreToLexical(atom)
      return
    }
    const captured = this.resolveCapturedIdentifier(atom)
    if (captured) {
      this.emitStoreToLexical(atom)
      return
    }
    this.emitOpcode(Opcode.OP_put_var, [atom], identifier)
  }

  public emitPushConstant(
    entry: ConstantEntry,
    options: { key?: string | null; node?: ts.Node | null } = {}
  ): number {
    const constantIndex = this.currentFunction.addConstant(entry, { key: options.key })
    const debugNode = options.node === undefined ? undefined : options.node
    if (env.supportsShortOpcodes && constantIndex <= 0xff) {
      this.emitOpcode(Opcode.OP_push_const8, [constantIndex], debugNode)
    } else {
      this.emitOpcode(Opcode.OP_push_const, [constantIndex], debugNode)
    }
    return constantIndex
  }

  public compileBlock(node: ts.Block, options: { createScope?: boolean } = {}) {
    compileBlockStatement(this, node, options)
  }

  public compileExpressionStatement(node: ts.ExpressionStatement) {
    compileExpressionStatementNode(this, node)

  }

  public compileExpression(expression: ts.Expression): void {
    const previous = this.currentSourceNode
    this.currentSourceNode = expression
    try {
      if (ts.isParenthesizedExpression(expression)) {
        this.compileExpression(expression.expression)
        return
      }

      if (ts.isNumericLiteral(expression)) {
        compileNumericLiteral(this, expression)
        return
      }

      if (expression.kind === ts.SyntaxKind.TrueKeyword || expression.kind === ts.SyntaxKind.FalseKeyword) {
        compileBooleanLiteral(this, expression)
        return
      }

      if (ts.isStringLiteral(expression)) {
        compileStringLiteral(this, expression)
        return
      }

      if (ts.isNoSubstitutionTemplateLiteral(expression)) {
        compileNoSubstitutionTemplateLiteral(this, expression)
        return
      }

      if (ts.isTemplateExpression(expression)) {
        compileTemplateExpression(this, expression)
        return
      }

      if (expression.kind === ts.SyntaxKind.NullKeyword) {
        compileNullLiteral(this, expression)
        return
      }

      if (expression.kind === ts.SyntaxKind.ThisKeyword) {
        compileThisExpression(this, expression)
        return
      }

      if (ts.isArrayLiteralExpression(expression)) {
        compileArrayLiteralExpression(this, expression)
        return
      }

      if (ts.isObjectLiteralExpression(expression)) {
        compileObjectLiteralExpression(this, expression)
        return
      }

      if (ts.isIdentifier(expression)) {
        this.emitLoadIdentifier(expression)
        return
      }

      if (ts.isBinaryExpression(expression)) {
        compileBinaryExpression(this, expression)
        return
      }

      if (ts.isCallExpression(expression)) {
        compileCallExpression(this, expression)
        return
      }

      if (ts.isNewExpression(expression)) {
        compileNewExpression(this, expression)
        return
      }

      if (ts.isPropertyAccessExpression(expression)) {
        compilePropertyAccessExpression(this, expression)
        return
      }

      if (ts.isFunctionExpression(expression)) {
        this.compileFunctionExpression(expression)
        return
      }

      if (ts.isAsExpression(expression)) {
        this.compileExpression(expression.expression)
        return
      }

      if (ts.isTypeAssertionExpression(expression)) {
        this.compileExpression(expression.expression)
        return
      }

      if (ts.isVoidExpression(expression)) {
        compileVoidExpression(this, expression)
        return
      }

      if (ts.isPrefixUnaryExpression(expression)) {
        compilePrefixUnaryExpression(this, expression)
        return
      }

      if (ts.isPostfixUnaryExpression(expression)) {
        compilePostfixUnaryExpression(this, expression)
        return
      }

      throw new Error(`Unsupported expression kind: ${ts.SyntaxKind[expression.kind]}`)
    } finally {
      this.currentSourceNode = previous
    }
  }

  public emitStringLiteral(value: string, node: ts.Node) {
    const atom = this.atomTable.getAtomId(value)
    this.emitOpcode(Opcode.OP_push_atom_value, [atom], node)
  }

  public recordExpressionStatementDebug(expression: ts.Expression) {
    const currentStatement = this.currentStatementNode
    if (currentStatement && ts.isExpressionStatement(currentStatement) && currentStatement.expression === expression) {
      this.recordDebugPoint(expression)
    }
  }

  private compilePropertyAccessExpression(expression: ts.PropertyAccessExpression) {
    this.withSourceNode(expression.expression, () => {
      this.compileExpression(expression.expression)
    })
    const propertyAtom = this.atomTable.getAtomId(expression.name.text)
    const operatorPos = this.getPropertyAccessOperatorPos(expression)
    const debug: EmitDebugInfoOptions | undefined = operatorPos !== undefined
      ? { tsSourcePos: operatorPos }
      : undefined
    this.emitOpcode(Opcode.OP_get_field, [propertyAtom], expression.name, debug)
  }

  private compilePrefixUnaryExpression(expression: ts.PrefixUnaryExpression) {
    const operator = expression.operator

    switch (operator) {
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.TildeToken:
      case ts.SyntaxKind.ExclamationToken:
        break
      default:
        throw new Error(`Unsupported prefix unary operator: ${ts.SyntaxKind[operator]}`)
    }

    this.compileExpression(expression.operand)

    switch (operator) {
      case ts.SyntaxKind.PlusToken:
        this.emitOpcode(Opcode.OP_plus, [], expression)
        break
      case ts.SyntaxKind.MinusToken:
        this.emitOpcode(Opcode.OP_neg, [], expression)
        break
      case ts.SyntaxKind.TildeToken:
        this.emitOpcode(Opcode.OP_not, [], expression)
        break
      case ts.SyntaxKind.ExclamationToken:
        this.emitOpcode(Opcode.OP_lnot, [], expression)
        break
      default:
        throw new Error(`Unsupported prefix unary operator: ${ts.SyntaxKind[operator]}`)
    }
  }

  private compilePostfixUnaryExpression(expression: ts.PostfixUnaryExpression): never {
    throw new Error(`Unsupported postfix unary operator: ${ts.SyntaxKind[expression.operator]}`)
  }

  private compileVoidExpression(expression: ts.VoidExpression) {
    this.compileExpression(expression.expression)
    this.emitOpcode(Opcode.OP_drop)
    this.emitOpcode(Opcode.OP_undefined, [], expression)
  }

  private emitLoadArgument(index: number, node?: ts.Node) {
    const shortOpcode = getIndexedOpcode('OP_get_arg', index)
    if (shortOpcode !== undefined) {
      this.emitOpcode(shortOpcode, [], node)
      return
    }
    this.emitOpcode(Opcode.OP_get_arg, [index], node)
  }

  private emitStoreArgument(index: number, node?: ts.Node) {
    const shortOpcode = getIndexedOpcode('OP_put_arg', index)
    if (shortOpcode !== undefined) {
      this.emitOpcode(shortOpcode, [], node)
      return
    }
    this.emitOpcode(Opcode.OP_put_arg, [index], node)
  }

  public emitLoadIdentifier(identifier: ts.Identifier) {
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
      const closureVar = this.currentFunction.bytecode.closureVars[index]
      const isLexicalClosure = closureVar?.isLexical ?? true
      if (isLexicalClosure) {
        this.emitOpcode(Opcode.OP_get_var_ref_check, [index], identifier)
        return
      }
      const shortOpcode = getIndexedOpcode('OP_get_var_ref', index)
      if (shortOpcode !== undefined) {
        this.emitOpcode(shortOpcode, [], identifier)
        return
      }
      this.emitOpcode(Opcode.OP_get_var_ref, [index], identifier)
      return
    }
    const captured = this.resolveCapturedIdentifier(atom)
    if (captured) {
      if (captured.isLexical) {
        this.emitOpcode(Opcode.OP_get_var_ref_check, [captured.index], identifier)
        return
      }
      const shortOpcode = getIndexedOpcode('OP_get_var_ref', captured.index)
      if (shortOpcode !== undefined) {
        this.emitOpcode(shortOpcode, [], identifier)
        return
      }
      this.emitOpcode(Opcode.OP_get_var_ref, [captured.index], identifier)
      return
    }
    this.emitOpcode(Opcode.OP_get_var, [atom], identifier)
  }

  public emitSetLocalUninitialized(index: number, scopeLevel: number) {
    const scopeInfo = this.ensureLexicalInitializationScope(scopeLevel)
    const instruction: Instruction = {
      opcode: Opcode.OP_set_loc_uninitialized,
      operands: [index],
    }
    this.insertLexicalInitialization(scopeLevel, scopeInfo.insertionIndex, instruction)
  }

  private ensureLexicalInitializationScope(scopeLevel: number): { insertionIndex: number } {
    if (scopeLevel < 0) {
      scopeLevel = this.scopeManager.currentScope()
    }
    let scopeInfo = this.lexicalInitByScope.get(scopeLevel)
    if (!scopeInfo) {
      scopeInfo = {
        insertionIndex: this.currentFunction.bytecode.instructions.length,
      }
      this.lexicalInitByScope.set(scopeLevel, scopeInfo)
    }
    return scopeInfo
  }

  private insertLexicalInitialization(scopeLevel: number, insertionIndex: number, instruction: Instruction) {
    const func = this.currentFunction
    const insertionPc = this.getInstructionOffset(func, insertionIndex)
    const labelsToRestore: string[] = []
    for (const [label, position] of this.labelPositions) {
      if (position === insertionPc) {
        labelsToRestore.push(label)
      }
    }

    this.insertInstructions(func, insertionIndex, [instruction])

    for (const label of labelsToRestore) {
      this.labelPositions.set(label, insertionPc)
    }

    for (const [otherScope, info] of this.lexicalInitByScope) {
      if (otherScope === scopeLevel) {
        continue
      }
      if (info.insertionIndex >= insertionIndex) {
        info.insertionIndex += 1
      }
    }
  }

  public emitStoreToLocal(index: number) {
    const shortOpcode = index <= 3 ? getIndexedOpcode('OP_put_loc', index) : undefined
    if (shortOpcode !== undefined) {
      this.emitOpcode(shortOpcode)
      return
    }
    if (env.supportsShortOpcodes && index <= 0xff) {
      this.emitOpcode(Opcode.OP_put_loc8, [index])
      return
    }
    this.emitOpcode(Opcode.OP_put_loc, [index])
  }

  private emitPutVarRef(index: number) {
    const shortOpcode = getIndexedOpcode('OP_put_var_ref', index)
    if (shortOpcode !== undefined) {
      this.emitOpcode(shortOpcode)
      return
    }
    this.emitOpcode(Opcode.OP_put_var_ref, [index])
  }

  private emitLoadLocalCheck(index: number, node?: ts.Node) {
    this.emitOpcode(Opcode.OP_get_loc_check, [index], node)
  }

  private resolveCapturedIdentifier(atom: Atom): { index: number; isLexical: boolean } | null {
    const capture = this.findCapturedVariableInParents(atom)
    if (!capture) {
      return null
    }
    return this.ensureCapturedClosureVar(atom, capture)
  }

  private findCapturedVariableInParents(atom: Atom): { functionDef: FunctionDef; variable: Var; varIndex: number } | null {
    let current = this.currentFunction.parent
    while (current) {
      for (let index = 0; index < current.vars.length; index += 1) {
        const variable = current.vars[index]
        if (variable.name !== atom) {
          continue
        }
        if (!variable.isCaptured) {
          continue
        }
        return { functionDef: current, variable, varIndex: index }
      }
      current = current.parent
    }
    return null
  }

  private ensureCapturedClosureVar(
    atom: Atom,
    capture: { functionDef: FunctionDef; variable: Var; varIndex: number }
  ): { index: number; isLexical: boolean } {
    if (this.closureVarIndices.has(atom)) {
      const existingIndex = this.closureVarIndices.get(atom)!
      const closureVar = this.currentFunction.bytecode.closureVars[existingIndex]
      const isLexical = closureVar?.isLexical ?? capture.variable.isLexical
      return { index: existingIndex, isLexical }
    }

    const parentClosureVar = capture.functionDef.bytecode.closureVars.find((cv) => cv.name === atom)
    const isLexical = parentClosureVar?.isLexical ?? capture.variable.isLexical
    const isConst = parentClosureVar?.isConst ?? capture.variable.isConst
    const kind = parentClosureVar?.kind ?? capture.variable.kind
    const varIndex = parentClosureVar?.varIndex ?? capture.varIndex
    const isArgument = parentClosureVar?.isArgument ?? false

    const closureVar = new ClosureVar(atom, {
      isLocal: false,
      isArgument,
      isConst,
      isLexical,
      kind,
      varIndex,
    })

    const closureIndex = this.currentFunction.addClosureVar(closureVar)
    this.closureVarIndices.set(atom, closureIndex)

    return { index: closureIndex, isLexical: closureVar.isLexical }
  }

  public createLabel(): string {
    return `L${this.labelCounter++}`
  }

  public markLabel(label: string) {
    this.labelPositions.set(label, this.currentOffset)
  }

  public emitJump(opcode: Opcode, label: string) {
    const index = this.emitOpcode(opcode, [0], null)
    this.pendingJumps.push({ index, label, opcode })
  }

  public emitGoto(label: string) {
    this.emitJump(Opcode.OP_goto8, label)
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

  public declareLexicalVariable(
    atom: Atom,
    options: { isConst: boolean; isLet: boolean; capture?: boolean; kind?: VarKind }
  ): number {
    const isCaptured = options.capture === true
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

  public getFunctionVar(index: number): Var {
    const variable = this.currentFunction.vars[index]
    if (!variable) {
      throw new Error(`Variable index ${index} is out of bounds`)
    }
    return variable
  }

  public getCurrentFunctionVarCount(): number {
    return this.currentFunction.vars.length
  }

  public getAtomId(name: string): Atom {
    return this.atomTable.getAtomId(name)
  }

  public getBindingInfo(atom: Atom): ReturnType<ScopeManager['getBindingInfo']> {
    return this.scopeManager.getBindingInfo(atom)
  }

  public addFunctionConstant(func: FunctionDef): number {
    return this.currentFunction.addConstant(
      {
        tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE,
        value: func.bytecode,
      },
      { key: null }
    )
  }

  public emitFunctionClosure(constantIndex: number, node?: ts.Node | null) {
    const debugNode = node ?? null
    if (constantIndex <= 0xff) {
      this.emitOpcode(Opcode.OP_fclosure8, [constantIndex], debugNode)
    } else {
      this.emitOpcode(Opcode.OP_fclosure, [constantIndex], debugNode)
    }
  }

  public hasBindingInCurrentScope(atom: Atom): boolean {
    return this.scopeManager.hasBindingInCurrentScope(atom)
  }

  public getLocalVarSlot(atom: Atom): number | undefined {
    return this.localVarIndices.get(atom)
  }

  public isModuleTopLevelScope(): boolean {
    return (
      this.currentFunction.parent === null &&
      this.currentFunction.module !== null &&
      this.scopeManager.currentScope() === this.currentFunction.bodyScope
    )
  }

  private registerClosureVar(atom: Atom, varIndex: number, options: { isConst: boolean; isLet: boolean; capture?: boolean; kind?: VarKind }) {
    if (this.closureVarIndices.has(atom)) return
    const isFunctionDeclaration = options.kind === VarKind.FUNCTION_DECL
    const closureVar = new ClosureVar(atom, {
      isLocal: true,
      isArgument: false,
      isConst: options.isConst,
      isLexical: isFunctionDeclaration ? false : options.isConst || options.isLet,
      kind: isFunctionDeclaration ? VarKind.NORMAL : options.kind ?? VarKind.NORMAL,
      varIndex,
    })
    const closureIndex = this.currentFunction.bytecode.addClosureVar(closureVar)
    this.closureVarIndices.set(atom, closureIndex)
  }

  public emitStoreToLexical(atom: Atom) {
    const slot = this.localVarIndices.get(atom)
    if (slot !== undefined) {
      this.withoutDebugRecording(() => {
        this.emitStoreToLocal(slot)
      })
      return
    }
    const closureIndex = this.closureVarIndices.get(atom)
    if (closureIndex === undefined) {
      throw new Error('Unknown lexical variable')
    }
    this.withoutDebugRecording(() => {
      this.emitPutVarRef(closureIndex)
    })
  }

  private emitModulePrologue() {
    this.withoutDebugRecording(() => {
      this.emitOpcode(Opcode.OP_push_this)
      const conditionalOpcode = env.supportsShortOpcodes ? Opcode.OP_if_false8 : Opcode.OP_if_false
      const skipReturnLabel = this.createLabel()
      this.emitJump(conditionalOpcode, skipReturnLabel)
      const returnIndex = this.emitOpcode(Opcode.OP_return_undef)
      this.moduleHoistInsertionIndex = returnIndex
      this.moduleHoistLabel = skipReturnLabel
      this.markLabel(skipReturnLabel)
    })
  }

  public isGlobalVarContext(): boolean {
    return this.currentFunction.isGlobalVar
  }

  public registerGlobalVar(atom: Atom, options: {
    scopeLevel: number
    isLexical: boolean
    isConst: boolean
    forceInit?: boolean
    funcPoolIndex?: number
  }) {
    if (!this.isGlobalVarContext()) {
      return
    }
    this.currentFunction.addOrUpdateGlobalVar(atom, {
      scopeLevel: options.scopeLevel,
      isLexical: options.isLexical,
      isConst: options.isConst,
      forceInit: options.forceInit,
      funcPoolIndex: options.funcPoolIndex,
    })
  }

  public registerModuleLocalExport(exportedName: Atom, localVarIndex: number) {
    const moduleRecord = this.currentFunction.module
    if (!moduleRecord) {
      return
    }

    const existingIndex = moduleRecord.exportEntries.findIndex((entry) => {
      return entry.type === ModuleExportType.Local && entry.exportedName === exportedName
    })

    const exportEntry: ModuleExportEntryLocal = {
      type: ModuleExportType.Local,
      exportedName,
      localVarIndex,
    }

    if (existingIndex >= 0) {
      moduleRecord.exportEntries[existingIndex] = exportEntry
    } else {
      moduleRecord.exportEntries.push(exportEntry)
    }
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
    const insertionOffset = this.getInstructionOffset(func, insertionIndex)
    this.insertInstructions(func, insertionIndex, hoisted)
    if (func === this.currentFunction) {
      this.moduleHoistInsertionIndex = null
      if (this.moduleHoistLabel) {
        this.moduleHoistLabel = null
      }
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

    instructions.push(...this.buildGlobalHoistInstructions(func))

    return instructions
  }

  private buildGlobalHoistInstructions(func: FunctionDef): Instruction[] {
    if (func.globalVars.length === 0) {
      return []
    }

    const instructions: Instruction[] = []
    const closureIndexByAtom = new Map<Atom, number>()
    for (let index = 0; index < func.bytecode.closureVars.length; index++) {
      const closureVar = func.bytecode.closureVars[index]
      closureIndexByAtom.set(closureVar.name, index)
    }

    const varEnvIndex = closureIndexByAtom.get(JSAtom.JS_ATOM__var_)
    const argVarEnvIndex = closureIndexByAtom.get(JSAtom.JS_ATOM__arg_var_)
    const isModule = Boolean(func.module)

    for (const globalVar of func.globalVars) {
      let hasClosure = 0
      let closureIndex: number | undefined
      let envIndex: number | undefined
      let forceInit = globalVar.forceInit

      if (closureIndexByAtom.has(globalVar.name)) {
        hasClosure = 2
        closureIndex = closureIndexByAtom.get(globalVar.name)
        forceInit = false
      } else if (varEnvIndex !== undefined) {
        hasClosure = 1
        envIndex = varEnvIndex
        forceInit = true
      } else if (argVarEnvIndex !== undefined) {
        hasClosure = 1
        envIndex = argVarEnvIndex
        forceInit = true
      }

      if (hasClosure === 1 && envIndex !== undefined) {
        instructions.push(this.buildGetVarRefInstruction(envIndex))
      }

      let flags = isModule ? JS_PROP_CONFIGURABLE : 0
      if (globalVar.isLexical) {
        flags |= DEFINE_GLOBAL_LEX_VAR
        if (!globalVar.isConst) {
          flags |= JS_PROP_WRITABLE
        }
      }

      if (globalVar.isLexical && hasClosure === 2 && closureIndex !== undefined) {
        // Lexical bindings captured in the module scope are handled via closure hoisting.
        // QuickJS does not emit additional global definitions for these entries.
        continue
      }

      const skipGlobalDefine = hasClosure === 2 && closureIndex !== undefined

      if (!skipGlobalDefine) {
        if (globalVar.funcPoolIndex >= 0 && !globalVar.isLexical) {
          instructions.push(this.buildFclosureInstruction(globalVar.funcPoolIndex))
          instructions.push(this.buildDefineFuncInstruction(globalVar.name, flags))
        } else {
          instructions.push({ opcode: Opcode.OP_define_var, operands: [globalVar.name, flags] })
        }
      }

      if (globalVar.funcPoolIndex >= 0 || forceInit) {
        if (globalVar.funcPoolIndex >= 0) {
          instructions.push(this.buildFclosureInstruction(globalVar.funcPoolIndex))
          if (globalVar.name === JSAtom.JS_ATOM__default_) {
            instructions.push({ opcode: Opcode.OP_set_name, operands: [JSAtom.JS_ATOM_default] })
          }
        } else {
          instructions.push({ opcode: Opcode.OP_undefined, operands: [] })
        }

        if (hasClosure === 2 && closureIndex !== undefined) {
          instructions.push(this.buildPutClosureInstruction(closureIndex))
        } else if (hasClosure === 1) {
          instructions.push({ opcode: Opcode.OP_define_field, operands: [globalVar.name] })
          instructions.push({ opcode: Opcode.OP_drop, operands: [] })
        } else {
          instructions.push({ opcode: Opcode.OP_put_var, operands: [globalVar.name] })
        }
      }
    }

    return instructions
  }

  private buildPutClosureInstruction(index: number): Instruction {
    const shortOpcode = getIndexedOpcode('OP_put_var_ref', index)
    if (shortOpcode !== undefined) {
      return { opcode: shortOpcode, operands: [] }
    }
    return { opcode: Opcode.OP_put_var_ref, operands: [index] }
  }

  private buildGetVarRefInstruction(index: number): Instruction {
    const shortOpcode = getIndexedOpcode('OP_get_var_ref', index)
    if (shortOpcode !== undefined) {
      return { opcode: shortOpcode, operands: [] }
    }
    return { opcode: Opcode.OP_get_var_ref, operands: [index] }
  }

  private buildFclosureInstruction(constantIndex: number): Instruction {
    if (env.supportsShortOpcodes && constantIndex <= 0xff) {
      return { opcode: Opcode.OP_fclosure8, operands: [constantIndex] }
    }
    return { opcode: Opcode.OP_fclosure, operands: [constantIndex] }
  }

  private buildDefineFuncInstruction(atom: Atom, flags: number): Instruction {
    return { opcode: Opcode.OP_define_func, operands: [atom, flags] }
  }

  private buildStoreToLocalInstruction(slot: number): Instruction {
    const shortOpcode = slot <= 3 ? getIndexedOpcode('OP_put_loc', slot) : undefined
    if (shortOpcode !== undefined) {
      return { opcode: shortOpcode, operands: [] }
    }
    if (env.supportsShortOpcodes && slot <= 0xff) {
      return { opcode: Opcode.OP_put_loc8, operands: [slot] }
    }
    return { opcode: Opcode.OP_put_loc, operands: [slot] }
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
      if (entry.instructionIndex >= index) {
        entry.instructionIndex += instructions.length
      }
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

  public emitInstruction(
    opcode: Opcode,
    operands: number[] = [],
    node?: ts.Node | null,
    debugOptions?: EmitDebugInfoOptions
  ): number {
    return this.emitOpcode(opcode, operands, node, debugOptions)
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

  const instructionIndex = this.currentFunction.bytecode.instructions.length
  const recordNode = node === null ? null : node ?? this.currentStatementNode ?? this.currentSourceNode
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:emit', {
        opcode: Opcode[opcode],
        offset: this.currentOffset,
        instructionIndex,
        recordNodeKind: recordNode ? ts.SyntaxKind[recordNode.kind] : null,
        currentStatementKind: this.currentStatementNode ? ts.SyntaxKind[this.currentStatementNode.kind] : null,
        currentSourceKind: this.currentSourceNode ? ts.SyntaxKind[this.currentSourceNode.kind] : null,
        hasDebugOptions: debugOptions?.tsSourcePos !== undefined,
        suppress: this.suppressDebugRecording,
      })
    }
    if (!this.suppressDebugRecording && (recordNode || debugOptions?.tsSourcePos !== undefined)) {
      let tsSourcePos = debugOptions?.tsSourcePos
      if (tsSourcePos === undefined && recordNode) {
        tsSourcePos = recordNode.getStart(this.sourceFile, false)
      }
      if (tsSourcePos !== undefined && tsSourcePos >= 0) {
        const sourcePos = this.toUtf8Offset(tsSourcePos)
        const statementNode = this.currentStatementNode
        const isStatementRecord = debugOptions?.tsSourcePos === undefined && node === undefined && recordNode === statementNode
        if (!this.recordedStatementPositions.has(sourcePos)) {
          let { line, column } = this.getLineColumnFromUtf8Offset(sourcePos)
          if (process.env.DEBUG_PC2LINE === '1') {
            console.log('pc2line:record', {
              offset: this.currentOffset,
              instructionIndex,
              opcode: Opcode[opcode],
              nodeKind: recordNode ? ts.SyntaxKind[recordNode.kind] : null,
              isStatementRecord,
              tsSourcePos,
              sourcePos,
              line,
              column,
            })
          }
          this.currentFunction.bytecode.recordLineNumber(this.currentOffset, line, column, sourcePos, instructionIndex)
          this.recordedStatementPositions.add(sourcePos)
          if (!isStatementRecord && statementNode && recordNode === statementNode) {
            const statementStart = statementNode.getStart(this.sourceFile, false)
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

    this.currentFunction.bytecode.pushOpcode(opcode, operands)
    this.instructionOffsets[instructionIndex] = this.currentOffset
    this.currentOffset += def.size
    return instructionIndex
  }

  private recordDebugPoint(node: ts.Node) {
    if (this.suppressDebugRecording) {
      return
    }
    const tsSourcePos = node.getStart(this.sourceFile, false)
    if (tsSourcePos < 0) {
      return
    }
    const sourcePos = this.toUtf8Offset(tsSourcePos)
    if (this.recordedStatementPositions.has(sourcePos)) {
      return
    }
    const { line, column } = this.getLineColumnFromUtf8Offset(sourcePos)
    const instructionIndex = this.currentFunction.bytecode.instructions.length
    this.currentFunction.bytecode.recordLineNumber(this.currentOffset, line, column, sourcePos, instructionIndex)
    this.recordedStatementPositions.add(sourcePos)
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

  public pushScope(kind: ScopeKind = ScopeKind.Block) {
    const scopeIndex = this.scopeManager.enterScope(kind)
    if (!this.lexicalInitByScope.has(scopeIndex)) {
      this.lexicalInitByScope.set(scopeIndex, {
        insertionIndex: this.currentFunction.bytecode.instructions.length,
      })
    }
  }

  public popScope() {
    const popped = this.scopeManager.leaveScope()
    if (popped !== undefined) {
      this.lexicalInitByScope.delete(popped)
    }
  }

  private buildDebugInfo(func: FunctionDef) {
    const instructions = func.bytecode.instructions
    const instructionOffsets: number[] = new Array(instructions.length)
    let runningOffset = 0
    for (let index = 0; index < instructions.length; index += 1) {
      instructionOffsets[index] = runningOffset
      runningOffset += this.getInstructionSize(instructions[index])
    }

    const sortedEntries = [...func.bytecode.lineNumberTable]
      .filter((entry) => entry.sourcePos >= 0)
      .map((entry) => {
        const actualPc = entry.instructionIndex < instructionOffsets.length ? instructionOffsets[entry.instructionIndex] : entry.pc
        return {
          pc: actualPc,
          line: entry.line,
          column: entry.column,
          sourcePos: entry.sourcePos,
        }
      })
      .sort((a, b) => a.pc - b.pc)

    const baseSourcePos = func.sourcePos ?? 0
    const baseLinePos = this.getLineColumnFromUtf8Offset(baseSourcePos)

    const combinedEntries: typeof sortedEntries = [
      {
        pc: 0,
        line: baseLinePos.line,
        column: baseLinePos.column,
        sourcePos: baseSourcePos,
      },
      ...sortedEntries,
    ]

    const normalized: typeof combinedEntries = []
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:rawTable', combinedEntries.map((entry) => ({ ...entry })))
    }
    for (const entry of combinedEntries) {
      const previous = normalized[normalized.length - 1]
      if (previous) {
        if (entry.sourcePos === previous.sourcePos && entry.pc === previous.pc) {
          continue
        }
        if (previous.line === entry.line && previous.column === entry.column) {
          continue
        }
        if (previous.sourcePos === entry.sourcePos) {
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

    const pc2line: number[] = []
    const pc2column: number[] = []
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:lineNumberTable', normalized.map((entry) => ({ ...entry })))
    }

    const first = normalized[0]
    // QuickJS stores zero-based line/column values directly in the pc2line stream.
    const firstLine = first.line
    const firstColumn = first.column
    pc2line.push(...this.encodeULEB128(firstLine))
    pc2line.push(...this.encodeULEB128(firstColumn))
    pc2column.push(...this.encodeULEB128(firstColumn))

    let lastPc = first.pc
    let lastLine = firstLine
    let lastColumn = firstColumn

    for (let index = 1; index < normalized.length; index++) {
      const entry = normalized[index]
      if (entry.pc < lastPc) {
        continue
      }
      const diffPc = entry.pc - lastPc
      const currentLine = entry.line
      const diffLine = currentLine - lastLine
      const currentColumn = entry.column
      const diffColumn = currentColumn - lastColumn

      if (diffLine === 0 && diffColumn === 0) {
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
      lastLine = currentLine
      lastColumn = currentColumn
    }

    func.bytecode.pc2line = pc2line
    func.bytecode.pc2column = pc2column
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:encoded', pc2line)
    }
    func.bytecode.source = ''
    func.bytecode.sourceLength = 0
  }

  private finalizeFunction(func: FunctionDef) {
    const funcName = this.atomTable.getAtomString(func.bytecode.name)
    func.bytecode.constantPool = func.getConstantPoolEntries()
    pruneUnusedClosureVars(
      {
        atomTable: this.atomTable,
        closureVarIndices: this.closureVarIndices,
      },
      func
    )
    const lexicalVars = func.vars.filter((variable) => !variable.isCaptured)
    for (const variable of lexicalVars) {
      if (variable.scopeLevel >= 0) {
        variable.scopeLevel = this.remapScopeLevel(func, variable.scopeLevel)
      }
    }
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
    let encoded = ((value << 1) ^ (value >> 31)) >>> 0
    do {
      let byte = encoded & 0x7f
      encoded >>>= 7
      if (encoded !== 0) {
        byte |= 0x80
      }
      result.push(byte)
    } while (encoded !== 0)
    return result
  }

  public getPropertyAccessOperatorPos(node: ts.PropertyAccessExpression): number | undefined {
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

  public getCallExpressionOpenParenPos(node: ts.CallExpression): number | undefined {
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

  public getNewExpressionOpenParenPos(node: ts.NewExpression): number | undefined {
    if (!node.arguments || node.arguments.length === 0) {
      return undefined
    }
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

  private collectStripSegments(
    source: string,
    pattern: RegExp,
    segments: Array<{ start: number; end: number; replacement: string }>,
    replacement = ''
  ) {
    pattern.lastIndex = 0
    for (const match of source.matchAll(pattern)) {
      const index = match.index ?? 0
      const text = match[0]
      if (!text) continue
      segments.push({ start: index, end: index + text.length, replacement })
    }
  }

  private collectEmptyStatementNewlineSegments(
    source: string,
    segments: Array<{ start: number; end: number; replacement: string }>
  ) {
    const visit = (node: ts.Node) => {
      if (ts.isEmptyStatement(node)) {
        const start = node.getStart(this.sourceFile, false)
        const end = node.end
        if (start >= 0 && end > start && end <= source.length) {
          let cursor = end
          let hasLineBreak = false
          while (cursor < source.length) {
            const code = source.charCodeAt(cursor)
            if (this.isLineTerminator(code)) {
              hasLineBreak = true
              break
            }
            if (!this.isWhitespaceChar(code)) {
              break
            }
            cursor += 1
          }
          if (!hasLineBreak) {
            const text = source.slice(start, end)
            const replacement = `${text}\n`
            segments.push({ start, end, replacement })
          }
        }
      }
      ts.forEachChild(node, visit)
    }

    visit(this.sourceFile)
  }

  public shouldSuppressTopLevelInitializerDebug(initializer?: ts.Expression): boolean {
    if (!initializer) {
      return true
    }

    while (ts.isParenthesizedExpression(initializer)) {
      initializer = initializer.expression
    }

    if (ts.isLiteralExpression(initializer)) {
      return true
    }

    if (ts.isArrayLiteralExpression(initializer)) {
      if (initializer.elements.some((element) => ts.isOmittedExpression(element) || ts.isSpreadElement(element))) {
        return false
      }
      return initializer.elements
        .filter((element): element is ts.Expression => !ts.isOmittedExpression(element) && !ts.isSpreadElement(element))
        .every((element) => this.shouldSuppressTopLevelInitializerDebug(element))
    }

    if (ts.isObjectLiteralExpression(initializer)) {
      for (const property of initializer.properties) {
        if (ts.isPropertyAssignment(property)) {
          const name = property.name
          if (!name || ts.isComputedPropertyName(name) || ts.isPrivateIdentifier(name)) {
            return false
          }
          if (!property.initializer) {
            return false
          }
          if (!this.shouldSuppressTopLevelInitializerDebug(property.initializer)) {
            return false
          }
          continue
        }

        if (ts.isShorthandPropertyAssignment(property)) {
          const name = property.name
          if (!name || ts.isPrivateIdentifier(name)) {
            return false
          }
          if (!this.shouldSuppressTopLevelInitializerDebug(name)) {
            return false
          }
          continue
        }

        return false
      }
      return true
    }

    switch (initializer.kind) {
      case ts.SyntaxKind.TrueKeyword:
      case ts.SyntaxKind.FalseKeyword:
      case ts.SyntaxKind.NullKeyword:
        return true
      default:
        break
    }

    if (ts.isIdentifier(initializer)) {
      return true
    }

    if (ts.isPrefixUnaryExpression(initializer)) {
      switch (initializer.operator) {
        case ts.SyntaxKind.PlusToken:
        case ts.SyntaxKind.MinusToken:
          return this.shouldSuppressTopLevelInitializerDebug(initializer.operand)
        default:
          return false
      }
    }

    return false
  }

  private computeDebugSourceMapping(
    source: string,
    referenceJsSource?: string | null
  ): {
    strippedSource: string
    normalizedPosByPos: Uint32Array
    columnAdjustments: Map<number, ColumnAdjustment[]>
  } {
    const segments: Array<{ start: number; end: number; replacement: string }> = []
    this.collectStripSegments(source, /(?<=\b[_$a-zA-Z][_$0-9a-zA-Z]*)[ \t]*:(?![ \t]*\()[ \t]*[^=;,){}\r\n]+(?=\s*[,)])/g, segments)
    this.collectStripSegments(source, /:[ \t]*(?!\()[ \t]*[^=;,){}\r\n]+(?=\s*[=;,){}])/g, segments)
    this.removeObjectPropertyAssignmentSegments(source, segments)
    this.collectStripSegments(source, /<\s*[^>]+\s*>/g, segments)
    this.collectStripSegments(source, /\b(interface|type)\s+\w+\s*=\s*[^;]+;?/g, segments)
    this.collectStripSegments(source, /\s+as\s+const\b/g, segments)

    if (referenceJsSource !== undefined && referenceJsSource !== null) {
      this.collectBlankLineAlignmentSegments(source, referenceJsSource, segments)
    } else {
      this.collectCollapsedBlankLineSegments(source, segments)
    }


    segments.sort((a, b) => a.start - b.start)

    const merged: Array<{ start: number; end: number; replacement: string }> = []
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
        if (!last.replacement && segment.replacement) {
          last.replacement = segment.replacement
        }
        continue
      }
      merged.push({ start, end, replacement: segment.replacement })
    }

    const normalizedPosByPos = new Uint32Array(source.length + 1)
    const builder: string[] = []
    let removedSoFar = 0
    let segmentIndex = 0
    let current = merged[segmentIndex]

    for (let pos = 0; pos <= source.length; pos++) {
      while (current && pos >= current.end) {
        const replacementLength = current.replacement.length
        removedSoFar += (current.end - current.start) - replacementLength
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

      if (current && pos === current.start && current.replacement.length > 0) {
        builder.push(current.replacement)
      }

      if (!(current && pos >= current.start && pos < current.end)) {
        builder.push(source.charAt(pos))
      }
    }

    const strippedSource = builder.join('')
    const columnAdjustments = this.computeColumnAdjustmentsFromSegments(source, strippedSource, normalizedPosByPos, merged)
    return { strippedSource, normalizedPosByPos, columnAdjustments }
  }

  private computeColumnAdjustmentsFromSegments(
    originalSource: string,
    strippedSource: string,
    normalizedPosByPos: Uint32Array,
    segments: Array<{ start: number; end: number; replacement: string }>
  ): Map<number, ColumnAdjustment[]> {
    const adjustments = new Map<number, ColumnAdjustment[]>()
    if (segments.length === 0) {
      return adjustments
    }

    const lineStarts = this.collectLineStartOffsets(strippedSource)

    for (const segment of segments) {
      const removedLength = segment.end - segment.start
      const replacementLength = segment.replacement.length
      const delta = removedLength - replacementLength
      if (delta <= 0) {
        continue
      }

      const removedText = originalSource.slice(segment.start, segment.end)
      if (removedText.includes('\n')) {
        continue
      }

      const normalizedStart = normalizedPosByPos[segment.start]
      const { line, column } = this.getLineColumnFromStrippedOffset(strippedSource, lineStarts, normalizedStart)
      this.addColumnAdjustment(adjustments, line, column, delta)
    }

    this.sortColumnAdjustments(adjustments)
    return adjustments
  }

  private computeReferenceColumnAdjustments(
    strippedSource: string,
    referenceJsSource?: string | null
  ): Map<number, ColumnAdjustment[]> {
    const adjustments = new Map<number, ColumnAdjustment[]>()
    if (referenceJsSource === null) {
      return adjustments
    }

    let comparisonJs: string | undefined
    if (typeof referenceJsSource === 'string') {
      comparisonJs = referenceJsSource
    } else {
      try {
        const result = ts.transpileModule(this.sourceCode, {
          fileName: this.fileName,
          reportDiagnostics: false,
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2020,
            jsx: ts.JsxEmit.Preserve,
            importHelpers: false,
            esModuleInterop: false,
          },
        })
        comparisonJs = result.outputText ?? undefined
      } catch {
        comparisonJs = undefined
      }
    }

    if (!comparisonJs) {
      return adjustments
    }

    const originalLines = strippedSource.split(/\r?\n/)
    const comparisonLines = comparisonJs.split(/\r?\n/)
    const limit = Math.min(originalLines.length, comparisonLines.length)

    for (let lineIndex = 0; lineIndex < limit; lineIndex += 1) {
      const originalLine = originalLines[lineIndex]
      const comparisonLine = comparisonLines[lineIndex]
      const originalTrimmed = originalLine.trimStart()
      const comparisonTrimmed = comparisonLine.trimStart()
      if (originalTrimmed.length === 0 || comparisonTrimmed.length === 0) {
        continue
      }
      if (originalTrimmed.charCodeAt(0) !== comparisonTrimmed.charCodeAt(0)) {
        continue
      }

      const originalIndent = this.countLeadingColumns(originalLine)
      const comparisonIndent = this.countLeadingColumns(comparisonLine)
      const delta = comparisonIndent - originalIndent
      if (delta !== 0) {
        this.addColumnAdjustment(adjustments, lineIndex, originalIndent, delta)
      }
    }

    this.sortColumnAdjustments(adjustments)
    return adjustments
  }

  private collectLineStartOffsets(text: string): number[] {
    const starts: number[] = [0]
    for (let index = 0; index < text.length; index += 1) {
      if (text.charCodeAt(index) === 0x0a) {
        starts.push(index + 1)
      }
    }
    return starts
  }

  private getLineColumnFromStrippedOffset(
    text: string,
    lineStarts: number[],
    offset: number
  ): { line: number; column: number } {
    const clampedOffset = Math.max(0, Math.min(offset, text.length))
    let line = 0
    while (line + 1 < lineStarts.length && lineStarts[line + 1] <= clampedOffset) {
      line += 1
    }

    const lineStart = lineStarts[line]
    let column = 0
    for (let index = lineStart; index < clampedOffset; ) {
      const codePoint = text.codePointAt(index) ?? 0
      column += 1
      index += codePoint > 0xffff ? 2 : 1
    }

    return { line, column }
  }

  private addColumnAdjustment(
    map: Map<number, ColumnAdjustment[]>,
    line: number,
    startColumn: number,
    delta: number
  ) {
    if (!map.has(line)) {
      map.set(line, [])
    }
    map.get(line)!.push({ startColumn, delta })
  }

  private sortColumnAdjustments(map: Map<number, ColumnAdjustment[]>) {
    for (const entries of map.values()) {
      entries.sort((a, b) => a.startColumn - b.startColumn)
    }
  }

  private mergeColumnAdjustments(extra: Map<number, ColumnAdjustment[]>) {
    for (const [line, entries] of extra) {
      if (!this.columnAdjustments.has(line)) {
        this.columnAdjustments.set(line, [...entries])
        continue
      }
      const target = this.columnAdjustments.get(line)!
      target.push(...entries)
      target.sort((a, b) => a.startColumn - b.startColumn)
    }
  }

  private removeObjectPropertyAssignmentSegments(
    source: string,
    segments: Array<{ start: number; end: number; replacement: string }>
  ) {
    const indicesToRemove = new Set<number>()

    const visit = (node: ts.Node) => {
      if (ts.isObjectLiteralExpression(node)) {
        for (const property of node.properties) {
          if (!ts.isPropertyAssignment(property)) {
            continue
          }
          if (!ts.isIdentifier(property.name) && !ts.isStringLiteral(property.name) && !ts.isNumericLiteral(property.name)) {
            continue
          }
          if (!property.initializer) {
            continue
          }
          const nameEnd = property.name.getEnd()
          const initializerStart = property.initializer.getStart(this.sourceFile, false)
          if (initializerStart <= nameEnd) {
            continue
          }
          const colonIndex = source.indexOf(':', nameEnd)
          if (colonIndex < 0 || colonIndex >= initializerStart) {
            continue
          }
          for (let index = 0; index < segments.length; index += 1) {
            const segment = segments[index]
            if (segment.start <= colonIndex && colonIndex < segment.end) {
              indicesToRemove.add(index)
            }
          }
        }
      }
      ts.forEachChild(node, visit)
    }

    visit(this.sourceFile)

    if (indicesToRemove.size === 0) {
      return
    }

    const filtered: typeof segments = []
    for (let index = 0; index < segments.length; index += 1) {
      if (!indicesToRemove.has(index)) {
        filtered.push(segments[index])
      }
    }
    segments.length = 0
    segments.push(...filtered)
  }

  private countLeadingColumns(line: string): number {
    let columns = 0
    for (let index = 0; index < line.length; index += 1) {
      const code = line.charCodeAt(index)
      if (code === 0x20) {
        columns += 1
        continue
      }
      if (code === 0x09) {
        columns += 1
        continue
      }
      if (code === 0x0d || code === 0x0a) {
        continue
      }
      break
    }
    return columns
  }

  private adjustColumnForTranspiled(line: number, column: number): number {
    const entries = this.columnAdjustments.get(line)
    if (!entries) {
      return 0
    }
    let delta = 0
    for (const entry of entries) {
      if (column < entry.startColumn) {
        break
      }
      delta += entry.delta
    }
    return delta
  }

  private collectCollapsedBlankLineSegments(
    source: string,
    segments: Array<{ start: number; end: number; replacement: string }>
  ) {
    const pattern = /(\r?\n)(?:\s*\r?\n)+/g
    for (const match of source.matchAll(pattern)) {
      const index = match.index ?? 0
      const text = match[0]
      if (!text) continue
      const newline = match[1] ?? '\n'
      const entry = { start: index, end: index + text.length, replacement: newline }
      segments.push(entry)
    }
  }

  private collectBlankLineAlignmentSegments(
    source: string,
    referenceJsSource: string,
    segments: Array<{ start: number; end: number; replacement: string }>
  ) {
    const originalLines = this.getLineInfos(source)
    const referenceLines = this.getLineInfos(referenceJsSource)

    let refIndex = 0
    const collapseLineIndices: number[] = []

    for (let lineIndex = 0; lineIndex < originalLines.length; lineIndex += 1) {
      const line = originalLines[lineIndex]
      const isBlank = line.text.trim().length === 0
      const refLine = refIndex < referenceLines.length ? referenceLines[refIndex] : undefined
      const refIsBlank = refLine ? refLine.text.trim().length === 0 : false

      if (isBlank) {
        if (refLine && refIsBlank) {
          refIndex += 1
        } else {
          collapseLineIndices.push(lineIndex)
        }
      } else if (refIndex < referenceLines.length) {
        refIndex += 1
      }
    }

    if (collapseLineIndices.length === 0) {
      return
    }

    const ranges: Array<{ start: number; end: number }> = []
    let rangeStart = collapseLineIndices[0]
    let rangeEnd = collapseLineIndices[0]
    for (let index = 1; index < collapseLineIndices.length; index += 1) {
      const current = collapseLineIndices[index]
      if (current === rangeEnd + 1) {
        rangeEnd = current
      } else {
        ranges.push({ start: rangeStart, end: rangeEnd })
        rangeStart = current
        rangeEnd = current
      }
    }
    ranges.push({ start: rangeStart, end: rangeEnd })

    for (const range of ranges) {
      const startLine = range.start
      const endLine = range.end

      const previousLine = startLine > 0 ? originalLines[startLine - 1] : undefined
      const finalLine = originalLines[endLine]

      let segmentStart: number
      let replacement = ''

      if (previousLine) {
        segmentStart = previousLine.start + previousLine.text.length
        replacement = previousLine.newline
      } else {
        segmentStart = originalLines[startLine].start
      }

      const segmentEnd = finalLine.start + finalLine.text.length + finalLine.newline.length

      if (segmentEnd <= segmentStart) {
        continue
      }

      segments.push({ start: segmentStart, end: segmentEnd, replacement })
    }
  }

  private getLineInfos(text: string): Array<{ start: number; text: string; newline: string }> {
    const lines = text.split(/\r?\n/)
    const newlineValues: string[] = []
    for (let index = 0; index < text.length; ) {
      const code = text.charCodeAt(index)
      if (code === 0x0d) {
        if (index + 1 < text.length && text.charCodeAt(index + 1) === 0x0a) {
          newlineValues.push('\r\n')
          index += 2
        } else {
          newlineValues.push('\r')
          index += 1
        }
        continue
      }
      if (code === 0x0a) {
        newlineValues.push('\n')
        index += 1
        continue
      }
      index += 1
    }

    const infos: Array<{ start: number; text: string; newline: string }> = []
    let offset = 0
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const textPart = lines[lineIndex] ?? ''
      const newline = newlineValues[lineIndex] ?? ''
      infos.push({ start: offset, text: textPart, newline })
      offset += textPart.length + newline.length
    }

    if (lines.length === 0) {
      infos.push({ start: 0, text: '', newline: '' })
    }

    return infos
  }

  public withoutDebugRecording<T>(fn: () => T): T {
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
      column = cache.rawColumn
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
    this.lineColCache = { offset: clampedOffset, line, rawColumn: column }

    const adjustment = this.adjustColumnForTranspiled(line, column)
    const adjustedColumn = column + adjustment
    return {
      line,
      column: adjustedColumn < 0 ? 0 : adjustedColumn,
    }
  }

  private findLineStartUtf8Offset(offset: number): number {
    let current = offset
    while (current > 0) {
      const byte = this.sourceUtf8[current - 1]
      if (byte === 0x0a) {
        break
      }
      if (byte >= 0x80 && byte < 0xc0) {
        current -= 1
        continue
      }
      current -= 1
    }
    return current
  }

  private shouldAdjustStatementIndent(statement: ts.Node): boolean {
    return (
      ts.isExpressionStatement(statement) ||
      ts.isReturnStatement(statement) ||
      ts.isVariableStatement(statement) ||
      ts.isIfStatement(statement) ||
      ts.isWhileStatement(statement) ||
      ts.isDoStatement(statement) ||
      ts.isForStatement(statement) ||
      ts.isForInStatement(statement) ||
      ts.isForOfStatement(statement) ||
      ts.isSwitchStatement(statement) ||
      ts.isThrowStatement(statement)
    )
  }

  private computeIndentColumnsFromUtf8Offset(offset: number): number {
    let indent = 0
    for (let index = offset; index < this.sourceUtf8.length; index += 1) {
      const byte = this.sourceUtf8[index]
      if (byte === 0x20) {
        indent += 1
        continue
      }
      if (byte === 0x09) {
        indent += 1
        continue
      }
      if (byte === 0x0d) {
        continue
      }
      break
    }
    return indent
  }

  private remapScopeLevel(func: FunctionDef, scopeLevel: number): number {
    if (scopeLevel < 0 || scopeLevel >= func.scopes.length) {
      return scopeLevel
    }
    let adjusted = scopeLevel
    let current = scopeLevel
    while (current >= 0) {
      const scope = func.scopes[current]
      if (!scope) {
        break
      }
      if (scope.kind === ScopeKind.Parameter) {
        adjusted -= 1
      }
      current = scope.parent
    }
    return adjusted
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