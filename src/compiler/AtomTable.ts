import { Compiler } from './Compiler'

export class AtomTable {
  private compiler: Compiler
  
  constructor(compiler: Compiler) {
    this.compiler = compiler
  }

  getNewId(oldIdx: number): number {
    throw new Error('Not implemented')
  }
}
