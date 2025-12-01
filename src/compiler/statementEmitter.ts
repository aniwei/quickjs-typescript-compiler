import ts from 'typescript';
import { Opcode } from '../env';
import { PendingLabel } from './labelManager';
import { BlockKind } from './scopeManager';
import { SourceElementRecord } from './programBuilder';
import { TokenValue } from './tokenMap';

export interface BreakableBlockOptions {
  breakLabel?: PendingLabel | null;
  continueLabel?: PendingLabel | null;
  finallyLabel?: PendingLabel | null;
  labelName?: string;
  hasIterator?: boolean;
  dropCount?: number;
  isRegularStatement?: boolean;
}

export interface StatementEmitterHost {
  compileStatement(node: ts.Node): void;
  compileBlock(node: ts.Block): void;
  compileVariableStatement(node: ts.VariableStatement): void;
  compileWhileStatement(node: ts.WhileStatement, labelName?: string): void;
  compileForStatement(node: ts.ForStatement, labelName?: string): void;
  compileForOfStatement(node: ts.ForOfStatement, labelName?: string): void;
  compileExpression(node: ts.Expression, isTail?: boolean, nameHint?: string, dropResult?: boolean): void;
  emitLineCol(pos: number, columnOffset?: number): void;
  emitOp(op: Opcode): void;
  emitJump(op: Opcode, label: PendingLabel): void;
  emitControlTransfer(labelName: string | undefined, isContinue: boolean): boolean;
  newLabel(): PendingLabel;
  emitLabel(label: PendingLabel): void;
  emitJump8(op: Opcode, label: PendingLabel): void;
  pushBreakableBlock(kind: BlockKind, options?: BreakableBlockOptions): void;
  popBlock(): void;
  enterScope(): number;
  leaveScope(): number;
  addLocalVar(name: string, isConst: boolean): number;
  emitPutLoc(idx: number): void;
  getLastOpcode(): number | undefined;
  assertLabelAvailable(labelName: string): void;
  isStrictMode(): boolean;
}

/**
 * QuickJS js_parse_statement migration surface. Consumes SourceElementRecord entries
 * produced by ProgramBuilder and dispatches to the TypeScriptCompiler host
 * according to the leading token (TOK_*), matching the original parser switch.
 *
 * Each handled TOK case is implemented here so it can be reused both for
 * ProgramBuilder-driven execution and nested statements compiled via the
 * legacy TypeScript AST traversal.
 */
export class StatementEmitter {
  constructor(private host: StatementEmitterHost) {}

