import { ensureStatementVisitorsInitialized, getStatementVisitor } from './compiler/visitors/statementVisitors'
import { compileExpression as compileExpressionNode } from './compiler/expressions'
import path from 'node:path'
import * as ts from 'typescript'
import { Atom, AtomTable, JSAtom } from './atoms'
import { FunctionDef, ModuleExportType, createEmptyModuleRecord, type ModuleExportEntryLocal } from './functionDef'
import { FunctionBytecode, type Instruction, type ConstantEntry } from './functionBytecode'
import { ScopeManager } from './scopeManager'
import { ScopeKind } from './scopes'
import { Var, VarKind, ClosureVar, VarDeclarationKind } from './vars'
import { Opcode, OpFormat, BytecodeTag, FunctionKind, JSMode, env } from './env'
import { getOpcodeDefinition } from './utils/opcode'
import { getIndexedOpcode } from './utils/opcodeVariants'
import { pruneUnusedClosureVars } from './compiler/core/closureVarUtils'
import { buildHoistedDefinitionInstructions } from './compiler/module/moduleHoisting'
import { emitModulePrologue } from './compiler/module/modulePrologue'
import {
  LineRecorder,
  type LineRecorderSnapshot,
} from './compiler/debug/lineRecorder'
import { buildSourceMapping, computeReferenceColumnAdjustments, mergeColumnAdjustments, sortColumnAdjustments } from './compiler/debug/sourceMapping'
import { computeFunctionStackSize } from './compiler/analysis/stackSize'
import { getInstructionSize, getStackEffect as getOpcodeStackEffect } from './compiler/analysis/opcodeInfo'
import { buildFunctionDebugInfo } from './compiler/debug/pc2line'
import {
  resolvePendingJumps as resolvePendingJumpEntries,
  type PendingJump,
} from './compiler/analysis/jumpResolution'
import {
  ensureLexicalInitializationScope,
  insertLexicalInitialization,
  createSetLocalUninitializedInstruction,
} from './compiler/analysis/lexicalInit'
import {
  LoopCleanupManager,
  type LoopCleanupInfo,
} from './compiler/analysis/loopCleanup'
import {
  isWhitespaceChar,
  skipTriviaForward,
  skipTypeArgumentSequence,
  getPropertyAccessOperatorPos as locatePropertyAccessOperator,
  getCallExpressionOpenParenPos as locateCallOpenParen,
  getNewExpressionOpenParenPos as locateNewOpenParen,
} from './compiler/utils/sourceNavigation'
import {
  Utf8PositionTracker,
  type Utf8PositionTrackerSnapshot,
  createUtf8PositionTracker,
} from './compiler/debug/utf8PositionTracker'
import {
  ControlFlowBuilder,
  ControlFlowTarget,
  ControlFlowTargetKind,
  LoopControlFlowTarget,
  type BreakResolution,
  type ContinueResolution,
} from './controlFlow'

const enum SpecialObject {
  Arguments = 0,
  MappedArguments = 1,
  ThisFunction = 2,
  NewTarget = 3,
  HomeObject = 4,
  VarObject = 5,
  ImportMeta = 6,
}

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
  utf8PositionSnapshot: Utf8PositionTrackerSnapshot
  lineRecorderSnapshot: LineRecorderSnapshot
  hasExplicitReturn: boolean
  moduleHoistInsertionIndex: number | null
  moduleHoistLabel: string | null
  controlFlowTargets: ControlFlowTarget[]
  loopCleanupEntries: Array<[string, LoopCleanupInfo]>
}
interface EmitDebugInfoOptions {
  tsSourcePos?: number
}

