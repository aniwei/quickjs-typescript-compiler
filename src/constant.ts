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
