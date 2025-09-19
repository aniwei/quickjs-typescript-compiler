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
  IRDefineArrayEl,
  IRGetField2,
  IRDefineField,
  IRMethodCall,
  IRDrop,
  IRIncLocal,
  IRJump,
  IRJumpIfFalse,
  IRLabel,
  IRReturnUndef,
  IREqual,
  IRStrictEqual,
  IRPutField,
  IRObjectNew,
  IRAppend,
  IRDup,
  IRInitLocal
} from './ir'
// removed IRToNumber/IRToString: runtime semantics handle conversions

interface LoopStack { 
  breakLabel: string
  continueLabel: string 
}

interface NamedLoopStack {
  name: string
  breakLabel: string
  continueLabel: string
}

export class Compiler {
  private ir: IRProgram = []
  private locals = new Set<string>()
  // 简单类型跟踪：仅标注本地变量是否可静态认为是 number
  private localType = new Map<string, 'number' | 'string' | 'unknown'>()
  private checker?: ts.TypeChecker
  private sf?: ts.SourceFile
  private strictMode = false
  // 循环标签栈：用于 break/continue 降级
  private loopStack: Array<LoopStack> = []
  private labelId = 0
  // 支持带标签的循环：label -> 最近匹配的 loop 索引
  private namedLoopStack: Array<NamedLoopStack> = []
  // 供反汇编注释使用：特殊标签语义
  private labelKinds = new Map<string, 'loop-start' | 'loop-end' | 'loop-continue'>()

  private newLabel(prefix: string) { 
    return `${prefix}_${this.labelId++}` 
  }

  compileToIR (sourceCode: string, fileName = 'input.ts'): IRProgram {
    const sf = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS)
    this.sf = sf
    // 默认严格模式（强制开启）
    this.strictMode = true

