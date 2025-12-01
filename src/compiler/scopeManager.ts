import { JSAtom, JS_ATOM_NULL } from '../atom';
import { JSFunctionDef } from '../functionDef';
import { PendingLabel } from './labelManager';

export enum BlockKind {
  REGULAR = 'regular',
  LOOP = 'loop',
  LABEL = 'label',
  SWITCH = 'switch',
  TRY = 'try',
  FINALLY = 'finally',
}

export interface BlockEnv {
  kind: BlockKind;
  labelName: JSAtom;
  breakLabel: PendingLabel | null;
  continueLabel: PendingLabel | null;
  finallyLabel: PendingLabel | null;
  dropCount: number;
  scopeLevel: number;
  hasIterator: boolean;
  isRegularStatement: boolean;
}

export interface PushBlockOptions {
  labelName?: JSAtom;
  breakLabel?: PendingLabel | null;
  continueLabel?: PendingLabel | null;
  finallyLabel?: PendingLabel | null;
  dropCount?: number;
  hasIterator?: boolean;
  isRegularStatement?: boolean;
}

export class ScopeManager {
  private blockStack: BlockEnv[] = [];

  constructor(private getFunction: () => JSFunctionDef | null) {}

  enterScope(): number {
    const func = this.getFunction();
    if (!func)
      return -1;
    return func.enterScope();
  }

  leaveScope(): number {
    const func = this.getFunction();
    if (!func)
      return -1;
    return func.leaveScope();
  }

  pushBlock(kind: BlockKind, options: PushBlockOptions = {}) {
    const func = this.getFunction();
    if (!func)
      return;
    const block: BlockEnv = {
      kind,
      labelName: options.labelName ?? JS_ATOM_NULL,
      breakLabel: options.breakLabel ?? null,
      continueLabel: options.continueLabel ?? null,
      finallyLabel: options.finallyLabel ?? null,
      dropCount: options.dropCount ?? 0,
      scopeLevel: func.scopeLevel,
      hasIterator: options.hasIterator ?? false,
      isRegularStatement: options.isRegularStatement ?? false,
    };
    this.blockStack.push(block);
  }

  popBlock(): BlockEnv | undefined {
    return this.blockStack.pop();
  }

  currentBlock(): BlockEnv | null {
    if (this.blockStack.length === 0)
      return null;
    return this.blockStack[this.blockStack.length - 1];
  }

  setTopDropCount(count: number) {
    const block = this.currentBlock();
    if (block)
      block.dropCount = Math.max(0, count);
  }

  adjustTopDropCount(delta: number) {
    const block = this.currentBlock();
    if (block)
      block.dropCount = Math.max(0, block.dropCount + delta);
  }

  getBlocks(): readonly BlockEnv[] {
    return this.blockStack;
  }

  findBreakTarget(labelName: JSAtom | null, isContinue: boolean): BlockEnv | null {
    for (let i = this.blockStack.length - 1; i >= 0; i--) {
      const block = this.blockStack[i];
      if (isContinue) {
        if (!block.continueLabel)
          continue;
        if (!labelName || block.labelName === labelName)
          return block;
      } else {
        if (!block.breakLabel)
          continue;
        if ((!labelName && !block.isRegularStatement) || block.labelName === labelName)
          return block;
      }
    }
    return null;
  }
}
