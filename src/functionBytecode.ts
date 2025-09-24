import { Atom } from './atoms';
import { ConstantTag } from './constant';
import { Opcode } from './env';

export class FunctionBytecode {
  name: Atom;
  stackSize = 0;
  argCount = 0;
  varCount = 0;
  definedArgCount = 0;
  // TODO
  // ...existing code...
  cpool: [ConstantTag, any][] = [];
  opcodes: (Opcode | number)[] = [];
  source: string;
// ...existing code...
  sourceFile: string;
  lineNum = 1;

  constructor(
    name: Atom,
    options: {
      source: string;
      sourceFile: string;
    }
  ) {
    this.name = name;
    this.source = options.source;
    this.sourceFile = options.sourceFile;
  }
}


export function createNewFunctionBytecode() {

}