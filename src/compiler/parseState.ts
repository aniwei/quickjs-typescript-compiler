import ts from 'typescript';
import { AtomManager, JSAtom, JS_ATOM_NULL } from '../atom';
import { GetLineColCache, JSFunctionDef } from '../functionDef';
import { syntaxKindToToken, TokenValue } from './tokenMap';

export interface ParseToken {
  val: number;
  ptr: number;
  raw?: string;
  atom?: JSAtom;
}

export interface TsAstCursor {
  node: ts.Node;
  parent: ts.Node | null;
}

/** Minimal TypeScript port of QuickJS JSParseState. */
export class ParseState {
  ctx: any;
  filename: string;
  sourceFile: ts.SourceFile;
  cursor: TsAstCursor;
  private scanner: ts.Scanner;
  private atomManager: AtomManager | null;
  private sourceText: string;

  token: ParseToken = { val: -1, ptr: 0 };
  gotLineFeed = false;
  lastPtr = 0;
  bufStart = 0;
  bufPtr = 0;
  bufEnd = 0;

  curFunc: JSFunctionDef | null = null;
  isModule = false;
  allowHtmlComments = true;
  extJson = false;
  getLineColCache: GetLineColCache;

  constructor(ctx: any, sourceText: string, filename: string, sourceFile?: ts.SourceFile) {
    this.ctx = ctx;
    this.filename = filename;
    this.sourceFile = sourceFile ?? ts.createSourceFile(filename, sourceText, ts.ScriptTarget.Latest, true);
    this.sourceText = sourceText;
    this.cursor = { node: this.sourceFile, parent: null };
    this.bufStart = 0;
    this.bufPtr = 0;
    this.bufEnd = sourceText.length;
    this.atomManager = ctx?.atomManager ?? null;
    this.getLineColCache = {
      ptr: 0,
      lineNum: 0,
      colNum: 0,
      bufStart: 0,
    };
    this.scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.Standard, sourceText);
    this.skipShebang(sourceText);
    if (this.bufPtr > 0)
      this.scanner.setTextPos(this.bufPtr);
    this.token.ptr = this.bufPtr;
    this.lastPtr = this.bufPtr;
  }

  setCurrentFunction(fd: JSFunctionDef) {
    this.curFunc = fd;
  }

  /** QuickJS-compatible shebang skipper. */
  private skipShebang(text: string) {
    if (!text.startsWith('#!'))
      return;
    let idx = 2;
    while (idx < text.length) {
      const ch = text.charCodeAt(idx);
      if (ch === 0x0a || ch === 0x0d) {
        idx++;
        break;
      }
      idx++;
    }
    this.bufPtr = idx;
    this.token.ptr = idx;
  }

  nextToken(): number {
    if (this.bufPtr >= this.bufEnd) {
      this.token.val = TokenValue.TOK_EOF;
      this.token.ptr = this.bufEnd;
      this.token.raw = undefined;
      this.token.atom = undefined;
      return this.token.val;
    }

    let kind: ts.SyntaxKind;
    let tokenText = '';

    do {
      kind = this.scanner.scan();
      tokenText = this.scanner.getTokenText();
      // TypeScript doesn't expose shebang as token when skipTrivia=true, but guard anyway
      if (kind === ts.SyntaxKind.ShebangTrivia) {
        continue;
      }
      break;
    } while (true);

    const mapping = syntaxKindToToken(kind, tokenText);
    const tokenPos = this.scanner.getTokenPos();

    this.token.val = mapping.value;
    this.token.ptr = tokenPos;
    this.token.raw = tokenText || undefined;
    this.lastPtr = tokenPos;
    this.bufPtr = this.scanner.getTextPos();
    this.gotLineFeed = this.scanner.hasPrecedingLineBreak();

    if (mapping.classification === 'identifier' || mapping.classification === 'keyword') {
      if (this.atomManager) {
        const existing = this.atomManager.get(tokenText);
        this.token.atom = existing !== JS_ATOM_NULL ? existing : undefined;
      } else {
        this.token.atom = undefined;
      }
    } else {
      this.token.atom = undefined;
    }

    if (this.token.val === TokenValue.TOK_EOF) {
      this.bufPtr = this.bufEnd;
    }

    return this.token.val;
  }

  reparseIdentToken() {
    // Placeholder: QuickJS reparses identifier tokens when exiting inner functions.
    if (this.token.atom !== undefined) {
      this.token.val = TokenValue.TOK_IDENT;
    }
  }

  pushScope(): number {
    if (!this.curFunc)
      throw new Error('pushScope called without active function');
    return this.curFunc.enterScope();
  }

  popScope(): number {
    if (!this.curFunc)
      throw new Error('popScope called without active function');
    return this.curFunc.leaveScope();
  }
}
