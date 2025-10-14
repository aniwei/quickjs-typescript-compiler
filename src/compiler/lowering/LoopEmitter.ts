import * as ts from 'typescript';
import { LabelManager, LabelRef, LoweringContext } from './LoweringContext';

export interface LoopLabels {
  readonly entry: LabelRef;
  readonly test: LabelRef;
  readonly body: LabelRef;
  readonly update?: LabelRef;
  readonly exit: LabelRef;
}

export class LoopEmitter {
  private readonly labels: LabelManager;

  constructor(private readonly ctx: LoweringContext) {
    this.labels = ctx.labels;
  }

  /** Mirrors js_parse_while. */
  emitWhile(statement: ts.WhileStatement): void {
    void statement;
  throw new Error('LoopEmitter.emitWhile not implemented');
  }

  /** Mirrors js_parse_do. */
  emitDoWhile(statement: ts.DoStatement): void {
    void statement;
  throw new Error('LoopEmitter.emitDoWhile not implemented');
  }

  /** Mirrors js_parse_for for classic for loops. */
  emitFor(statement: ts.ForStatement): void {
    void statement;
  throw new Error('LoopEmitter.emitFor not implemented');
  }

  /** Mirrors js_parse_for_in_of. */
  emitForInOf(statement: ts.ForInStatement | ts.ForOfStatement): void {
    void statement;
    throw new Error('LoopEmitter.emitForInOf not implemented');
  }
}