  emit(record: SourceElementRecord): boolean {
    const openBrace = '{'.charCodeAt(0);
    switch (record.tokenValue) {
      case TokenValue.TOK_IF:
        if (ts.isIfStatement(record.node)) {
          this.emitIfStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_RETURN:
        if (ts.isReturnStatement(record.node)) {
          this.emitReturnStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_BREAK:
        if (ts.isBreakStatement(record.node)) {
          this.emitBreakStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_CONTINUE:
        if (ts.isContinueStatement(record.node)) {
          this.emitContinueStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_SWITCH:
        if (ts.isSwitchStatement(record.node)) {
          this.emitSwitchStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_TRY:
        if (ts.isTryStatement(record.node)) {
          this.emitTryStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_WITH:
        if (ts.isWithStatement(record.node)) {
          this.emitWithStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_THROW:
        if (ts.isThrowStatement(record.node)) {
          this.emitThrowStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_DEBUGGER:
        if (ts.isDebuggerStatement(record.node)) {
          this.emitDebuggerStatement();
          return true;
        }
        break;
      case TokenValue.TOK_VAR:
      case TokenValue.TOK_CONST:
      case TokenValue.TOK_LET:
        if (ts.isVariableStatement(record.node)) {
          this.host.compileVariableStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_WHILE:
        if (ts.isWhileStatement(record.node)) {
          this.host.compileWhileStatement(record.node);
          return true;
        }
        break;
      case TokenValue.TOK_FOR:
        if (ts.isForOfStatement(record.node)) {
          this.host.compileForOfStatement(record.node);
          return true;
        }
        if (ts.isForStatement(record.node)) {
          this.host.compileForStatement(record.node);
          return true;
        }
        break;
      default:
        if (record.tokenValue === openBrace && ts.isBlock(record.node)) {
          this.host.compileBlock(record.node);
          return true;
        }
        break;
    }
    if (ts.isLabeledStatement(record.node)) {
      this.emitLabeledStatement(record.node);
      return true;
    }
    return false;
  }

  emitReturnStatement(node: ts.ReturnStatement) {
    if (node.expression) {
      this.host.compileExpression(node.expression);
      this.host.emitLineCol(node.getStart());
      this.host.emitOp(Opcode.OP_return);
    } else {
      this.host.emitLineCol(node.getStart());
      this.host.emitOp(Opcode.OP_return_undef);
    }
  }

  emitIfStatement(node: ts.IfStatement) {
    const elseLabel = this.host.newLabel();
    const endLabel = this.host.newLabel();

    this.host.compileExpression(node.expression);
    this.host.emitJump8(Opcode.OP_if_false8, elseLabel);

    this.host.compileStatement(node.thenStatement);

    if (node.elseStatement) {
      this.host.emitJump8(Opcode.OP_goto8, endLabel);
    }

    this.host.emitLabel(elseLabel);

    if (node.elseStatement) {
      this.host.compileStatement(node.elseStatement);
      this.host.emitLabel(endLabel);
    }
  }

  emitBreakStatement(node: ts.BreakStatement) {
    if (!this.host.emitControlTransfer(node.label?.text, false)) {
      console.error('Break target not found');
    }
  }

  emitContinueStatement(node: ts.ContinueStatement) {
    if (!this.host.emitControlTransfer(node.label?.text, true)) {
      console.error('Continue target not found');
    }
  }

  emitThrowStatement(node: ts.ThrowStatement) {
    if (node.expression) {
      this.host.compileExpression(node.expression);
    } else {
      this.host.emitOp(Opcode.OP_undefined);
    }
    this.host.emitOp(Opcode.OP_throw);
  }

  emitDebuggerStatement() {
    this.host.emitOp(Opcode.OP_debugger);
  }

  emitWithStatement(node: ts.WithStatement) {
    if (this.host.isStrictMode()) {
      throw new Error('`with` statements are not allowed in strict mode per QuickJS semantics.');
    }
    this.host.compileExpression(node.expression);
    this.host.compileStatement(node.statement);
  }

  emitSwitchStatement(node: ts.SwitchStatement) {
    const clauses = node.caseBlock.clauses;
    this.host.compileExpression(node.expression);

    if (clauses.length === 0) {
      this.host.emitOp(Opcode.OP_drop);
      return;
    }

    const endLabel = this.host.newLabel();
    const bodyLabels = clauses.map(() => this.host.newLabel());
    const checkLabels = clauses.map(() => this.host.newLabel());

    this.host.pushBreakableBlock(BlockKind.SWITCH, {
      breakLabel: endLabel,
      dropCount: 1,
      isRegularStatement: false,
    });

    let defaultIndex = -1;
    for (let i = 0; i < clauses.length; i++) {
      if (ts.isDefaultClause(clauses[i])) {
        defaultIndex = i;
        break;
      }
    }

    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i];
      if (ts.isCaseClause(clause)) {
        this.host.emitLabel(checkLabels[i]);
        this.host.emitOp(Opcode.OP_dup);
        this.host.compileExpression(clause.expression);
        this.host.emitOp(Opcode.OP_strict_eq);

        let nextCheckLabel = defaultIndex !== -1 ? bodyLabels[defaultIndex]! : endLabel;
        for (let j = i + 1; j < clauses.length; j++) {
          if (ts.isCaseClause(clauses[j])) {
            nextCheckLabel = checkLabels[j];
            break;
          }
        }

        this.host.emitJump8(Opcode.OP_if_false8, nextCheckLabel);
        this.host.emitLabel(bodyLabels[i]);
        clause.statements.forEach(stmt => this.host.compileStatement(stmt));

        if (!this.isReturnOp(this.host.getLastOpcode())) {
          if (i + 1 < clauses.length) {
            if (ts.isCaseClause(clauses[i + 1])) {
              this.host.emitJump8(Opcode.OP_goto8, bodyLabels[i + 1]);
            }
          } else {
            this.host.emitJump8(Opcode.OP_goto8, endLabel);
          }
        }
      } else {
        this.host.emitLabel(bodyLabels[i]);
        clause.statements.forEach(stmt => this.host.compileStatement(stmt));
        if (!this.isReturnOp(this.host.getLastOpcode())) {
          if (i + 1 < clauses.length && ts.isCaseClause(clauses[i + 1])) {
            this.host.emitJump8(Opcode.OP_goto8, bodyLabels[i + 1]);
          } else {
            this.host.emitJump8(Opcode.OP_goto8, endLabel);
          }
        }
      }
    }

    const lastClauseReturns = this.isReturnOp(this.host.getLastOpcode());
    const endLabelTargeted = endLabel.jumps.length > 0 || endLabel.jumps8.length > 0;
    this.host.emitLabel(endLabel);
    if (!lastClauseReturns || endLabelTargeted) {
      this.host.emitOp(Opcode.OP_drop);
    }
    this.host.popBlock();
  }

  emitLabeledStatement(node: ts.LabeledStatement) {
    const labelName = node.label.text;
    this.host.assertLabelAvailable(labelName);

    const statement = node.statement;
    if (ts.isForStatement(statement)) {
      this.host.compileForStatement(statement, labelName);
      return;
    }
    if (ts.isForOfStatement(statement)) {
      this.host.compileForOfStatement(statement, labelName);
      return;
    }
    if (ts.isWhileStatement(statement)) {
      this.host.compileWhileStatement(statement, labelName);
      return;
    }

    const breakLabel = this.host.newLabel();
    this.host.pushBreakableBlock(BlockKind.LABEL, {
      labelName,
      breakLabel,
      isRegularStatement: true,
    });
    this.host.compileStatement(statement);
    this.host.emitLabel(breakLabel);
    this.host.popBlock();
  }

  emitTryStatement(node: ts.TryStatement) {
    const catchLabel = this.host.newLabel();
    const finallyLabel = node.finallyBlock ? this.host.newLabel() : null;
    const endLabel = this.host.newLabel();

    this.host.emitJump(Opcode.OP_catch, catchLabel);
    const tryOptions: BreakableBlockOptions = finallyLabel ? { dropCount: 1, finallyLabel } : { dropCount: 1 };
    this.host.pushBreakableBlock(BlockKind.TRY, tryOptions);
    this.host.compileStatement(node.tryBlock);
    this.host.popBlock();

    if (!this.isTerminal(node.tryBlock)) {
      this.host.emitOp(Opcode.OP_drop);
      if (finallyLabel) {
        this.host.emitOp(Opcode.OP_undefined);
        this.host.emitJump(Opcode.OP_gosub, finallyLabel);
        this.host.emitOp(Opcode.OP_drop);
      }
      this.host.emitJump8(Opcode.OP_goto8, endLabel);
    }

    this.host.emitLabel(catchLabel);
    if (node.catchClause) {
      this.host.enterScope();

      const catchName = node.catchClause.variableDeclaration
        ? this.getCatchIdentifier(node.catchClause.variableDeclaration.name)
        : null;
      if (catchName) {
        const idx = this.host.addLocalVar(catchName, false);
        this.host.emitPutLoc(idx);
      } else {
        this.host.emitOp(Opcode.OP_drop);
      }

      if (finallyLabel) {
        const catchFinallyLabel = this.host.newLabel();
        this.host.emitJump(Opcode.OP_catch, catchFinallyLabel);
        const catchOptions: BreakableBlockOptions = { dropCount: 1, finallyLabel };
        this.host.pushBreakableBlock(BlockKind.TRY, catchOptions);
        this.host.compileStatement(node.catchClause.block);
        this.host.popBlock();
        this.host.emitOp(Opcode.OP_drop);
        this.host.emitOp(Opcode.OP_undefined);
        this.host.emitJump(Opcode.OP_gosub, finallyLabel);
        this.host.emitOp(Opcode.OP_drop);
        this.host.emitJump8(Opcode.OP_goto8, endLabel);

        this.host.emitLabel(catchFinallyLabel);
        this.host.emitJump(Opcode.OP_gosub, finallyLabel);
        this.host.emitOp(Opcode.OP_throw);
      } else {
        const catchOnlyOptions: BreakableBlockOptions = { dropCount: 1 };
        this.host.pushBreakableBlock(BlockKind.TRY, catchOnlyOptions);
        this.host.compileStatement(node.catchClause.block);
        this.host.popBlock();
        this.host.emitJump8(Opcode.OP_goto8, endLabel);
      }

      this.host.leaveScope();
    } else if (finallyLabel) {
      this.host.emitJump(Opcode.OP_gosub, finallyLabel);
      this.host.emitOp(Opcode.OP_throw);
    }

    if (finallyLabel && node.finallyBlock) {
      this.host.emitLabel(finallyLabel);
      this.host.pushBreakableBlock(BlockKind.FINALLY, { dropCount: 2 });
      this.host.compileStatement(node.finallyBlock);
      this.host.popBlock();
      this.host.emitOp(Opcode.OP_ret);
    }

    this.host.emitLabel(endLabel);
  }

  private getCatchIdentifier(name: ts.BindingName): string | null {
    if (ts.isIdentifier(name)) {
      return name.text;
    }
    return null;
  }

  private isTerminal(node: ts.Node): boolean {
    if (ts.isThrowStatement(node) || ts.isReturnStatement(node)) {
      return true;
    }
    if (ts.isBreakStatement(node) || ts.isContinueStatement(node)) {
      return true;
    }
    if (ts.isBlock(node)) {
      return node.statements.length > 0 && this.isTerminal(node.statements[node.statements.length - 1]);
    }
    if (ts.isIfStatement(node)) {
      return this.isTerminal(node.thenStatement) && (!!node.elseStatement && this.isTerminal(node.elseStatement));
    }
    return false;
  }

  private isReturnOp(op?: number): boolean {
    if (op === undefined)
      return false;
    switch (op) {
      case Opcode.OP_return:
      case Opcode.OP_return_undef:
      case Opcode.OP_return_async:
      case Opcode.OP_throw:
      case Opcode.OP_tail_call:
        return true;
      default:
        return false;
    }
  }
}
