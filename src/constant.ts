/*
 * @see https://github.com/bellard/quickjs/blob/master/quickjs.h#L322
 */

import { BytecodeTag } from './env'

export class ConstantTable {
  private constants: Map<string, { tag: BytecodeTag; value: unknown; index: number }> = new Map()
  private nextIndex = 0

  addConstant(tag: BytecodeTag, value: unknown): number {
    const key = `${tag}:${String(value)}`
    if (this.constants.has(key)) {
      return this.constants.get(key)!.index
    }
    const index = this.nextIndex++
    this.constants.set(key, { tag, value, index })
    return index
  }

  getConstants(): { tag: BytecodeTag; value: unknown }[] {
    const sorted = Array.from(this.constants.values()).sort((a, b) => a.index - b.index)
    return sorted.map(({ tag, value }) => ({ tag, value }))
  }

  size(): number {
    return this.constants.size
  }
}