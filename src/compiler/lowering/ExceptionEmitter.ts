import * as ts from 'typescript';
import { LoweringContext } from './LoweringContext';

export class ExceptionEmitter {
  constructor(private readonly ctx: LoweringContext) {}

  /** Mirrors js_parse_try. */
  emitTryStatement(statement: ts.TryStatement): void {
    void statement;
  throw new Error('ExceptionEmitter.emitTryStatement not implemented');
  }

  /** Mirrors emit_throw. */
  emitThrowStatement(statement: ts.ThrowStatement): void {
    void statement;
    throw new Error('ExceptionEmitter.emitThrowStatement not implemented');
  }
}
