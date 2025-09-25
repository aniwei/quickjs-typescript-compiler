import path from 'node:path'
import * as ts from 'typescript'
import { Atom, AtomTable } from './atoms'
import { FunctionDef } from './functionDef'
import { FunctionBytecode, type Instruction } from './functionBytecode'
import { ScopeManager } from './scopeManager'
import { Var, VarKind, ClosureVar } from './vars'
import { Opcode, OPCODE_DEFS, OpFormat, PC2Line, type OpcodeDefinition } from './env'

const PC2LINE_BASE = PC2Line.PC2LINE_BASE
const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

export interface CompilerOptions {
  atomTable?: AtomTable
}

interface SourceMapMapping {
  generatedLine: number
  generatedColumn: number
  sourceLine: number
  sourceColumn: number
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
  private moduleAtom!: Atom

  private jsSourceCode = ''
  private jsLineStarts: number[] = []
  private sourceMapMappings: SourceMapMapping[] = []
  private readonly base64CharToInt = this.createBase64Lookup()

  private stackDepth = 0
  private maxStackDepth = 0
  private currentSourceNode: ts.Node | null = null

  private currentOffset = 0
  private readonly instructionOffsets: number[] = []
  private labelCounter = 0
  private readonly labelPositions = new Map<string, number>()
  private readonly pendingJumps: Array<{ index: number; label: string; opcode: Opcode }> = []

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

