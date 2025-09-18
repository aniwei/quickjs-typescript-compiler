// AtomTable: 模拟 QuickJS 原子管理的最小子集 (仅字符串)
// 后续可扩展类型: symbol, private, numeric index 等。

export class AtomTable {
  private atoms: string[] = []
  private map = new Map<string, number>()

  intern (name: string): number {
    let id = this.map.get(name)
    if (id === undefined) {
      id = this.atoms.length
      this.atoms.push(name)
      this.map.set(name, id)
    }
    return id
  }

  getAll (): string[] { return this.atoms.slice() }
  size (): number { return this.atoms.length }
}
