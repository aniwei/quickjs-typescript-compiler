import ts from 'typescript';
import { ParseState } from './parseState';
import { TokenValue } from './tokenMap';

export interface SourceElementRecord {
  node: ts.Statement;
  tokenValue: number;
  tokenPtr: number;
}

export interface ProgramBuilderOptions {
  includeEndOfFile?: boolean;
}

/**
 * ProgramBuilder replays QuickJS js_parse_program/js_parse_source_element sequencing
 * by aligning ParseState tokens with the TypeScript AST statement list.
 */
export class ProgramBuilder {
  private records: SourceElementRecord[] | null = null;

  constructor(private parseState: ParseState, private sourceFile: ts.SourceFile) {}

  buildProgramPlan(options: ProgramBuilderOptions = {}): SourceElementRecord[] {
    if (this.records) return this.records;

  const statements = this.sourceFile.statements;
  this.records = [];

  this.ensureTokenInitialized();

    statements.forEach((stmt) => {
      this.syncToNodeStart(stmt);
      this.records!.push({
        node: stmt,
        tokenValue: this.parseState.token.val,
        tokenPtr: this.parseState.token.ptr,
      });
      this.advancePastNode(stmt);
    });

    if (options.includeEndOfFile) {
      this.ensureEofRecord();
    } else {
      this.ensureEof();
    }

    return this.records;
  }

  private ensureEofRecord() {
    if (this.parseState.token.val !== TokenValue.TOK_EOF) {
      this.advanceUntilEof();
    }
    const eofNode = ts.factory.createEmptyStatement();
    (eofNode as any).pos = this.sourceFile.end;
    (eofNode as any).end = this.sourceFile.end;
    this.records!.push({
      node: eofNode,
      tokenValue: TokenValue.TOK_EOF,
      tokenPtr: this.parseState.token.ptr,
    });
  }

  private ensureEof() {
    if (this.parseState.token.val !== TokenValue.TOK_EOF) {
      this.advanceUntilEof();
    }
  }

  private advanceUntilEof() {
    while (this.parseState.token.val !== TokenValue.TOK_EOF) {
      this.parseState.nextToken();
    }
  }

  private syncToNodeStart(node: ts.Node) {
    const target = node.getStart(this.sourceFile, false);
    this.ensureTokenInitialized();
    while (this.parseState.token.ptr < target && this.parseState.token.val !== TokenValue.TOK_EOF) {
      this.parseState.nextToken();
    }
  }

  private advancePastNode(node: ts.Node) {
    const end = node.getEnd();
    while (this.parseState.token.ptr < end && this.parseState.token.val !== TokenValue.TOK_EOF) {
      this.parseState.nextToken();
    }
  }

  private ensureTokenInitialized() {
    if (this.parseState.token.val === -1) {
      this.parseState.nextToken();
    }
  }
}