    this.prepareTranspiledSource()
  }

  compile(): FunctionDef {
    this.resetCodegenState()
    const evalAtom = this.atomTable.getAtomId('_eval_')
    const moduleFileName = this.getModuleFileName()
    const rootFunction = new FunctionDef(evalAtom, this.jsSourceCode, moduleFileName)
    this.currentFunction = rootFunction
    this.scopeManager = new ScopeManager(rootFunction)
    this.moduleAtom = this.atomTable.getAtomId(moduleFileName)

    rootFunction.bytecode.jsMode = 1
    rootFunction.bytecode.funcKind = 2 // JS_FUNC_ASYNC
    rootFunction.bytecode.argumentsAllowed = true
    rootFunction.bytecode.hasSimpleParameterList = false
    rootFunction.bytecode.hasDebug = true
    rootFunction.bytecode.filename = this.moduleAtom

    this.pushScope()
    this.withSourceNode(this.sourceFile, () => {
      this.emitModulePrologue()
    })
    ts.forEachChild(this.sourceFile, (node) => this.visitNode(node))
    this.withSourceNode(this.sourceFile, () => {
      this.emitOpcode(Opcode.OP_undefined)
      this.emitOpcode(Opcode.OP_return_async)
    })
    this.popScope()

    this.resolvePendingJumps()

    const lexicalVars = rootFunction.vars.filter((variable) => !variable.isCaptured)
    rootFunction.bytecode.setVarDefs(lexicalVars)

    rootFunction.bytecode.stackSize = this.computeStackSize(rootFunction.bytecode)
    this.buildDebugInfo(rootFunction)
    rootFunction.bytecode.argCount = rootFunction.args.length
    rootFunction.bytecode.definedArgCount = rootFunction.definedArgCount
    return rootFunction
  }

  private resetCodegenState() {
    this.closureVarIndices.clear()
    this.localVarIndices.clear()
    this.stackDepth = 0
    this.maxStackDepth = 0
    this.currentOffset = 0
    this.instructionOffsets.length = 0
    this.labelCounter = 0
    this.labelPositions.clear()
    this.pendingJumps.length = 0
    this.currentSourceNode = null
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

  private visitNode(node: ts.Node): void {
    if (ts.isVariableStatement(node)) {
      this.withSourceNode(node, () => this.compileVariableStatement(node))
      return
    }
    if (ts.isForOfStatement(node)) {
      this.withSourceNode(node, () => this.compileForOfStatement(node))
      return
    }
    if (ts.isBlock(node)) {
      this.withSourceNode(node, () => this.compileBlock(node))
      return
    }
    if (ts.isExpressionStatement(node)) {
      this.withSourceNode(node, () => this.compileExpressionStatement(node))
      return
    }
    ts.forEachChild(node, (child) => this.visitNode(child))
  }

  private compileVariableStatement(node: ts.VariableStatement) {
    const flags = node.declarationList.flags
    const isConst = (flags & ts.NodeFlags.Const) !== 0
    const isLet = (flags & ts.NodeFlags.Let) !== 0

    for (const declaration of node.declarationList.declarations) {
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
    this.bindCurrentScope(loopVarIndex)
    this.emitSetLocalUninitialized(loopVarIndex)

    this.compileExpression(node.expression)
    this.emitOpcode(Opcode.OP_for_of_start)

    const labelBody = this.createLabel()
    const labelCheck = this.createLabel()

    this.emitJump(Opcode.OP_goto8, labelCheck)

    this.markLabel(labelBody)
    this.emitStoreToLocal(loopVarIndex)

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
      this.emitLoadLocalCheck(this.localVarIndices.get(atom)!)
      return
    }
    if (this.closureVarIndices.has(atom)) {
      const index = this.closureVarIndices.get(atom)!
      this.emitOpcode(Opcode.OP_get_var_ref_check, [index])
      return
    }
    this.emitOpcode(Opcode.OP_get_var, [atom])
  }

  private emitSetLocalUninitialized(index: number) {
    this.emitOpcode(Opcode.OP_set_loc_uninitialized, [index])
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

  private emitLoadLocalCheck(index: number) {
    this.emitOpcode(Opcode.OP_get_loc_check, [index])
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
      this.localVarIndices.set(atom, varIndex)
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
    this.emitOpcode(Opcode.OP_push_this)
    this.emitOpcode(Opcode.OP_if_false8, [2])
    this.emitOpcode(Opcode.OP_return_undef)
  }

  private emitOpcode(opcode: Opcode, operands: number[] = [], node?: ts.Node): number {
    const def = this.opcodeInfoByCode.get(opcode)
    if (!def) {
      throw new Error(`Unknown opcode: ${opcode}`)
    }

    const recordNode = node ?? this.currentSourceNode
    if (recordNode) {
      const sourcePos = recordNode.getStart(this.sourceFile, false)
      const mappedPos = this.mapTsPositionToJs(sourcePos)
      this.currentFunction.bytecode.recordLineNumber(this.currentOffset, mappedPos)
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
      if (stackLen < nPop) {
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

  private buildDebugInfo(func: FunctionDef) {
    const bytecode = func.bytecode
    const entries = [...bytecode.lineNumberTable].sort((a, b) => a.pc - b.pc)
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:lineNumberTable', entries.map((entry) => ({ ...entry })))
    }
    const pc2line: number[] = []

    const source = bytecode.source
    const initialSourcePos = Math.max(0, func.sourcePos | 0)
  const positionState = { line: 0, column: initialSourcePos }
  this.advancePosition(source, 0, initialSourcePos, positionState)

    pc2line.push(...this.encodeULEB128(positionState.line))
    pc2line.push(...this.encodeULEB128(positionState.column))

    let lastPc = 0
    let lastLine = positionState.line
    let lastCol = positionState.column
    let lastSourcePos = initialSourcePos

    for (const entry of entries) {
      if (entry.pc < lastPc) {
        continue
      }
      if (entry.sourcePos <= lastSourcePos) {
        continue
      }

      this.advancePosition(source, lastSourcePos, entry.sourcePos, positionState)

      const diffPc = entry.pc - lastPc
      const diffLine = positionState.line - lastLine
      const diffCol = positionState.column - lastCol

      if (diffLine === 0 && diffCol === 0) {
        lastPc = entry.pc
        lastSourcePos = entry.sourcePos
        continue
      }

      if (
        diffLine >= PC2LINE_BASE &&
        diffLine < PC2LINE_BASE + PC2LINE_RANGE &&
        diffPc <= PC2LINE_DIFF_PC_MAX
      ) {
        pc2line.push((diffLine - PC2LINE_BASE) + diffPc * PC2LINE_RANGE + PC2LINE_OP_FIRST)
      } else {
        pc2line.push(0)
        pc2line.push(...this.encodeULEB128(diffPc))
        pc2line.push(...this.encodeSLEB128(diffLine))
      }

      pc2line.push(...this.encodeSLEB128(diffCol))

      lastPc = entry.pc
      lastLine = positionState.line
      lastCol = positionState.column
      lastSourcePos = entry.sourcePos
    }

    bytecode.pc2line = pc2line
  }

  private advancePosition(source: string, from: number, to: number, state: { line: number; column: number }) {
    if (to <= from) {
      return
    }
    for (let index = from; index < to; index++) {
      const code = source.charCodeAt(index)
      if (code === 0x0a /* \n */) {
        state.line += 1
      }
    }
    state.column = to
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

  private pushScope() {
    this.scopeManager.enterScope()
  }

  private popScope() {
    this.scopeManager.leaveScope()
  }

  private getModuleFileName(): string {
    const relative = path.relative(process.cwd(), this.fileName) || this.fileName
    const ext = path.extname(relative)
    if (!ext) {
      return `${relative}.js`
    }
    return relative.slice(0, -ext.length) + '.js'
  }

  private prepareTranspiledSource() {
    const transpileResult = ts.transpileModule(this.sourceCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ES2020,
        sourceMap: true,
        removeComments: false,
      },
      fileName: this.fileName,
    })

    this.jsSourceCode = this.normalizeJsOutput(transpileResult.outputText)
    this.jsLineStarts = this.computeLineStarts(this.jsSourceCode)

    if (transpileResult.sourceMapText) {
      try {
        const rawMap = JSON.parse(transpileResult.sourceMapText) as { mappings: string }
        this.sourceMapMappings = this.decodeSourceMapMappings(rawMap.mappings)
      } catch (error) {
        this.sourceMapMappings = []
      }
    } else {
      this.sourceMapMappings = []
    }
  }

  private normalizeJsOutput(output: string): string {
    let result = output.replace(/\r\n?/g, '\n')
    result = result.replace(/\/\/#[^\n]*sourceMappingURL[^\n]*$/m, '')
    if (!result.endsWith('\n')) {
      result += '\n'
    }
    return result
  }

  private computeLineStarts(text: string): number[] {
    const starts = [0]
    for (let index = 0; index < text.length; index++) {
      const code = text.charCodeAt(index)
      if (code === 0x0d /* \r */) {
        if (text.charCodeAt(index + 1) === 0x0a) {
          index += 1
        }
        starts.push(index + 1)
      } else if (code === 0x0a /* \n */) {
        starts.push(index + 1)
      }
    }
    return starts
  }

  private decodeSourceMapMappings(mappings: string): SourceMapMapping[] {
    const result: SourceMapMapping[] = []
    let generatedLine = 0
    let generatedColumn = 0
    let sourceIndex = 0
    let sourceLine = 0
    let sourceColumn = 0

    const lines = mappings.split(';')
    for (const line of lines) {
      if (line.length === 0) {
        generatedLine += 1
        generatedColumn = 0
        continue
      }

      generatedColumn = 0
      const segments = line.split(',')
      for (const segment of segments) {
        if (!segment) {
          continue
        }
        const values = this.decodeVlqSegment(segment)
        if (values.length === 0) {
          continue
        }

        generatedColumn += values[0]
        if (values.length >= 4) {
          sourceIndex += values[1]
          sourceLine += values[2]
          sourceColumn += values[3]

          if (sourceIndex === 0) {
            result.push({
              generatedLine,
              generatedColumn,
              sourceLine,
              sourceColumn,
            })
          }
        }
      }
      generatedLine += 1
    }

    result.sort((a, b) => {
      if (a.sourceLine !== b.sourceLine) {
        return a.sourceLine - b.sourceLine
      }
      if (a.sourceColumn !== b.sourceColumn) {
        return a.sourceColumn - b.sourceColumn
      }
      if (a.generatedLine !== b.generatedLine) {
        return a.generatedLine - b.generatedLine
      }
      return a.generatedColumn - b.generatedColumn
    })

    return result
  }

  private decodeVlqSegment(segment: string): number[] {
    const values: number[] = []
    let value = 0
    let shift = 0

    for (let i = 0; i < segment.length; i++) {
      const digit = this.base64CharToInt.get(segment[i])
      if (digit === undefined) {
        continue
      }
      const continuation = (digit & 32) !== 0
      const digitValue = digit & 31
      value += digitValue << shift
      shift += 5

      if (!continuation) {
        const shouldNegate = (value & 1) === 1
        value >>= 1
        values.push(shouldNegate ? -value : value)
        value = 0
        shift = 0
      }
    }

    return values
  }

  private createBase64Lookup(): Map<string, number> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    const map = new Map<string, number>()
    for (let index = 0; index < chars.length; index++) {
      map.set(chars[index], index)
    }
    return map
  }

  private mapTsPositionToJs(tsPos: number): number {
    if (this.sourceMapMappings.length === 0) {
      return tsPos
    }
    const { line: tsLine, character: tsColumn } = this.sourceFile.getLineAndCharacterOfPosition(tsPos)

    let candidate: SourceMapMapping | null = null
    for (const mapping of this.sourceMapMappings) {
      if (mapping.sourceLine > tsLine) {
        break
      }
      if (mapping.sourceLine === tsLine && mapping.sourceColumn <= tsColumn) {
        if (
          !candidate ||
          mapping.sourceColumn > candidate.sourceColumn ||
          (mapping.sourceColumn === candidate.sourceColumn && mapping.generatedColumn > candidate.generatedColumn)
        ) {
          candidate = mapping
        }
      }
    }

    if (!candidate) {
      for (let i = this.sourceMapMappings.length - 1; i >= 0; i--) {
        const mapping = this.sourceMapMappings[i]
        if (mapping.sourceLine < tsLine) {
          candidate = mapping
          break
        }
      }
    }

    if (!candidate) {
      candidate = this.sourceMapMappings[0]
    }

    const lineStart = this.jsLineStarts[candidate.generatedLine] ?? 0
    const columnDelta = Math.max(0, tsColumn - candidate.sourceColumn)
    const jsColumn = candidate.generatedColumn + columnDelta
    return lineStart + jsColumn
  }
}

export function createNewCompiler(fileName: string, sourceCode: string, options: CompilerOptions = {}) {
  return new Compiler(fileName, sourceCode, options)
}