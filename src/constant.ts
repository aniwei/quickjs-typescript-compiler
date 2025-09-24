export type ConstantValue = number | boolean | string | null | undefined

// Constants pool
export class Constants {
  private values: ConstantValue[] = []
  private map = new Map<string, number>()
  
  add(value: ConstantValue): number {
    const key = JSON.stringify(value)
    const existing = this.map.get(key)
    if (existing !== undefined) {
      return existing
    }
    
    const index = this.values.length
    this.values.push(value)
    this.map.set(key, index)
    return index
  }

  get(index: number): ConstantValue {
    return this.values[index]
  }
  
  getAll(): ConstantValue[] {
    return [...this.values]
  }
  
  size(): number {
    return this.values.length
  }
}

export enum BCTag {
  NULL = 0,
  UNDEFINED = 1,
  FALSE = 2,
  TRUE = 3,
  INT32 = 4,
  FLOAT64 = 5,
  STRING = 6,
  OBJECT = 7,
  ARRAY = 8,
  BIG_INT = 9,
  BIG_FLOAT = 10,
  BIG_DECIMAL = 11,
  TEMPLATE = 12,
  FUNCTION_BYTECODE = 13,
  MODULE = 14,
  // ... add other tags as needed
}