interface DerivedConstructorContext {
  functionDef: FunctionDef
  thisActiveSlot: number
  newTargetSlot: number
  thisSlot: number
  thisScopeLevel: number
  prologueInitialized: boolean
  classFieldsVarRefIndex: number | null
  classFieldsIsLexical: boolean
  classFieldsCallEmitted: boolean
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
  private readonly pendingJumps: PendingJump[] = []
  private readonly controlFlow = new ControlFlowBuilder({
    emitGoto: (label) => this.emitGoto(label),
  })
  private readonly loopCleanup = new LoopCleanupManager()
  private readonly lexicalInitByScope = new Map<number, { insertionIndex: number }>()
  private readonly utf8Tracker: Utf8PositionTracker
  private readonly lineRecorder: LineRecorder
  private hasExplicitReturn = false
  private moduleHoistInsertionIndex: number | null = null
  private moduleHoistLabel: string | null = null
  private pendingChildSetups: Array<(compiler: Compiler) => void> | null = null
  private derivedConstructorContext: DerivedConstructorContext | null = null

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

    const { strippedSource, normalizedPosByPos, columnAdjustments } = buildSourceMapping({
      source: this.sourceCode,
      sourceFile: this.sourceFile,
      referenceJsSource: options.referenceJsSource ?? undefined,
    })
    const columnAdjustmentMap = columnAdjustments
    if (options.referenceJsSource !== undefined) {
      const referenceAdjustments = computeReferenceColumnAdjustments(
        strippedSource,
        this.sourceCode,
        options.referenceJsSource,
        this.fileName
      )
      mergeColumnAdjustments(columnAdjustmentMap, referenceAdjustments)
    }
    sortColumnAdjustments(columnAdjustmentMap)

    this.utf8Tracker = createUtf8PositionTracker({
      strippedSource,
      normalizedPosByPos,
      columnAdjustments: columnAdjustmentMap,
    })

    this.lineRecorder = new LineRecorder(this.sourceFile, this.utf8Tracker)
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
      const prologue = emitModulePrologue({
        withoutDebugRecording: (fn) => this.withoutDebugRecording(fn),
        emitOpcode: (opcode, operands, node) => this.emitOpcode(opcode, operands ?? [], node),
        emitJump: (opcode, label) => this.emitJump(opcode, label),
        createLabel: () => this.createLabel(),
        markLabel: (label) => this.markLabel(label),
      })
      this.moduleHoistInsertionIndex = prologue.hoistInsertionIndex
      this.moduleHoistLabel = prologue.hoistLabel
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
    this.utf8Tracker.resetCache()
    this.lineRecorder.reset()
    this.hasExplicitReturn = false
    this.moduleHoistLabel = null
    this.controlFlow.reset()
    this.loopCleanup.reset()
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
      utf8PositionSnapshot: this.utf8Tracker.createSnapshot(),
      lineRecorderSnapshot: this.lineRecorder.createSnapshot(),
      hasExplicitReturn: this.hasExplicitReturn,
      moduleHoistInsertionIndex: this.moduleHoistInsertionIndex,
      moduleHoistLabel: this.moduleHoistLabel,
      controlFlowTargets: this.controlFlow.createSnapshot(),
      loopCleanupEntries: this.loopCleanup.getEntries(),
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
    this.utf8Tracker.restoreSnapshot(snapshot.utf8PositionSnapshot)
    this.lineRecorder.restoreSnapshot(snapshot.lineRecorderSnapshot)
    this.hasExplicitReturn = snapshot.hasExplicitReturn
    this.moduleHoistInsertionIndex = snapshot.moduleHoistInsertionIndex
    this.moduleHoistLabel = snapshot.moduleHoistLabel
    this.controlFlow.restoreSnapshot(snapshot.controlFlowTargets)
    this.loopCleanup.reset()
    this.loopCleanup.restoreEntries(snapshot.loopCleanupEntries)
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

