
// Label management
export class LabelManager {
  private labels = new Map<string, number>()
  private patches = new Map<string, number[]>()
  private nextId = 0
  
  createLabel(name?: string): string {
    const label = name || `L${this.nextId++}`
    if (!this.labels.has(label)) {
      this.patches.set(label, [])
    }
    return label
  }
  
  setLabel(label: string, address: number): void {
    this.labels.set(label, address)
    
    // Patch all references
    const patchList = this.patches.get(label) || []
    for (const patchAddr of patchList) {
      // Will be handled by bytecode writer
    }
  }
  
  addPatch(label: string, address: number): void {
    if (!this.patches.has(label)) {
      this.patches.set(label, [])
    }
    this.patches.get(label)!.push(address)
  }
  
  getAddress(label: string): number | undefined {
    return this.labels.get(label)
  }
  
  getPatches(): Map<string, number[]> {
    return this.patches
  }
}
