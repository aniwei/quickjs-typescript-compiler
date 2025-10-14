import { Opcode } from '../../env'
import type { Instruction } from '../../functionBytecode'
import type { FunctionDef } from '../../functionDef'

export interface LexicalScopeInfo {
  insertionIndex: number
}

export interface EnsureLexicalInitializationScopeParams {
  scopeLevel: number
  scopeManager: { currentScope(): number }
  lexicalInitByScope: Map<number, LexicalScopeInfo>
  currentFunction: FunctionDef
}

export interface EnsureLexicalScopeResult {
  scopeLevel: number
  scopeInfo: LexicalScopeInfo
}

export function ensureLexicalInitializationScope(
  params: EnsureLexicalInitializationScopeParams
): EnsureLexicalScopeResult {
  const { scopeManager, lexicalInitByScope, currentFunction } = params
  let { scopeLevel } = params
  if (scopeLevel < 0) {
    scopeLevel = scopeManager.currentScope()
  }
  let scopeInfo = lexicalInitByScope.get(scopeLevel)
  if (!scopeInfo) {
    scopeInfo = {
      insertionIndex: currentFunction.bytecode.instructions.length,
    }
    lexicalInitByScope.set(scopeLevel, scopeInfo)
  }
  return { scopeLevel, scopeInfo }
}

export interface InsertLexicalInitializationParams {
  scopeLevel: number
  insertionIndex: number
  currentFunction: FunctionDef
  labelPositions: Map<string, number>
  lexicalInitByScope: Map<number, LexicalScopeInfo>
  instruction: Instruction
  getInstructionOffset: (func: FunctionDef, index: number) => number
  insertInstructions: (func: FunctionDef, index: number, instructions: Instruction[]) => void
}

export function insertLexicalInitialization(params: InsertLexicalInitializationParams): void {
  const {
    scopeLevel,
    insertionIndex,
    currentFunction,
    labelPositions,
    lexicalInitByScope,
    instruction,
    getInstructionOffset,
    insertInstructions,
  } = params
  const insertionPc = getInstructionOffset(currentFunction, insertionIndex)
  const labelsToRestore: string[] = []
  for (const [label, position] of labelPositions) {
    if (position === insertionPc) {
      labelsToRestore.push(label)
    }
  }

  insertInstructions(currentFunction, insertionIndex, [instruction])

  for (const label of labelsToRestore) {
    labelPositions.set(label, insertionPc)
  }

  for (const [otherScope, info] of lexicalInitByScope) {
    if (otherScope === scopeLevel) {
      continue
    }
    if (info.insertionIndex >= insertionIndex) {
      info.insertionIndex += 1
    }
  }
}

export function createSetLocalUninitializedInstruction(index: number): Instruction {
  return {
    opcode: Opcode.OP_set_loc_uninitialized,
    operands: [index],
  }
}
