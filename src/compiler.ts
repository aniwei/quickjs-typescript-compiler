import ts from 'typescript';
import { FunctionDef } from './functionDef';
import { getTypeScriptCompilerOptions } from './utils'
import { ScopeManager } from './scopeManager';
import { AtomTable } from './atoms';
import { Opcode } from './opcodes';

export class Compiler {
  private program: ts.Program;
  private checker: ts.TypeChecker;
  private atomTable = new AtomTable();
  private globalFunctionDef: FunctionDef;
  private scopeManager: ScopeManager;

  constructor(fileNames: string[], options?: ts.CompilerOptions) {
    this.program = ts.createProgram(fileNames, options || getTypeScriptCompilerOptions());
    this.checker = this.program.getTypeChecker();
    this.globalFunctionDef = new FunctionDef(null, this.atomTable);
    this.scopeManager = new ScopeManager(this.globalFunctionDef);
    this.scopeManager.createNewScope(true); // Create global scope

    // Add filename as the first atom, as QuickJS does.
    if (fileNames.length > 0) {
      this.globalFunctionDef.funcName = this.atomTable.addAtom(fileNames[0]);
    }
  }

  compile(fileName: string): FunctionDef | undefined {
    const sourceFile = this.program.getSourceFile(fileName);
    if (!sourceFile) {
      return undefined;
    }

    // Add QuickJS global initialization boilerplate
    const endLabel = this.globalFunctionDef.createNewLabel();
    this.globalFunctionDef.emitOp(Opcode.PUSH_THIS);
    this.globalFunctionDef.emitJump(Opcode.IF_FALSE, endLabel);
    this.globalFunctionDef.emitOp(Opcode.RETURN_UNDEF);
    this.globalFunctionDef.bindLabel(endLabel);

    this.compileStatements(this.globalFunctionDef, sourceFile.statements);

    return this.globalFunctionDef;
  }

  private compileStatements(fd: FunctionDef, statements: ts.NodeArray<ts.Statement>) {
    for (const statement of statements) {
      this.compileStatement(fd, statement);
    }
  }

  private compileStatement(fd: FunctionDef, statement: ts.Statement) {
    switch (statement.kind) {
      case ts.SyntaxKind.VariableStatement:
        return this.compileVariableStatement(fd, statement as ts.VariableStatement);
      case ts.SyntaxKind.ExpressionStatement:
        return this.compileExpressionStatement(fd, statement as ts.ExpressionStatement);
      case ts.SyntaxKind.ForOfStatement:
        return this.compileForOfStatement(fd, statement as ts.ForOfStatement);
      // TODO: implement other statement compilation
    }
  }

  private compileExpressionStatement(fd: FunctionDef, statement: ts.ExpressionStatement) {
    this.compileExpression(fd, statement.expression);
    fd.emitOp(Opcode.DROP); // Pop the result of the expression
  }

