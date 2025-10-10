import { Opcode } from '../../env'
import type { FunctionBytecode } from '../../functionBytecode'
import { getOpcodeDefinition } from '../../utils/opcode'
import { getBranchDelta, getJumpBaseOffset } from './branches'

interface ComputeStackSizeParams {
  bytecode: FunctionBytecode
  getStackEffect: (opcode: Opcode, operands: number[]) => { nPop: number; nPush: number }
}

export function computeFunctionStackSize(params: ComputeStackSizeParams): number {
  const { bytecode, getStackEffect } = params
  const instructions = bytecode.instructions
  if (instructions.length === 0) {
    return 0
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

    const { nPop, nPush } = getStackEffect(instruction.opcode, instruction.operands ?? [])
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
        nextOffset = byteOffset + getJumpBaseOffset(def) + getBranchDelta(instruction, def)
        break
      case Opcode.OP_if_true:
      case Opcode.OP_if_false:
      case Opcode.OP_if_true8:
      case Opcode.OP_if_false8:
        enqueue(
          byteOffset + getJumpBaseOffset(def) + getBranchDelta(instruction, def),
          instruction.opcode,
          stackLen,
          currentCatch
        )
        break
      case Opcode.OP_catch:
        enqueue(
          byteOffset + getJumpBaseOffset(def) + getBranchDelta(instruction, def),
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
