import { JSFunctionDef } from '../functionDef';
import { Opcode } from '../env';

export interface PendingLabel {
  addr: number;
  jumps: number[];
  jumps8: number[];
}

export type JumpSize = 'long' | 'short';

export class LabelManager {
  constructor(private getFunction: () => JSFunctionDef | null) {}

  createLabel(): PendingLabel {
    return {
      addr: -1,
      jumps: [],
      jumps8: [],
    };
  }

  markLabel(label: PendingLabel) {
    const func = this.getFunction();
    if (!func)
      return;

    label.addr = func.byteCode.size;
    for (const pos of label.jumps) {
      func.byteCode.patchU32(pos, label.addr - pos);
    }
    for (const pos of label.jumps8) {
      const diff = label.addr - pos;
      if (diff < -128 || diff > 127)
        throw new Error('Jump8 out of range');
      func.byteCode.patchU8(pos, diff & 0xff);
    }
    label.jumps = [];
    label.jumps8 = [];
  }

  emitJumpDisplacement(label: PendingLabel, size: JumpSize) {
    const func = this.getFunction();
    if (!func)
      return;

    if (label.addr !== -1) {
      const diff = label.addr - func.byteCode.size;
      if (size === 'short') {
        if (diff < -128 || diff > 127)
          throw new Error('Jump8 out of range');
        func.byteCode.putU8(diff & 0xff);
      } else {
        func.byteCode.putU32(diff);
      }
      return;
    }

    if (size === 'short') {
      label.jumps8.push(func.byteCode.size);
      func.byteCode.putU8(0);
    } else {
      label.jumps.push(func.byteCode.size);
      func.byteCode.putU32(0);
    }
  }
}