  public compileChildFunction(
    node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
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

    const isArrowFunction = ts.isArrowFunction(node)

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
  childFunction.bytecode.hasPrototype = !isArrowFunction && funcKind === FunctionKind.JS_FUNC_NORMAL
  childFunction.bytecode.newTargetAllowed = !isArrowFunction

    parentFunction.appendChild(childFunction)

    const scheduledSetups = this.pendingChildSetups
    this.pendingChildSetups = null

    const snapshot = this.saveCurrentFunctionContext()
    this.resetCodegenState()
    this.currentFunction = childFunction
    this.scopeManager = new ScopeManager(childFunction)

  const startLineColumn = this.getLineColumnFromUtf8Offset(childFunction.sourcePos)
  this.currentFunction.bytecode.recordLineNumber(0, startLineColumn.line, startLineColumn.column, childFunction.sourcePos, 0)

    this.pushScope(ScopeKind.Function)

    if (scheduledSetups) {
      for (const setup of scheduledSetups) {
        setup(this)
      }
    }

    const parameters = node.parameters.filter((parameter) => !this.isThisParameter(parameter))

    childFunction.definedArgCount = parameters.length
    for (let index = 0; index < parameters.length; index++) {
      this.compileFunctionParameter(parameters[index], index, parameters.length)
    }

    if (!node.body) {
      throw new Error('Function is missing a body')
    }

    if (ts.isBlock(node.body)) {
      for (const statement of node.body.statements) {
        this.visitNode(statement)
      }
    } else if (isArrowFunction) {
      const expressionBody = node.body
      this.withSourceNode(expressionBody, () => {
        this.compileExpression(expressionBody)
      })
      this.emitReturnOpcode(expressionBody)
      this.markExplicitReturn()
    } else {
      throw new Error('Only block bodies are supported for function declarations')
    }

    if (!this.hasExplicitReturn) {
      const derivedContext = this.getDerivedConstructorContext()
      if (derivedContext) {
        this.emitInstruction(Opcode.OP_get_loc_checkthis, [derivedContext.thisSlot], null)
        this.emitInstruction(Opcode.OP_return, [], null)
        this.markExplicitReturn()
      }
    }

    if (!this.hasExplicitReturn) {
      this.emitVoidReturnOpcode()
    }

    this.popScope()
    this.resolvePendingJumps()
    this.finalizeFunction(childFunction)
    if (
      process.env.DEBUG_DERIVED === '1' &&
      this.derivedConstructorContext &&
      this.derivedConstructorContext.functionDef === childFunction
    ) {
      const derivedDump = childFunction.bytecode.instructions.map((instruction, index) => ({
        offset: this.getInstructionOffset(childFunction, index),
        opcode: Opcode[instruction.opcode] ?? instruction.opcode,
        rawOpcode: instruction.opcode,
        operands: instruction.operands,
      }))
      console.log('derived finalize', {
        nameAtom: childFunction.bytecode.name,
        instructions: derivedDump,
      })
    }
    this.endDerivedConstructorContext(childFunction)
    this.restoreFunctionContext(snapshot)

    return childFunction
  }

  public scheduleChildSetup(callback: (compiler: Compiler) => void) {
    if (!this.pendingChildSetups) {
      this.pendingChildSetups = []
    }
    this.pendingChildSetups.push(callback)
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
    this.loopCleanup.emitLoopCleanup(target.breakLabel, (opcode) => {
      this.emitOpcode(opcode)
    })
  }

  public registerLoopCleanup(breakLabel: string, info: LoopCleanupInfo): void {
    this.loopCleanup.register(breakLabel, info)
  }

