import * as ts from 'typescript'
import { AtomTable } from './atoms'
import { FunctionIR } from './ir'
import { Assembler } from './assemble'
import { OP } from './op'
import { FUN_FLAG_STRICT, OP_AWAIT, OP_YIELD, FUN_FLAG_ARROW } from './env'
import { StrongTypeChecker } from './types'
import { optimizeBytecode } from './optimize'
import { ShapePolicy } from './shape'
import { writeFunctionOrModule } from './bytecode'

export interface CompileOptions {
  forceModule?: boolean
  enableShortOpcodes?: boolean
  bigintMixPolicy?: 'error' | 'coerce'
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

  ir.isModule = !!options.forceModule || sf.statements.some(st => ts.isImportDeclaration(st) || ts.isExportDeclaration(st) || ts.isExportAssignment(st))

  const firstStmt = sf.statements[0]
  if (firstStmt && ts.isExpressionStatement(firstStmt) && ts.isStringLiteral(firstStmt.expression) && firstStmt.expression.text === 'use strict') {
    ir.flags |= FUN_FLAG_STRICT
  }

  ir.filenameAtomId = atoms.add(sf.fileName)
  ir.functionNameAtomId = atoms.add(ir.isModule ? '<module>' : '<main>')

  const asm = new Assembler(ir)

  const u16 = (v: number) => { 
    const b=Buffer.alloc(2) 
    b.writeUInt16LE(v,0)
    return Array.from(b)
  }

