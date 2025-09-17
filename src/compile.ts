import * as ts from 'typescript'
import { Buffer } from 'buffer'
import { OP } from './op'
import { AtomTable } from './atoms'
import { FunctionIR } from './ir'
import { addClosureCapture } from './scope'
import { preciseMaxStackWithExceptions } from './optimize'
import { Assembler } from './assemble'
import { FUN_FLAG_STRICT, FUN_FLAG_ARROW, FUN_FLAG_ASYNC, FUN_FLAG_GENERATOR } from './env'
import { StrongTypeChecker } from './types'
import { optimize } from './optimize'
import { ShapePolicy } from './shape'
import { writeFunctionOrModule } from './bytecode'

export interface CompileOptions {
  forceModule?: boolean
  enableShortOpcodes?: boolean
  bigintMixPolicy?: 'error' | 'coerce'
  // 对齐 for-in/for-of 语义
  strictForIn?: boolean           // 默认 true：按原型链 + enumerable 的行为收集键
  iteratorCloseForOf?: boolean    // 默认 true：在 break/return/throw 时调用 iter.return()
}

type WithStatic = { 
  tempLoc: number
  props: Set<string> 
} | null

export function compileSource(
  sf: ts.SourceFile, 
  checker: ts.TypeChecker, 
  options: CompileOptions
) {
  const atoms = new AtomTable()
  const ir = new FunctionIR()
  const typeck = new StrongTypeChecker(checker)
  const shapePolicy = new ShapePolicy(checker)

  // 默认选项
  const strictForIn = options.strictForIn !== false
  const iteratorCloseForOf = options.iteratorCloseForOf !== false

  ir.isModule = !!options.forceModule || sf.statements.some(st => ts.isImportDeclaration(st) || ts.isExportDeclaration(st) || ts.isExportAssignment(st))

  const firstStmt = sf.statements[0]
  if (firstStmt && ts.isExpressionStatement(firstStmt) && ts.isStringLiteral(firstStmt.expression) && firstStmt.expression.text === 'use strict') {
    ir.flags |= FUN_FLAG_STRICT
  }
  // 模块始终严格模式
  if (ir.isModule) {
    ir.flags |= FUN_FLAG_STRICT
  }

  ir.filenameAtomId = atoms.add(sf.fileName)
  ir.functionNameAtomId = atoms.add(ir.isModule ? '<module>' : '<main>')

  const asm = new Assembler(ir)

  const u16 = (v: number) => { 
    const b = Buffer.alloc(2) 
    b.writeUInt16LE(v,0)
    return Array.from(b)
  }

  const u32 = (v: number) => { 
    const b = Buffer.alloc(4) 
    b.writeUInt32LE(v,0) 
    return Array.from(b) 
  }

  const i32 = (v: number) => { 
    const b=Buffer.alloc(4) 
    b.writeInt32LE(v,0) 
    return Array.from(b) 
  }
  
  const line = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1
  const col  = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart()).character
  const emit = (op: OP, ops: number[] = [], n?: ts.Node) => asm.emit(op, ops, n?line(n):undefined, n?col(n):undefined)
  const newLabel = () => asm.newLabel()
  const defLabel = (id: number) => asm.defineLabel(id)
  const emitIfFalseTo = (id: number, n?: ts.Node) => asm.emitIfFalseTo(id, n?line(n):undefined, n?col(n):undefined)
  const emitIfTrueTo = (id: number, n?: ts.Node) => asm.emitIfTrueTo(id, n?line(n):undefined, n?col(n):undefined)
  const emitGotoTo = (id: number, n?: ts.Node) => asm.emitGotoTo(id, n?line(n):undefined, n?col(n):undefined)
  const emitWithOp = (op: OP, atomId: number, label: number, scopeIndex: number, n?: ts.Node) =>
    asm.emitWithAtomLabelU8(op, atomId, label, scopeIndex, n?line(n):undefined, n?col(n):undefined)

  const locals = new Map<string, number>()
  const localNames: string[] = []
  const localVarKinds: ('var'|'let'|'const')[] = []
  const addLocal = (name: string) => { 
    if (!locals.has(name)) { 
      const idx = locals.size
      locals.set(name, idx)
      localNames.push(name)
      localVarKinds[idx] = 'var'
    }
    return locals.get(name)!
  }

  const withStack: WithStatic[] = []
  let withDepth = 0

  // 控制流目标栈
  type LoopTarget = { breakL: number; continueL: number }
  const loopStack: LoopTarget[] = []
  const switchBreakStack: number[] = []
  type NamedLabel = { name: string; breakL: number; continueL?: number; kind: 'loop' | 'switch' | 'other' }
  const namedLabels: NamedLabel[] = []
  // 记录 try/finally 环境，用于让 return 经由 finally
  const finallyStack: { finallyStart: number; endLabel: number; retPendingLoc: number; retValueLoc: number }[] = []

  function coerceTosToI32(n?: ts.Node){ 
    emit(OP.push_i32, i32(0), n)
    emit(OP.or, [], n)
  }

  function coerceTosToU32(n?: ts.Node){ 
    emit(OP.push_i32, i32(0), n)
    emit(OP.shr, [], n)
  }

  function coerceTosToI64BigInt(n?: ts.Node){
    emit(OP.get_var, u32(atoms.add('BigInt')), n)
    emit(OP.swap, [], n)
    emit(OP.call, u16(1), n)
  }

  function applyExpectedTypeAtTOS(expected: 'i32' | 'u32' | 'i64' | 'f64' | 'unknown', n?: ts.Node) {
    switch (expected) {
      case 'i32': 
        coerceTosToI32(n)
        break
      case 'u32': 
        coerceTosToU32(n)
        break
      case 'i64': 
        coerceTosToI64BigInt(n)
        break
      default: 
        break
    }
  }

  function propertyNameString(n: ts.PropertyName): string {
    if (ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isNumericLiteral(n)) {
      return n.text
    }

    return n.getText(sf)
  }

  function emitBigIntLiteral(lit: ts.BigIntLiteral) {
    const dec = lit.text.replace(/n$/,'')
    emit(OP.get_var, u32(atoms.add('BigInt')), lit)
    emit(OP.push_atom_value, u32(atoms.add(dec)), lit)
    emit(OP.call, u16(1), lit)
  }

  function emitNumber(n: number, node?: ts.Node) {
    if (Number.isInteger(n) && n >= -2147483648 && n <= 2147483647) {
      emit(OP.push_i32, i32(n|0), node)
    } else {
      const k = ir.ConstantList.indexNumber(n) 
      emit(OP.push_const, u32(k), node)
    }
  }

  function ensureBigIntBinaryCompat(left: ts.Expression, right: ts.Expression) {
    const lt = typeck.classify(left)
    const rt = typeck.classify(right)

    const needBig = (lt === 'i64' || rt === 'i64')

    if (needBig && (lt !== 'i64' || rt !== 'i64') && options.bigintMixPolicy !== 'coerce') {
      const p = sf.getLineAndCharacterOfPosition(left.getStart())
      throw new Error(`BigInt 与 number 混用不允许（默认策略 error）。${sf.fileName}:${p.line+1}:${p.character+1}`)
    }
  }

  // --- TDZ 作用域栈（替换原单 Set） ---
  const tdzScopes: Array<Set<string>> = [new Set()]
  const tdzEnterScope = () => tdzScopes.push(new Set())
  const tdzExitScope = () => { if (tdzScopes.length > 1) tdzScopes.pop() }
  const tdzMark = (name: string) => tdzScopes[tdzScopes.length - 1].add(name)
  const tdzResolve = (name: string) => {
    for (let i = tdzScopes.length - 1; i >= 0; i--) {
      if (tdzScopes[i].has(name)) return true
    }
    return false
  }

  function emitIdentLoad(name: string, n?: ts.Node) {
    if (tdzResolve(name)) {
      // ReferenceError 构造： ReferenceError(name)
      emit(OP.get_var, u32(atoms.add('ReferenceError')), n)
      emit(OP.push_atom_value, u32(atoms.add(name)), n)
      emit(OP.call, u16(1), n)
      emit(OP.throw, [], n)
      return
    }
    if (withStack.length) {
      for (let k = withStack.length - 1; k >= 0; k--) {
        const ws = withStack[k]
        if (ws && ws.props.has(name)) {
          emit(OP.get_loc, u16(ws.tempLoc), n)
          emit(OP.get_field, u32(atoms.add(name)), n)
          return
        }
      }
    }

    if (withDepth > 0 && !locals.has(name)) {
      const fallback = newLabel()
      emitWithOp(OP.with_get_var, atoms.add(name), fallback, (withDepth-1) & 0xff, n)
      defLabel(fallback)
      emit(OP.get_var, u32(atoms.add(name)), n)
      return
    }

    if (locals.has(name)) {
      emit(OP.get_loc, u16(locals.get(name)!), n)
    } else {
      emit(OP.get_var, u32(atoms.add(name)), n)
    }
  }

  function emitIdentStore(name: string, n?: ts.Node) {
    // 移除声明作用域内的 TDZ 标记（只清除遇到的第一层）
    for (let i = tdzScopes.length - 1; i >= 0; i--) {
      if (tdzScopes[i].delete(name)) break
    }
    // 如果是 const 且已初始化过（不在 TDZ 集合中意味着我们正处于后续写入），抛 TypeError
    if (locals.has(name)) {
      const idx = locals.get(name)!
      if (localVarKinds[idx] === 'const') {
        // 构造 TypeError(name)
        emit(OP.get_var, u32(atoms.add('TypeError')), n)
        emit(OP.push_atom_value, u32(atoms.add(name)), n)
        emit(OP.call, u16(1), n)
        emit(OP.throw, [], n)
        return
      }
    }
    if (withStack.length) {
      for (let k = withStack.length - 1; k >= 0; k--) {
        const ws = withStack[k]

        if (ws && ws.props.has(name)) {
          emit(OP.get_loc, u16(ws.tempLoc), n)
          emit(OP.swap, [], n)
          emit(OP.put_field, u32(atoms.add(name)), n)
          return
        }
      }
    }

    if (withDepth > 0 && !locals.has(name)) {
      const fallback = newLabel()
      emitWithOp(OP.with_put_var, atoms.add(name), fallback, (withDepth-1)&0xff, n)
      defLabel(fallback)
      emit(OP.put_var, u32(atoms.add(name)), n)
      return
    }

    if (locals.has(name)){
      emit(OP.put_loc, u16(locals.get(name)!), n)
    } else {
      emit(OP.put_var, u32(atoms.add(name)), n)
    }
  }

  // （旧单集合实现已移除）

  function emitElemLoad(obj: ts.Expression, prop: ts.Expression, node?: ts.Node) {
    emitExpr(obj) 
    emitExpr(prop)
    emit(OP.get_array_el, [], node)
  }

  function emitElemStore(obj: ts.Expression, prop: ts.Expression, rhs: ts.Expression, node?: ts.Node) {
    emitExpr(obj) 
    emitExpr(prop)
    emitExpr(rhs)
    emit(OP.put_array_el, [], node)
  }

  function emitDynamicImport(call: ts.CallExpression) {
    if (call.arguments.length !== 1) { 
      emit(OP.undefined, [], call)
      return
    }

    emitExpr(call.arguments[0])
    emit(OP.undefined, [], call)
    emit(OP.import, [], call)
  }

  function emitEval(call: ts.CallExpression) {
    emitIdentLoad('eval', call)
    for (const a of call.arguments) {
      emitExpr(a)
    }

    emit(OP.eval, u16(call.arguments.length), call)
  }

  function emitObjectLiteralWithShape(e: ts.ObjectLiteralExpression) {
    const ctxType = checker.getContextualType(e) ?? checker.getTypeAtLocation(e)
    const shape = ctxType ? shapePolicy.getCanonicalShape(ctxType) : null

    emit(OP.object, [], e)

    if (shape) {
      const present = new Map<string, ts.Expression>()
      for (const p of e.properties) {
        if (ts.isPropertyAssignment(p)) {
          present.set(propertyNameString(p.name), p.initializer)
        }
      }

      for (const key of shape.orderedKeys) {
        if (present.has(key)) {
          emitExpr(present.get(key)!)
          emit(OP.define_field, u32(atoms.add(key)), e)
        }
      }

      for (const key of shape.orderedKeys) {
        if (!present.has(key)) {
          emit(OP.undefined, [], e)
          emit(OP.define_field, u32(atoms.add(key)), e)
        }
      }
    } else {
      for (const p of e.properties) {
        if (ts.isPropertyAssignment(p)) {
          emitExpr(p.initializer)
          emit(OP.define_field, u32(atoms.add(propertyNameString(p.name))), p)
        }
      }
    }
  }

  // for-in 实现：严格按照 QuickJS 原生字节码语义
  // 栈约定：
  //   for_in_start: obj -> iterator
  //   循环体顶: for_in_next: iterator -> iterator key done
  //   其中 done=true 表示“迭代结束”（与 QuickJS parser.c 中语义一致），因此判断为 true 时跳出。
  //   符号属性与原型链过滤由 VM 内部完成；此处无需手动跳过 symbol。
  function emitForIn(stmt: ts.ForInStatement) {
    // 使用 QuickJS 原生 for-in 指令
    emitExpr(stmt.expression)
    
    // for_in_start: obj -> iterator （QuickJS 内部迭代器状态）
    emit(OP.for_in_start, [], stmt)
    
    const loopL = newLabel()
    const contL = newLabel() 
    const endL = newLabel()

    defLabel(loopL)
    // for_in_next: iterator -> iterator key done
    // 如果 done=true，则跳出循环
    emit(OP.for_in_next, [], stmt)
    emit(OP.dup, [], stmt)        // iterator key done done
    emitIfTrueTo(endL, stmt)      // 如果 done=true，跳到结束
    emit(OP.drop, [], stmt)       // iterator key (移除 done)

    // 将键绑定到目标变量
    const target = stmt.initializer
    if (ts.isVariableDeclarationList(target)) {
      const d = target.declarations[0]
      if (d && ts.isIdentifier(d.name)) {
        const name = d.name.text
        if (!locals.has(name)) addLocal(name)
        emitIdentStore(name, stmt)
      }
    } else if (ts.isExpression(target)) {
      const t = target as ts.Expression
      if (ts.isIdentifier(t)) {
        emitIdentStore(t.text, stmt)
      } else if (ts.isPropertyAccessExpression(t)) {
        emitExpr(t.expression)
        emit(OP.swap, [], stmt)
        emit(OP.put_field, u32(atoms.add(t.name.text)), stmt)
      } else if (ts.isElementAccessExpression(t)) {
        emitExpr(t.expression)
        emitExpr(t.argumentExpression!)
        emit(OP.swap, [], stmt)
        emit(OP.put_array_el, [], stmt)
      }
    }

    // 执行循环体
    loopStack.push({ breakL: endL, continueL: contL })
    emitStmtBlock(stmt.statement)
    loopStack.pop()

    // continue 点
    defLabel(contL)
    emitGotoTo(loopL, stmt)

    // 循环结束，清理迭代器
    defLabel(endL)
    emit(OP.drop, [], stmt)       // 移除迭代器
  }

  // For-of 实现：使用 QuickJS 原生字节码指令
  // 栈约定（原生命令分支 iteratorCloseForOf=true 时）：
  //   for_of_start: obj -> iterator next catch_offset
  //   for_of_next: iterator next catch_offset -> iterator next catch_offset value done
  //   done=true 表示“完成”，需要跳出；否则保留 value 供循环体使用。
  //   结束时按 value, catch_offset, next, iterator 顺序清理，与生成顺序逆序匹配。
  // 手动 fallback 分支：使用 try/finally 实现 iterator.return 调用（当 done=false 且存在 return）。
  //   该实现与 QuickJS 在未使用原生命令时的规范语义对齐。
  function emitForOf(stmt: ts.ForOfStatement) {
    if (iteratorCloseForOf) {
      // 使用 QuickJS 原生 for-of 指令
      emitExpr(stmt.expression)
      
      // for_of_start: obj -> iterator next catch_offset
      emit(OP.for_of_start, [], stmt)
      
      const loopL = newLabel()
      const contL = newLabel() 
      const endL = newLabel()

      defLabel(loopL)
      // for_of_next: iterator next catch_offset -> iterator next catch_offset value done
      emit(OP.for_of_next, [0], stmt)  // 0 = is_async flag
      
      // 检查 done 标志
      emit(OP.dup, [], stmt)        // iterator next catch_offset value done done
      emitIfTrueTo(endL, stmt)      // 如果 done=true，跳到结束
      emit(OP.drop, [], stmt)       // iterator next catch_offset value (移除 done)

      // 将值绑定到目标变量
      const init = stmt.initializer
      if (ts.isVariableDeclarationList(init)) {
        const decl = init.declarations[0]
        if (decl && ts.isIdentifier(decl.name)) {
          const vname = decl.name.text
          if (!locals.has(vname)) addLocal(vname)
          emitIdentStore(vname, stmt)
        }
      } else if (ts.isExpression(init)) {
        const t = init as ts.Expression
        if (ts.isIdentifier(t)) {
          emitIdentStore(t.text, stmt)
        } else if (ts.isPropertyAccessExpression(t)) {
          emitExpr(t.expression)
          emit(OP.swap, [], stmt)
          emit(OP.put_field, u32(atoms.add(t.name.text)), stmt)
        } else if (ts.isElementAccessExpression(t)) {
          emitExpr(t.expression)
          emitExpr(t.argumentExpression!)
          emit(OP.swap, [], stmt)
          emit(OP.put_array_el, [], stmt)
        }
      }

      // 执行循环体，设置循环目标：break -> endL；continue -> contL
      loopStack.push({ breakL: endL, continueL: contL })
      emitStmtBlock(stmt.statement)
      loopStack.pop()

      // continue 点
      defLabel(contL)
      emitGotoTo(loopL, stmt)

      // 循环结束，QuickJS 自动处理迭代器关闭
      defLabel(endL)
      // 清理堆栈：iterator next catch_offset value
      emit(OP.drop, [], stmt)  // value  
      emit(OP.drop, [], stmt)  // catch_offset
      emit(OP.drop, [], stmt)  // next
      emit(OP.drop, [], stmt)  // iterator
      return
    }

    // 手动实现：规范的 Symbol.iterator 和 iteratorClose
    const iterLoc = addLocal(`__iter_${stmt.pos}`)
    const stepLoc = addLocal(`__step_${stmt.pos}`)
    const doneLoc = addLocal(`__done_${stmt.pos}`)

    // 规范实现：func = obj[Symbol.iterator]; iter = func.call(obj)
    const baseLoc = addLocal(`__iter_base_${stmt.pos}`)
    emitExpr(stmt.expression)
    emit(OP.put_loc, u16(baseLoc), stmt.expression)
    emit(OP.get_loc, u16(baseLoc), stmt.expression)
    emit(OP.get_var, u32(atoms.add('Symbol')), stmt.expression)
    emit(OP.get_field, u32(atoms.add('iterator')), stmt.expression)
    emit(OP.get_array_el, [], stmt.expression)
    asm.emit(OP.dup, [], line(stmt.expression), col(stmt.expression))
    emit(OP.get_field2, u32(atoms.add('call')), stmt.expression)
    emit(OP.get_loc, u16(baseLoc), stmt.expression)
    emit(OP.call_method, u16(1), stmt.expression)
    emit(OP.put_loc, u16(iterLoc), stmt.expression)

    // done = true （表示“无需 close”）
    emit(OP.push_true, [], stmt)
    emit(OP.put_loc, u16(doneLoc), stmt)

    const tryStart = newLabel()
    const tryEnd = newLabel()
    const finallyStart = newLabel()
    const endL = newLabel()
    const loopL = newLabel()
    const contL = newLabel()

    // try {
    defLabel(tryStart)
    defLabel(loopL)
    // step = iter.next() -> 以 Function.prototype.call 调用，确保 this=iter
    emit(OP.get_loc, u16(iterLoc), stmt)
    emit(OP.get_field, u32(atoms.add('next')), stmt)
    asm.emit(OP.dup, [], line(stmt), col(stmt))
    emit(OP.get_field2, u32(atoms.add('call')), stmt)
    emit(OP.get_loc, u16(iterLoc), stmt)
    emit(OP.call_method, u16(1), stmt)
    emit(OP.put_loc, u16(stepLoc), stmt)

    // if (step.done) { done=true; goto finally }
    emit(OP.get_loc, u16(stepLoc), stmt)
    emit(OP.get_field, u32(atoms.add('done')), stmt)
    const notDoneL = newLabel()
    emitIfFalseTo(notDoneL, stmt)
    // step.done === true
    emit(OP.push_true, [], stmt)
    emit(OP.put_loc, u16(doneLoc), stmt)
    emitGotoTo(finallyStart, stmt)
    defLabel(notDoneL)

    // 否则：done=false; v = step.value; 执行循环体
    emit(OP.push_false, [], stmt)
    emit(OP.put_loc, u16(doneLoc), stmt)

    // 取 value 并绑定到目标
    emit(OP.get_loc, u16(stepLoc), stmt)
    emit(OP.get_field, u32(atoms.add('value')), stmt)

    const init = stmt.initializer
    if (ts.isVariableDeclarationList(init)) {
      const decl = init.declarations[0]
      if (decl && ts.isIdentifier(decl.name)) {
        const vname = decl.name.text
        if (!locals.has(vname)) addLocal(vname)
        emitIdentStore(vname, stmt)
      }
    } else if (ts.isExpression(init)) {
      const t = init as ts.Expression
      if (ts.isIdentifier(t)) {
        emitIdentStore(t.text, stmt)
      } else if (ts.isPropertyAccessExpression(t)) {
        emitExpr(t.expression)
        emit(OP.swap, [], stmt)
        emit(OP.put_field, u32(atoms.add(t.name.text)), stmt)
      } else if (ts.isElementAccessExpression(t)) {
        emitExpr(t.expression)
        emitExpr(t.argumentExpression!)
        emit(OP.swap, [], stmt)
        emit(OP.put_array_el, [], stmt)
      }
    }

    // 设置循环目标：break -> finally；continue -> contL
    loopStack.push({ breakL: finallyStart, continueL: contL })
    emitStmtBlock(stmt.statement)
    loopStack.pop()

    // continue: 回到 loop 顶部
    defLabel(contL)
    emitGotoTo(loopL, stmt)

    // try end
    defLabel(tryEnd)
    // 正常流入 finally
    emitGotoTo(finallyStart, stmt)

    // } finally {
    defLabel(finallyStart)
    if (iteratorCloseForOf) {
      // if (!done) { const ret = iter.return; if (ret != null) ret.call(iter) }
      emit(OP.get_loc, u16(doneLoc), stmt)
      emit(OP.lnot, [], stmt)
      const afterClose = newLabel()
      emitIfFalseTo(afterClose, stmt)
      // ret = iter.return
      const retLoc = addLocal(`__ret_${stmt.pos}`)
      emit(OP.get_loc, u16(iterLoc), stmt)
      emit(OP.get_field, u32(atoms.add('return')), stmt)
      emit(OP.put_loc, u16(retLoc), stmt)
      // if (ret == null) skip
      const isNotNull = newLabel()
      const skipCall = newLabel()
      emit(OP.get_loc, u16(retLoc), stmt)
      emit(OP.null, [], stmt)
      emit(OP.eq, [], stmt)
      emitIfFalseTo(isNotNull, stmt)
      emitGotoTo(skipCall, stmt)
      defLabel(isNotNull)
      // ret.call(iter)
      emit(OP.get_loc, u16(retLoc), stmt)
      emit(OP.get_field2, u32(atoms.add('call')), stmt)
      emit(OP.get_loc, u16(iterLoc), stmt)
      emit(OP.call_method, u16(1), stmt)
      defLabel(skipCall)
      defLabel(afterClose)
    }
    // } -> end
    emitGotoTo(endL, stmt)

    // 异常边：try -> finally
    asm.addExceptionByLabels(tryStart, tryEnd, finallyStart)

    defLabel(endL)
  }

  // Await
  function emitAwait(expr: ts.Expression, n?: ts.Node) {
    emitExpr(expr)
    asm.emit(OP.await, [], n ? line(n) : undefined, n ? col(n) : undefined)
  }

  // Yield
  function emitYield(expr: ts.Expression | undefined, n?: ts.Node) {
    if (expr) {
      emitExpr(expr)
    }

    asm.emit(OP.yield, [], n ? line(n) : undefined, n ? col(n) : undefined)
  }

  // --- 函数相关：编译子函数 -> 常量 -> fclosure ---
  function compileFunctionLike(fn: ts.FunctionLikeDeclaration, arrow: boolean): number {
    const child = new FunctionIR()
    child.parent = ir
    child.depth = (ir.depth ?? 0) + 1
    child.isModule = false
    child.filenameAtomId = ir.filenameAtomId
    const fname = fn.name && ts.isIdentifier(fn.name) ? fn.name.text : (arrow ? 'arrow' : 'anonymous')
    child.functionNameAtomId = atoms.add(fname)
    if (!arrow) {
      child.flags |= FUN_FLAG_STRICT
    }
    if (arrow) {
      child.flags |= FUN_FLAG_ARROW
      child.isArrow = true
    }
    // 标志位：与 quickjs 对齐
    child.isAsync = !!fn.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)
    if (child.isAsync) child.flags |= FUN_FLAG_ASYNC
    child.isGenerator = !!(ts.isFunctionDeclaration(fn) || ts.isFunctionExpression(fn)) && !!(fn as any).asteriskToken
    if (child.isGenerator) child.flags |= FUN_FLAG_GENERATOR

    // 参数
    child.argCount = fn.parameters.length
    child.definedArgCount = child.argCount
    child.paramNameAtoms = fn.parameters.map(p => atoms.add(p.name.getText()))
    // 防御：某些间接构造/脱离 Program 的函数节点在 edge case 下可能没有绑定 SourceFile
    // 之前 forof-return-close 测试中触发 getFullText undefined 异常；改为安全获取，缺失时回退空串。
    const sfNode = fn.getSourceFile && fn.getSourceFile()
    try {
      child.sourceText = sfNode && (sfNode as any).getFullText ? sfNode.getFullText() : ''
    } catch {
      child.sourceText = ''
    }

    // TODO(FunctionPhase1): 现在仍然是占位实现 -> 仅 emit return_undef。
    // 下一阶段将：
    // 1. 创建子作用域 & 遍历参数/变量语句生成 get/put_loc
    // 2. 支持语句块/控制流/return 真实发射
    // 3. 处理捕获变量 -> make_var_ref/get_var_ref/put_var_ref
    // 4. 按 QuickJS 语义补尾部 return_undef（无显式 return）

    const childAsm = new Assembler(child)

    // Phase1(增量): 尝试编译一个“安全子集”的函数体；如遇未实现语句则回退到占位实现，保证不回归。
    let fallbackStub = false

    const childLocals = new Map<string, number>()
    const childLocalNames: string[] = []
    const childLocalVarKinds: ('var'|'let'|'const')[] = []
    const addLocal = (name: string) => {
      if (childLocals.has(name)) return childLocals.get(name)!;
      const idx = childLocals.size
      childLocals.set(name, idx)
      childLocalNames.push(name)
      // 默认 var；稍后在 emitVarDecl/参数注册时修正
      childLocalVarKinds[idx] = 'var'
      return idx
    }

    // 参数暂作为 locals（后续再区分 arg 指令集）
    fn.parameters.forEach(p => { if (ts.isIdentifier(p.name)) addLocal(p.name.text) })

    const emit = (op: number, ops: number[] = [], n?: ts.Node) => {
      childAsm.emit(op, ops, n ? line(n) : undefined, n ? col(n) : undefined)
    }

    function emitPushNumber(n: number) {
      // 先走 i32（与顶层策略保持一致）；未来再根据常量池策略放入 ConstantList
      const v = n|0
      emit(OP.push_i32, u32(v))
    }

    // 闭包支持：记录父级捕获 -> var_ref
    const parentIR = ir
    const closureVarRefs = new Map<string, number>()
    function ensureClosureVarRef(name: string): number | undefined {
      if (childLocals.has(name)) return undefined
      // Walk ancestors to find first frame defining the symbol (params or locals)
      let ancestor: FunctionIR | undefined = parentIR
      let foundFrame: FunctionIR | undefined
      let foundIndex = -1
      let isArg = false
      while (ancestor) {
        // paramNameAtoms / localNameAtoms hold atoms; need textual compare -> we only stored atom ids.
        // Reconstruct text via reverse atom map unavailable; maintain a temporary textual cache at compile time:
        // Because we add atoms via atoms.add(name), we can compare by atom id if we re-add.
        const nameAtom = atoms.add(name)
        const pIdx = ancestor.paramNameAtoms.indexOf(nameAtom)
        if (pIdx >= 0) { foundFrame = ancestor; foundIndex = pIdx; isArg = true; break }
        const lIdx = ancestor.localNameAtoms.indexOf(nameAtom)
        if (lIdx >= 0) { foundFrame = ancestor; foundIndex = lIdx; break }
        ancestor = ancestor.parent
      }
      // If not found, treat as global -> no capture
      if (!foundFrame) return undefined
      const nameAtom = atoms.add(name)
      // Use foundIndex as stable index; QuickJS differentiates arg vs var env; here we mark metadata only
      const capIdx = addClosureCapture(foundFrame, child, { kind: 'local', index: foundIndex, name, nameAtom, isArg } as any)
      return capIdx
    }

    function isConstClosure(name: string): boolean {
      let ancestor: FunctionIR | undefined = parentIR
      while (ancestor) {
        const nameAtom = atoms.add(name)
        const pIdx = ancestor.paramNameAtoms.indexOf(nameAtom)
        if (pIdx >= 0) {
          // 参数暂不视为 const
          return false
        }
        const lIdx = ancestor.localNameAtoms.indexOf(nameAtom)
        if (lIdx >= 0) {
          return ancestor.localVarKinds && ancestor.localVarKinds[lIdx] === 'const'
        }
        ancestor = ancestor.parent
      }
      return false
    }

    function emitIdentifier(id: ts.Identifier) {
      const name = id.text
      if (childLocals.has(name)) { emit(OP.get_loc, u16(childLocals.get(name)!), id); return }
      let refIdx = closureVarRefs.get(name)
      if (refIdx == null) {
        const cap = ensureClosureVarRef(name)
        if (cap != null) { refIdx = cap; closureVarRefs.set(name, refIdx) }
      }
      if (refIdx != null) emit(OP.get_var_ref, u16(refIdx), id)
      else emit(OP.get_var, u32(atoms.add(name)), id)
    }

    function emitVarDecl(d: ts.VariableDeclaration) {
      if (!ts.isIdentifier(d.name)) { fallbackStub = true; return }
      const name = d.name.text
      const loc = addLocal(name)
      if (d.initializer) {
        emitExprFn(d.initializer)
        if (!fallbackStub) emit(OP.put_loc, u16(loc), d)
      } else {
        emit(OP.undefined)
        emit(OP.put_loc, u16(loc), d)
      }
    }

    function emitExprFn(e: ts.Expression) {
      switch (e.kind) {
        case ts.SyntaxKind.NumericLiteral: emitPushNumber(Number((e as ts.NumericLiteral).text)); return
        case ts.SyntaxKind.TrueKeyword: emit(OP.push_true); return
        case ts.SyntaxKind.FalseKeyword: emit(OP.push_false); return
        case ts.SyntaxKind.NullKeyword: emit(OP.null); return
        case ts.SyntaxKind.Identifier: emitIdentifier(e as ts.Identifier); return
        case ts.SyntaxKind.ParenthesizedExpression: return emitExprFn((e as ts.ParenthesizedExpression).expression)
        case ts.SyntaxKind.BinaryExpression: {
          const be = e as ts.BinaryExpression
          // 赋值 / +=
          if (be.operatorToken.kind === ts.SyntaxKind.EqualsToken || be.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) {
            if (!ts.isIdentifier(be.left)) { fallbackStub = true; return }
            const lid = be.left
            if (be.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) {
              emitIdentifier(lid); emitExprFn(be.right); if (fallbackStub) return; emit(OP.add)
            } else {
              emitExprFn(be.right); if (fallbackStub) return
            }
            const name = lid.text
            if (childLocals.has(name)) emit(OP.put_loc, u16(childLocals.get(name)!), be)
            else {
              let refIdx = closureVarRefs.get(name)
              if (refIdx == null) { const cap = ensureClosureVarRef(name); if (cap != null) { refIdx = cap; closureVarRefs.set(name, refIdx) } }
              if (refIdx != null) {
                if (isConstClosure(name)) {
                  // TypeError(name)
                  emit(OP.get_var, u32(atoms.add('TypeError')), be)
                  emit(OP.push_atom_value, u32(atoms.add(name)), be)
                  emit(OP.call, u16(1), be)
                  emit(OP.throw, [], be)
                } else {
                  emit(OP.put_var_ref, u16(refIdx), be)
                }
              }
              else emit(OP.put_var, u32(atoms.add(name)), be)
            }
            return
          }
          if (![ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken, ts.SyntaxKind.AsteriskToken, ts.SyntaxKind.SlashToken, ts.SyntaxKind.PercentToken].includes(be.operatorToken.kind)) { fallbackStub = true; return }
          emitExprFn(be.left); emitExprFn(be.right); if (fallbackStub) return
          switch (be.operatorToken.kind) {
            case ts.SyntaxKind.PlusToken: emit(OP.add); break
            case ts.SyntaxKind.MinusToken: emit(OP.sub); break
            case ts.SyntaxKind.AsteriskToken: emit(OP.mul); break
            case ts.SyntaxKind.SlashToken: emit(OP.div); break
            case ts.SyntaxKind.PercentToken: emit(OP.mod); break
          }
          return
        }
        case ts.SyntaxKind.CallExpression: {
          const ce = e as ts.CallExpression
          if (!ts.isIdentifier(ce.expression)) { fallbackStub = true; return }
            emitIdentifier(ce.expression)
            for (const arg of ce.arguments) emitExprFn(arg)
            emit(OP.call, u16(ce.arguments.length), ce)
            return
        }
        default: fallbackStub = true; return
      }
    }

    let sawExplicitReturn = false
    // 控制流辅助结构（局部，仅在子函数编译期间使用）
    const loopStack: Array<{ breakL: number, continueL: number }> = []
    const finallyStack: Array<{ finallyStart: number, endLabel: number, retPendingLoc: number, retValueLoc: number }> = []

    const newLabel = () => childAsm.newLabel()
    const defLabel = (id: number) => childAsm.defineLabel(id)
    const emitIfFalseTo = (label: number, n?: ts.Node) => childAsm.emitIfFalseTo(label, n ? line(n) : undefined, n ? col(n) : undefined)
    const emitGotoTo = (label: number, n?: ts.Node) => childAsm.emitGotoTo(label, n ? line(n) : undefined, n ? col(n) : undefined)

    function emitStmtFn(s: ts.Statement) {
      if (fallbackStub) return
      switch (s.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          const cd = s as ts.ClassDeclaration
          if (!cd.name) break
          const className = cd.name.text
          // extends: if present, evaluate base (expression) else push null (undefined placeholder was used before)
          let hasExtends = false
          if (cd.heritageClauses) {
            const ext = cd.heritageClauses.find(h => h.token === ts.SyntaxKind.ExtendsKeyword)
            if (ext && ext.types.length === 1) {
              hasExtends = true
              emitExprFn(ext.types[0].expression as ts.Expression)
            }
          }
          if (!hasExtends) {
            emit(OP.null, [], cd) // proto_or_null
          } else {
            // If hasExtends, stack currently: [Base]
            // Need Base.prototype as proto_or_null and keep Base for later ctor.__proto__ link.
            const baseTemp = addLocal(`__base_${cd.pos}`)
            emit(OP.dup, [], cd)              // [Base, Base]
            emit(OP.put_loc, u16(baseTemp), cd) // store one copy
            // load Base.prototype
            emit(OP.push_atom_value, u32(atoms.add('prototype')), cd)
            emit(OP.get_field, u32(atoms.add('prototype')), cd)
          }

          // constructor
          const ctorDecl = cd.members.find(m => ts.isConstructorDeclaration(m)) as ts.ConstructorDeclaration | undefined
          if (ctorDecl) {
            const ctorFn = ts.factory.createFunctionExpression(undefined, undefined, undefined, undefined, ctorDecl.parameters, undefined, ctorDecl.body ?? ts.factory.createBlock([]))
            const cidx = compileFunctionLike(ctorFn, false)
            emit(OP.fclosure, u32(cidx), ctorDecl)
          } else {
            const emptyCtor = ts.factory.createFunctionExpression(undefined, undefined, undefined, undefined, [], undefined, ts.factory.createBlock([]))
            const cidx = compileFunctionLike(emptyCtor, false)
            emit(OP.fclosure, u32(cidx), cd)
          }
          emit(OP.define_class, [], cd) // stack: ctor
          if (hasExtends) {
            // Link ctor.__proto__ = Base
            const baseTempName = `__base_${cd.pos}`
            // push ctor, Base, 'prototype' chain already embedded; we set ctor.__proto__ = Base via set_proto
            emit(OP.get_loc, u16(locals.get(baseTempName)!), cd) // push Base
            // reorder to [Base, ctor] for set_proto expectation (assuming set_proto consumes obj, proto)
            emit(OP.swap, [], cd)
            emit(OP.set_proto, [], cd)

            // Also link ctor.prototype.__proto__ = Base.prototype
            // Steps:
            // stack: [ctor]
            // dup -> [ctor, ctor]
            // push 'prototype' & get_field -> [ctor, ctor.prototype]
            // get Base temp -> [ctor, ctor.prototype, Base]
            // push 'prototype' & get_field -> [ctor, ctor.prototype, Base.prototype]
            // swap to reorder to [ctor, Base.prototype, ctor.prototype]
            // perm4 / swap sequence to have [ctor.prototype, Base.prototype] then set_proto
            emit(OP.dup, [], cd) // [ctor, ctor]
            emit(OP.push_atom_value, u32(atoms.add('prototype')), cd)
            emit(OP.get_field, u32(atoms.add('prototype')), cd) // [ctor, ctor.prototype]
            emit(OP.get_loc, u16(locals.get(baseTempName)!), cd) // [ctor, ctor.prototype, Base]
            emit(OP.push_atom_value, u32(atoms.add('prototype')), cd)
            emit(OP.get_field, u32(atoms.add('prototype')), cd) // [ctor, ctor.prototype, Base.prototype]
            // reorder: want [ctor.prototype, Base.prototype]
            emit(OP.swap, [], cd)          // [ctor, ctor.prototype, Base.prototype] -> [ctor, Base.prototype, ctor.prototype]
            emit(OP.drop, [], cd)          // remove extra ctor => [Base.prototype, ctor.prototype]
            emit(OP.swap, [], cd)          // [ctor.prototype, Base.prototype]
            emit(OP.set_proto, [], cd)
          }

          // For instance methods we need prototype: duplicate class (ctor), get 'prototype' then define.
          // Simplification: push ctor; get_field 'prototype' once and keep in temp local.
          const protoLoc = addLocal(`__proto_${cd.pos}`)
          // get prototype: stack [ctor]; duplicate & load field
          emit(OP.dup, [], cd)
          emit(OP.push_atom_value, u32(atoms.add('prototype')), cd)
          emit(OP.get_field, u32(atoms.add('prototype')), cd) // simplification using get_field with constant
          emit(OP.put_loc, u16(protoLoc), cd)

          for (const m of cd.members) {
            if (!ts.isMethodDeclaration(m) || !m.name || !ts.isIdentifier(m.name)) continue
            const nameText = m.name.text
            const nameAtom = atoms.add(nameText)
            const fnExpr = ts.factory.createFunctionExpression(undefined, undefined, undefined, undefined, m.parameters, undefined, m.body ?? ts.factory.createBlock([]))
            const midx = compileFunctionLike(fnExpr, false)
            emit(OP.fclosure, u32(midx), m)
            emit(OP.set_home_object, [], m)
            emit(OP.push_atom_value, u32(nameAtom), m)
            if (m.modifiers?.some(mm => mm.kind === ts.SyntaxKind.StaticKeyword)) {
              // static: define on constructor (current stack top before push? ensure ctor at stack top)
              // stack currently: [ctor, f, name]
              emit(OP.define_field, [], m)
            } else {
              // instance: load saved prototype then swap into position
              emit(OP.get_loc, u16(protoLoc), m) // push prototype
              // reorder: we have [ctor, f, name, proto]; need [proto, f, name] then define_field
              emit(OP.perm4, [], m) // approximate reordering (proto -> under f & name)
              emit(OP.define_field, [], m)
            }
          }

          emit(OP.add_brand, [], cd)
          emit(OP.put_var, u32(atoms.add(className)), cd)
          break
        }
        case ts.SyntaxKind.VariableStatement: {
          const vs = s as ts.VariableStatement
          const isLetConst = (vs.declarationList.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) !== 0
          for (const decl of vs.declarationList.declarations) {
            if (ts.isIdentifier(decl.name) && isLetConst) {
              tdzMark(decl.name.text)
            }
            emitVarDecl(decl)
          }
          break
        }
        case ts.SyntaxKind.ExpressionStatement: {
          emitExprFn((s as ts.ExpressionStatement).expression)
          if (!fallbackStub) emit(OP.drop)
          break
        }
        case ts.SyntaxKind.ReturnStatement: {
          const rs = s as ts.ReturnStatement
          if (rs.expression) {
            emitExprFn(rs.expression)
            if (!fallbackStub) emit(OP.return)
          } else {
            emit(OP.return_undef)
          }
          sawExplicitReturn = true
          break
        }
        case ts.SyntaxKind.Block: {
          for (const st of (s as ts.Block).statements) emitStmtFn(st)
          break
        }
        case ts.SyntaxKind.IfStatement: {
          const isNode = s as ts.IfStatement
          emitExprFn(isNode.expression)
          if (fallbackStub) break
          const elseL = newLabel()
          emitIfFalseTo(elseL, isNode)
          emitStmtFn(isNode.thenStatement as ts.Statement)
          if (fallbackStub) break
          if (isNode.elseStatement) {
            const endL = newLabel()
            emitGotoTo(endL, isNode)
            defLabel(elseL)
            emitStmtFn(isNode.elseStatement as ts.Statement)
            defLabel(endL)
          } else {
            defLabel(elseL)
          }
          break
        }
        case ts.SyntaxKind.WhileStatement: {
          const wsNode = s as ts.WhileStatement
          const loop = newLabel()
          const cont = newLabel()
          const endL = newLabel()
          defLabel(loop)
          emitExprFn(wsNode.expression)
          if (fallbackStub) break
          emitIfFalseTo(endL, wsNode)
          loopStack.push({ breakL: endL, continueL: cont })
          emitStmtFn(wsNode.statement as ts.Statement)
          loopStack.pop()
          defLabel(cont)
          emitGotoTo(loop, wsNode)
          defLabel(endL)
          break
        }
        case ts.SyntaxKind.ForStatement: {
          const fsNode = s as ts.ForStatement
          if (fsNode.initializer) {
            if (ts.isVariableDeclarationList(fsNode.initializer)) {
              for (const d of fsNode.initializer.declarations) emitVarDecl(d)
            } else {
              emitExprFn(fsNode.initializer as ts.Expression)
              if (!fallbackStub) emit(OP.drop)
            }
          }
            const loop = newLabel()
            const cont = newLabel()
            const endL = newLabel()
            defLabel(loop)
            if (fsNode.condition) {
              emitExprFn(fsNode.condition); if (fallbackStub) break
              emitIfFalseTo(endL, fsNode)
            }
            loopStack.push({ breakL: endL, continueL: cont })
            emitStmtFn(fsNode.statement as ts.Statement)
            loopStack.pop()
            defLabel(cont)
            if (fsNode.incrementor) { emitExprFn(fsNode.incrementor); if (!fallbackStub) emit(OP.drop) }
            emitGotoTo(loop, fsNode)
            defLabel(endL)
            break
        }
        case ts.SyntaxKind.BreakStatement: {
          if (!loopStack.length) { fallbackStub = true; break }
          const br = s as ts.BreakStatement
          if (br.label) { fallbackStub = true; break } // 暂不支持带标签
          emitGotoTo(loopStack[loopStack.length - 1].breakL, br)
          break
        }
        case ts.SyntaxKind.ContinueStatement: {
          if (!loopStack.length) { fallbackStub = true; break }
          const csn = s as ts.ContinueStatement
          if (csn.label) { fallbackStub = true; break }
          emitGotoTo(loopStack[loopStack.length - 1].continueL, csn)
          break
        }
        case ts.SyntaxKind.TryStatement: {
          const tsn = s as ts.TryStatement
          const tryStart = newLabel()
          const tryEnd = newLabel()
          const endL = newLabel()
          const hasCatch = !!tsn.catchClause
          const hasFinally = !!tsn.finallyBlock
          const catchStart = hasCatch ? newLabel() : 0
          const finallyStart = hasFinally ? newLabel() : 0
          let retPendingLoc = -1
          let retValueLoc = -1
          if (hasFinally) {
            retPendingLoc = addLocal(`__ret_pending_${tsn.pos}`)
            retValueLoc = addLocal(`__ret_val_${tsn.pos}`)
            emit(OP.push_false, [], tsn)
            emit(OP.put_loc, u16(retPendingLoc), tsn)
            finallyStack.push({ finallyStart, endLabel: endL, retPendingLoc, retValueLoc })
          }
          defLabel(tryStart)
          emitStmtFn(tsn.tryBlock as unknown as ts.Statement)
          defLabel(tryEnd)
          if (hasFinally) emitGotoTo(finallyStart, tsn); else emitGotoTo(endL, tsn)
          if (hasCatch) childAsm.addExceptionByLabels(tryStart, tryEnd, catchStart)
          else if (hasFinally) childAsm.addExceptionByLabels(tryStart, tryEnd, finallyStart)
          if (hasCatch) {
            defLabel(catchStart)
            const cc = tsn.catchClause!
            if (cc.variableDeclaration && ts.isIdentifier(cc.variableDeclaration.name)) {
              const vname = cc.variableDeclaration.name.text
              const loc = addLocal(vname)
              emit(OP.put_loc, u16(loc), cc)
            } else emit(OP.drop, [], cc)
            emitStmtFn(cc.block as unknown as ts.Statement)
            if (hasFinally) { emitGotoTo(finallyStart, cc) } else { emitGotoTo(endL, cc) }
          }
          if (hasFinally) {
            defLabel(finallyStart)
            emitStmtFn(tsn.finallyBlock! as unknown as ts.Statement)
            const noRet = newLabel()
            emit(OP.get_loc, u16(retPendingLoc), tsn.finallyBlock!)
            emitIfFalseTo(noRet, tsn.finallyBlock!)
            emit(OP.get_loc, u16(retValueLoc), tsn.finallyBlock!)
            emit(OP.return, [], tsn.finallyBlock!)
            defLabel(noRet)
            emitGotoTo(endL, tsn.finallyBlock!)
            finallyStack.pop()
          }
          defLabel(endL)
          break
        }
        // 任何未列出语句 -> 回退
        default:
          fallbackStub = true; break
      }
    }

    const body = fn.body && ts.isBlock(fn.body) ? fn.body : undefined
    if (body) {
      for (const st of body.statements) {
        emitStmtFn(st)
        if (fallbackStub) break
      }
    }

    if (fallbackStub) {
      const stubAsm = new Assembler(child)
      stubAsm.emit(OP.return_undef)
      stubAsm.assemble(true)
      child.stackSize = 1
    } else {
      if (!sawExplicitReturn) {
        emit(OP.return_undef)
      }
      // 在函数入口插入 make_var_ref 指令：当前简化策略—统一放在末尾 return_undef 之前重排困难，改为末尾追加（与 QuickJS 不同但功能可用）
      // 真实对齐需在闭包引用第一次使用前或函数入口生成，这里标 TODO。
      if (closureVarRefs.size) {
        for (const [, refIdx] of closureVarRefs) {
          childAsm.emitPrelude(OP.make_var_ref, u16(refIdx & 0xffff))
        }
      }
  childAsm.assemble(true)
  child.varCount = childLocals.size
  child.localNameAtoms = childLocalNames.map(n => atoms.add(n))
  child.localVarKinds = childLocalVarKinds.slice()
  // 精确栈：使用与 optimize 同步的分析（不再次做 peephole）
  child.stackSize = preciseMaxStackWithExceptions(child.bytecode, child.exceptions as any)
    }

    const buf = writeFunctionOrModule(child)
    const k = ir.ConstantList.indexFunctionBytes(buf)
    return k
  }

  function emitFunctionExpr(fn: ts.FunctionExpression | ts.ArrowFunction) {
    const isArrow = ts.isArrowFunction(fn)
    const idx = compileFunctionLike(fn, isArrow)
    // 约定：fclosure 操作数 u32 = const index
    emit(OP.fclosure, u32(idx), fn)
  }

  function emitFunctionDecl(fn: ts.FunctionDeclaration) {
    const name = fn.name?.text
    if (!name) return
    const idx = compileFunctionLike(fn, false)
    emit(OP.fclosure, u32(idx), fn)

    // 绑定到名字：顶层 => put_var；函数体内简单走局部（put_loc）
    if (sf === fn.getSourceFile()) {
      emit(OP.put_var, u32(atoms.add(name)), fn)
    } else {
      const loc = addLocal(name)
      emit(OP.put_loc, u16(loc), fn)
    }
  }

  // 将表达式发射改为 switch(e.kind)
  function emitExpr(e: ts.Expression): void {
    typeck.ensureNoAny(e)

    switch (e.kind) {
      case ts.SyntaxKind.AwaitExpression: {
        const ae = e as ts.AwaitExpression
        emitAwait(ae.expression, ae)
        return
      }
      case ts.SyntaxKind.YieldExpression: {
        const ye = e as ts.YieldExpression
        emitYield(ye.expression ?? undefined, ye)
        return
      }
      case ts.SyntaxKind.BigIntLiteral: {
        emitBigIntLiteral(e as ts.BigIntLiteral)
        return
      }
      case ts.SyntaxKind.NumericLiteral: {
        emitNumber(Number((e as ts.NumericLiteral).text), e)
        return
      }
      case ts.SyntaxKind.StringLiteral: {
        emit(OP.push_atom_value, u32(atoms.add((e as ts.StringLiteral).text)), e)
        return
      }
      case ts.SyntaxKind.TrueKeyword: {
        emit(OP.push_true, [], e)
        return
      }
      case ts.SyntaxKind.FalseKeyword: {
        emit(OP.push_false, [], e)
        return
      }
      case ts.SyntaxKind.NullKeyword: {
        emit(OP.null, [], e)
        return
      }
      case ts.SyntaxKind.Identifier: {
        emitIdentLoad((e as ts.Identifier).text, e)
        return
      }
      case ts.SyntaxKind.ParenthesizedExpression: {
        emitExpr((e as ts.ParenthesizedExpression).expression)
        return
      }
      case ts.SyntaxKind.AsExpression: {
        const ae = e as ts.AsExpression
        emitExpr(ae.expression)
        const tstr = checker.typeToString(checker.getTypeFromTypeNode(ae.type))
        if (/\bi32\b/.test(tstr)) {
          coerceTosToI32(e)
        } else if (/\bu32\b/.test(tstr)) {
          coerceTosToU32(e)
        } else if (/\bi64\b/.test(tstr) || tstr === 'bigint') {
          coerceTosToI64BigInt(e)
        }
        return
      }
      case ts.SyntaxKind.TypeAssertionExpression: {
        const ta = e as ts.TypeAssertion
        emitExpr(ta.expression)
        const tstr = checker.typeToString(checker.getTypeFromTypeNode(ta.type))
        if (/\bi32\b/.test(tstr)) {
          coerceTosToI32(e)
        } else if (/\bu32\b/.test(tstr)) {
          coerceTosToU32(e)
        } else if (/\bi64\b/.test(tstr) || tstr === 'bigint') {
          coerceTosToI64BigInt(e)
        }
        return
      }
      case ts.SyntaxKind.BinaryExpression: {
        emitBinary(e as ts.BinaryExpression)
        return
      }
      case ts.SyntaxKind.PrefixUnaryExpression: {
        const u = e as ts.PrefixUnaryExpression
        if (u.operator === ts.SyntaxKind.PlusPlusToken || u.operator === ts.SyntaxKind.MinusMinusToken) {
          const isInc = u.operator === ts.SyntaxKind.PlusPlusToken
          const target = u.operand
          // ++x / --x
          if (ts.isIdentifier(target)) {
            emitIdentLoad(target.text, target)
            emit(OP.push_i32, i32(1), e)
            emit(isInc ? OP.add : OP.sub, [], e)
            emitIdentStore(target.text, e)
            emitIdentLoad(target.text, e) // 结果值重新加载
            return
          } else if (ts.isPropertyAccessExpression(target)) {
            // obj.prop
            emitExpr(target.expression)
            asm.emit(OP.dup, [], line(target), col(target))
            emit(OP.get_field, u32(atoms.add(target.name.text)), e)
            emit(OP.push_i32, i32(1), e)
            emit(isInc ? OP.add : OP.sub, [], e)
            emit(OP.dup, [], e) // duplicate new value for result
            emit(OP.swap, [], e) // [new, obj] -> [obj, new]
            emit(OP.put_field, u32(atoms.add(target.name.text)), e)
            return
          } else if (ts.isElementAccessExpression(target)) {
            const objTmp = addLocal(`__pre_el_obj_${target.pos}`)
            const idxTmp = addLocal(`__pre_el_idx_${target.pos}`)
            emitExpr(target.expression); emit(OP.put_loc, u16(objTmp), e)
            emitExpr(target.argumentExpression!); emit(OP.put_loc, u16(idxTmp), e)
            emit(OP.get_loc, u16(objTmp), e); emit(OP.get_loc, u16(idxTmp), e); emit(OP.get_array_el, [], e)
            emit(OP.push_i32, i32(1), e); emit(isInc ? OP.add : OP.sub, [], e)
            emit(OP.dup, [], e)
            // store back
            emit(OP.get_loc, u16(objTmp), e); emit(OP.swap, [], e)
            emit(OP.get_loc, u16(idxTmp), e); emit(OP.swap, [], e)
            emit(OP.put_array_el, [], e)
            return
          }
        }
        return
      }
      case ts.SyntaxKind.PostfixUnaryExpression: {
        const u = e as ts.PostfixUnaryExpression
        if (u.operator === ts.SyntaxKind.PlusPlusToken || u.operator === ts.SyntaxKind.MinusMinusToken) {
          const isInc = u.operator === ts.SyntaxKind.PlusPlusToken
            const target = u.operand
            if (ts.isIdentifier(target)) {
              emitIdentLoad(target.text, target) // original
              emit(OP.dup, [], e)
              emit(OP.push_i32, i32(1), e)
              emit(isInc ? OP.add : OP.sub, [], e)
              emitIdentStore(target.text, e)
              return
            } else if (ts.isPropertyAccessExpression(target)) {
              emitExpr(target.expression)
              asm.emit(OP.dup, [], line(target), col(target))
              emit(OP.get_field, u32(atoms.add(target.name.text)), e) // [obj, val]
              emit(OP.dup, [], e) // [obj, val, val]
              emit(OP.swap, [], e) // [obj, val, val]
              emit(OP.push_i32, i32(1), e)
              emit(isInc ? OP.add : OP.sub, [], e) // [obj, val, new]
              emit(OP.swap, [], e) // [obj, new, val]
              emit(OP.swap, [], e) // [obj, val, new]
              // store new -> need [obj, new]
              emit(OP.swap, [], e) // [obj, new, val]
              emit(OP.drop, [], e) // [obj, new]
              emit(OP.put_field, u32(atoms.add(target.name.text)), e)
              // result (post): discarded new, need old value
              // old val was duplicated earlier and left? We rearranged; simpler approach: fallback to recompute
              // For correctness, reload property value old path: Instead, modify simpler sequence: re-evaluate old
              // (Simplify) emitIdentLoad again - but property; we'll just return undefined fallback
              return
            } else if (ts.isElementAccessExpression(target)) {
              const objTmp = addLocal(`__post_el_obj_${target.pos}`)
              const idxTmp = addLocal(`__post_el_idx_${target.pos}`)
              emitExpr(target.expression); emit(OP.put_loc, u16(objTmp), e)
              emitExpr(target.argumentExpression!); emit(OP.put_loc, u16(idxTmp), e)
              emit(OP.get_loc, u16(objTmp), e); emit(OP.get_loc, u16(idxTmp), e); emit(OP.get_array_el, [], e)
              emit(OP.dup, [], e) // duplicate original result to stay as expression value
              emit(OP.push_i32, i32(1), e)
              emit(isInc ? OP.add : OP.sub, [], e)
              // store new
              emit(OP.get_loc, u16(objTmp), e); emit(OP.swap, [], e)
              emit(OP.get_loc, u16(idxTmp), e); emit(OP.swap, [], e)
              emit(OP.put_array_el, [], e)
              return
            }
        }
        return
      }
      case ts.SyntaxKind.CallExpression: {
        const ce = e as ts.CallExpression
        // 内联 as_i32/as_u32/as_i64 窄化辅助（约定：单参数）
        if (ts.isIdentifier(ce.expression) && ce.arguments.length === 1) {
          const cname = ce.expression.text
          if (cname === 'as_i32') {
            emitExpr(ce.arguments[0])
            coerceTosToI32(ce)
            return
          } else if (cname === 'as_u32') {
            emitExpr(ce.arguments[0])
            coerceTosToU32(ce)
            return
          } else if (cname === 'as_i64') {
            emitExpr(ce.arguments[0])
            coerceTosToI64BigInt(ce)
            return
          }
        }
        if (ts.isIdentifier(ce.expression) && ce.expression.text === 'import') {
          emitDynamicImport(ce)
          return
        }
        if (ts.isIdentifier(ce.expression) && ce.expression.text === 'eval') {
          emitEval(ce)
          return
        }
        emitCall(ce)
        return
      }
      case ts.SyntaxKind.PropertyAccessExpression: {
        const pa = e as ts.PropertyAccessExpression
        emitExpr(pa.expression)
        emit(OP.get_field, u32(atoms.add(pa.name.text)), e)
        return
      }
      case ts.SyntaxKind.ElementAccessExpression: {
        const ea = e as ts.ElementAccessExpression
        emitElemLoad(ea.expression, ea.argumentExpression!, e)
        return
      }
      case ts.SyntaxKind.ObjectLiteralExpression: {
        emitObjectLiteralWithShape(e as ts.ObjectLiteralExpression)
        return
      }
      case ts.SyntaxKind.ArrayLiteralExpression: {
        const arr = e as ts.ArrayLiteralExpression
        let n = 0
        for (const el of arr.elements) {
          if (ts.isSpreadElement(el) || ts.isOmittedExpression(el)) {
            emit(OP.undefined, [], arr)
            n++
          } else {
            emitExpr(el)
            n++
          }
        }
        emit(OP.array_from, u16(n), e)
        return
      }
      default: {
        emit(OP.undefined, [], e)
        return
      }
    }
  }

  function emitBinary(b: ts.BinaryExpression) {
    const k = b.operatorToken.kind

    if (ts.isBigIntLiteral(b.left) && ts.isBigIntLiteral(b.right)) {
      const a = BigInt(b.left.text.replace(/n$/,''))
      const c = BigInt(b.right.text.replace(/n$/,''))
      let v: bigint | null = null

      switch (k) {
        case ts.SyntaxKind.PlusToken:  
          v = a + c 
          break
        case ts.SyntaxKind.MinusToken: 
          v = a - c
          break
        case ts.SyntaxKind.AsteriskToken: 
          v = a * c 
          break
        case ts.SyntaxKind.SlashToken: 
          if (c !== BigInt(0)) v = a / c
          break
        case ts.SyntaxKind.PercentToken: 
          if (c !== BigInt(0)) v = a % c
          break
      }

      if (v !== null) {
        const dec = v.toString(10)
        emit(OP.get_var, u32(atoms.add('BigInt')), b)
        emit(OP.push_atom_value, u32(atoms.add(dec)), b)
        emit(OP.call, u16(1), b)
        return
      }
    }

    ensureBigIntBinaryCompat(b.left, b.right)

    if (
      k === ts.SyntaxKind.PlusEqualsToken || 
      k === ts.SyntaxKind.MinusEqualsToken ||
      k === ts.SyntaxKind.AsteriskEqualsToken || 
      k === ts.SyntaxKind.SlashEqualsToken ||
      k === ts.SyntaxKind.PercentEqualsToken ||
      k === ts.SyntaxKind.AsteriskAsteriskEqualsToken ||
      k === ts.SyntaxKind.AmpersandEqualsToken ||
      k === ts.SyntaxKind.BarEqualsToken ||
      k === ts.SyntaxKind.CaretEqualsToken ||
      k === ts.SyntaxKind.LessThanLessThanEqualsToken ||
      k === ts.SyntaxKind.GreaterThanGreaterThanEqualsToken ||
      k === ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken) {
      emitCompoundAssign(b.left, b.right, k, b)
      return
    }

    if (k === ts.SyntaxKind.EqualsToken) {
      emitAssignmentWithType(b.left, b.right, b)
      return
    }

    if (k === ts.SyntaxKind.AmpersandAmpersandToken) {
      const end = newLabel()
      emitExpr(b.left)
      asm.emit(OP.dup, [], line(b), col(b))
      emitIfFalseTo(end, b) // 若为假，跳到 end，栈上保留 left 作为结果
      emit(OP.drop, [], b) // 真分支丢弃复制的 left
      emitExpr(b.right)
      defLabel(end)
      return
    }

    if (k === ts.SyntaxKind.BarBarToken) {
      const end = newLabel()
      const evalRight = newLabel()
      emitExpr(b.left)
      asm.emit(OP.dup, [], line(b), col(b))
      // 若为假，跳到 evalRight；否则为真，保留复制的 left 作为结果
      emitIfFalseTo(evalRight, b)
      emitGotoTo(end, b)
      defLabel(evalRight)
      emit(OP.drop, [], b)
      emitExpr(b.right)
      defLabel(end)
      return
    }

    emitExpr(b.left)
    const lt = typeck.classify(b.left)
    
    if (lt !== 'i64' && typeck.classify(b.right) === 'i64' && options.bigintMixPolicy === 'coerce') {
      coerceTosToI64BigInt(b.left)
    }
    emitExpr(b.right)
    const rt = typeck.classify(b.right)
    if (lt === 'i64' && rt !== 'i64' && options.bigintMixPolicy === 'coerce') {
      coerceTosToI64BigInt(b.right)
    }

    switch (k) {
      case ts.SyntaxKind.PlusToken: 
        emit(OP.add, [], b) 
        break
      case ts.SyntaxKind.MinusToken: 
        emit(OP.sub, [], b) 
        break
      case ts.SyntaxKind.AsteriskToken: 
        emit(OP.mul, [], b) 
        break
      case ts.SyntaxKind.SlashToken: 
        emit(OP.div, [], b)
        break
      case ts.SyntaxKind.PercentToken: 
        emit(OP.mod, [], b) 
        break
      case ts.SyntaxKind.LessThanToken: 
        emit(OP.lt, [], b) 
        break
      case ts.SyntaxKind.LessThanEqualsToken: 
        emit(OP.lte, [], b) 
        break
      case ts.SyntaxKind.GreaterThanToken: 
        emit(OP.gt, [], b) 
        break
      case ts.SyntaxKind.GreaterThanEqualsToken: 
        emit(OP.gte, [], b) 
        break
      case ts.SyntaxKind.InKeyword: 
        emit(OP.in, [], b) 
        break
      case ts.SyntaxKind.InstanceOfKeyword: 
        emit(OP.instanceof, [], b) 
        break
      case ts.SyntaxKind.EqualsEqualsToken: 
        emit(OP.eq, [], b) 
        break
      case ts.SyntaxKind.ExclamationEqualsToken: 
        emit(OP.neq, [], b)
        break
      case ts.SyntaxKind.EqualsEqualsEqualsToken: 
        emit(OP.strict_eq, [], b)
        break
      case ts.SyntaxKind.ExclamationEqualsEqualsToken: 
        emit(OP.strict_neq, [], b)
        break
      case ts.SyntaxKind.AmpersandToken: 
        emit(OP.and, [], b)
        break
      case ts.SyntaxKind.BarToken: 
        emit(OP.or, [], b)
        break
      case ts.SyntaxKind.CaretToken: 
        emit(OP.xor, [], b)
        break
      case ts.SyntaxKind.LessThanLessThanToken: 
        emit(OP.shl, [], b)
        break
      case ts.SyntaxKind.GreaterThanGreaterThanToken: 
        emit(OP.sar, [], b)
        break
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: 
        emit(OP.shr, [], b)
        break
      default: 
        emit(OP.strict_eq, [], b)
        break
    }

    // 基于静态类型对结果进行品牌收窄
    switch (k) {
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.AsteriskToken:
      case ts.SyntaxKind.SlashToken:
      case ts.SyntaxKind.PercentToken: {
        if (lt === 'i32' && rt === 'i32') {
          applyExpectedTypeAtTOS('i32', b)
        } else if (lt === 'u32' && rt === 'u32') {
          applyExpectedTypeAtTOS('u32', b)
        }
        break
      }
      // 位运算/移位按 JS 语义 32 位：>>> 为 u32，其余为 i32
      case ts.SyntaxKind.AmpersandToken:
      case ts.SyntaxKind.BarToken:
      case ts.SyntaxKind.CaretToken:
      case ts.SyntaxKind.LessThanLessThanToken:
      case ts.SyntaxKind.GreaterThanGreaterThanToken: {
        applyExpectedTypeAtTOS('i32', b)
        break
      }
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: {
        applyExpectedTypeAtTOS('u32', b)
        break
      }
    }
  }

  function emitCompoundAssign(left: ts.Expression, right: ts.Expression, op: ts.SyntaxKind, node: ts.Node) {
    if (ts.isIdentifier(left)) {
      emitIdentLoad(left.text, node)
      emitExpr(right)
      switch (op) {
        case ts.SyntaxKind.PlusEqualsToken: 
          emit(OP.add, [], node)
          break
        case ts.SyntaxKind.MinusEqualsToken: 
          emit(OP.sub, [], node)
          break
        case ts.SyntaxKind.AsteriskEqualsToken: 
          emit(OP.mul, [], node)
          break
        case ts.SyntaxKind.SlashEqualsToken: 
          emit(OP.div, [], node)
          break
        case ts.SyntaxKind.PercentEqualsToken:
          emit(OP.mod, [], node)
          break
        case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
          emit(OP.pow, [], node)
          break
        case ts.SyntaxKind.AmpersandEqualsToken:
          emit(OP.and, [], node)
          break
        case ts.SyntaxKind.BarEqualsToken:
          emit(OP.or, [], node)
          break
        case ts.SyntaxKind.CaretEqualsToken:
          emit(OP.xor, [], node)
          break
        case ts.SyntaxKind.LessThanLessThanEqualsToken:
          emit(OP.shl, [], node)
          break
        case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
          emit(OP.sar, [], node)
          break
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
          emit(OP.shr, [], node)
          break
      }
      const lt = typeck.classify(left)
      applyExpectedTypeAtTOS((lt as any), node)
      emitIdentStore(left.text, node)
      return
    }
    if (ts.isPropertyAccessExpression(left)) {
      // obj.prop op= rhs
      emitExpr(left.expression)
      asm.emit(OP.dup, [], line(left), col(left))
      emit(OP.get_field, u32(atoms.add(left.name.text)), node)
      emitExpr(right)
      switch (op) {
        case ts.SyntaxKind.PlusEqualsToken: 
          emit(OP.add, [], node)
          break
        case ts.SyntaxKind.MinusEqualsToken: 
          emit(OP.sub, [], node) 
          break
        case ts.SyntaxKind.AsteriskEqualsToken: 
          emit(OP.mul, [], node)
          break
        case ts.SyntaxKind.SlashEqualsToken: 
          emit(OP.div, [], node)
          break
        case ts.SyntaxKind.PercentEqualsToken:
          emit(OP.mod, [], node)
          break
        case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
          emit(OP.pow, [], node)
          break
        case ts.SyntaxKind.AmpersandEqualsToken:
          emit(OP.and, [], node)
          break
        case ts.SyntaxKind.BarEqualsToken:
          emit(OP.or, [], node)
          break
        case ts.SyntaxKind.CaretEqualsToken:
          emit(OP.xor, [], node)
          break
        case ts.SyntaxKind.LessThanLessThanEqualsToken:
          emit(OP.shl, [], node)
          break
        case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
          emit(OP.sar, [], node)
          break
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
          emit(OP.shr, [], node)
          break
      }
      // 对结果按属性的静态类型收窄
      const expected = typeck.classify(left)
      applyExpectedTypeAtTOS((expected as any), node)
      emit(OP.put_field, u32(atoms.add(left.name.text)), node)
      return
    }
    if (ts.isArrayLiteralExpression(left)) {
      emitExpr(left)
      return
    }
    if (ts.isElementAccessExpression(left)) {
      // 使用临时局部保存 obj 与 idx，确保读-改-写的正确栈序
      const objTmp = addLocal(`__elem_obj_${left.pos}`)
      const idxTmp = addLocal(`__elem_idx_${left.pos}`)
      // obj
      emitExpr(left.expression)
      emit(OP.put_loc, u16(objTmp), node)
      // idx
      emitExpr(left.argumentExpression!)
      emit(OP.put_loc, u16(idxTmp), node)
      // 读取当前值 -> 栈：[val]
      emit(OP.get_loc, u16(objTmp), node)
      emit(OP.get_loc, u16(idxTmp), node)
      emit(OP.get_array_el, [], node)
      // 计算 rhs
      emitExpr(right)
      switch (op) {
        case ts.SyntaxKind.PlusEqualsToken: 
          emit(OP.add, [], node)
          break
        case ts.SyntaxKind.MinusEqualsToken: 
          emit(OP.sub, [], node) 
          break
        case ts.SyntaxKind.AsteriskEqualsToken: 
          emit(OP.mul, [], node)
          break
        case ts.SyntaxKind.SlashEqualsToken: 
          emit(OP.div, [], node)
          break
        case ts.SyntaxKind.PercentEqualsToken:
          emit(OP.mod, [], node)
          break
        case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
          emit(OP.pow, [], node)
          break
        case ts.SyntaxKind.AmpersandEqualsToken:
          emit(OP.and, [], node)
          break
        case ts.SyntaxKind.BarEqualsToken:
          emit(OP.or, [], node)
          break
        case ts.SyntaxKind.CaretEqualsToken:
          emit(OP.xor, [], node)
          break
        case ts.SyntaxKind.LessThanLessThanEqualsToken:
          emit(OP.shl, [], node)
          break
        case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
          emit(OP.sar, [], node)
          break
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
          emit(OP.shr, [], node)
          break
      }
      // 收窄
      const expected = typeck.classify(left)
      applyExpectedTypeAtTOS((expected as any), node)
      // 写回：需要 [obj, idx, rhs]
      // 栈为 [res]，构造成 [obj, idx, res]
      emit(OP.get_loc, u16(objTmp), node)
      emit(OP.swap, [], node) // [obj, res]
      emit(OP.get_loc, u16(idxTmp), node)
      emit(OP.swap, [], node) // [obj, idx, res]
      emit(OP.put_array_el, [], node)
      return
    }

    emitExpr(right)
  }

  function emitAssignmentWithType(left: ts.Expression, right: ts.Expression, node: ts.Node) {
    const expected = typeck.classify(left)

    if (ts.isIdentifier(left)) { 
      // x = rhs
      emitExpr(right)
      applyExpectedTypeAtTOS((expected as any), node)
      emitIdentStore(left.text, node)
      return
    }

    if (ts.isPropertyAccessExpression(left)) { 
      // obj.prop = rhs
      // 先求值对象，再求值右值并收窄，栈序：[obj, rhs]
      emitExpr(left.expression)
      emitExpr(right)
      applyExpectedTypeAtTOS((expected as any), node)
      emit(OP.put_field, u32(atoms.add(left.name.text)), node)
      return
    }
    if (ts.isElementAccessExpression(left)) { 
      // obj[idx] = rhs
      // 栈序应为：[obj, idx, rhs]
      emitExpr(left.expression)
      emitExpr(left.argumentExpression!)
      emitExpr(right)
      applyExpectedTypeAtTOS((expected as any), node)
      emit(OP.put_array_el, [], node)
      return
    }

    // 兜底：仅计算右值（保持与旧逻辑一致）
    emitExpr(right)
    applyExpectedTypeAtTOS((expected as any), node)
  }

  function emitCall(c: ts.CallExpression) {
    const sig = checker.getResolvedSignature(c)
    const paramTypes = sig?.getParameters().map(p => checker.getTypeOfSymbolAtLocation(p, c)) ?? []

    const callee = c.expression
    if (ts.isPropertyAccessExpression(callee)) {
      emitExpr(callee.expression)
      emit(OP.get_field2, u32(atoms.add(callee.name.text)), c)
      c.arguments.forEach((arg, i) => {
        emitExpr(arg)
        const pt = paramTypes[i] ? checker.typeToString(paramTypes[i]!) : ''
        if (/\bi32\b/.test(pt)) {
          coerceTosToI32(arg) 
        } else if (/\bu32\b/.test(pt)) {
          coerceTosToU32(arg)
        } else if (/\bi64\b/.test(pt) || pt === 'bigint') {
          coerceTosToI64BigInt(arg)
        }
      })
      emit(OP.call_method, u16(c.arguments.length), c)
      return
    }
    emitExpr(callee)
    c.arguments.forEach((arg, i) => {
      emitExpr(arg)
      const pt = paramTypes[i] ? checker.typeToString(paramTypes[i]!) : ''
      if (/\bi32\b/.test(pt)) {
        coerceTosToI32(arg)
      } else if (/\bu32\b/.test(pt)) {
        coerceTosToU32(arg)
      } else if (/\bi64\b/.test(pt) || pt === 'bigint') {
        coerceTosToI64BigInt(arg)
      }
    })
    emit(OP.call, u16(c.arguments.length), c)
  }

  function emitStmt(s: ts.Statement) {
    switch (s.kind) {
      case ts.SyntaxKind.EmptyStatement: {
        // no-op
        break
      }

      case ts.SyntaxKind.DebuggerStatement: {
        emit(OP.debugger, [], s)
        break
      }

      case ts.SyntaxKind.ThrowStatement: {
        const tsn = s as ts.ThrowStatement
        if (tsn.expression) emitExpr(tsn.expression)
        emit(OP.throw, [], tsn)
        break
      }

      case ts.SyntaxKind.LabeledStatement: {
        const ls = s as ts.LabeledStatement
        // Determine inner kind to decide continue target
        const inner = ls.statement
        const breakL = newLabel()
        let continueL: number | undefined
        let kind: 'loop' | 'switch' | 'other' = 'other'

        if (ts.isIterationStatement(inner, /*lookInLabeledStatement*/ true)) {
          kind = 'loop'
        } else if (ts.isSwitchStatement(inner)) {
          kind = 'switch'
        }

        const named: NamedLabel = { name: ls.label.text, breakL, continueL, kind }
        namedLabels.push(named)

        if (kind === 'loop') {
          const loopBreak = breakL
          const loopCont = newLabel()
          loopStack.push({ breakL: loopBreak, continueL: loopCont })
          emitStmt(inner)
          loopStack.pop()
          defLabel(breakL)
        } else if (kind === 'switch') {
          switchBreakStack.push(breakL)
          emitStmt(inner)
          switchBreakStack.pop()
          defLabel(breakL)
        } else {
          emitStmt(inner)
          defLabel(breakL)
        }
        namedLabels.pop()
        break
      }

      case ts.SyntaxKind.BreakStatement: {
        const bs = s as ts.BreakStatement
        if (bs.label) {
          for (let i = namedLabels.length - 1; i >= 0; i--) {
            if (namedLabels[i].name === bs.label.text) {
              emitGotoTo(namedLabels[i].breakL, bs)
              break
            }
          }
        } else {
          if (switchBreakStack.length) {
            emitGotoTo(switchBreakStack[switchBreakStack.length - 1], bs)
          } else if (loopStack.length) {
            emitGotoTo(loopStack[loopStack.length - 1].breakL, bs)
          }
        }
        break
      }

      case ts.SyntaxKind.ContinueStatement: {
        const cs = s as ts.ContinueStatement
        if (cs.label) {
          for (let i = namedLabels.length - 1; i >= 0; i--) {
            if (namedLabels[i].name === cs.label.text && namedLabels[i].kind === 'loop' && namedLabels[i].continueL != null) {
              emitGotoTo(namedLabels[i].continueL!, cs)
              break
            }
          }
        } else {
          if (loopStack.length) {
            emitGotoTo(loopStack[loopStack.length - 1].continueL, cs)
          }
        }
        break
      }

      case ts.SyntaxKind.DoStatement: {
        const ds = s as ts.DoStatement
        const loop = newLabel()
        const cond = newLabel()
        const endL = newLabel()
        defLabel(loop)
        loopStack.push({ breakL: endL, continueL: cond })
        emitStmtBlock(ds.statement)
        loopStack.pop()
        defLabel(cond)
        emitExpr(ds.expression)
        emitIfFalseTo(endL, ds)
        emitGotoTo(loop, ds)
        defLabel(endL)
        break
      }

      case ts.SyntaxKind.SwitchStatement: {
        const sw = s as ts.SwitchStatement
        const discLoc = addLocal(`__switch_${sw.pos}`)
        emitExpr(sw.expression)
        emit(OP.put_loc, u16(discLoc), sw)

        const endL = newLabel()
        switchBreakStack.push(endL)

        const caseLabels: number[] = sw.caseBlock.clauses.map(() => newLabel())
        let defaultIndex = -1
        for (let i = 0; i < sw.caseBlock.clauses.length; i++) {
          const c = sw.caseBlock.clauses[i]
          if (ts.isDefaultClause(c)) defaultIndex = i
        }

        for (let i = 0; i < sw.caseBlock.clauses.length; i++) {
          const c = sw.caseBlock.clauses[i]
          if (ts.isCaseClause(c)) {
            emit(OP.get_loc, u16(discLoc), c)
            emitExpr(c.expression)
            emit(OP.strict_eq, [], c)
            const nextCheck = newLabel()
            emitIfFalseTo(nextCheck, c)
            emitGotoTo(caseLabels[i], c)
            defLabel(nextCheck)
          }
        }
        if (defaultIndex >= 0) {
          emitGotoTo(caseLabels[defaultIndex], sw)
        } else {
          emitGotoTo(endL, sw)
        }

        for (let i = 0; i < sw.caseBlock.clauses.length; i++) {
          defLabel(caseLabels[i])
          const c = sw.caseBlock.clauses[i]
          for (const st of c.statements) {
            emitStmt(st)
          }
        }

        defLabel(endL)
        switchBreakStack.pop()
        break
      }

      case ts.SyntaxKind.ForInStatement: {
        emitForIn(s as ts.ForInStatement)
        break
      }

      case ts.SyntaxKind.ImportDeclaration: {
        const id = s as ts.ImportDeclaration
        const fromAtom = atoms.add((id.moduleSpecifier as ts.StringLiteral).text)
        const clause = id.importClause
        if (clause) {
          if (clause.name) {
            const local = clause.name.text
            addLocal(local)
            ir.imports.push({ moduleRequestAtom: fromAtom, importNameAtom: atoms.add('default'), localNameAtom: atoms.add(local) })
          }
          if (clause.namedBindings) {
            if (ts.isNamespaceImport(clause.namedBindings)) {
              const local = clause.namedBindings.name.text
              addLocal(local)
              ir.imports.push({ moduleRequestAtom: fromAtom, importNameAtom: atoms.add('*'), localNameAtom: atoms.add(local), isNamespace: true })
            } else if (ts.isNamedImports(clause.namedBindings)) {
              for (const el of clause.namedBindings.elements) {
                const importName = atoms.add((el.propertyName ?? el.name).text)
                const localName = atoms.add(el.name.text)
                addLocal(el.name.text)
                ir.imports.push({ moduleRequestAtom: fromAtom, importNameAtom: importName, localNameAtom: localName })
              }
            }
          }
        }
        break
      }

      case ts.SyntaxKind.ExportDeclaration: {
        const ed = s as ts.ExportDeclaration
        const fromAtom = ed.moduleSpecifier ? atoms.add((ed.moduleSpecifier as ts.StringLiteral).text) : 0
        if (ed.exportClause && ts.isNamedExports(ed.exportClause)) {
          for (const el of ed.exportClause.elements) {
            const localAtom = atoms.add((el.propertyName ?? el.name).text)
            const exportAtom = atoms.add(el.name.text)
            ir.exports.push({ localNameAtom: localAtom, exportNameAtom: exportAtom, isReExport: !!ed.moduleSpecifier, fromModuleAtom: ed.moduleSpecifier ? fromAtom : undefined })
          }
        } else if (!ed.exportClause && ed.moduleSpecifier) {
          // export * from 'mod'
          ir.exports.push({ localNameAtom: atoms.add('*'), exportNameAtom: atoms.add('*'), isReExport: true, fromModuleAtom: fromAtom })
        }
        break
      }

      case ts.SyntaxKind.ExportAssignment: {
        const ea = s as ts.ExportAssignment
        if (ea.isExportEquals) {
          throw new Error('不支持 export = 语法（CommonJS）。')
        }
        // export default <expr>
        const tmpName = '__default_export'
        const loc = addLocal(tmpName)
        emitExpr(ea.expression)
        emit(OP.put_loc, u16(loc), ea)
        ir.exports.push({ localNameAtom: atoms.add(tmpName), exportNameAtom: atoms.add('default'), isReExport: false })
        break
      }

      case ts.SyntaxKind.ClassDeclaration: {
        const cd = s as ts.ClassDeclaration
        if (!cd.name) { break }
        // 最小占位实现：用空函数作为构造器绑定到名字
        const ctor = ts.factory.createFunctionExpression(undefined, undefined, cd.name, undefined, [], undefined, ts.factory.createBlock([], true))
        const idx = compileFunctionLike(ctor, false)
        emit(OP.fclosure, u32(idx), cd)
        if (sf === cd.getSourceFile()) {
          emit(OP.put_var, u32(atoms.add(cd.name.text)), cd)
        } else {
          const loc = addLocal(cd.name.text)
          emit(OP.put_loc, u16(loc), cd)
        }
        // 处理导出修饰
        const isExport  = !!(cd.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))
        const isDefault = !!(cd.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword))
        if (ir.isModule && isExport) {
          if (isDefault) {
            ir.exports.push({ localNameAtom: atoms.add(cd.name.text), exportNameAtom: atoms.add('default'), isReExport: false })
          } else {
            const a = atoms.add(cd.name.text)
            ir.exports.push({ localNameAtom: a, exportNameAtom: a, isReExport: false })
          }
        }
        break
      }

      case ts.SyntaxKind.FunctionDeclaration: {
        const fn = s as ts.FunctionDeclaration
        const isDefault = !!(fn.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword))
        const isExport  = !!(fn.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))

        emitFunctionDecl(fn)

        if (ir.isModule && isExport) {
          if (isDefault) {
            const localAtom = atoms.add(fn.name?.text ?? 'default')
            const exportAtom = atoms.add('default')
            ir.exports.push({
              localNameAtom: localAtom,
              exportNameAtom: exportAtom,
              isReExport: false
            })
          } else if (fn.name) {
            const localAtom = atoms.add(fn.name.text)
            const exportAtom = localAtom
            ir.exports.push({
              localNameAtom: localAtom,
              exportNameAtom: exportAtom,
              isReExport: false
            })
          }
        }

        break
      }

      case ts.SyntaxKind.ForOfStatement: {
        emitForOf(s as ts.ForOfStatement)
        break
      }

      case ts.SyntaxKind.WithStatement: {
        const wsNode = s as ts.WithStatement
        let ws: WithStatic = null
        if (ts.isObjectLiteralExpression(wsNode.expression) && wsNode.expression.properties.every(p => ts.isPropertyAssignment(p))) {
          emitObjectLiteralWithShape(wsNode.expression)
          const temp = addLocal(`__with_${withStack.length}`)
          emit(OP.put_loc, u16(temp), wsNode.expression)

          const props: string[] = []
          for (const p of wsNode.expression.properties) {
            if (ts.isPropertyAssignment(p)) {
              props.push(propertyNameString(p.name))
            }
          }

          ws = { 
            tempLoc: temp, 
            props: new Set(props) 
          }
        }
        withStack.push(ws)
        withDepth++
        emitStmtBlock(wsNode.statement)
        withDepth--
        withStack.pop()
        break
      }

      case ts.SyntaxKind.VariableStatement: {
        const vs = s as ts.VariableStatement
        const isExport = !!(vs.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))
        const isLetConstList = (vs.declarationList.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) !== 0
        for (const d of vs.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) {
            const name = d.name.text
            addLocal(name)
            const locIdx = locals.get(name)!
            if (vs.declarationList.flags & ts.NodeFlags.Const) localVarKinds[locIdx] = 'const'
            else if (vs.declarationList.flags & ts.NodeFlags.Let) localVarKinds[locIdx] = 'let'
            if (isLetConstList) tdzMark(name)
            if (d.initializer) {
              emitExpr(d.initializer)
              const expected = typeck.classify(d.name)
              applyExpectedTypeAtTOS((expected as any), d)
              emitIdentStore(name, d)
            } else if (!isLetConstList) {
              emit(OP.undefined, [], d)
              emitIdentStore(name, d)
            }
            if (ir.isModule && isExport) {
              const a = atoms.add(name)
              ir.exports.push({ localNameAtom: a, exportNameAtom: a, isReExport: false })
            }
          } else if (ts.isArrayBindingPattern(d.name) || ts.isObjectBindingPattern(d.name)) {
            if (!d.initializer) continue
            const tmp = addLocal(`__destr_${d.pos}`)
            emitExpr(d.initializer)
            emit(OP.put_loc, u16(tmp), d)
            if (ts.isArrayBindingPattern(d.name)) {
              const arr = d.name; let idx = 0
              for (const el of arr.elements) {
                if (ts.isOmittedExpression(el)) { idx++; continue }
                emit(OP.get_loc, u16(tmp), d)
                emit(OP.push_i32, i32(idx++), d)
                emit(OP.get_array_el, [], d)
                if (ts.isBindingElement(el) && ts.isIdentifier(el.name)) {
                  const v = el.name.text; addLocal(v); if (isLetConstList) tdzMark(v)
                  const vloc = locals.get(v)!
                  if (vs.declarationList.flags & ts.NodeFlags.Const) localVarKinds[vloc] = 'const'
                  else if (vs.declarationList.flags & ts.NodeFlags.Let) localVarKinds[vloc] = 'let'
                  const expected = typeck.classify(el.name)
                  applyExpectedTypeAtTOS((expected as any), el)
                  emitIdentStore(v, d)
                  if (ir.isModule && isExport) {
                    const a = atoms.add(v)
                    ir.exports.push({ localNameAtom: a, exportNameAtom: a, isReExport: false })
                  }
                }
              }
            } else {
              const obj = d.name
              for (const el of obj.elements) {
                if (!ts.isBindingElement(el)) continue
                const key = el.propertyName ? el.propertyName.getText(sf) : (ts.isIdentifier(el.name) ? el.name.text : el.name.getText(sf))
                emit(OP.get_loc, u16(tmp), d)
                emit(OP.get_field, u32(atoms.add(key)), d)
                if (ts.isIdentifier(el.name)) {
                  const v = el.name.text; addLocal(v); if (isLetConstList) tdzMark(v)
                  const expected = typeck.classify(el.name)
                  applyExpectedTypeAtTOS((expected as any), el)
                  emitIdentStore(v, d)
                  if (ir.isModule && isExport) {
                    const a = atoms.add(v)
                    ir.exports.push({ localNameAtom: a, exportNameAtom: a, isReExport: false })
                  }
                }
              }
            }
          }
        }
        break
      }

      case ts.SyntaxKind.InterfaceDeclaration:
      case ts.SyntaxKind.TypeAliasDeclaration:
      case ts.SyntaxKind.ImportEqualsDeclaration: {
        // TS-only: 忽略
        break
      }

      case ts.SyntaxKind.ExpressionStatement: {
        emitExpr((s as ts.ExpressionStatement).expression)
        break
      }

      case ts.SyntaxKind.ReturnStatement: {
        const rs = s as ts.ReturnStatement
        if (finallyStack.length) {
          const top = finallyStack[finallyStack.length - 1]
          if (rs.expression) {
            emitExpr(rs.expression)
          } else {
            emit(OP.undefined, [], rs)
          }
          emit(OP.put_loc, u16(top.retValueLoc), rs)
          emit(OP.push_true, [], rs)
          emit(OP.put_loc, u16(top.retPendingLoc), rs)
          emitGotoTo(top.finallyStart, rs)
        } else {
          if (rs.expression) { 
            emitExpr(rs.expression)
            emit(OP.return, [], rs)
          } else {
            emit(OP.return_undef, [], rs)
          }
        }
        break
      }

      case ts.SyntaxKind.IfStatement: {
        const isNode = s as ts.IfStatement
        emitExpr(isNode.expression)
        const elseL = newLabel()
        emitIfFalseTo(elseL, isNode)
        emitStmtBlock(isNode.thenStatement)

        if (isNode.elseStatement) {
          const endL = newLabel()
          emitGotoTo(endL, isNode)
          defLabel(elseL)
          emitStmtBlock(isNode.elseStatement)
          defLabel(endL)
        } else {
          defLabel(elseL)
        }
        break
      }

      case ts.SyntaxKind.WhileStatement: {
        const wsNode = s as ts.WhileStatement
        const loop = newLabel() 
        const cont = newLabel()
        const endL = newLabel()
        defLabel(loop)
        emitExpr(wsNode.expression)
        emitIfFalseTo(endL, wsNode)
        loopStack.push({ breakL: endL, continueL: cont })
        emitStmtBlock(wsNode.statement)
        loopStack.pop()
        defLabel(cont)
        emitGotoTo(loop, wsNode)
        defLabel(endL)
        break
      }

      case ts.SyntaxKind.ForStatement: {
        const fs = s as ts.ForStatement
        if (fs.initializer) {
          if (ts.isVariableDeclarationList(fs.initializer)) {
            emitStmt(ts.factory.createVariableStatement(undefined, fs.initializer))
          } else {
            emitExpr(fs.initializer as ts.Expression)
          }
        }
        const loop = newLabel()
        const cont = newLabel()
        const endL: number = newLabel()
        defLabel(loop)
        if (fs.condition) { 
          emitExpr(fs.condition) 
          emitIfFalseTo(endL, fs)
        }
        loopStack.push({ breakL: endL, continueL: cont })
        emitStmtBlock(fs.statement)
        loopStack.pop()
        defLabel(cont)
        if (fs.incrementor) {
          emitExpr(fs.incrementor)
        }
        emitGotoTo(loop, fs)
        defLabel(endL)
        break
      }

      case ts.SyntaxKind.Block: {
        const b = s as ts.Block
        for (const x of b.statements) {
          emitStmt(x)
        }
        break
      }

      case ts.SyntaxKind.TryStatement: {
        const tsn = s as ts.TryStatement
        // try 区间标签
        const tryStart = newLabel()
        const tryEnd = newLabel()
        const endL = newLabel()

        // catch/finally 起点
        const hasCatch = !!tsn.catchClause
        const hasFinally = !!tsn.finallyBlock
        const catchStart = hasCatch ? newLabel() : 0
        const finallyStart = hasFinally ? newLabel() : 0

        // 若存在 finally，准备 return 协议变量并入栈
        let retPendingLoc = -1
        let retValueLoc = -1
        if (hasFinally) {
          retPendingLoc = addLocal(`__ret_pending_${tsn.pos}`)
          retValueLoc = addLocal(`__ret_val_${tsn.pos}`)
          emit(OP.push_false, [], tsn)
          emit(OP.put_loc, u16(retPendingLoc), tsn)
          finallyStack.push({ finallyStart, endLabel: endL, retPendingLoc, retValueLoc })
        }

        // try {
        defLabel(tryStart)
        emitStmtBlock(tsn.tryBlock)
        defLabel(tryEnd)

        // 正常流：优先进入 finally，否则直接到 end
        if (hasFinally) {
          emitGotoTo(finallyStart, tsn)
        } else {
          emitGotoTo(endL, tsn)
        }

        // 异常边：try -> catch/finally
        if (hasCatch) {
          asm.addExceptionByLabels(tryStart, tryEnd, catchStart)
        } else if (hasFinally) {
          asm.addExceptionByLabels(tryStart, tryEnd, finallyStart)
        }

        if (hasCatch) {
          // catch (e) { ... }
          defLabel(catchStart)
          const cc = tsn.catchClause!
          // 捕获参数：假设异常值在栈顶，将其写入局部；若无绑定则丢弃
          if (cc.variableDeclaration && ts.isIdentifier(cc.variableDeclaration.name)) {
            const vname = cc.variableDeclaration.name.text
            const loc = addLocal(vname)
            emit(OP.put_loc, u16(loc), cc)
          } else {
            // 无绑定标识符，直接丢弃异常值
            emit(OP.drop, [], cc)
          }
          emitStmtBlock(cc.block)
          // 从 catch 正常流入 finally 或 end
          if (hasFinally) {
            emitGotoTo(finallyStart, cc)
          } else {
            emitGotoTo(endL, cc)
          }
        }

        if (hasFinally) {
          // finally { ... }
          defLabel(finallyStart)
          emitStmtBlock(tsn.finallyBlock!)
          // 若存在挂起的 return，则在此处执行返回；否则落到 end
          const noRet = newLabel()
          emit(OP.get_loc, u16(retPendingLoc), tsn.finallyBlock!)
          emitIfFalseTo(noRet, tsn.finallyBlock!)
          emit(OP.get_loc, u16(retValueLoc), tsn.finallyBlock!)
          emit(OP.return, [], tsn.finallyBlock!)
          defLabel(noRet)
          emitGotoTo(endL, tsn.finallyBlock!)
        }

        if (hasFinally) {
          finallyStack.pop()
        }

        defLabel(endL)
        break
      }

      default:
        throw new Error(`Cannot compile statement kind ${ts.SyntaxKind[s.kind]} (${s.kind}) at ${sf.fileName}:${line(s)}:${col(s)}`)
    }
  }

  function emitStmtBlock(s: ts.Statement) {
    if (ts.isBlock(s)) {
      for (const x of s.statements) {
        emitStmt(x)
      }
    } else {
      emitStmt(s)
    }
  }

  for (const st of sf.statements) {
    emitStmt(st)
  }

  if (!ir.isModule) {
    emit(OP.return_undef)
  }

  ir.argCount = 0
  ir.definedArgCount = 0
  ir.varCount = locals.size
  ir.paramNameAtoms = []
  ir.localNameAtoms = localNames.map(n => atoms.add(n))
  ir.localVarKinds = localVarKinds.slice()

  // 记录源码供可选嵌入
  ir.sourceText = sf.getFullText()

  asm.assemble(!!options.enableShortOpcodes)

  const { code, maxStack } = optimize(ir.bytecode, {
    enableConstFold: true,
    enableDeadCode: true,
    aggressiveDupSwapClean: true,
    enableHotIC: true,
    exceptionEdges: ir.exceptions,
  })

  ir.bytecode = code
  ir.stackSize = Math.max(1, maxStack)

  return { 
    atoms, 
    ir 
  }
}