    // 构建仅包含该文件的 Program 与 TypeChecker（noLib），用于更精准类型判定
    try {
      const options: ts.CompilerOptions = { 
        noLib: true, 
        target: ts.ScriptTarget.ES2020, 
        module: ts.ModuleKind.CommonJS 
      }
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
      let declKind: 'var' | 'let' | 'const' | undefined
      const parent = decl.parent

      if (parent && ts.isVariableDeclarationList(parent)) {
        if (parent.flags & ts.NodeFlags.Const) {
          declKind = 'const'
        } else if (parent.flags & ts.NodeFlags.Let) {
          declKind = 'let'
        } else {
          declKind = 'var'
        }
      }
      this.push(<IRDeclareLocal>{ kind: 'DeclareLocal', name, declKind }, decl.name)

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

  private locOf (node: ts.Node): { line: number; col: number } {
    const sf = this.sf as ts.SourceFile
    const pos = node.getStart(sf)
    const lc = sf.getLineAndCharacterOfPosition(pos)

    return { 
      line: lc.line + 1, 
      col: lc.character + 1 
    }
  }

  private push (n: any, src?: ts.Node) {
    if (src) {
      (n as any).loc = this.locOf(src)
    }

    this.ir.push(n)
  }

  // ---------- dispatch ----------
  private processTopLevel (node: ts.Node) {
    if (ts.isVariableStatement(node)) return this.processVariableStatement(node)
    if (ts.isForStatement(node)) return this.processForStatement(node)
    if (ts.isIfStatement(node)) return this.processIfStatement(node)
    if (ts.isWhileStatement(node)) return this.processWhileStatement(node)
    if (ts.isLabeledStatement(node)) return this.processLabeledStatement(node)
  }

  private processLabeledStatement (node: ts.LabeledStatement) {
    // 仅对跟随 for/while 的标签赋予可 break/continue 的语义
    const name = node.label.text
    // 先进入内部语句，根据类型决定是否建立命名循环
    if (ts.isForStatement(node.statement)) {
      const start = this.newLabel(`L_for_start_${name}`)
      const end = this.newLabel(`L_for_end_${name}`)
      const cont = this.newLabel(`L_for_continue_${name}`)

      // 让具体 for 逻辑复用：临时标记命名循环，processForStatement 将使用这些标签
      ;(node.statement as any).__labels = { start, end, cont, name }
      
      this.namedLoopStack.push({ name, breakLabel: end, continueLabel: cont })
      this.processForStatement(node.statement)
      this.namedLoopStack.pop()
    } else if (ts.isWhileStatement(node.statement)) {
      const start = this.newLabel(`L_while_start_${name}`)
      const end = this.newLabel(`L_while_end_${name}`)
      const cont = start // while 的 continue 回到条件起点
      
      ;(node.statement as any).__labels = { start, end, cont, name }
      
      this.namedLoopStack.push({ name, breakLabel: end, continueLabel: cont })
      this.processWhileStatement(node.statement)
      this.namedLoopStack.pop()
    } else {
      // 其它语句标签暂不处理特殊语义
      this.processLoopBodyStatement(node.statement as ts.Statement)
    }
  }

  private processVariableStatement (node: ts.VariableStatement) {
    const topLevel = ts.isSourceFile(node.parent)
    node.declarationList.declarations.forEach(decl => {
      if (!ts.isIdentifier(decl.name)) return
      const name = decl.name.text
      const isLex = (decl.parent.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let)) !== 0

      if (topLevel) {
        // 顶层：qjsc 会同时维护一个本地槽来缓存该全局，且仍通过 check_define_var 宣告到 env
        // 我们对齐为：DeclareLocal + check_define_var + 初始化 + (dup -> Init/SetLocal) + put_var/put_var_strict
        // 之后在本编译单元内对该标识符的读写均走本地槽，最终效果与 qjsc 更接近
        // 先登记本地槽（用于后续 identifier 解析走 local 路径）
        if (!this.locals.has(name)) {
          // 保留原始声明种类以维持 TDZ 读/写变体
          const fakeDecl = decl as ts.VariableDeclaration
          this.declare(fakeDecl)
        }
        // flags: QuickJS runtime.h -> DEFINE_GLOBAL_LEX_VAR(1<<7), DEFINE_GLOBAL_FUNC_VAR(1<<6)
        const DEFINE_GLOBAL_LEX_VAR = 1 << 7
        const DEFINE_GLOBAL_FUNC_VAR = 1 << 6
        let flags = 0
        if (isLex) flags |= DEFINE_GLOBAL_LEX_VAR
        // 变量语句不包含函数声明，这里仅依据字面量初始化，不置 FUNC_VAR
        this.push(<any>{ kind: 'CheckDefineVar', name, flags }, decl.name)
        if (decl.initializer) {
          if (ts.isArrayLiteralExpression(decl.initializer)) {
            this.lowerArrayLiteral(decl.initializer)
          } else if (ts.isObjectLiteralExpression(decl.initializer)) {
            this.lowerObjectLiteral(decl.initializer)
          } else if (ts.isNumericLiteral(decl.initializer)) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(decl.initializer.text) }, decl.initializer)
          } else if (ts.isStringLiteral(decl.initializer)) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: decl.initializer.text }, decl.initializer)
          }
          // 复制一份给本地槽
          this.push(<IRDup>{ kind: 'Dup' }, decl.initializer)
          if (isLex) {
            this.push(<IRInitLocal>{ kind: 'InitLocal', name }, decl.name)
          } else {
            this.push(<IRSetLocal>{ kind: 'SetLocal', name }, decl.name)
          }
          // 写回 env（严格模式）
          this.push(<any>{ kind: 'SetEnvVar', name, strict: this.strictMode }, decl.name)
        }
        // 顶层 env 不登记为本地
      } else {
        // 局部：登记为本地并使用本地初始化
        this.declare(decl)
        if (decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
          this.lowerArrayLiteral(decl.initializer)
          this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
          this.localType.set(name, 'unknown')
        } else if (decl.initializer && ts.isObjectLiteralExpression(decl.initializer)) {
          this.lowerObjectLiteral(decl.initializer)
          this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
          this.localType.set(name, 'unknown')
        } else if (decl.initializer && ts.isNumericLiteral(decl.initializer)) {
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(decl.initializer.text) }, decl.initializer)
          this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
          this.localType.set(name, 'number')
        } else if (decl.initializer && ts.isStringLiteral(decl.initializer)) {
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: decl.initializer.text }, decl.initializer)
          this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
          this.localType.set(name, 'string')
        }
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
          const isLex = (decl.parent.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let)) !== 0
          this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }))
        }
      })
    }
    // 生成唯一标签，避免嵌套/多循环冲突
    const labels = (node as any).__labels as { start: string; end: string; cont: string; name?: string } | undefined
    const loopStart = labels?.start ?? this.newLabel('L_for_start')
    const loopEnd = labels?.end ?? this.newLabel('L_for_end')
    const loopContinue = labels?.cont ?? this.newLabel('L_for_continue')

    this.loopStack.push({ breakLabel: loopEnd, continueLabel: loopContinue })
    
    if (labels?.name) {
      this.namedLoopStack.push({ 
        name: labels.name, 
        breakLabel: loopEnd, 
        continueLabel: loopContinue 
      })
    }

    this.labelKinds.set(loopStart, 'loop-start')
    this.labelKinds.set(loopEnd, 'loop-end')
    this.labelKinds.set(loopContinue, 'loop-continue')
    this.push(<IRLabel>{ kind: 'Label', name: loopStart }, node)
    
    // condition (only i < N numeric for now)
    if (node.condition && ts.isBinaryExpression(node.condition)) {
      this.processLoopCondition(node.condition, loopEnd)
    }

    // body
    if (node.statement && ts.isBlock(node.statement)) {
      node.statement.statements.forEach(st => this.processLoopBodyStatement(st))
    }
    
    // continue 目标落点
    this.push(<IRLabel>{ kind: 'Label', name: loopContinue }, node.incrementor ?? node)
    
    // incrementor (i++)
    if (node.incrementor && ts.isPostfixUnaryExpression(node.incrementor) && node.incrementor.operator === ts.SyntaxKind.PlusPlusToken && ts.isIdentifier(node.incrementor.operand)) {
      const vname = node.incrementor.operand.text
      // Lower to: get_loc v ; dup ; inc ; put_loc v ; drop   (equivalent to post_inc + nip)
      if (this.locals.has(vname)) {
        this.push(<IRGetLocal>{ kind: 'GetLocal', name: vname }, node.incrementor)
        this.push(<IRDup>{ kind: 'Dup' }, node.incrementor)
        this.push(<any>{ kind: 'Inc' } as any, node.incrementor)
        this.push(<IRSetLocal>{ kind: 'SetLocal', name: vname }, node.incrementor)
        this.push(<IRDrop>{ kind: 'Drop' }, node.incrementor)
      } else {
        // env var ++ not supported in current subset; keep old inc_loc lowering fallback
        this.push(<IRIncLocal>{ kind: 'IncLocal', name: vname }, node.incrementor)
      }
    }
    
    // jump back & end label
    this.push(<IRJump>{ kind: 'Jump', label: loopStart }, node)
    this.push(<IRLabel>{ kind: 'Label', name: loopEnd }, node)
    this.loopStack.pop()
    
    if (labels?.name) this.namedLoopStack.pop()
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
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: res }, (left.parent ?? left))
          return
        }
      }
      this.lowerExpression(left)
      // 不再插入显式 ToNumber/ToString，保留 JS 运行时语义
      this.lowerExpression(right)
      // same as above: no explicit conversions
      switch (op) {
        case ts.SyntaxKind.LessThanToken: 
          this.push(<IRLessThan>{ kind: 'LessThan' }, (left.parent ?? left))
          break
        case ts.SyntaxKind.LessThanEqualsToken: 
          this.push(<IRLessEqual>{ kind: 'LessEqual' }, (left.parent ?? left))
          break
        case ts.SyntaxKind.GreaterThanToken: 
          this.push(<IRGreaterThan>{ kind: 'GreaterThan' }, (left.parent ?? left))
          break
        case ts.SyntaxKind.GreaterThanEqualsToken: 
          this.push(<IRGreaterEqual>{ kind: 'GreaterEqual' }, (left.parent ?? left))
          break
        case ts.SyntaxKind.EqualsEqualsToken: 
          this.push(<IREqual>{ kind: 'Equal' }, (left.parent ?? left))
          break
        case ts.SyntaxKind.EqualsEqualsEqualsToken: 
          this.push(<IRStrictEqual>{ kind: 'StrictEqual' }, (left.parent ?? left))
          break
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
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: Boolean(lt && rt) }, e)
            return
          }
          // 左侧可判定时直接决定
          const t = lt
          if (t === false) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: false }, e.left)
            return
          } else if (t === true) {
            lowerAsBooleanOnStack(e.right)
            return
          }

          lowerAsBooleanOnStack(e.left)
          this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: falseLabel }, e.operatorToken)
          
          lowerAsBooleanOnStack(e.right)
          return
        }
        if (op === ts.SyntaxKind.BarBarToken) {
          const L_eval_right = 'L_or_eval_right'
          const L_after = 'L_or_after'
          const lt = this.literalTruthiness(e.left)
          const rt = this.literalTruthiness(e.right)
          
          if (lt !== undefined && rt !== undefined) { 
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: Boolean(lt || rt) }, e)
            return 
          }

          const t = lt

          if (t === true) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: true }, e.left)
            return
          } else if (t === false) {
            lowerAsBooleanOnStack(e.right)
            return
          }

          lowerAsBooleanOnStack(e.left)

          this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_eval_right }, e.operatorToken)
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: true }, e)
          this.push(<IRJump>{ kind: 'Jump', label: L_after }, e)
          this.push(<IRLabel>{ kind: 'Label', name: L_eval_right }, e)
          
          lowerAsBooleanOnStack(e.right)
          this.push(<IRLabel>{ kind: 'Label', name: L_after }, e)
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
    this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: loopEnd }, be)
  }

  private processIfStatement (node: ts.IfStatement) {
    const L_else = node.elseStatement ? 'L_if_else' : 'L_if_end'
    const L_end = 'L_if_end'
    
    this.lowerConditionBoolean(node.expression, L_else)
    this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_else }, node.expression)
    
    // then block (subset)
    if (ts.isBlock(node.thenStatement)) {
      node.thenStatement.statements.forEach(st => this.processLoopBodyStatement(st))
    }

    if (node.elseStatement) {
      this.push(<IRJump>{ kind: 'Jump', label: L_end }, node.thenStatement)
      this.push(<IRLabel>{ kind: 'Label', name: L_else }, node.elseStatement)

      if (ts.isBlock(node.elseStatement)) {
        node.elseStatement.statements.forEach(st => this.processLoopBodyStatement(st))
      }
      
      this.push(<IRLabel>{ kind: 'Label', name: L_end }, node)
    } else {
      this.push(<IRLabel>{ kind: 'Label', name: L_else }, node)
    }
  }

  private processWhileStatement (node: ts.WhileStatement) {
    const labels = (node as any).__labels as { start: string; end: string; cont: string; name?: string } | undefined
    const L_start = labels?.start ?? this.newLabel('L_while_start')
    const L_end = labels?.end ?? this.newLabel('L_while_end')
    const L_cont = labels?.cont ?? L_start

    this.loopStack.push({ breakLabel: L_end, continueLabel: L_cont })

    if (labels?.name) {
      this.namedLoopStack.push({ name: labels.name, breakLabel: L_end, continueLabel: L_cont })
    }

    this.labelKinds.set(L_start, 'loop-start')
    this.labelKinds.set(L_end, 'loop-end')
    this.labelKinds.set(L_cont, 'loop-continue')
    this.push(<IRLabel>{ kind: 'Label', name: L_start }, node)
    this.lowerConditionBoolean(node.expression, L_end)
    this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_end }, node.expression)
    
    if (ts.isBlock(node.statement)) {
      node.statement.statements.forEach(st => this.processLoopBodyStatement(st))
    }
    
    this.push(<IRJump>{ kind: 'Jump', label: L_start }, node)
    this.push(<IRLabel>{ kind: 'Label', name: L_end }, node)

    this.loopStack.pop()
    if (labels?.name) this.namedLoopStack.pop()
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
    if (ts.isIfStatement(stmt)) return this.processIfStatement(stmt)
    if (ts.isForStatement(stmt)) return this.processForStatement(stmt)
    if (ts.isWhileStatement(stmt)) return this.processWhileStatement(stmt)
    if (ts.isLabeledStatement(stmt)) return this.processLabeledStatement(stmt)

    if (ts.isBreakStatement(stmt)) {
      const top = this.loopStack[this.loopStack.length - 1]
      if (!top) return
      if (stmt.label) {
        const name = stmt.label.text
        // 从命名栈自顶向下查找匹配的循环
        for (let i = this.namedLoopStack.length - 1; i >= 0; i--) {
          if (this.namedLoopStack[i].name === name) {
            this.push(<IRJump>{ kind: 'Jump', label: this.namedLoopStack[i].breakLabel }, stmt)
            return
          }
        }
      }
      this.push(<IRJump>{ kind: 'Jump', label: top.breakLabel }, stmt)
      return
    }
    if (ts.isContinueStatement(stmt)) {
      const top = this.loopStack[this.loopStack.length - 1]

      if (!top) return

      if (stmt.label) {
        const name = stmt.label.text

        for (let i = this.namedLoopStack.length - 1; i >= 0; i--) {
          if (this.namedLoopStack[i].name === name) {
            this.push(<IRJump>{ kind: 'Jump', label: this.namedLoopStack[i].continueLabel }, stmt)
            return
          }
        }
      }

      this.push(<IRJump>{ kind: 'Jump', label: top.continueLabel }, stmt)
      return
    }
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
    
  // QuickJS 期望 [obj, func, ...args]
  // 压入 obj（作为 this），再 dup 以便从副本上取出方法函数
  this.lowerExpression(objExpr)
  this.push(<IRDup>{ kind: 'Dup' }, objExpr)
  this.push(<IRGetField2>{ kind: 'GetField2', field: 'push' }, objExpr)
    // 4) 压入参数表达式
    this.lowerExpression(arg)
    // 5) 调用方法，argc=1，返回新长度
    this.push(<IRMethodCall>{ kind: 'MethodCall', argc: 1 }, arg)
    // 6) 丢弃返回值
    this.push(<IRDrop>{ kind: 'Drop' }, arg)
  }

  private lowerExpression (expr: ts.Expression) {
    switch (expr.kind) {
      case ts.SyntaxKind.ArrayLiteralExpression:
        return this.lowerArrayLiteral(expr as ts.ArrayLiteralExpression)
      case ts.SyntaxKind.BinaryExpression:
        return this.processBinaryExpression(expr as ts.BinaryExpression)
      case ts.SyntaxKind.PropertyAccessExpression: {
        const pa = expr as ts.PropertyAccessExpression
        const name = pa.name.text
        // obj on stack
        this.lowerExpression(pa.expression)
        // get_field2 by atom(name)
        this.push(<IRGetField2>{ kind: 'GetField2', field: name }, pa.name)
        return
      }
      case ts.SyntaxKind.Identifier:
        {
          const id = expr as ts.Identifier
          const name = id.text
          if (this.locals.has(name)) {
            this.push(<IRGetLocal>{ kind: 'GetLocal', name }, expr)
          } else {
            // 顶层读取环境变量：降级为 get_var（严格下缺失会抛 ReferenceError）。
            this.push(<any>{ kind: 'GetEnvVar', name, strict: this.strictMode }, expr)
          }
        }
        return
      case ts.SyntaxKind.NumericLiteral:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number((expr as ts.NumericLiteral).text) }, expr)
        return
      case ts.SyntaxKind.StringLiteral:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: (expr as ts.StringLiteral).text }, expr)
        return
      case ts.SyntaxKind.TrueKeyword:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: true }, expr)
        return
      case ts.SyntaxKind.FalseKeyword:
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: false }, expr)
        return
      default:
        return
    }
  }

  // QuickJS 对齐：数组字面量降级
  private lowerArrayLiteral (arr: ts.ArrayLiteralExpression) {
    const elements = arr.elements
    // 1) 前缀连续的“简单元素”（非 spread，非空洞）且最多 32 个 → 逐个入栈 + OP_array_from(idx)
    let prefix = 0
    for (let i = 0; i < elements.length && i < 32; i++) {
      const el = elements[i]
      if (ts.isSpreadElement(el) || ts.isOmittedExpression(el)) break
      prefix++
    }
    for (let i = 0; i < prefix; i++) {
      this.lowerExpression(elements[i] as ts.Expression)
    }
    this.push(<IRArrayNew>{ kind: 'ArrayNew', initialCapacity: prefix }, arr)

    // 2) 静态阶段：处理剩余非展开元素与空洞，遇到展开切入动态阶段
    let idx = prefix
    let i = prefix
    let needLengthStatic = false
    let encounteredSpread = false
    while (i < elements.length) {
      const el = elements[i]

      if (ts.isSpreadElement(el)) { 
        encounteredSpread = true
        break 
      }

      if (ts.isOmittedExpression(el)) {
        needLengthStatic = true
        idx++
      } else {
        this.lowerExpression(el as ts.Expression)
        // define_field by numeric index
        this.push(<IRDefineField>{ kind: 'DefineField', name: String(idx) }, el)
        needLengthStatic = false
        idx++
      }

      i++
    }

    // 若未出现展开且已到末尾：根据 needLengthStatic 决定是否设置 length
    if (!encounteredSpread) {
      if (needLengthStatic) {
        // dup array ; push i32 idx ; put_field 'length'
        this.push(<any>{ kind: 'Dup' } as any, arr) // OP_dup
        this.push(<any>{ kind: 'PushI32', value: idx } as any, arr) // OP_push_i32
        this.push(<IRPutField>{ kind: 'PutField', name: 'length' }, arr)
      }
      return
    }

  // 3) 动态阶段（存在展开）：栈上已有 array，压入当前 idx
  this.push(<any>{ kind: 'PushI32', value: idx } as any, arr)
    // 逐元素：spread → append；普通值 → define_array_el + idx++；空洞 → idx++
    let needLengthDyn = false

    for (; i < elements.length; i++) {
      const el = elements[i]

      if (ts.isSpreadElement(el)) {
        this.lowerExpression(el.expression)
        this.push(<IRAppend>{ kind: 'Append' }, el)
        // 按 QuickJS，不改变 needLengthDyn
      } else if (ts.isOmittedExpression(el)) {
        // idx++
        needLengthDyn = true
        // 直接使用 OP_inc（对 TOS 自增）
        this.push(<any>{ kind: 'Inc' } as any, el)
      } else {
        this.lowerExpression(el as ts.Expression)
        this.push(<IRDefineArrayEl>{ kind: 'DefineArrayEl' }, el)
        // idx++
        needLengthDyn = false
        this.push(<any>{ kind: 'Inc' } as any, el)
      }
      // 逗号在 AST 中不会单独出现：OmittedExpression 表示空洞
    }
    // 收尾：根据 needLengthDyn 设置 length 或丢弃 idx
    if (needLengthDyn) {
      // 设置 length：QuickJS 使用 dup1 将 array 与 length 排列为 array length - array array length
      this.push(<any>{ kind: 'Dup1' } as any, arr)
      this.push(<IRPutField>{ kind: 'PutField', name: 'length' }, arr)
    } else {
      // drop idx
      this.push(<IRDrop>{ kind: 'Drop' }, arr)
    }
  }

  private processBinaryExpression (bin: ts.BinaryExpression) {
    // property store: obj.a = expr ; also local assign: x = expr
    if (bin.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      // obj.prop = value
      if (ts.isPropertyAccessExpression(bin.left)) {
        const pa = bin.left
        this.lowerExpression(pa.expression) // obj
        this.lowerExpression(bin.right) // value
        this.push(<IRPutField>{ kind: 'PutField', name: pa.name.text }, pa.name)
        return
      }
      // local/env = value
      if (ts.isIdentifier(bin.left)) {
        const name = bin.left.text
        this.lowerExpression(bin.right)
        if (this.locals.has(name)) {
          this.push(<IRSetLocal>{ kind: 'SetLocal', name }, bin.left)
        } else {
          this.push(<any>{ kind: 'SetEnvVar', name, strict: this.strictMode }, bin.left)
        }
        return
      }
    }

    if (bin.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      // 常量折叠：两个字面量（数字/字符串）相加；任一为字符串则进行字符串拼接
      const lLit = ts.isNumericLiteral(bin.left) || ts.isStringLiteral(bin.left)
      const rLit = ts.isNumericLiteral(bin.right) || ts.isStringLiteral(bin.right)

      if (lLit && rLit) {
        const lv: number | string = ts.isNumericLiteral(bin.left) 
          ? Number((bin.left as ts.NumericLiteral).text) 
          : (bin.left as ts.StringLiteral).text

        const rv: number | string = ts.isNumericLiteral(bin.right) 
          ? Number((bin.right as ts.NumericLiteral).text) 
          : (bin.right as ts.StringLiteral).text

        const folded = (typeof lv === 'string' || typeof rv === 'string') 
          ? String(lv) + String(rv) 
          : (lv + rv)

        this.push(<IRLoadConst>{ kind: 'LoadConst', value: folded }, bin)
        
        return
      }

      if (ts.isIdentifier(bin.left)) {
        this.push(<IRGetLocal>{ kind: 'GetLocal', name: bin.left.text }, bin.left)
      } else if (ts.isNumericLiteral(bin.left)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(bin.left.text) }, bin.left)
      } else if (ts.isStringLiteral(bin.left)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: (bin.left as ts.StringLiteral).text }, bin.left)
      }
      
      if (ts.isIdentifier(bin.right)) {
        this.push(<IRGetLocal>{ kind: 'GetLocal', name: bin.right.text }, bin.right)
      } else if (ts.isNumericLiteral(bin.right)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(bin.right.text) }, bin.right)
      } else if (ts.isStringLiteral(bin.right)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: (bin.right as ts.StringLiteral).text }, bin.right)
      } else if (ts.isNumericLiteral(bin.right)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(bin.right.text) }, bin.right)
      } else if (ts.isStringLiteral(bin.right)) {
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: (bin.right as ts.StringLiteral).text }, bin.right)
      }

      this.push(<IRAdd>{ kind: 'Add' }, bin.operatorToken)
    }
  }

  private lowerObjectLiteral (obj: ts.ObjectLiteralExpression) {
    // new object
    this.push({ kind: 'ObjectNew' } as any, obj)

    for (const prop of obj.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        this.lowerExpression(prop.initializer)
        // 在对象字面量阶段使用 define_field 更符合 QuickJS 初始化序列
        this.push({ kind: 'DefineField', name: prop.name.text } as any, prop.name)
      }
      // getters/setters/methods 暂不支持
    }
  }
}

export function compileToIR (sourceCode: string, fileName?: string) {
  return new Compiler().compileToIR(sourceCode, fileName)
}