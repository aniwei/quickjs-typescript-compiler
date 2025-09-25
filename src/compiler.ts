import path from 'node:path'
import * as ts from 'typescript'
import { Atom, AtomTable } from './atoms'
import { FunctionDef, createEmptyModuleRecord } from './functionDef'
import { FunctionBytecode, type Instruction } from './functionBytecode'
import { ScopeManager } from './scopeManager'
import { Var, VarKind, ClosureVar } from './vars'
import { Opcode, OPCODE_DEFS, OpFormat, PC2Line, type OpcodeDefinition } from './env'

const PC2LINE_BASE = PC2Line.PC2LINE_BASE
const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

export interface CompilerOptions {
  atomTable?: AtomTable
}

export class Compiler {
  private readonly sourceFile: ts.SourceFile
  private readonly program: ts.Program
  private readonly checker: ts.TypeChecker

  private readonly atomTable: AtomTable
  private currentFunction!: FunctionDef
  private scopeManager!: ScopeManager
  private readonly opcodeInfoByCode = new Map<number, OpcodeDefinition>()
  private readonly closureVarIndices = new Map<Atom, number>()
  private readonly localVarIndices = new Map<Atom, number>()
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
  private lineColCache = { offset: 0, line: 0, column: 0 }
  private readonly recordedStatementPositions = new Set<number>()

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

    const opcodeEnum = Opcode as unknown as Record<string, number>
    for (const [key, def] of Object.entries(OPCODE_DEFS)) {
      const opcodeValue = opcodeEnum[key]
      if (typeof opcodeValue === 'number') {
        this.opcodeInfoByCode.set(opcodeValue, def)
      }
    }

