import ts from 'typescript'
import {
  IRProgram,
  IRDeclareLocal,
  IRLoadConst,
  IRGetLocal,
  IRSetLocal,
  IRAdd,
  IRLessThan,
  IRLessEqual,
  IRGreaterThan,
  IRGreaterEqual,
  IRArrayNew,
  IRArrayPush,
  IRGetField2,
  IRMethodCall,
  IRDrop,
  IRIncLocal,
  IRJump,
  IRJumpIfFalse,
  IRLabel,
  IRReturnUndef,
  IREqual,
  IRStrictEqual
} from './ir'
import { IRToNumber, IRToString } from './ir'

export class Compiler {
  private ir: IRProgram = []
  private locals = new Set<string>()
  // 简单类型跟踪：仅标注本地变量是否可静态认为是 number
  private localType = new Map<string, 'number' | 'string' | 'unknown'>()
  private checker?: ts.TypeChecker
  private sf?: ts.SourceFile

  compileToIR (sourceCode: string, fileName = 'input.ts'): IRProgram {
    const sf = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS)
    this.sf = sf
    // 构建仅包含该文件的 Program 与 TypeChecker（noLib），用于更精准类型判定
    try {
      const options: ts.CompilerOptions = { noLib: true, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
      const mem = new Map<string, string>([[fileName, sourceCode]])
      const host: ts.CompilerHost = {
        fileExists: (f) => f === fileName || false,
        readFile: (f) => (f === fileName ? sourceCode : undefined),
        getSourceFile: (f, lang) => (f === fileName ? sf : undefined) as any,
        writeFile: () => {},
        getDefaultLibFileName: () => 'lib.d.ts',
        getCurrentDirectory: () => process.cwd(),
        getDirectories: () => [],
        getCanonicalFileName: (f) => f,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => '\n'
      }
      const program = ts.createProgram([fileName], options, host)
      this.checker = program.getTypeChecker()
    } catch {}

    sf.forEachChild(node => this.processTopLevel(node))
    this.ir.push(<IRReturnUndef>{ kind: 'ReturnUndef' })
    return this.ir
  }

  // ---------- helpers ----------
  private declare (decl: ts.VariableDeclaration) {
    const name = decl.name.getText()
    if (!this.locals.has(name)) {
      this.locals.add(name)
      this.ir.push(<IRDeclareLocal>{ kind: 'DeclareLocal', name })
      switch (decl.type?.kind) {
        case ts.SyntaxKind.NumberKeyword:
          this.localType.set(name, 'number')
          break
        case ts.SyntaxKind.StringKeyword:
          this.localType.set(name, 'string')
          break
        default:
          this.localType.set(name, 'unknown')
          break
      }
    }
  }

  private push (n: any) { this.ir.push(n) }

  // ---------- dispatch ----------
  private processTopLevel (node: ts.Node) {
    if (ts.isVariableStatement(node)) return this.processVariableStatement(node)
    if (ts.isForStatement(node)) return this.processForStatement(node)
    if (ts.isIfStatement(node)) return this.processIfStatement(node)
    if (ts.isWhileStatement(node)) return this.processWhileStatement(node)
  }