  private compileVariableStatement(fd: FunctionDef, statement: ts.VariableStatement) {
    const isConst = (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
    const isLet = (statement.declarationList.flags & ts.NodeFlags.Let) !== 0;

    for (const decl of statement.declarationList.declarations) {
      const varName = decl.name.getText();
      const varIdx = this.scopeManager.addScopeVar(varName, isLet, isConst);

      if (decl.initializer) {
        this.compileExpression(fd, decl.initializer);
      } else {
        fd.emitOp(Opcode.UNDEFINED);
      }

      if (isLet || isConst) {
        fd.emitOp(Opcode.PUT_VAR_REF);
        fd.emitU16(varIdx);
      } else {
        fd.emitOp(Opcode.PUT_VAR);
        fd.emitU16(varIdx);
      }
    }
  }

  private compileForOfStatement(fd: FunctionDef, statement: ts.ForOfStatement) {
    // Based on js_parse_for_in_of in QuickJS's parser.c

    // 1. Handle variable declaration `const item`
    const initializer = statement.initializer as ts.VariableDeclarationList;
    const decl = initializer.declarations[0];
    const varName = (decl.name as ts.Identifier).text;
    const isConst = (initializer.flags & ts.NodeFlags.Const) !== 0;
    const isLet = (initializer.flags & ts.NodeFlags.Let) !== 0;

    this.scopeManager.addVar(varName, isLet, isConst);
    const varIndex = this.scopeManager.findVar(varName);
    if (varIndex === -1) {
      throw new Error(`Failed to declare variable ${varName} in for..of`);
    }

    // 2. `set_loc_uninitialized <item>`
    fd.emitOp(Opcode.SET_LOC_UNINITIALIZED);
    fd.emitU16(varIndex);

    // 3. Compile `arr` expression to get the iterable
    this.compileExpression(fd, statement.expression);

    // 4. `for_of_start`
    fd.emitOp(Opcode.FOR_OF_START);

    const loopBodyLabel = fd.createNewLabel();
    const loopCheckLabel = fd.createNewLabel();

    // 5. `goto` to the check at the end of the loop
    fd.emitJump(Opcode.GOTO, loopCheckLabel);

    // 6. Bind the label for the loop body
    fd.bindLabel(loopBodyLabel);

    // 7. `put_loc <item>` - Assign the iterated value to the loop variable
    fd.emitOp(Opcode.PUT_LOC);
    fd.emitU16(varIndex);

    // 8. Compile the loop body statement
    this.compileStatement(fd, statement.statement);

    // 9. Bind the label for the loop check
    fd.bindLabel(loopCheckLabel);

    // 10. `for_of_next 0`
    fd.emitOp(Opcode.FOR_OF_NEXT);
    fd.emitU8(0); // stack_level

    // 11. `if_false <loop_body>` - If iterator is not done, jump to body
    // Note: QuickJS uses if_false, which jumps if the value is true (boolean is inverted).
    fd.emitJump(Opcode.IF_FALSE, loopBodyLabel);

    // 12. Clean up the iterator
    fd.emitOp(Opcode.DROP);
    fd.emitOp(Opcode.ITERATOR_CLOSE);
  }

  private compileExpression(fd: FunctionDef, expr: ts.Expression) {
    switch (expr.kind) {
      case ts.SyntaxKind.NumericLiteral:
        return this.compileNumericLiteral(fd, expr as ts.NumericLiteral);
      case ts.SyntaxKind.StringLiteral:
        return this.compileStringLiteral(fd, expr as ts.StringLiteral);
      case ts.SyntaxKind.BinaryExpression:
        return this.compileBinaryExpression(fd, expr as ts.BinaryExpression);
      case ts.SyntaxKind.Identifier:
        return this.compileIdentifier(fd, expr as ts.Identifier);
      case ts.SyntaxKind.ArrayLiteralExpression:
        return this.compileArrayLiteralExpression(fd, expr as ts.ArrayLiteralExpression);
      case ts.SyntaxKind.PropertyAccessExpression:
        return this.compilePropertyAccessExpression(fd, expr as ts.PropertyAccessExpression);
      case ts.SyntaxKind.CallExpression:
        return this.compileCallExpression(fd, expr as ts.CallExpression);
      // TODO: implement other expression compilation
    }
  }

  private compileCallExpression(fd: FunctionDef, expr: ts.CallExpression) {
    const isMethodCall = ts.isPropertyAccessExpression(expr.expression);

    // For method calls, the object is the `this` value.
    if (isMethodCall) {
      this.compileExpression(fd, expr.expression.expression);
    } else {
      // For regular function calls, `this` is undefined in strict mode.
      fd.emitOp(Opcode.UNDEFINED);
    }

    // The function to call (e.g., the result of property access)
    this.compileExpression(fd, expr.expression);

    // Arguments
    for (const arg of expr.arguments) {
      this.compileExpression(fd, arg);
    }

    if (isMethodCall) {
      fd.emitOp(Opcode.CALL_METHOD);
    } else {
      fd.emitOp(Opcode.CALL);
    }
    fd.emitU16(expr.arguments.length);
  }

  private compilePropertyAccessExpression(fd: FunctionDef, expr: ts.PropertyAccessExpression) {
    this.compileExpression(fd, expr.expression);
    const propName = expr.name.text;
    const atom = this.atomTable.getAtom(propName);
    this.scopeManager.addVar(propName, false, false); // Ensure atom is in var list
    fd.emitOp(Opcode.GET_FIELD2);
    fd.emitU32(atom);
  }

  private compileIdentifier(fd: FunctionDef, expr: ts.Identifier) {
    const varName = expr.text;
    const scope = this.scopeManager.findScopeFor(varName);

    if (!scope || scope.isGlobal) {
      // Handle globals like 'console'
      const atom = this.atomTable.getAtom(varName);
      this.scopeManager.addVar(varName, false, false); // Ensure atom is in var list
      fd.emitOp(Opcode.GET_VAR);
      fd.emitU32(atom);
      return;
    }

    const varInfo = scope.getVar(varName, this.globalFunctionDef);
    if (varInfo) {
      if (varInfo.isLexical) {
        fd.emitOp(Opcode.GET_LOC_CHECK);
        fd.emitU16(varInfo.index);
      } else {
        fd.emitOp(Opcode.GET_LOC);
        fd.emitU16(varInfo.index);
      }
    } else {
      // Fallback for variables not found in scope, might be a global
      const atom = this.atomTable.getAtom(varName);
      this.scopeManager.addVar(varName, false, false);
      fd.emitOp(Opcode.GET_VAR);
      fd.emitU32(atom);
    }
  }

  private compileArrayLiteralExpression(fd: FunctionDef, expr: ts.ArrayLiteralExpression) {
    const elements = expr.elements;
    for (const element of elements) {
      this.compileExpression(fd, element);
    }
    fd.emitOp(Opcode.ARRAY_FROM);
    fd.emitU32(elements.length);
  }

  private compileBinaryExpression(fd: FunctionDef, expr: ts.BinaryExpression) {
    this.compileExpression(fd, expr.left);
    this.compileExpression(fd, expr.right);

    switch (expr.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        fd.emitOp(Opcode.ADD);
        break;
      case ts.SyntaxKind.MinusToken:
        fd.emitOp(Opcode.SUB);
        break;
      case ts.SyntaxKind.AsteriskToken:
        fd.emitOp(Opcode.MUL);
        break;
      case ts.SyntaxKind.SlashToken:
        fd.emitOp(Opcode.DIV);
        break;
      // TODO: Add other binary operators
      default:
        // console.warn(`Unsupported binary operator: ${ts.SyntaxKind[expr.operatorToken.kind]}`);
        break;
    }
  }

  private compileNumericLiteral(fd: FunctionDef, expr: ts.NumericLiteral) {
    const value = Number(expr.text);
    if (Number.isInteger(value)) {
      if (value === -1) {
        fd.emitOp(Opcode.PUSH_MINUS1);
      } else if (value >= 0 && value <= 7) {
        fd.emitOp(Opcode.PUSH_0 + value);
      } else if (value >= -128 && value <= 127) {
        fd.emitOp(Opcode.PUSH_I8);
        fd.emitI8(value);
      } else if (value >= -32768 && value <= 32767) {
        fd.emitOp(Opcode.PUSH_I16);
        fd.emitI16(value);
      } else if (value >= -2147483648 && value <= 2147483647) {
        fd.emitOp(Opcode.PUSH_I32);
        fd.emitI32(value);
      } else {
        fd.emitOp(Opcode.PUSH_CONST);
        const constIdx = fd.addConst(value);
        fd.emitU32(constIdx);
      }
    } else {
      fd.emitOp(Opcode.PUSH_CONST);
      const constIdx = fd.addConst(value);
      fd.emitU32(constIdx);
    }
  }

  private compileStringLiteral(fd: FunctionDef, expr: ts.StringLiteral) {
    const constIdx = fd.addConst(expr.text);
    fd.emitOp(Opcode.PUSH_CONST);
    fd.emitU32(constIdx);
  }
}
