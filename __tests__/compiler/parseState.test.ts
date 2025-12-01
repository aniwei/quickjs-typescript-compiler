import { AtomManager } from '../../src/atom';
import { ParseState } from '../../src/compiler/parseState';
import { TokenValue } from '../../src/compiler/tokenMap';

describe('ParseState tokenization', () => {
  const ctx = { atomManager: new AtomManager() };

  const createState = (code: string) => new ParseState(ctx, code, 'fixture.ts');
  const codePoint = (ch: string) => ch.charCodeAt(0);

  it('emits QuickJS-compatible tokens for a simple function', () => {
    const state = createState('function foo() {\n  return 1;\n}\n');

    expect(state.nextToken()).toBe(TokenValue.TOK_FUNCTION);
    expect(state.nextToken()).toBe(TokenValue.TOK_IDENT);
    expect(state.token.atom).toBe(ctx.atomManager.get('foo'));
    expect(state.nextToken()).toBe(codePoint('('));
    expect(state.nextToken()).toBe(codePoint(')'));
    expect(state.nextToken()).toBe(codePoint('{'));

    const next = state.nextToken();
    expect(next).toBe(TokenValue.TOK_RETURN);
    expect(state.gotLineFeed).toBe(true);
  });

  it('can reparse keyword tokens back to identifiers', () => {
    const keywordState = createState('return foo;');
    expect(keywordState.nextToken()).toBe(TokenValue.TOK_RETURN);
    keywordState.reparseIdentToken();
    expect(keywordState.token.val).toBe(TokenValue.TOK_IDENT);
    expect(keywordState.token.atom).toBe(keywordState.ctx.atomManager.add('return'));
  });
});