    const encoder = new TextEncoder()
    this.sourceUtf8 = encoder.encode(this.sourceCode)
    this.utf8OffsetByPos = new Uint32Array(this.sourceCode.length + 1)
    let utf8Offset = 0
    let index = 0
    this.utf8OffsetByPos[0] = 0
    while (index < this.sourceCode.length) {
      const codePoint = this.sourceCode.codePointAt(index) ?? 0
      const step = codePoint > 0xffff ? 2 : 1
      utf8Offset += this.getUtf8ByteLength(codePoint)
      for (let j = 1; j <= step; j++) {
        const target = index + j
        if (target <= this.sourceCode.length) {
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

    const relativePath = path.relative(process.cwd(), this.fileName) || this.fileName
    const moduleFileName = relativePath.replace(/\.ts$/i, '.js')
    this.moduleAtom = this.atomTable.getAtomId(moduleFileName)
    if (!rootFunction.module) {
      rootFunction.module = createEmptyModuleRecord()
    }
    rootFunction.module.moduleName = this.moduleAtom

    rootFunction.bytecode.jsMode = 1
    rootFunction.bytecode.funcKind = 2 // JS_FUNC_ASYNC
    rootFunction.bytecode.argumentsAllowed = true
    rootFunction.bytecode.hasSimpleParameterList = false
    rootFunction.bytecode.hasDebug = true
    rootFunction.bytecode.filename = this.moduleAtom

    this.pushScope()
    this.withStatementNode(this.sourceFile, () => {
      this.emitModulePrologue()
    })
    ts.forEachChild(this.sourceFile, (node) => this.visitNode(node))
    this.withStatementNode(this.sourceFile, () => {
      this.emitOpcode(Opcode.OP_undefined)
      this.emitOpcode(Opcode.OP_return_async)
    })
    this.popScope()

    this.resolvePendingJumps()

    const lexicalVars = rootFunction.vars.filter((variable) => !variable.isCaptured)
    rootFunction.bytecode.setVarDefs(lexicalVars)
    rootFunction.bytecode.setArgDefs(rootFunction.args)
    rootFunction.bytecode.stackSize = this.computeStackSize(rootFunction.bytecode)
    this.buildDebugInfo(rootFunction)
    rootFunction.bytecode.argCount = rootFunction.args.length
    rootFunction.bytecode.definedArgCount = rootFunction.definedArgCount
    return rootFunction
  }

  private resetCodegenState() {
    this.closureVarIndices.clear()
    this.localVarIndices.clear()
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
    const sourcePos = this.toUtf8Offset(tsSourcePos)
    if (this.recordedStatementPositions.has(sourcePos)) return
    const { line, column } = this.getLineColumnFromUtf8Offset(sourcePos)
    this.currentFunction.bytecode.recordLineNumber(this.currentOffset, line, column, sourcePos)
    this.recordedStatementPositions.add(sourcePos)
  }

  private visitNode(node: ts.Node): void {
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

        const varIndex = this.declareLexicalVariable(atom, { isConst, isLet })
        this.bindCurrentScope(varIndex)

        if (declaration.initializer) {
          this.compileExpression(declaration.initializer)
        } else if (isConst || isLet) {
          // Lexical declarations without initializer are initialized to undefined
          this.emitOpcode(Opcode.OP_undefined)
        }

        if (isConst || isLet) {
          this.emitStoreToClosure(atom)
        } else {
          // var declarations: TODO
          throw new Error('var declarations are not implemented yet')
        }
      })
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

  private compileBlock(node: ts.Block) {
    for (const statement of node.statements) {
      this.visitNode(statement)
    }
  }

  private compileExpressionStatement(node: ts.ExpressionStatement) {
    this.compileExpression(node.expression)
    this.emitOpcode(Opcode.OP_drop)
  }
  private compileForOfStatement(node: ts.ForOfStatement) {
    if (node.awaitModifier) {
      throw new Error('for await is not supported yet')
    }

    this.pushScope()

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

    const loopVarIndex = this.declareLexicalVariable(atom, { isConst, isLet, capture: false })
    const loopVarSlot = this.localVarIndices.get(atom)!
    this.bindCurrentScope(loopVarIndex)
    this.emitSetLocalUninitialized(loopVarSlot)

    this.compileExpression(node.expression)
    this.emitOpcode(Opcode.OP_for_of_start)

    const labelBody = this.createLabel()
    const labelCheck = this.createLabel()

    this.emitJump(Opcode.OP_goto8, labelCheck)

    this.markLabel(labelBody)
  this.emitStoreToLocal(loopVarSlot)

    if (ts.isBlock(node.statement)) {
      this.compileBlock(node.statement)
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
    this.emitOpcode(Opcode.OP_get_field2, [propertyAtom], propertyAccess.name)

    for (const arg of expression.arguments) {
      this.withSourceNode(arg, () => this.compileExpression(arg))
    }

    this.emitOpcode(Opcode.OP_call_method, [expression.arguments.length], expression)
  }

  private emitLoadIdentifier(identifier: ts.Identifier) {
    const atom = this.atomTable.getAtomId(identifier.text)
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
      const def = this.opcodeInfoByCode.get(pending.opcode)
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

  private declareLexicalVariable(atom: Atom, options: { isConst: boolean; isLet: boolean; capture?: boolean }): number {
    const isCaptured = options.capture !== false
    const variable = new Var(atom, {
      isConst: options.isConst,
      isLexical: true,
      isCaptured,
      kind: VarKind.NORMAL,
      scopeLevel: this.scopeManager.currentScope(),
    })
    const varIndex = this.currentFunction.addVar(variable)
    if (isCaptured) {
      this.registerClosureVar(atom, varIndex, options)
    } else {
      const slot = this.nextLocalSlot++
      variable.funcPoolIndex = slot
      this.localVarIndices.set(atom, slot)
    }
    return varIndex
  }

  private bindCurrentScope(index: number) {
    this.scopeManager.bindVarToCurrentScope(index)
  }

  private registerClosureVar(atom: Atom, varIndex: number, options: { isConst: boolean; isLet: boolean; capture?: boolean }) {
    if (this.closureVarIndices.has(atom)) return
    const closureVar = new ClosureVar(atom, {
      isLocal: true,
      isArgument: false,
      isConst: options.isConst,
      isLexical: true,
      kind: VarKind.NORMAL,
      varIndex,
    })
    const closureIndex = this.currentFunction.bytecode.addClosureVar(closureVar)
    this.closureVarIndices.set(atom, closureIndex)
  }

  private emitStoreToClosure(atom: Atom) {
    const index = this.closureVarIndices.get(atom)
    if (index === undefined) {
      throw new Error('Unknown closure variable')
    }
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

  private emitModulePrologue() {
    this.withoutDebugRecording(() => {
      this.emitOpcode(Opcode.OP_push_this)
      const skipReturnLabel = this.createLabel()
      this.emitJump(Opcode.OP_if_false8, skipReturnLabel)
      this.emitOpcode(Opcode.OP_return_undef)
      this.markLabel(skipReturnLabel)
    })
  }

  private emitOpcode(opcode: Opcode, operands: number[] = [], node?: ts.Node | null): number {
    const def = this.opcodeInfoByCode.get(opcode)
    if (!def) {
      throw new Error(`Unknown opcode: ${opcode}`)
    }

  const recordNode = node === null ? null : node ?? this.currentStatementNode ?? this.currentSourceNode
    if (!this.suppressDebugRecording && recordNode) {
      const tsSourcePos = recordNode.getStart(this.sourceFile, false)
      if (tsSourcePos >= 0) {
        const sourcePos = this.toUtf8Offset(tsSourcePos)
        const isStatementRecord = node === undefined && recordNode === this.currentStatementNode
        if (!isStatementRecord || !this.recordedStatementPositions.has(sourcePos)) {
          if (isStatementRecord) {
            this.recordedStatementPositions.add(sourcePos)
          }
          const { line, column } = this.getLineColumnFromUtf8Offset(sourcePos)
          this.currentFunction.bytecode.recordLineNumber(this.currentOffset, line, column, sourcePos)
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
    const def = this.opcodeInfoByCode.get(opcode)
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
      const def = this.opcodeInfoByCode.get(instruction.opcode)
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
      const def = this.opcodeInfoByCode.get(instruction.opcode)
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

  private pushScope() {
    this.scopeManager.enterScope()
  }

  private popScope() {
    this.scopeManager.leaveScope()
  }

  private buildDebugInfo(func: FunctionDef) {
    const entries = [...func.bytecode.lineNumberTable]
      .filter((entry) => entry.sourcePos >= 0)
      .sort((a, b) => a.pc - b.pc)

    if (entries.length === 0) {
      func.bytecode.pc2line = []
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
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:lineNumberTable', entries.map((entry) => ({ ...entry })))
    }

    const first = entries[0]
    const firstPos = getLineColumn(first.sourcePos)
    pc2line.push(...this.encodeULEB128(firstPos.line))
    pc2line.push(...this.encodeULEB128(firstPos.column))

    let lastPc = first.pc
    let lastLine = firstPos.line
    let lastColumn = firstPos.column

    for (let index = 1; index < entries.length; index++) {
      const entry = entries[index]
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

      lastPc = entry.pc
      lastLine = current.line
      lastColumn = current.column
    }

    func.bytecode.pc2line = pc2line
    func.bytecode.source = ''
    func.bytecode.sourceLength = 0
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
    let v = value | 0
    let more = true
    while (more) {
      let byte = v & 0x7f
      v >>= 7
      const signBit = byte & 0x40
      if ((v === 0 && signBit === 0) || (v === -1 && signBit !== 0)) {
        more = false
      } else {
        byte |= 0x80
      }
      result.push(byte & 0xff)
    }
    return result
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
    if (pos <= 0) {
      return 0
    }
    if (pos >= this.utf8OffsetByPos.length) {
      return this.utf8OffsetByPos[this.utf8OffsetByPos.length - 1]
    }
    return this.utf8OffsetByPos[pos]
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