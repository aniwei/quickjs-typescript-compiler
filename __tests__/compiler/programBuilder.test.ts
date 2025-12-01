import { AtomManager } from '../../src/atom';
import { ParseState } from '../../src/compiler/parseState';
import { ProgramBuilder } from '../../src/compiler/programBuilder';
import { TokenValue } from '../../src/compiler/tokenMap';

const ctx = { atomManager: new AtomManager() };

const createBuilder = (code: string) => {
  const state = new ParseState(ctx, code, 'fixture.ts');
  return { state, builder: new ProgramBuilder(state, state.sourceFile) };
};

describe('ProgramBuilder', () => {
  it('produces source element plan aligned with tokens', () => {
    const { state, builder } = createBuilder('function foo() {}\nconst x = 1;\n');
    const plan = builder.buildProgramPlan();

    expect(plan.length).toBe(2);
    expect(plan[0].tokenValue).toBe(TokenValue.TOK_FUNCTION);
    expect(plan[1].tokenValue).toBe(TokenValue.TOK_CONST);
    expect(plan[0].tokenPtr).toBe(plan[0].node.getStart());
    expect(state.token.val).toBe(TokenValue.TOK_EOF);
  });

  it('advances through nested blocks without missing tokens', () => {
    const code = 'if (true) {\n  while(false) {}\n}\n';
    const { state, builder } = createBuilder(code);
    const plan = builder.buildProgramPlan();

    expect(plan.length).toBe(1);
    expect(plan[0].tokenValue).toBe(TokenValue.TOK_IF);
    expect(state.token.val).toBe(TokenValue.TOK_EOF);
  });
});
