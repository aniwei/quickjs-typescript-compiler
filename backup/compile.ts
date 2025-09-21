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
  IRGetArrayEl,
  IRPutArrayEl,
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
  IRDup1,
  IRInitLocal,
  IRPushI32,
  IRSwap,
  IRRot3R,
  IRRot4L
} from './ir'

interface LoopStack { 
  breakLabel: string
  continueLabel: string 
}

interface NamedLoopStack {
  name: string
  breakLabel: string
  continueLabel: string
}

type LabelKind = 'loop-start' | 'loop-end' | 'loop-continue'

export class Compiler {
  private ir: IRProgram = []
  private locals = new Set<string>()
  // 简单类型跟踪：仅标注本地变量是否可静态认为是 number
  private localType = new Map<string, 'number' | 'string' | 'unknown'>()
  private sf!: ts.SourceFile
  private checker?: ts.TypeChecker
  private strictMode = false
  // 循环标签栈：用于 break/continue 降级
  private loopStack: Array<LoopStack> = []
  private labelId = 0
  // 支持带标签的循环：label -> 最近匹配的 loop 索引
  private namedLoopStack: Array<NamedLoopStack> = []
  // 供反汇编注释使用：特殊标签语义
  private labelKinds = new Map<string, LabelKind>()
  // 顶层函数的“需要作为闭包捕获”的本地名（用于对齐 qjsc 的 closure_var 列表）
  private capturedLocals = new Set<string>()

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
    // 将循环标签语义导出给后续发射阶段：name -> kind
    ;(this.ir as any).__labelKinds = new Map(this.labelKinds)
    // 导出需要作为闭包变量的本地名（例如 for(let i...) 的 i）
    ;(this.ir as any).__capturedLocals = Array.from(this.capturedLocals)
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
    if (ts.isFunctionDeclaration(node)) return this.processFunctionDeclaration(node)
    if (ts.isForStatement(node)) return this.processForStatement(node)
    if (ts.isIfStatement(node)) return this.processIfStatement(node)
    if (ts.isWhileStatement(node)) return this.processWhileStatement(node)
    if (ts.isLabeledStatement(node)) return this.processLabeledStatement(node)
    if (ts.isExpressionStatement(node)) return this.processExpressionStatement(node)
  }

  // 统一的表达式语句处理（顶层与循环体共用）
  private processExpressionStatement (node: ts.ExpressionStatement) {
    if (ts.isCallExpression(node.expression)) return this.processCallExpression(node.expression)
    if (ts.isBinaryExpression(node.expression)) {
      this.processBinaryExpression(node.expression)
      return
    }
    if (ts.isStringLiteral(node.expression)) {
      const s = node.expression.text
      if (s === 'use strict') return
    }
    if (!ts.isCallExpression(node.expression) && !ts.isPostfixUnaryExpression(node.expression)) {
      this.lowerExpression(node.expression)
      this.push(<IRDrop>{ kind: 'Drop' }, node.expression)
      return
    }
    if (ts.isPostfixUnaryExpression(node.expression)) {
      const pe = node.expression
      if (pe.operator === ts.SyntaxKind.PlusPlusToken || pe.operator === ts.SyntaxKind.MinusMinusToken) {
        this.lowerExpression(pe)
        this.push(<IRDrop>{ kind: 'Drop' }, pe)
        return
      }
    }
  }

  private processFunctionDeclaration (fn: ts.FunctionDeclaration) {
    if (!fn.name) return

    const name = fn.name.text
    const topLevel = ts.isSourceFile(fn.parent)

    if (!topLevel) return // 暂不处理非顶层
    // 顶层函数：check_define_var + fclosure + define_func
    const DEFINE_GLOBAL_LEX_VAR = 1 << 7
    const DEFINE_GLOBAL_FUNC_VAR = 1 << 6
    // 函数声明在语义上是 var_kind=function（非 lexical）
    // 仍然需要标记 FUNC 标志，便于比较
    let flags = DEFINE_GLOBAL_FUNC_VAR
    // 登记本地槽，便于后续读取直接用本地
    if (!this.locals.has(name)) {
      const fakeDecl = ts.factory.createVariableDeclaration(fn.name, undefined, undefined, undefined)
      this.declare(fakeDecl)
    }
    
    // 1) 预定义到 env（带 FUNC 标志）
    this.push(<any>{ kind: 'CheckDefineVar', name, flags }, fn.name)
    // 2) 生成真实函数对象：lower 函数体为一个子 IRProgram，并通过 FunctionObject + fclosure 发射
    // 处理参数与 return 语句（简单版）
    const body: IRProgram = []
    const pushToBody = (n: any, src?: ts.Node) => {
      if (src) (n as any).loc = this.locOf(src)
      body.push(n)
    }
    // 收集参数名（当前不降级参数语义，仅用于 header/varDefs 占位）
    const argNames: string[] = []
    if (fn.parameters) {
      for (const p of fn.parameters) {
        if (p.name && (ts.isIdentifier(p.name))) argNames.push(p.name.text)
      }
    }

    // 简单 body 降级：仅支持 "return expr;"，以及使用标识符引用参数名时从参数槽取值
    if (fn.body && ts.isBlock(fn.body)) {
      for (const st of fn.body.statements) {
        if (ts.isReturnStatement(st)) {
          if (st.expression) {
            // lower expression with a tiny helper that treats identifiers matching params as GetArg
            const lowerExprInto = (e: ts.Expression) => {
              if (ts.isIdentifier(e)) {
                const name = e.text
                const idx = argNames.indexOf(name)
                if (idx >= 0) {
                  pushToBody(<any>{ kind: 'GetArg', index: idx } as any, e)
                  return
                }
              }
              // fallback: constant numbers/strings
              if (ts.isNumericLiteral(e)) {
                pushToBody(<any>{ kind: 'LoadConst', value: Number(e.text) } as any, e)
                return
              }
              if (ts.isStringLiteral(e)) {
                pushToBody(<any>{ kind: 'LoadConst', value: e.text } as any, e)
                return
              }
              // minimal support: binary a+b where a/b can be identifiers/number literals
              if (ts.isBinaryExpression(e) && e.operatorToken.kind === ts.SyntaxKind.PlusToken) {
                lowerExprInto(e.left)
                lowerExprInto(e.right)
                pushToBody(<any>{ kind: 'Add' } as any, e.operatorToken)
                return
              }
            }
            lowerExprInto(st.expression)
            pushToBody(<any>{ kind: 'Return' } as any, st)
          } else {
            pushToBody(<IRReturnUndef>{ kind: 'ReturnUndef' }, st)
          }
        }
      }
    }
    if (body.length === 0) body.push(<IRReturnUndef>{ kind: 'ReturnUndef' })
    this.push(<any>{ kind: 'FunctionObject', name, argCount: argNames.length, argNames, body }, fn)
    // 2.1) 对应 define_func(atom+u8)
    this.push(<any>{ kind: 'DefineFunc', name, flags: 0 }, fn.name)
    // 3) 直接写回 env（严格），不建立本地别名
    this.push(<any>{ kind: 'SetEnvVar', name, strict: this.strictMode }, fn)
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
        // 顶层：与 qjsc 对齐，避免为 env 变量创建本地别名与本地写入，直接声明到 env 并写回 env
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
          } else {
            // 通用表达式初始化（包括 ++/--、调用、属性访问等）
            this.lowerExpression(decl.initializer)
          }
          // 直接写回 env（严格模式）；不建立本地别名，后续读取统一走 env
          this.push(<any>{ kind: 'SetEnvVar', name, strict: this.strictMode }, decl.name)
        }
        // 顶层 env 不登记为本地
      } else {
        // 局部：登记为本地并使用本地初始化
        this.declare(decl)
        if (decl.initializer) {
          if (ts.isArrayLiteralExpression(decl.initializer)) {
            this.lowerArrayLiteral(decl.initializer)
            this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
            this.localType.set(name, 'unknown')
          } else if (ts.isObjectLiteralExpression(decl.initializer)) {
            this.lowerObjectLiteral(decl.initializer)
            this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
            this.localType.set(name, 'unknown')
          } else if (ts.isNumericLiteral(decl.initializer)) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: Number(decl.initializer.text) }, decl.initializer)
            this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
            this.localType.set(name, 'number')
          } else if (ts.isStringLiteral(decl.initializer)) {
            this.push(<IRLoadConst>{ kind: 'LoadConst', value: decl.initializer.text }, decl.initializer)
            this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
            this.localType.set(name, 'string')
          } else {
            // 通用表达式初始化（包括 ++/--、调用、属性访问等）
            this.lowerExpression(decl.initializer)
            this.push(isLex ? (<IRInitLocal>{ kind: 'InitLocal', name }) : (<IRSetLocal>{ kind: 'SetLocal', name }), decl.name)
            this.localType.set(name, 'unknown')
          }
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
          // 对齐 quickjs：for (let i=...) 的循环变量通常记为 closure var
          if (isLex) this.capturedLocals.add(name)
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
    
    // incrementor：优先优化本地 i++ 为 OP_inc_loc，否则通用降级并丢弃结果
    if (node.incrementor) {
      if (
        ts.isPostfixUnaryExpression(node.incrementor) &&
        node.incrementor.operator === ts.SyntaxKind.PlusPlusToken &&
        ts.isIdentifier(node.incrementor.operand) &&
        this.locals.has(node.incrementor.operand.text)
      ) {
        const vname = node.incrementor.operand.text
        this.push(<IRIncLocal>{ kind: 'IncLocal', name: vname }, node.incrementor)
      } else {
        this.lowerExpression(node.incrementor)
        this.push(<IRDrop>{ kind: 'Drop' }, node.incrementor)
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

  private lowerConditionBoolean (expr: ts.Expression, _falseLabel: string) {
    // 对比较与逻辑运算进行降级，最终“在栈顶留下一个可被 if_false 使用的值”
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
      this.lowerExpression(right)
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
          // a && b ：若 a 为假，结果为 false；否则取 b
          const L_false = this.newLabel('L_and_false')
          const L_after = this.newLabel('L_and_after')
          lowerAsBooleanOnStack(e.left)
          this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_false }, e.operatorToken)
          lowerAsBooleanOnStack(e.right)
          this.push(<IRJumpIfFalse>{ kind: 'JumpIfFalse', label: L_false }, e.operatorToken)
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: true }, e)
          this.push(<IRJump>{ kind: 'Jump', label: L_after }, e)
          this.push(<IRLabel>{ kind: 'Label', name: L_false }, e)
          this.push(<IRLoadConst>{ kind: 'LoadConst', value: false }, e)
          this.push(<IRLabel>{ kind: 'Label', name: L_after }, e)
          return
        }
        if (op === ts.SyntaxKind.BarBarToken) {
          // a || b ：若 a 为真，结果为 true；否则计算 b
          const L_eval_right = this.newLabel('L_or_eval_right')
          const L_after = this.newLabel('L_or_after')
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

      // 其它表达式：直接按普通表达式降级，依赖 if_false 的 truthy 语义
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
    if (ts.isExpressionStatement(stmt)) return this.processExpressionStatement(stmt)
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
    // 语句位置：统一用表达式降级 + 丢弃返回值
    this.lowerExpression(call)
    this.push(<IRDrop>{ kind: 'Drop' }, call)
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
      case ts.SyntaxKind.PrefixUnaryExpression: {
        const pe = expr as ts.PrefixUnaryExpression
        const opnd = pe.operand

        if (pe.operator === ts.SyntaxKind.PlusPlusToken || pe.operator === ts.SyntaxKind.MinusMinusToken) {
          if (ts.isIdentifier(opnd)) {
            const name = opnd.text
            const delta = pe.operator === ts.SyntaxKind.PlusPlusToken ? 1 : -1

            if (this.locals.has(name)) {
              // ++x/--x for local: get x; push delta; add; dup; set x => leaves new value
              this.push(<IRGetLocal>{ kind: 'GetLocal', name }, opnd)
              this.push(<IRPushI32>{ kind: 'PushI32', value: delta }, opnd)
              this.push(<IRAdd>{ kind: 'Add' }, opnd)
              this.push(<IRDup>{ kind: 'Dup' }, opnd)
              this.push(<IRSetLocal>{ kind: 'SetLocal', name }, opnd)
            } else {
              // env/global ++x/--x
              this.push(<any>{ kind: 'GetEnvVar', name, strict: this.strictMode } as any, opnd)
              this.push(<IRPushI32>{ kind: 'PushI32', value: delta }, opnd)
              this.push(<IRAdd>{ kind: 'Add' }, opnd)
              this.push(<IRDup>{ kind: 'Dup' }, opnd)
              this.push(<any>{ kind: 'SetEnvVar', name, strict: this.strictMode } as any, opnd)
            }
            return
          } else if (ts.isPropertyAccessExpression(opnd)) {
            // 前缀属性 ++/--：纯栈，新值作为表达式结果
            const pa = opnd
            const field = pa.name.text
            // obj ; dup ; get_field2 ; inc/dec ; dup ; rot3r ; put_field -> leaves new
            this.lowerExpression(pa.expression) // obj
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRGetField2>{ kind: 'GetField2', field }, pa.name)
            if (pe.operator === ts.SyntaxKind.PlusPlusToken) {
              this.push(<any>{ kind: 'Inc' } as any, opnd)
            } else {
              this.push(<IRPushI32>{ kind: 'PushI32', value: -1 }, opnd)
              this.push(<IRAdd>{ kind: 'Add' }, opnd)
            }
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRRot3R>{ kind: 'Rot3R' }, opnd)
            this.push(<IRPutField>{ kind: 'PutField', name: field }, pa.name)
            return
          } else if (ts.isElementAccessExpression(opnd)) {
            // 前缀元素 ++/--：纯栈，结果为新值（arr 与 index 仅求值一次）
            const ea = opnd
            // 压入 arr, index
            this.lowerExpression(ea.expression)
            if (ea.argumentExpression) this.lowerExpression(ea.argumentExpression)
            // 复制一对 [arr, index]：Dup1; Dup; Rot4L; Swap -> [arr, index, arr, index]
            this.push(<IRDup1>{ kind: 'Dup1' }, opnd)
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRRot4L>{ kind: 'Rot4L' }, opnd)
            this.push(<IRSwap>{ kind: 'Swap' }, opnd)
            // 读取 arr[index]
            this.push(<IRGetArrayEl>{ kind: 'GetArrayEl' }, opnd)
            // 计算新值
            if (pe.operator === ts.SyntaxKind.PlusPlusToken) {
              this.push(<any>{ kind: 'Inc' } as any, opnd)
            } else {
              this.push(<IRPushI32>{ kind: 'PushI32', value: -1 }, opnd)
              this.push(<IRAdd>{ kind: 'Add' }, opnd)
            }
            // 复制新值，重排并写回，保留新值作为表达式结果
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRRot4L>{ kind: 'Rot4L' }, opnd)
            this.push(<IRRot4L>{ kind: 'Rot4L' }, opnd)
            this.push(<IRRot3R>{ kind: 'Rot3R' }, opnd)
            this.push(<IRRot3R>{ kind: 'Rot3R' }, opnd)
            this.push(<IRPutArrayEl>{ kind: 'PutArrayEl' }, opnd)
            return
          }
        }
        return
      }
      case ts.SyntaxKind.PostfixUnaryExpression: {
        const pe = expr as ts.PostfixUnaryExpression

        if (pe.operator === ts.SyntaxKind.PlusPlusToken || pe.operator === ts.SyntaxKind.MinusMinusToken) {
          const opnd = pe.operand
          if (ts.isIdentifier(opnd)) {
            const name = opnd.text

            if (this.locals.has(name)) {
              // x++/x-- in expression context (local)
              // ++: get x; dup; inc; put x      --: get x; dup; push -1; add; put x
              this.push(<IRGetLocal>{ kind: 'GetLocal', name }, opnd)
              this.push(<IRDup>{ kind: 'Dup' }, opnd)

              if (pe.operator === ts.SyntaxKind.PlusPlusToken) {
                this.push(<any>{ kind: 'Inc' } as any, opnd)
              } else {
                this.push(<IRPushI32>{ kind: 'PushI32', value: -1 }, opnd)
                this.push(<IRAdd>{ kind: 'Add' }, opnd)
              }

              this.push(<IRSetLocal>{ kind: 'SetLocal', name }, opnd)
            } else {
              // env/global x++/x--
              this.push(<any>{ kind: 'GetEnvVar', name, strict: this.strictMode } as any, opnd)
              this.push(<IRDup>{ kind: 'Dup' }, opnd)

              if (pe.operator === ts.SyntaxKind.PlusPlusToken) {
                this.push(<any>{ kind: 'Inc' } as any, opnd)
              } else {
                this.push(<IRPushI32>{ kind: 'PushI32', value: -1 }, opnd)
                this.push(<IRAdd>{ kind: 'Add' }, opnd)
              }

              this.push(<any>{ kind: 'SetEnvVar', name, strict: this.strictMode } as any, opnd)
            }
            return
          } else if (ts.isPropertyAccessExpression(opnd)) {
            // 后缀属性 ++/--：纯栈，结果为旧值
            const pa = opnd
            const field = pa.name.text
            // obj ; dup ; get_field2 ; dup(old) ; rot3r ; inc/dec ; put_field -> leaves old
            this.lowerExpression(pa.expression) // obj
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRGetField2>{ kind: 'GetField2', field }, pa.name)
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRRot3R>{ kind: 'Rot3R' }, opnd)
            if (pe.operator === ts.SyntaxKind.PlusPlusToken) {
              this.push(<any>{ kind: 'Inc' } as any, opnd)
            } else {
              this.push(<IRPushI32>{ kind: 'PushI32', value: -1 }, opnd)
              this.push(<IRAdd>{ kind: 'Add' }, opnd)
            }
            this.push(<IRPutField>{ kind: 'PutField', name: field }, pa.name)
            return
          } else if (ts.isElementAccessExpression(opnd)) {
            // 后缀元素 ++/--：纯栈，结果为旧值（arr 与 index 仅求值一次）
            const ea = opnd
            // 压入 arr, index
            this.lowerExpression(ea.expression)
            if (ea.argumentExpression) this.lowerExpression(ea.argumentExpression)
            // 复制一对：[arr, index, arr, index]
            this.push(<IRDup1>{ kind: 'Dup1' }, opnd)
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            this.push(<IRRot4L>{ kind: 'Rot4L' }, opnd)
            this.push(<IRSwap>{ kind: 'Swap' }, opnd)
            // 读取旧值
            this.push(<IRGetArrayEl>{ kind: 'GetArrayEl' }, opnd)
            // 复制旧值作为表达式结果
            this.push(<IRDup>{ kind: 'Dup' }, opnd)
            // 计算新值（作用于栈顶副本）
            if (pe.operator === ts.SyntaxKind.PlusPlusToken) {
              this.push(<any>{ kind: 'Inc' } as any, opnd)
            } else {
              this.push(<IRPushI32>{ kind: 'PushI32', value: -1 }, opnd)
              this.push(<IRAdd>{ kind: 'Add' }, opnd)
            }
            // 重排为 [old, arr, index, new] 并写回
            this.push(<IRRot4L>{ kind: 'Rot4L' }, opnd)
            this.push(<IRRot4L>{ kind: 'Rot4L' }, opnd)
            this.push(<IRRot3R>{ kind: 'Rot3R' }, opnd)
            this.push(<IRRot3R>{ kind: 'Rot3R' }, opnd)
            this.push(<IRPutArrayEl>{ kind: 'PutArrayEl' }, opnd)
            return
          }
        }
        // fallback: not handled here
        return
      }
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
      case ts.SyntaxKind.CallExpression: {
        const ce = expr as ts.CallExpression
        // 方法调用：obj.method(...args)
        if (ts.isPropertyAccessExpression(ce.expression)) {
          const obj = ce.expression.expression
          const name = ce.expression.name.text
          // [obj, func, ...args]
          this.lowerExpression(obj)
          this.push(<IRDup>{ kind: 'Dup' }, ce.expression)
          this.push(<IRGetField2>{ kind: 'GetField2', field: name }, ce.expression)
          for (const a of ce.arguments) this.lowerExpression(a)
          this.push(<IRMethodCall>{ kind: 'MethodCall', argc: ce.arguments.length }, ce)
          return
        }
        // 简单调用：func(...args) 严格模式下 this=undefined
        this.lowerExpression(ce.expression)
        this.push(<IRLoadConst>{ kind: 'LoadConst', value: undefined }, ce.expression)
        for (const a of ce.arguments) this.lowerExpression(a)
        this.push(<any>{ kind: 'Call', argc: ce.arguments.length } as any, ce)
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