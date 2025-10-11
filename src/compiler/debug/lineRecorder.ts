import * as ts from 'typescript'
import type { FunctionDef } from '../../functionDef'
import { Opcode } from '../../env'
import { Utf8PositionTracker } from './utf8PositionTracker'

export interface LineRecorderSnapshot {
  recordedPositions: Set<number>
}

export interface RecordInstructionParams {
  suppressDebugRecording: boolean
  recordNode: ts.Node | null
  statementNode: ts.Node | null
  debugTsSourcePos?: number
  nodeArgumentWasUndefined: boolean
  opcode: Opcode
  currentFunction: FunctionDef
  currentOffset: number
  instructionIndex: number
}

export interface RecordDebugPointParams {
  suppressDebugRecording: boolean
  node: ts.Node
  currentFunction: FunctionDef
  currentOffset: number
}

export class LineRecorder {
  private recordedPositions = new Set<number>()

  constructor(
    private readonly sourceFile: ts.SourceFile,
    private readonly utf8Tracker: Utf8PositionTracker
  ) {}

  public reset() {
    this.recordedPositions.clear()
  }

  public createSnapshot(): LineRecorderSnapshot {
    return {
      recordedPositions: new Set(this.recordedPositions),
    }
  }

  public restoreSnapshot(snapshot: LineRecorderSnapshot) {
    this.recordedPositions = new Set(snapshot.recordedPositions)
  }

  public recordInstruction(params: RecordInstructionParams) {
    if (params.suppressDebugRecording) {
      return
    }

    if (params.opcode === Opcode.OP_fclosure || params.opcode === Opcode.OP_fclosure8) {
      return
    }

    if (!params.recordNode && params.debugTsSourcePos === undefined) {
      return
    }

    let tsSourcePos = params.debugTsSourcePos
    if (tsSourcePos === undefined && params.recordNode) {
      tsSourcePos = params.recordNode.getStart(this.sourceFile, false)
    }
    if (tsSourcePos === undefined || tsSourcePos < 0) {
      return
    }

    const sourcePos = this.utf8Tracker.toUtf8Offset(tsSourcePos)
    if (this.recordedPositions.has(sourcePos)) {
      return
    }

    const { line, column } = this.utf8Tracker.getLineColumnFromUtf8Offset(sourcePos)

    const isStatementRecord =
      params.debugTsSourcePos === undefined &&
      params.nodeArgumentWasUndefined &&
      params.recordNode !== null &&
      params.recordNode === params.statementNode

    if (process.env.DEBUG_PC2LINE === '1') {
      console.log('pc2line:record', {
        offset: params.currentOffset,
        instructionIndex: params.instructionIndex,
        opcode: Opcode[params.opcode],
        nodeKind: params.recordNode ? ts.SyntaxKind[params.recordNode.kind] : null,
        isStatementRecord,
        tsSourcePos,
        sourcePos,
        line,
        column,
      })
    }

    params.currentFunction.bytecode.recordLineNumber(
      params.currentOffset,
      line,
      column,
      sourcePos,
      params.instructionIndex
    )
    this.recordedPositions.add(sourcePos)

    if (!isStatementRecord && params.statementNode && params.recordNode === params.statementNode) {
      const statementStart = params.statementNode.getStart(this.sourceFile, false)
      if (statementStart >= 0) {
        const statementPos = this.utf8Tracker.toUtf8Offset(statementStart)
        this.recordedPositions.add(statementPos)
      }
    }
  }

  public recordDebugPoint(params: RecordDebugPointParams) {
    if (params.suppressDebugRecording) {
      return
    }

    const tsSourcePos = params.node.getStart(this.sourceFile, false)
    if (tsSourcePos < 0) {
      return
    }

    const sourcePos = this.utf8Tracker.toUtf8Offset(tsSourcePos)
    if (this.recordedPositions.has(sourcePos)) {
      return
    }

    const { line, column } = this.utf8Tracker.getLineColumnFromUtf8Offset(sourcePos)
    const instructionIndex = params.currentFunction.bytecode.instructions.length
    params.currentFunction.bytecode.recordLineNumber(
      params.currentOffset,
      line,
      column,
      sourcePos,
      instructionIndex
    )
    this.recordedPositions.add(sourcePos)
  }
}