  private processVariableStatement (node: ts.VariableStatement) {
    node.declarationList.declarations.forEach(decl => {
      if (!ts.isIdentifier(decl.name)) {
        return
      }

      const name = decl.name.text
      this.declare(decl)
      
      if (decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
        this.push(<IRArrayNew>{ kind: 'ArrayNew', initialCapacity: 0 })
        this.push(<IRSetLocal>{ kind: 'SetLocal', name })
        
        this.localType.set(name, 'unknown')
      } else if (decl.initializer && ts.isNumericLiteral(decl.initializer)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(decl.initializer.text) })
        this.push(<IRSetLocal>{ kind: 'SetLocal', name })
        
        this.localType.set(name, 'number')
      } else if (decl.initializer && ts.isStringLiteral(decl.initializer)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: decl.initializer.text })
        this.push(<IRSetLocal>{ kind: 'SetLocal', name })
        this.localType.set(name, 'string')
      }
    })
  }

  private processForStatement (node: ts.ForStatement) {
    // init
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      node.initializer.declarations.forEach(decl => {
        if (!ts.isIdentifier(decl.name)) return
        const name = decl.name.text

        this.declare(decl)
        if (decl.initializer && ts.isNumericLiteral(decl.initializer)) {
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(decl.initializer.text) })
          this.push(<IRSetLocal>{ kind: 'SetLocal', name })
        }
      })
    }

    const loopStart = 'L_loop_start'
    const loopEnd = 'L_loop_end'
    this.push(<IRLabel>{ kind: 'Label', name: loopStart })
    // condition (only i < N numeric for now)
    if (node.condition && ts.isBinaryExpression(node.condition)) {
      this.processLoopCondition(node.condition, loopEnd)
    }
    // body
    if (node.statement && ts.isBlock(node.statement)) {
      node.statement.statements.forEach(st => this.processLoopBodyStatement(st))
    }
    // incrementor (i++)
    if (node.incrementor && ts.isPostfixUnaryExpression(node.incrementor) && node.incrementor.operator === ts.SyntaxKind.PlusPlusToken && ts.isIdentifier(node.incrementor.operand)) {
      this.push(<IRIncLocal>{ kind: 'IncLocal', name: node.incrementor.operand.text })
    }
    // jump back & end label
    this.push(<IRJump>{ kind: 'Jump', label: loopStart })
    this.push(<IRLabel>{ kind: 'Label', name: loopEnd })
  }

  private isLiteral(expr: ts.Expression): boolean {
    return ts.isNumericLiteral(expr) || ts.isStringLiteral(expr) || expr.kind === ts.SyntaxKind.TrueKeyword || expr.kind === ts.SyntaxKind.FalseKeyword
  }

  private evalLiteral(expr: ts.Expression): any {
    if (ts.isNumericLiteral(expr)) return Number(expr.text)
    if (ts.isStringLiteral(expr)) return expr.text
    if (expr.kind === ts.SyntaxKind.TrueKeyword) return true
    if (expr.kind === ts.SyntaxKind.FalseKeyword) return false
    return undefined
  }

  private literalTruthiness(expr: ts.Expression): boolean | undefined {
    if (ts.isNumericLiteral(expr)) {
      const v = Number(expr.text)
      return v !== 0 && !Number.isNaN(v)
    }
    if (ts.isStringLiteral(expr)) {
      return expr.text.length > 0
    }
    if (expr.kind === ts.SyntaxKind.TrueKeyword) return true
    if (expr.kind === ts.SyntaxKind.FalseKeyword) return false
    return undefined
  }

  private lowerConditionBoolean (expr: ts.Expression, falseLabel: string) {
    const lowerCompare = (left: ts.Expression, op: ts.SyntaxKind, right: ts.Expression) => {
      // 常量折叠：两侧均为字面量时在编译期直接计算
      if (this.isLiteral(left) && this.isLiteral(right)) {
        const lv = this.evalLiteral(left)
        const rv = this.evalLiteral(right)
        let res: boolean | undefined
        switch (op) {
          case ts.SyntaxKind.LessThanToken: res = (lv as any) < (rv as any); break
          case ts.SyntaxKind.LessThanEqualsToken: res = (lv as any) <= (rv as any); break
          case ts.SyntaxKind.GreaterThanToken: res = (lv as any) > (rv as any); break
          case ts.SyntaxKind.GreaterThanEqualsToken: res = (lv as any) >= (rv as any); break
          case ts.SyntaxKind.EqualsEqualsToken: /* eslint eqeqeq: off */ res = (lv as any) == (rv as any); break
          case ts.SyntaxKind.EqualsEqualsEqualsToken: res = (lv as any) === (rv as any); break
        }
        if (typeof res === 'boolean') {
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: res })
          return
        }
      }
      this.lowerExpression(left)
      // 基于类型信息的强制转换：如果明确两边是 number，则 ToNumber；如果明确是 string，则 ToString
      if (this.shouldToNumber(left, op)) this.push(<IRToNumber>{ kind: 'ToNumber' })
      else if (this.shouldToString(left, op)) this.push(<IRToString>{ kind: 'ToString' })
      this.lowerExpression(right)
      if (this.shouldToNumber(right, op)) this.push(<IRToNumber>{ kind: 'ToNumber' })
      else if (this.shouldToString(right, op)) this.push(<IRToString>{ kind: 'ToString' })
      switch (op) {
        case ts.SyntaxKind.LessThanToken: this.push(<IRLessThan>{ kind: 'LessThan' }); break
        case ts.SyntaxKind.LessThanEqualsToken: this.push(<IRLessEqual>{ kind: 'LessEqual' }); break
        case ts.SyntaxKind.GreaterThanToken: this.push(<IRGreaterThan>{ kind: 'GreaterThan' }); break
        case ts.SyntaxKind.GreaterThanEqualsToken: this.push(<IRGreaterEqual>{ kind: 'GreaterEqual' }); break
        case ts.SyntaxKind.EqualsEqualsToken: this.push(<IREqual>{ kind: 'Equal' }); break
        case ts.SyntaxKind.EqualsEqualsEqualsToken: this.push(<IRStrictEqual>{ kind: 'StrictEqual' }); break
      }
    }

    const lowerAsBooleanOnStack = (e: ts.Expression) => {
      if (ts.isParenthesizedExpression(e)) return lowerAsBooleanOnStack(e.expression)
      if (ts.isBinaryExpression(e)) {
        const op = e.operatorToken.kind
        if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
          // 常量短路：两侧字面量时整体折叠
          const lt = this.literalTruthiness(e.left)
          const rt = this.literalTruthiness(e.right)
          if (lt !== undefined && rt !== undefined) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: Boolean(lt && rt) })
            return
          }
          // 左侧可判定时直接决定
          const t = lt
          if (t === false) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: false })
            return
          } else if (t === true) {
            lowerAsBooleanOnStack(e.right)
            return
          }
          lowerAsBooleanOnStack(e.left)
          this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: falseLabel })
          lowerAsBooleanOnStack(e.right)
          return
        }
        if (op === ts.SyntaxKind.BarBarToken) {
          const L_eval_right = 'L_or_eval_right'
          const L_after = 'L_or_after'
          const lt = this.literalTruthiness(e.left)
          const rt = this.literalTruthiness(e.right)
          if (lt !== undefined && rt !== undefined) { this.push(<IRLoadConst>{ kind: 'LoadConst', value: Boolean(lt || rt) }); return }
          const t = lt
          if (t === true) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: true })
            return
          } else if (t === false) {
            lowerAsBooleanOnStack(e.right)
            return
          }
          lowerAsBooleanOnStack(e.left)
          this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_eval_right })
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: true })
          this.push(<IRJump>{ kind: 'Jump', label: L_after })
          this.push(<IRLabel>{ kind: 'Label', name: L_eval_right })
          lowerAsBooleanOnStack(e.right)
          this.push(<IRLabel>{ kind: 'Label', name: L_after })
          return
        }
        switch (op) {
          case ts.SyntaxKind.LessThanToken:
          case ts.SyntaxKind.LessThanEqualsToken:
          case ts.SyntaxKind.GreaterThanToken:
          case ts.SyntaxKind.GreaterThanEqualsToken:
          case ts.SyntaxKind.EqualsEqualsToken:
          case ts.SyntaxKind.EqualsEqualsEqualsToken:
            return lowerCompare(e.left, op, e.right)
        }
      }
      this.lowerExpression(e)
    }
    lowerAsBooleanOnStack(expr)
  }

  private processLoopCondition (be: ts.BinaryExpression, loopEnd: string) {
    this.lowerConditionBoolean(be, loopEnd)
    this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: loopEnd })
  }

  private processIfStatement (node: ts.IfStatement) {
    const L_else = node.elseStatement ? 'L_if_else' : 'L_if_end'
    const L_end = 'L_if_end'
    this.lowerConditionBoolean(node.expression, L_else)
    this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_else })
    // then block (subset)
    if (ts.isBlock(node.thenStatement)) node.thenStatement.statements.forEach(st => this.processLoopBodyStatement(st))
    if (node.elseStatement) {
      this.push(<IRJump>{ kind: 'Jump', label: L_end })
      this.push(<IRLabel>{ kind: 'Label', name: L_else })
      if (ts.isBlock(node.elseStatement)) node.elseStatement.statements.forEach(st => this.processLoopBodyStatement(st))
      this.push(<IRLabel>{ kind: 'Label', name: L_end })
    } else {
      this.push(<IRLabel>{ kind: 'Label', name: L_else })
    }
  }

  private processWhileStatement (node: ts.WhileStatement) {
    const L_start = 'L_while_start'
    const L_end = 'L_while_end'
    this.push(<IRLabel>{ kind: 'Label', name: L_start })
    this.lowerConditionBoolean(node.expression, L_end)
    this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_end })
    if (ts.isBlock(node.statement)) node.statement.statements.forEach(st => this.processLoopBodyStatement(st))
    this.push(<IRJump>{ kind: 'Jump', label: L_start })
    this.push(<IRLabel>{ kind: 'Label', name: L_end })
  }

  private shouldToNumber (expr: ts.Expression, op: ts.SyntaxKind): boolean {
    // 默认策略：不插入转换；当且仅当 TS 类型系统能确定为 number 时启用，以不改变 JS 语义
    const t = this.inferType(expr)
    return t === 'number'
  }

  private shouldToString (expr: ts.Expression, op: ts.SyntaxKind): boolean {
    const t = this.inferType(expr)
    return t === 'string'
  }

  // 极简类型推断：只识别字面量和显式类型注解为 number/string 的标识符
  private inferType (expr: ts.Expression): 'number' | 'string' | 'unknown' {
    if (ts.isNumericLiteral(expr)) return 'number'
    if (ts.isStringLiteral(expr)) return 'string'
    if (ts.isIdentifier(expr)) {
      const name = expr.text
      const t = this.localType.get(name)
      if (t === 'number') return 'number'
      if (t === 'string') return 'string'
      // 暂不追踪 string，本地变量未记录则 unknown
    }

    // 尝试使用 TypeChecker 识别 NumberLike/StringLike 以及 union
    if (this.checker) {
      try {
        const tp = this.checker.getTypeAtLocation(expr)
        const isNumLike = (t: ts.Type) => !!(t.flags & (ts.TypeFlags.Number | ts.TypeFlags.NumberLiteral))
        const isStrLike = (t: ts.Type) => !!(t.flags & (ts.TypeFlags.String | ts.TypeFlags.StringLiteral))
        
        if (tp.flags & ts.TypeFlags.Union) {
          const u = tp as ts.UnionType
          const allNum = u.types.every(isNumLike)
          const allStr = u.types.every(isStrLike)
          if (allNum) return 'number'
          if (allStr) return 'string'
        } else {
          if (isNumLike(tp)) return 'number'
          if (isStrLike(tp)) return 'string'
        }
      } catch {}
    }

    return 'unknown'
  }

  private processLoopBodyStatement (stmt: ts.Statement) {
    if (ts.isVariableStatement(stmt)) return this.processVariableStatement(stmt)
    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) return this.processCallExpression(stmt.expression)
  }

  private processCallExpression (call: ts.CallExpression) {
    if (!ts.isPropertyAccessExpression(call.expression)) return
    
    const objExpr = call.expression.expression
    const prop = call.expression.name.text

    if (prop === 'push' && call.arguments.length === 1) {
      return this.lowerArrayPush(objExpr, call.arguments[0])
    }
  }

  // Lower results.push(a + i) pattern (current constraints)
  private lowerArrayPush (objExpr: ts.Expression, arg: ts.Expression) {
    if (!ts.isIdentifier(objExpr)) return
    
    // 先加载 array 对象
    this.push(<IRGetLocal>{ kind: 'GetLocal', name: objExpr.text })
    // 计算参数表达式后入栈
    this.lowerExpression(arg)
    // 执行 array_push 并丢弃返回值
    this.push(<IRArrayPush>{ kind: 'ArrayPush' })
    this.push(<IRDrop>{ kind: 'Drop' })
  }

  private lowerExpression (expr: ts.Expression) {
    switch (expr.kind) {
      case ts.SyntaxKind.BinaryExpression:
        return this.processBinaryExpression(expr as ts.BinaryExpression)
      case ts.SyntaxKind.Identifier:
        this.push(<IRGetLocal>{ kind: 'GetLocal', name: (expr as ts.Identifier).text })
        return
      case ts.SyntaxKind.NumericLiteral:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number((expr as ts.NumericLiteral).text) })
        return
      case ts.SyntaxKind.StringLiteral:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: (expr as ts.StringLiteral).text })
        return
      case ts.SyntaxKind.TrueKeyword:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: true })
        return
      case ts.SyntaxKind.FalseKeyword:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: false })
        return
      default:
        return
    }
  }

  private processBinaryExpression (bin: ts.BinaryExpression) {
    if (bin.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      // 常量折叠：两个字面量（数字/字符串）相加；任一为字符串则进行字符串拼接
      const lLit = ts.isNumericLiteral(bin.left) || ts.isStringLiteral(bin.left)
      const rLit = ts.isNumericLiteral(bin.right) || ts.isStringLiteral(bin.right)
      
      if (lLit && rLit) {
        const lv: any = ts.isNumericLiteral(bin.left) ? Number((bin.left as ts.NumericLiteral).text) : (bin.left as ts.StringLiteral).text
        const rv: any = ts.isNumericLiteral(bin.right) ? Number((bin.right as ts.NumericLiteral).text) : (bin.right as ts.StringLiteral).text
        const folded = (typeof lv === 'string' || typeof rv === 'string') ? String(lv) + String(rv) : (lv + rv)
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: folded })
        return
      }
      if (ts.isIdentifier(bin.left)) this.push(<IRGetLocal>{ kind: 'GetLocal', name: bin.left.text })
      else if (ts.isNumericLiteral(bin.left)) this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(bin.left.text) })
      else if (ts.isStringLiteral(bin.left)) this.push(<IRLoadConst>{ kind: 'LoadConst', value: (bin.left as ts.StringLiteral).text })
      if (ts.isIdentifier(bin.right)) this.push(<IRGetLocal>{ kind: 'GetLocal', name: bin.right.text })
      else if (ts.isNumericLiteral(bin.right)) this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(bin.right.text) })
      else if (ts.isStringLiteral(bin.right)) this.push(<IRLoadConst>{ kind: 'LoadConst', value: (bin.right as ts.StringLiteral).text })
      this.push(<IRAdd>{ kind: 'Add' })
    }
  }
}

export function compileToIR (sourceCode: string, fileName?: string) {
  return new Compiler().compileToIR(sourceCode, fileName)
}