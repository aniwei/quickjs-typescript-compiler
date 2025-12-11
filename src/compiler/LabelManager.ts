import { Compiler } from './Compiler'
import { Label } from './Compiler'

export interface LoopInfo {
  type: 'loop' | 'switch' | 'block'
  labels: string[]
  breakLabel: Label
  continueLabel?: Label
}

export class LabelManager {
  private compiler: Compiler
  
  constructor(compiler: Compiler) {
    this.compiler = compiler
  }

  
}
