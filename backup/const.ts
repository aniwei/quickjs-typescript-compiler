// ConstTable: 管理常量去重与索引。支持 number / string / boolean / null / undefined。

export type ConstValue = number | string | boolean | null | undefined

export class ConstTable {
  private values: ConstValue[] = []
  private map = new Map<string, number>()

  add (v: ConstValue): number {
    const key = this.keyOf(v)
    let idx = this.map.get(key)

    if (idx === undefined) {
      idx = this.values.length
    
      this.values.push(v)
      this.map.set(key, idx)
    }

    return idx
  }

  private keyOf (v: ConstValue): string {
    if (v === null) return 'null'
    if (v === undefined) return 'undefined'

    return typeof v + ':' + String(v)
  }

  getAll (): ConstValue[] { 
    return this.values.slice() 
  }
  
  size (): number { 
    return this.values.length 
  }
}