  public clearLoopCleanup(breakLabel: string): void {
    this.loopCleanup.clear(breakLabel)
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

  public emitPushConstantIndex(index: number, node?: ts.Node | null) {
    const debugNode = node ?? null
    if (env.supportsShortOpcodes && index <= 0xff) {
      this.emitOpcode(Opcode.OP_push_const8, [index], debugNode)
    } else {
      this.emitOpcode(Opcode.OP_push_const, [index], debugNode)
    }
  }

  public beginDerivedConstructorContext() {
    const existing = this.getDerivedConstructorContext()
    if (existing) {
      return
    }

  const thisActiveAtom = this.getAtomId('this_active_func')
    this.declareLexicalVariable(thisActiveAtom, {
      isConst: false,
      isLet: false,
      capture: false,
    })
    const thisActiveSlot = this.getLocalVarSlot(thisActiveAtom)
    if (thisActiveSlot === undefined) {
  throw new Error('Failed to allocate local slot for this_active_func')
    }

  const newTargetAtom = this.getAtomId('new_target')
    this.declareLexicalVariable(newTargetAtom, {
      isConst: false,
      isLet: false,
      capture: false,
    })
    const newTargetSlot = this.getLocalVarSlot(newTargetAtom)
    if (newTargetSlot === undefined) {
  throw new Error('Failed to allocate local slot for new_target')
    }

    const thisAtom = this.getAtomId('this')
    const thisVarIndex = this.declareLexicalVariable(thisAtom, {
      isConst: false,
      isLet: true,
      capture: false,
    })
    const thisVar = this.getFunctionVar(thisVarIndex)
    const thisSlot = this.getLocalVarSlot(thisAtom)
    if (thisSlot === undefined) {
      throw new Error('Failed to allocate local slot for this binding')
    }

    const classFieldsAtom = this.getAtomId('class_fields_init')
    const classFieldsCapture = this.resolveCapturedIdentifier(classFieldsAtom)
    const classFieldsVarRefIndex = classFieldsCapture ? classFieldsCapture.index : null
    const classFieldsIsLexical = classFieldsCapture ? classFieldsCapture.isLexical : false

    this.derivedConstructorContext = {
      functionDef: this.currentFunction,
      thisActiveSlot,
      newTargetSlot,
      thisSlot,
      thisScopeLevel: thisVar.scopeLevel,
      prologueInitialized: false,
      classFieldsVarRefIndex,
      classFieldsIsLexical,
      classFieldsCallEmitted: false,
    }
  }

  private getDerivedConstructorContext(): DerivedConstructorContext | null {
    if (!this.derivedConstructorContext) {
      return null
    }
    if (this.derivedConstructorContext.functionDef !== this.currentFunction) {
      return null
    }
    return this.derivedConstructorContext
  }

  private endDerivedConstructorContext(functionDef: FunctionDef) {
    if (this.derivedConstructorContext && this.derivedConstructorContext.functionDef === functionDef) {
      this.derivedConstructorContext = null
    }
  }

  public emitDefineClass(atom: Atom, flags: number, node?: ts.Node | null) {
    this.emitOpcode(Opcode.OP_define_class, [atom, flags], node ?? null)
  }

  public emitRawOpcode(opcode: Opcode, operands: number[] = [], node?: ts.Node | null) {
    this.emitOpcode(opcode, operands, node ?? null)
  }
  public emitDerivedConstructorSuperCall(
    args: readonly ts.Expression[],
    node: ts.CallExpression,
    debugOptions: EmitDebugInfoOptions | undefined,
  ) {
    const context = this.getDerivedConstructorContext()
    if (!context) {
      throw new Error('super() call is only supported inside a derived class constructor')
    }

    if (process.env.DEBUG_DERIVED === '1') {
      const funcAtom = this.currentFunction.bytecode.name
      const funcName = typeof funcAtom === 'number' ? this.atomTable.getAtomString(funcAtom) ?? `<atom:${funcAtom}>` : funcAtom
      console.log('emitDerivedConstructorSuperCall', {
        args: args.length,
        prologueInitialized: context.prologueInitialized,
        functionName: funcName,
      })
    }

    if (!context.prologueInitialized) {
      this.emitInstruction(Opcode.OP_special_object, [SpecialObject.ThisFunction], node.expression)
      this.emitStoreToLocal(context.thisActiveSlot)
      this.emitInstruction(Opcode.OP_special_object, [SpecialObject.NewTarget], node.expression)
      this.emitStoreToLocal(context.newTargetSlot)
      this.emitSetLocalUninitialized(context.thisSlot, context.thisScopeLevel)
      this.emitInstruction(Opcode.OP_check_ctor, [], node.expression)
      context.prologueInitialized = true
    }

    this.emitLoadLocal(context.thisActiveSlot, node.expression)
    this.emitInstruction(Opcode.OP_get_super, [], node.expression)
    this.emitLoadLocal(context.newTargetSlot, node.expression)

    for (const arg of args) {
      this.withSourceNode(arg, () => {
        this.compileExpression(arg)
      })
    }

    this.emitInstruction(Opcode.OP_call_constructor, [args.length], node, debugOptions)
    this.emitInstruction(Opcode.OP_dup, [], node)
    this.emitInstruction(Opcode.OP_put_loc_check_init, [context.thisSlot], node)

    if (context.classFieldsVarRefIndex !== null) {
      if (context.classFieldsIsLexical) {
        this.emitInstruction(Opcode.OP_get_var_ref_check, [context.classFieldsVarRefIndex], node)
      } else {
        const classFieldsAtom = this.getAtomId('class_fields_init')
        this.emitInstruction(Opcode.OP_get_var, [classFieldsAtom], node)
      }
      this.emitInstruction(Opcode.OP_dup, [], node)
      const skipLabel = this.createLabel()
      this.emitJump(Opcode.OP_if_false8, skipLabel)
      this.emitInstruction(Opcode.OP_get_loc_check, [context.thisSlot], node)
      this.emitInstruction(Opcode.OP_swap, [], node)
      this.emitInstruction(Opcode.OP_call_method, [0], node)
      this.markLabel(skipLabel)
    this.emitInstruction(Opcode.OP_drop, [], node)
    this.emitInstruction(Opcode.OP_drop, [], node)
    // fall through to shared continuation (matches QuickJS codegen)
      context.classFieldsCallEmitted = true
    }

    if (process.env.DEBUG_DERIVED === '1') {
      const instructions = this.currentFunction.bytecode.instructions.map((ins) => ({
        opcode: Opcode[ins.opcode] ?? ins.opcode,
        rawOpcode: ins.opcode,
        operands: ins.operands,
      }))
      const offsets: number[] = []
      let offset = 0
      for (let i = 0; i < this.currentFunction.bytecode.instructions.length; i += 1) {
        offsets.push(offset)
        offset += getInstructionSize(this.currentFunction.bytecode.instructions[i])
      }
      console.log('derived instructions', instructions.map((entry, index) => ({
        offset: offsets[index],
        ...entry,
      })))
    }
  }

  public emitThisExpression(node: ts.Expression) {
    const context = this.getDerivedConstructorContext()
    if (context) {
      this.emitInstruction(Opcode.OP_get_loc_checkthis, [context.thisSlot], node)
      return
    }
    this.emitInstruction(Opcode.OP_push_this, [], node)
  }

  public compileExpression(expression: ts.Expression): void {
    const previous = this.currentSourceNode
    this.currentSourceNode = expression
    try {
      compileExpressionNode(this, expression)
    } finally {
      this.currentSourceNode = previous
    }
  }

  public recordExpressionStatementDebug(expression: ts.Expression) {
    const currentStatement = this.currentStatementNode
    if (currentStatement && ts.isExpressionStatement(currentStatement) && currentStatement.expression === expression) {
      this.recordDebugPoint(expression)
    }
  }

  public recordStatementDebug(node: ts.Statement) {
    const isCurrentStatement = this.currentStatementNode === node
    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:record-statement-attempt', {
        nodeKind: ts.SyntaxKind[node.kind],
        currentOffset: this.currentOffset,
        isCurrentStatement,
        currentStatementKind: this.currentStatementNode ? ts.SyntaxKind[this.currentStatementNode.kind] : null,
      })
    }
    if (isCurrentStatement) {
      this.recordDebugPoint(node)
    }
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
    const { scopeLevel: resolvedScopeLevel, scopeInfo } = ensureLexicalInitializationScope({
      scopeLevel,
      scopeManager: this.scopeManager,
      lexicalInitByScope: this.lexicalInitByScope,
      currentFunction: this.currentFunction,
    })
    const instruction = createSetLocalUninitializedInstruction(index)
    insertLexicalInitialization({
      scopeLevel: resolvedScopeLevel,
      insertionIndex: scopeInfo.insertionIndex,
      currentFunction: this.currentFunction,
      labelPositions: this.labelPositions,
      lexicalInitByScope: this.lexicalInitByScope,
      instruction,
      getInstructionOffset: (func, idx) => this.getInstructionOffset(func, idx),
      insertInstructions: (func, idx, instructions) => this.insertInstructions(func, idx, instructions),
    })
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

  public emitLoadLocalCheck(index: number, node?: ts.Node) {
    this.emitOpcode(Opcode.OP_get_loc_check, [index], node)
  }

  public emitLoadLocal(index: number, node?: ts.Node | null) {
    const shortOpcode = getIndexedOpcode('OP_get_loc', index)
    if (shortOpcode !== undefined) {
      this.emitOpcode(shortOpcode, [], node ?? null)
      return
    }
    if (env.supportsShortOpcodes && index <= 0xff) {
      this.emitOpcode(Opcode.OP_get_loc8, [index], node ?? null)
      return
    }
    this.emitOpcode(Opcode.OP_get_loc, [index], node ?? null)
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
    resolvePendingJumpEntries({
      pendingJumps: this.pendingJumps,
      labelPositions: this.labelPositions,
      instructionOffsets: this.instructionOffsets,
      instructions: this.currentFunction.bytecode.instructions,
    })
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
    const index = this.currentFunction.addConstant(
      {
        tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE,
        value: func.bytecode,
      },
      { key: null }
    )
    if (process.env.DEBUG_DERIVED === '1' && func.bytecode.isDerivedClassConstructor) {
      const dump = func.bytecode.instructions.map((instruction, dumpIndex) => ({
        offset: this.getInstructionOffset(func, dumpIndex),
        opcode: Opcode[instruction.opcode] ?? instruction.opcode,
        rawOpcode: instruction.opcode,
        operands: instruction.operands,
      }))
      console.log('derived addFunctionConstant', {
        nameAtom: func.bytecode.name,
        index,
        dump,
      })
    }
    return index
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

  public emitStoreToLexical(atom: Atom, options: { suppressDebug?: boolean } = {}) {
    const suppressDebug = options.suppressDebug ?? true
    const slot = this.localVarIndices.get(atom)
    if (slot !== undefined) {
      const write = () => {
        this.emitStoreToLocal(slot)
      }
      if (suppressDebug) {
        this.withoutDebugRecording(write)
      } else {
        write()
      }
      return
    }
    const closureIndex = this.closureVarIndices.get(atom)
    if (closureIndex === undefined) {
      throw new Error('Unknown lexical variable')
    }
    const writeClosure = () => {
      this.emitPutVarRef(closureIndex)
    }
    if (suppressDebug) {
      this.withoutDebugRecording(writeClosure)
    } else {
      writeClosure()
    }
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

  public registerModuleLocalExport(exportedName: Atom, localVarIndex: number, options: { createDefaultAlias?: boolean } = {}): number {
    const moduleRecord = this.currentFunction.module
    if (!moduleRecord) {
      throw new Error('Not compiling a module')
    }

    let targetVarIndex = localVarIndex
    const defaultAtom = this.getAtomId('default')
    const isDefaultExport = exportedName === defaultAtom
    const isModuleTopLevel = this.isModuleTopLevelScope()
    const shouldCreateDefaultAlias = isDefaultExport && isModuleTopLevel && options.createDefaultAlias === true

    if (shouldCreateDefaultAlias) {
      const defaultAliasAtom = JSAtom.JS_ATOM__default_
      const existingBinding = this.getBindingInfo(defaultAliasAtom)
      let aliasVarIndex: number

      if (existingBinding) {
        aliasVarIndex = existingBinding.binding.index
      } else {
        aliasVarIndex = this.declareLexicalVariable(defaultAliasAtom, {
          isConst: false,
          isLet: true,
          capture: true,
        })
      }

      const aliasVariable = this.getFunctionVar(aliasVarIndex)

      if (this.isGlobalVarContext()) {
        this.registerGlobalVar(defaultAliasAtom, {
          scopeLevel: aliasVariable.scopeLevel,
          isLexical: aliasVariable.isLexical,
          isConst: aliasVariable.isConst,
          forceInit: true,
        })
      }
      targetVarIndex = aliasVarIndex
    }

    const existingIndex = moduleRecord.exportEntries.findIndex((entry) => {
      return entry.type === ModuleExportType.Local && entry.exportedName === exportedName
    })

    const exportEntry: ModuleExportEntryLocal = {
      type: ModuleExportType.Local,
      exportedName,
      localVarIndex: targetVarIndex,
    }

    if (existingIndex >= 0) {
      moduleRecord.exportEntries[existingIndex] = exportEntry
    } else {
      moduleRecord.exportEntries.push(exportEntry)
    }

    return targetVarIndex
  }

  private injectModuleHoistedDefinitions(func: FunctionDef) {
    if (!func.module) {
      return
    }

    const hoisted = buildHoistedDefinitionInstructions({
      func,
      closureVarIndices: this.closureVarIndices,
    })

    if (hoisted.length === 0) {
      return
    }
    const insertionIndex = func === this.currentFunction && this.moduleHoistInsertionIndex !== null ? this.moduleHoistInsertionIndex : 0
    this.insertInstructions(func, insertionIndex, hoisted)

    if (func === this.currentFunction) {
      this.moduleHoistInsertionIndex = null

      if (this.moduleHoistLabel) {
        this.moduleHoistLabel = null
      }
    }
  }

  private insertInstructions(func: FunctionDef, index: number, instructions: Instruction[]) {
    if (instructions.length === 0) {
      return
    }

    const bytecode = func.bytecode
    const delta = instructions.reduce((sum, ins) => sum + getInstructionSize(ins), 0)
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
      offset += getInstructionSize(instructions[i])
    }

    return { offsets, totalSize: offset }
  }

  private getInstructionOffset(func: FunctionDef, index: number): number {
    if (func === this.currentFunction && this.instructionOffsets[index] !== undefined) {
      return this.instructionOffsets[index]
    }

    let offset = 0
    
    for (let i = 0; i < index && i < func.bytecode.instructions.length; i++) {
      offset += getInstructionSize(func.bytecode.instructions[i])
    }

    return offset
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
    if (process.env.DEBUG_DERIVED === '1' && opcode === Opcode.OP_special_object) {
      const funcAtom = this.currentFunction.bytecode.name
      const funcName = typeof funcAtom === 'number' ? this.atomTable.getAtomString(funcAtom) ?? `<atom:${funcAtom}>` : funcAtom
      console.log('emitOpcode(OP_special_object)', {
        functionName: funcName,
        operands,
        instructionIndex: this.currentFunction.bytecode.instructions.length,
      })
    }
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

    this.lineRecorder.recordInstruction({
      suppressDebugRecording: this.suppressDebugRecording,
      recordNode,
      statementNode: this.currentStatementNode,
      debugTsSourcePos: debugOptions?.tsSourcePos,
      nodeArgumentWasUndefined: node === undefined,
      opcode,
      currentFunction: this.currentFunction,
      currentOffset: this.currentOffset,
      instructionIndex,
    })

    const { nPop, nPush } = getOpcodeStackEffect(opcode, operands)

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
    this.lineRecorder.recordDebugPoint({
      suppressDebugRecording: this.suppressDebugRecording,
      node,
      currentFunction: this.currentFunction,
      currentOffset: this.currentOffset,
    })
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

  private finalizeFunction(func: FunctionDef) {
    const funcName = this.atomTable.getAtomString(func.bytecode.name)
    func.bytecode.constantPool = func.getConstantPoolEntries()
    if (
      process.env.DEBUG_DERIVED === '1' &&
      this.derivedConstructorContext &&
      this.derivedConstructorContext.functionDef === func
    ) {
      console.log('derived finalize:beforePrune', {
        funcName,
        constantPoolCount: func.bytecode.constantPool.length,
      })
    }
    pruneUnusedClosureVars(
      {
        atomTable: this.atomTable,
        closureVarIndices: this.closureVarIndices,
      },
      func
    )
    if (
      process.env.DEBUG_DERIVED === '1' &&
      this.derivedConstructorContext &&
      this.derivedConstructorContext.functionDef === func
    ) {
      console.log('derived finalize:afterPrune', {
        funcName,
        constantPoolCount: func.bytecode.constantPool.length,
      })
    }
    const lexicalVars = func.vars.filter((variable) => !variable.isCaptured)
    for (const variable of lexicalVars) {
      if (variable.scopeLevel >= 0) {
        variable.scopeLevel = this.remapScopeLevel(func, variable.scopeLevel)
      }
    }
    func.bytecode.setVarDefs(lexicalVars)
    func.bytecode.setArgDefs(func.args)
    func.bytecode.stackSize = computeFunctionStackSize(func.bytecode)
    if (
      process.env.DEBUG_DERIVED === '1' &&
      this.derivedConstructorContext &&
      this.derivedConstructorContext.functionDef === func
    ) {
      const dump = func.bytecode.instructions.map((instruction, index) => ({
        offset: this.getInstructionOffset(func, index),
        opcode: Opcode[instruction.opcode] ?? instruction.opcode,
        rawOpcode: instruction.opcode,
        operands: instruction.operands,
      }))
      console.log('derived finalize:afterStack', {
        funcName,
        stackSize: func.bytecode.stackSize,
        instructionCount: dump.length,
        dump,
      })
    }
    buildFunctionDebugInfo({
      func,
      getInstructionSize,
      getLineColumnFromUtf8Offset: (offset) => this.getLineColumnFromUtf8Offset(offset),
    })
    func.bytecode.argCount = func.args.length
    func.bytecode.definedArgCount = func.definedArgCount
  }

  public getPropertyAccessOperatorPos(node: ts.PropertyAccessExpression): number | undefined {
    return locatePropertyAccessOperator({
      source: this.sourceCode,
      sourceFile: this.sourceFile,
      node,
    })
  }

  public getCallExpressionOpenParenPos(node: ts.CallExpression): number | undefined {
    return locateCallOpenParen({
      source: this.sourceCode,
      node,
    })
  }

  public getNewExpressionOpenParenPos(node: ts.NewExpression): number | undefined {
    if (!node.arguments || node.arguments.length === 0) {
      return undefined
    }
    return locateNewOpenParen({
      source: this.sourceCode,
      node,
    })
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
    return this.utf8Tracker.toUtf8Offset(pos)
  }

  private getLineColumnFromUtf8Offset(offset: number): { line: number; column: number } {
    return this.utf8Tracker.getLineColumnFromUtf8Offset(offset)
  }

  private findLineStartUtf8Offset(offset: number): number {
    return this.utf8Tracker.findLineStartUtf8Offset(offset)
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
    return this.utf8Tracker.computeIndentColumnsFromUtf8Offset(offset)
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

}

export function createNewCompiler(fileName: string, sourceCode: string, options: CompilerOptions = {}) {
  return new Compiler(fileName, sourceCode, options)
}