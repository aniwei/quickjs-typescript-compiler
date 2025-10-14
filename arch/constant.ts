import { BytecodeTag } from './env'
import type { ConstantEntry } from './functionBytecode'

export class ConstantTable {
  private readonly entries: ConstantEntry[] = []
  private readonly indexByKey = new Map<string, number>()

  add(entry: ConstantEntry, options: { key?: string | null } = {}): number {
    const key = options.key ?? this.createDefaultKey(entry)
    if (key !== null) {
      const existing = this.indexByKey.get(key)
      if (existing !== undefined) {
        return existing
      }
    }

    const index = this.entries.length
    this.entries.push(entry)
    if (key !== null) {
      this.indexByKey.set(key, index)
    }
    return index
  }

  getEntries(): ConstantEntry[] {
    return [...this.entries]
  }

  size(): number {
    return this.entries.length
  }

  private createDefaultKey(entry: ConstantEntry): string | null {
    switch (entry.tag) {
      case BytecodeTag.TC_TAG_NULL:
      case BytecodeTag.TC_TAG_UNDEFINED:
      case BytecodeTag.TC_TAG_BOOL_FALSE:
      case BytecodeTag.TC_TAG_BOOL_TRUE:
        return `tag:${entry.tag}`
      case BytecodeTag.TC_TAG_INT32:
        return `tag:${entry.tag}:value:${entry.value}`
      case BytecodeTag.TC_TAG_FLOAT64:
        return `tag:${entry.tag}:value:${this.serializeNumber(entry.value)}`
      case BytecodeTag.TC_TAG_STRING:
        return `tag:${entry.tag}:value:${JSON.stringify(entry.value)}`
      default:
        return null
    }
  }

  private serializeNumber(value: number): string {
    if (Number.isNaN(value)) {
      return 'NaN'
    }
    if (Object.is(value, -0)) {
      return '-0'
    }
    return value.toString()
  }
}