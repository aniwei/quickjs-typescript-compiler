import * as ts from 'typescript';
import { LoweringContext, OperandRef } from './LoweringContext';

export interface LValuePlan {
  readonly mode: 'reference' | 'direct';
  readonly target: OperandRef;
  readonly depth: number;
  commit(value: OperandRef): void;
  loadRef(): OperandRef;
  dispose(): void;
}

export class LValueBuilder {
  constructor(private readonly ctx: LoweringContext) {}

  /** Mirrors QuickJS get_lvalue/put_lvalue entry point. */
  build(node: ts.Expression, opts?: { allowReference?: boolean }): LValuePlan {
    void node;
    void opts;
  throw new Error('LValueBuilder.build not implemented');
  }

  emitDelete(node: ts.Expression): OperandRef {
    void node;
  throw new Error('LValueBuilder.emitDelete not implemented');
  }

  emitAssignment(
    node: ts.Expression,
    value: OperandRef,
    operator: ts.SyntaxKind | undefined,
  ): OperandRef {
    void node;
    void value;
    void operator;
    throw new Error('LValueBuilder.emitAssignment not implemented');
  }
}