  const u32 = (v: number) => { 
    const b=Buffer.alloc(4) 
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
  const emitGotoTo = (id: number, n?: ts.Node) => asm.emitGotoTo(id, n?line(n):undefined, n?col(n):undefined)
  const emitWithOp = (op: OP, atomId: number, label: number, scopeIndex: number, n?: ts.Node) =>
    asm.emitWithAtomLabelU8(op, atomId, label, scopeIndex, n?line(n):undefined, n?col(n):undefined)

  const locals = new Map<string, number>()
  const localNames: string[] = []
  const addLocal = (name: string) => { 
    if (!locals.has(name)) { 
      locals.set(name, locals.size)
      localNames.push(name)
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

  function applyExpectedTypeAtTOS(expected: 'i32'|'u32'|'i64'|'f64'|'unknown', n?: ts.Node) {
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

    const needBig = (lt==='i64' || rt==='i64')
    
    if (needBig && (lt!=='i64' || rt!=='i64') && options.bigintMixPolicy !== 'coerce') {
      const p = sf.getLineAndCharacterOfPosition(left.getStart())
      throw new Error(`BigInt 与 number 混用不允许（默认策略 error）。${sf.fileName}:${p.line+1}:${p.character+1}`)
    }
  }

  function emitIdentLoad(name: string, n?: ts.Node) {
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

  // for-in 降级：Object.keys(obj) 数组迭代
  // 注意：此实现是为便于生成通用字节码而做的简化，非严格等价：
  //  - 仅枚举自有可枚举字符串键，不包含原型链（for-in 会枚举原型链上的可枚举属性）。
  //  - 不枚举 Symbol-key 属性。
  //  - 枚举顺序与规范/QuickJS 的实现可能有差异。
  // 若要与 QuickJS 完全对齐，应使用专用 for-in 迭代语义（QuickJS 在 VM 层实现属性枚举），
  // 或提供运行时 helper 模拟规范行为，并在 break/continue/throw 等异常退出时正确清理迭代状态。
  function emitForIn(stmt: ts.ForInStatement) {
    // temps
    const objLoc = addLocal(`__forin_obj_${stmt.pos}`)
    const keysLoc = addLocal(`__forin_keys_${stmt.pos}`)
    const idxLoc = addLocal(`__forin_i_${stmt.pos}`)

    // obj
    emitExpr(stmt.expression)
    emit(OP.put_loc, u16(objLoc), stmt.expression)

    // Object.keys(obj)
    emit(OP.get_var, u32(atoms.add('Object')), stmt)
    emit(OP.get_field, u32(atoms.add('keys')), stmt)
    emit(OP.get_loc, u16(objLoc), stmt)
    emit(OP.call, u16(1), stmt)
    emit(OP.put_loc, u16(keysLoc), stmt)

    // i = 0
    emit(OP.push_i32, i32(0), stmt)
    emit(OP.put_loc, u16(idxLoc), stmt)

    const loopL = newLabel()
    const condL = newLabel()
    const endL = newLabel()

    defLabel(loopL)
    // i < keys.length ?
    emit(OP.get_loc, u16(idxLoc), stmt)
    emit(OP.get_loc, u16(keysLoc), stmt)
    emit(OP.get_field, u32(atoms.add('length')), stmt)
    emit(OP.lt, [], stmt)
    emitIfFalseTo(endL, stmt)

    // key = keys[i]
    emit(OP.get_loc, u16(keysLoc), stmt)
    emit(OP.get_loc, u16(idxLoc), stmt)
    emit(OP.get_array_el, [], stmt)

    // 绑定到目标
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

    // 循环体
    // 设置循环目标：continue -> condL; break -> endL
    const loopTarget: LoopTarget = { breakL: endL, continueL: condL }
    loopStack.push(loopTarget)
    emitStmtBlock(stmt.statement)
    loopStack.pop()

    // continue 位置：i++；再到 condL
    defLabel(condL)
    emit(OP.get_loc, u16(idxLoc), stmt)
    emit(OP.push_i32, i32(1), stmt)
    emit(OP.add, [], stmt)
    emit(OP.put_loc, u16(idxLoc), stmt)

    emitGotoTo(loopL, stmt)
    defLabel(endL)
  }

  // Await
  function emitAwait(expr: ts.Expression, n?: ts.Node) {
    if (OP_AWAIT == null) {
      const p = sf.getLineAndCharacterOfPosition(expr.getStart())
      throw new Error(`本编译器未配置 AWAIT opcode（QJS_OP_AWAIT）。无法编译 await。位置：${sf.fileName}:${p.line+1}:${p.character+1}`)
    }

    emitExpr(expr)
    // 直接写入 opcode 值（不是枚举）
    asm.emit(OP_AWAIT as unknown as OP, [], n ? line(n) : undefined, n ? col(n) : undefined)
  }

  // Yield
  function emitYield(expr: ts.Expression | undefined, n?: ts.Node) {
    if (OP_YIELD == null) {
      const p = sf.getLineAndCharacterOfPosition(n ? n.getStart() : expr ? expr.getStart() : 0)
      throw new Error(`本编译器未配置 YIELD opcode（QJS_OP_YIELD）。无法编译 yield。位置：${sf.fileName}:${p.line+1}:${p.character+1}`)
    }

    if (expr) {
      emitExpr(expr)
    }

    asm.emit(OP_YIELD as unknown as OP, [], n ? line(n) : undefined, n ? col(n) : undefined)
  }

  // For-of lowering: for (const v of expr) body
  // 注意：此实现接近规范与 QuickJS 语义，但仍有差异：
  //  - 未实现迭代器关闭（IteratorClose）：在 break/return/throw 等异常完成时未调用迭代器的 return()。
  //  - 未覆盖解构绑定、for-await-of、以及异常传播时的 finally 交互。
  // 若需与 QuickJS 完全一致，需在控制流边（break/continue/return/throw/异常）上插入关闭逻辑，
  // 并扩展到 for-await-of（使用 Symbol.asyncIterator）。
  function emitForOf(stmt: ts.ForOfStatement) {
    // Pseudocode:
    // let __iter = (expr)[Symbol.iterator]();
    // let __step;
    // while (!(__step = __iter.next()).done) {
    //   const v = __step.value;
    //   body
    // }
    const iterLoc = addLocal(`__iter_${stmt.pos}`)
    const stepLoc = addLocal(`__step_${stmt.pos}`)

    // expr
    emitExpr(stmt.expression)                         // stack: obj
    asm.emit(OP.dup, [], line(stmt.expression), col(stmt.expression)) // obj,obj

    // load well-known Symbol.iterator: Symbol.iterator
    emit(OP.get_var, u32(atoms.add('Symbol')), stmt.expression)
    emit(OP.get_field, u32(atoms.add('iterator')), stmt.expression) // stack: obj,obj,symbol

    // obj[symbol]
    emit(OP.get_array_el, [], stmt.expression)       // stack: obj, func
    // call_method 0 -> iterator object
    emit(OP.call_method, u16(0), stmt.expression)    // stack: iter
    emit(OP.put_loc, u16(iterLoc), stmt.expression)  // store iter

    const loopL = newLabel()
    const doneL = newLabel()
    defLabel(loopL)

    // __step = __iter.next()
    emit(OP.get_loc, u16(iterLoc), stmt)
    emit(OP.get_field, u32(atoms.add('next')), stmt)
    // call_method 0
    emit(OP.call_method, u16(0), stmt)
    emit(OP.put_loc, u16(stepLoc), stmt)

    // if (__step.done) break -> done
    emit(OP.get_loc, u16(stepLoc), stmt)
    emit(OP.get_field, u32(atoms.add('done')), stmt)
    const notDoneL = newLabel()
    emitIfFalseTo(notDoneL, stmt)
    emitGotoTo(doneL, stmt)
    defLabel(notDoneL)

    // binding: const v = __step.value
    if (ts.isVariableDeclarationList(stmt.initializer)) {
      const decl = stmt.initializer.declarations[0]

      if (decl && ts.isIdentifier(decl.name)) {
        const vname = decl.name.text
        if (!locals.has(vname)) {
          addLocal(vname)
        }
        emit(OP.get_loc, u16(stepLoc), stmt)
        emit(OP.get_field, u32(atoms.add('value')), stmt)
        emitIdentStore(vname, stmt)
      }
    } else if (ts.isExpression(stmt.initializer)) {
      // pattern like (v) of expr
      emit(OP.get_loc, u16(stepLoc), stmt)
      emit(OP.get_field, u32(atoms.add('value')), stmt)
      // Store into target expr (must be identifier/property/element)
      const init = stmt.initializer as ts.Expression
      if (ts.isIdentifier(init)) {
        emitIdentStore(init.text, stmt)
      } else if (ts.isPropertyAccessExpression(init)) {
        emitExpr(init.expression)
        emit(OP.swap, [], stmt)
        emit(OP.put_field, u32(atoms.add(init.name.text)), stmt)
      } else if (ts.isElementAccessExpression(init)) {
        emitExpr(init.expression)
        emitExpr(init.argumentExpression!)
        emit(OP.swap, [], stmt)
        emit(OP.put_array_el, [], stmt)
      }
    }

    // body
    emitStmtBlock(stmt.statement)
    // loop back
    emitGotoTo(loopL, stmt)
    defLabel(doneL)
  }

  // --- 函数相关：编译子函数 -> 常量 -> fclosure ---
  function compileFunctionLike(fn: ts.FunctionLikeDeclaration, arrow: boolean): number {
    // 构建子 IR（简化：不展开闭包捕获，下一步可以接入 scope.ts）
    const child = new FunctionIR()
    child.isModule = false
    child.filenameAtomId = ir.filenameAtomId
    const fname = fn.name && ts.isIdentifier(fn.name) ? fn.name.text : (arrow ? 'arrow' : 'anonymous')
    child.functionNameAtomId = atoms.add(fname)
    if (!arrow) {
      child.flags |= FUN_FLAG_STRICT
    }
    if (arrow) {
      child.flags |= FUN_FLAG_ARROW
    }
    // 标志位（用于元信息/对齐 quickjs）：
    child.isArrow = !!arrow
    child.isAsync = !!fn.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)
    child.isGenerator = !!(ts.isFunctionDeclaration(fn) || ts.isFunctionExpression(fn)) && !!(fn as any).asteriskToken

    // 参数
    child.argCount = fn.parameters.length
    child.definedArgCount = child.argCount
    child.paramNameAtoms = fn.parameters.map(p => atoms.add(p.name.getText()))
    // 源文本（仅在 embedSource 时会写出）
    child.sourceText = fn.getSourceFile().getFullText()

    // 局部和主体：最小实现，遍历 fn.body 的语句并沿用上层 emit 逻辑（为了简明，这里只产生 return_undef）
    // 生产级应递归调用一个子编译管线；这里给出最小可运行骨架：
    const childAsm = new Assembler(child)
    // TODO: 递归编译 fn.body -> child.bytecode（此处最小返回 undefined）
    childAsm.emit(OP.return_undef)
    childAsm.assemble(true)
    child.stackSize = 1

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
      case ts.SyntaxKind.PrefixUnaryExpression: {
        const pe = e as ts.PrefixUnaryExpression
        emitExpr(pe.operand)
        switch (pe.operator) {
          case ts.SyntaxKind.ExclamationToken:
            emit(OP.lnot, [], e)
            break
          case ts.SyntaxKind.TildeToken:
            emit(OP.not, [], e)
            break
          case ts.SyntaxKind.PlusToken:
            break
          case ts.SyntaxKind.MinusToken:
            emitNumber(0, e)
            emit(OP.swap, [], e)
            emit(OP.sub, [], e)
            break
        }
        return
      }
      case ts.SyntaxKind.BinaryExpression: {
        emitBinary(e as ts.BinaryExpression)
        return
      }
      case ts.SyntaxKind.CallExpression: {
        const ce = e as ts.CallExpression
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
          v = (c! == 0n) ? (a / c) : 0n 
          break
        case ts.SyntaxKind.PercentToken: 
          v = (c! == 0n) ? (a % c) : 0n 
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
      k === ts.SyntaxKind.SlashEqualsToken) {
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
      emitIfFalseTo(end, b)
      emitExpr(b.right)
      defLabel(end)
      return
    }

    if (k === ts.SyntaxKind.BarBarToken) {
      const end = newLabel()
      emitExpr(b.left)
      emit(OP.lnot, [], b)
      const skip = newLabel()
      emitIfFalseTo(skip, b) 
      emitExpr(b.right) 
      defLabel(skip)
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
      }
      const lt = typeck.classify(left)
      applyExpectedTypeAtTOS((lt as any), node)
      emitIdentStore(left.text, node)
      return
    }
    if (ts.isPropertyAccessExpression(left)) {
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
      }
      emit(OP.put_field, u32(atoms.add(left.name.text)), node)
      return
    }
    if (ts.isArrayLiteralExpression(left)) {
      emitExpr(left)
      return
    }
    if (ts.isElementAccessExpression(left)) {
      emitElemStore(left.expression, left.argumentExpression!, right, node)
      return
    }

    emitExpr(right)
  }

  function emitAssignmentWithType(left: ts.Expression, right: ts.Expression, node: ts.Node) {
    const expected = typeck.classify(left)
    emitExpr(right)
    applyExpectedTypeAtTOS((expected as any), node)
    
    if (ts.isIdentifier(left)) { 
      emitIdentStore(left.text, node)
      return
    }

    if (ts.isPropertyAccessExpression(left)) { 
      emitExpr(left.expression)
      emit(OP.put_field, u32(atoms.add(left.name.text)), node)
      return
    }
    if (ts.isElementAccessExpression(left)) { 
      emitElemStore(left.expression, left.argumentExpression!, right, node) 
      return
    }
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
        const loopL = newLabel()
        const condL = newLabel()
        const endL = newLabel()
        defLabel(loopL)
        loopStack.push({ breakL: endL, continueL: condL })
        emitStmtBlock(ds.statement)
        loopStack.pop()
        defLabel(condL)
        emitExpr(ds.expression)
        emitIfFalseTo(endL, ds)
        emitGotoTo(loopL, ds)
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
        for (const d of vs.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) {
            const name = d.name.text
            addLocal(name)
            if (d.initializer) { 
              emitExpr(d.initializer)
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
              const arr = d.name
              let idx = 0
              for (const el of arr.elements) {
                if (ts.isOmittedExpression(el)) { idx++; continue }
                emit(OP.get_loc, u16(tmp), d)
                emit(OP.push_i32, i32(idx++), d)
                emit(OP.get_array_el, [], d)
                if (ts.isBindingElement(el) && ts.isIdentifier(el.name)) {
                  const v = el.name.text
                  addLocal(v)
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
                  const v = el.name.text
                  addLocal(v)
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
        if (rs.expression) { 
          emitExpr(rs.expression)
          emit(OP.return, [], rs)
        } else {
          emit(OP.return_undef, [], rs)
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
          // finally 结束后统一到 end
          emitGotoTo(endL, tsn.finallyBlock!)
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

  // 记录源码供可选嵌入
  ir.sourceText = sf.getFullText()

  asm.assemble(!!options.enableShortOpcodes)

  const { code, maxStack } = optimizeBytecode(ir.bytecode, {
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