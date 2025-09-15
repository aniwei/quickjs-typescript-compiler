import * as ts from 'typescript'
import { AtomTable } from './atoms'
import { FunctionIR } from './ir'
import { Assembler } from './assembler'
import { OP, FUN_FLAG_STRICT, OP_AWAIT, OP_YIELD } from './op'
import { StrongTypeChecker } from './types'
import { optimizeBytecode } from './optimizer'
import { ShapePolicy } from './shape-policy'
import { BytecodeWriter } from './bytecode-writer'

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

  // Closure variable analysis helper
  function addVarRef(varName: string, fromParentIsVar: boolean, fromParentIndex: number): number {
    const nameAtom = atoms.add(varName)
    
    // Check if already exists
    const existing = ir.varRefIndexByNameAtom.get(nameAtom)
    if (existing !== undefined) {
      return existing
    }
    
    const index = ir.varRefs.length
    ir.varRefs.push({
      nameAtom,
      fromParentIsVar,
      fromParentIndex
    })
    ir.varRefIndexByNameAtom.set(nameAtom, index)
    
    return index
  }

  // Function compilation helper
  function compileFunction(func: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction): number {
    // Create a new isolated compilation context for the function
    const childIR = new FunctionIR()
    const childAtoms = new AtomTable()
    const childTypeck = new StrongTypeChecker(checker)
    
    // Set up function metadata
    const isAsync = !!(func.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword))
    const isGenerator = !!func.asteriskToken
    
    // Check for async/generator support
    if (isAsync && OP_AWAIT == null) {
      const p = sf.getLineAndCharacterOfPosition(func.getStart())
      throw new Error(`本编译器未配置 AWAIT opcode（QJS_OP_AWAIT）。无法编译 async 函数。位置：${sf.fileName}:${p.line+1}:${p.character+1}`)
    }
    
    if (isGenerator && OP_YIELD == null) {
      const p = sf.getLineAndCharacterOfPosition(func.getStart())
      throw new Error(`本编译器未配置 YIELD opcode（QJS_OP_YIELD）。无法编译 generator 函数。位置：${sf.fileName}:${p.line+1}:${p.character+1}`)
    }
    
    // Function name
    let funcName = '<anonymous>'
    if (ts.isFunctionDeclaration(func) && func.name) {
      funcName = func.name.text
    } else if (ts.isFunctionExpression(func) && func.name) {
      funcName = func.name.text
    }
    
    childIR.functionNameAtomId = childAtoms.add(funcName)
    childIR.filenameAtomId = childAtoms.add(sf.fileName)
    
    // Set up child compilation context
    const childAsm = new Assembler(childIR)
    const childLocals = new Map<string, number>()
    const childLocalNames: string[] = []
    
    // Helper functions for child compilation context
    const childLine = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1
    const childCol = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart()).character
    const childEmit = (op: OP, ops: number[] = [], n?: ts.Node) => 
      childAsm.emit(op, ops, n ? childLine(n) : undefined, n ? childCol(n) : undefined)
    
    const childAddLocal = (name: string) => { 
      if (!childLocals.has(name)) { 
        childLocals.set(name, childLocals.size)
        childLocalNames.push(name)
      }
      return childLocals.get(name)!
    }
    
    // Process parameters
    const paramNames: string[] = []
    func.parameters?.forEach((param) => {
      if (ts.isIdentifier(param.name)) {
        const paramName = param.name.text
        paramNames.push(paramName)
        childAddLocal(paramName)
      }
    })
    
    childIR.argCount = func.parameters?.length || 0
    childIR.definedArgCount = childIR.argCount
    childIR.paramNameAtoms = paramNames.map(n => childAtoms.add(n))
    
    // Simple function body compilation
    function childEmitExpr(e: ts.Expression): void {
      childTypeck.ensureNoAny(e)
      
      if (ts.isNumericLiteral(e)) { 
        const n = Number(e.text)
        if (Number.isInteger(n) && n >= -2147483648 && n <= 2147483647) {
          childEmit(OP.push_i32, [
            (n & 0xff), ((n >> 8) & 0xff), ((n >> 16) & 0xff), ((n >> 24) & 0xff)
          ], e)
        } else {
          const k = childIR.constPool.indexNumber(n) 
          childEmit(OP.push_const, [k & 0xff, (k >> 8) & 0xff, (k >> 16) & 0xff, (k >> 24) & 0xff], e)
        }
        return
      }
      
      if (ts.isStringLiteral(e)) { 
        childEmit(OP.push_atom_value, [
          childAtoms.add(e.text) & 0xff, 
          (childAtoms.add(e.text) >> 8) & 0xff,
          (childAtoms.add(e.text) >> 16) & 0xff,
          (childAtoms.add(e.text) >> 24) & 0xff
        ], e)
        return
      }
      
      if (e.kind === ts.SyntaxKind.TrueKeyword) {
        childEmit(OP.push_true, [], e) 
        return
      }

      if (e.kind === ts.SyntaxKind.FalseKeyword) { 
        childEmit(OP.push_false, [], e)
        return
      }

      if (e.kind === ts.SyntaxKind.NullKeyword) { 
        childEmit(OP.null, [], e) 
        return
      }
      
      if (ts.isIdentifier(e)) { 
        if (childLocals.has(e.text)) {
          const loc = childLocals.get(e.text)!
          childEmit(OP.get_loc, [loc & 0xff, (loc >> 8) & 0xff], e)
        } else {
          // Check if this variable exists in parent scope (closure)
          if (locals.has(e.text)) {
            // This is a closure variable - add var_ref
            const varRefIndex = addVarRef(e.text, false, locals.get(e.text)!)
            childEmit(OP.get_var_ref, [varRefIndex & 0xff, (varRefIndex >> 8) & 0xff], e)
          } else {
            // Global variable
            const atomId = childAtoms.add(e.text)
            childEmit(OP.get_var, [
              atomId & 0xff, (atomId >> 8) & 0xff, (atomId >> 16) & 0xff, (atomId >> 24) & 0xff
            ], e)
          }
        }
        return
      }
      
      if (ts.isBinaryExpression(e)) {
        childEmitExpr(e.left)
        childEmitExpr(e.right)
        
        switch (e.operatorToken.kind) {
          case ts.SyntaxKind.PlusToken: 
            childEmit(OP.add, [], e)
            break
          case ts.SyntaxKind.MinusToken: 
            childEmit(OP.sub, [], e)
            break
          case ts.SyntaxKind.AsteriskToken: 
            childEmit(OP.mul, [], e)
            break
          case ts.SyntaxKind.SlashToken: 
            childEmit(OP.div, [], e)
            break
          default:
            childEmit(OP.add, [], e) // Default to add for safety
            break
        }
        return
      }
      
      if (ts.isCallExpression(e)) {
        // Simple call handling
        childEmitExpr(e.expression)
        for (const arg of e.arguments) {
          childEmitExpr(arg)
        }
        childEmit(OP.call, [e.arguments.length & 0xff, (e.arguments.length >> 8) & 0xff], e)
        return
      }
      
      // Default case
      childEmit(OP.undefined, [], e)
    }
    
    function childEmitStmt(s: ts.Statement): void {
      if (ts.isVariableStatement(s)) {
        for (const d of s.declarationList.declarations) {
          if (!ts.isIdentifier(d.name)) {
            continue
          }
          const name = d.name.text
          childAddLocal(name)
          if (d.initializer) { 
            childEmitExpr(d.initializer)
            const loc = childLocals.get(name)!
            childEmit(OP.put_loc, [loc & 0xff, (loc >> 8) & 0xff], d)
          }
        }
        return
      }
      
      if (ts.isReturnStatement(s)) {
        if (s.expression) { 
          childEmitExpr(s.expression)
          childEmit(OP.return, [], s)
        } else {
          childEmit(OP.return_undef, [], s)
        }
        return
      }
      
      if (ts.isExpressionStatement(s)) { 
        childEmitExpr(s.expression)
        return
      }
      
      if (ts.isBlock(s)) { 
        for (const x of s.statements) {
          childEmitStmt(x)
        }
        return
      }
      
      if (ts.isIfStatement(s)) {
        childEmitExpr(s.expression)
        const childElseLabel = childAsm.newLabel()
        childAsm.emitIfFalseTo(childElseLabel)
        childEmitStmt(s.thenStatement)
        
        if (s.elseStatement) {
          const childEndLabel = childAsm.newLabel()
          childAsm.emitGotoTo(childEndLabel)
          childAsm.defineLabel(childElseLabel)
          childEmitStmt(s.elseStatement)
          childAsm.defineLabel(childEndLabel)
        } else {
          childAsm.defineLabel(childElseLabel)
        }
        return
      }
    }
    
    // Compile function body
    if (func.body) {
      if (ts.isBlock(func.body)) {
        // Block statement body
        for (const stmt of func.body.statements) {
          childEmitStmt(stmt)
        }
        // Add implicit return undefined if no explicit return
        if (func.body.statements.length === 0 || 
            !func.body.statements.some(s => ts.isReturnStatement(s))) {
          childEmit(OP.return_undef)
        }
      } else {
        // Expression body (arrow function)
        childEmitExpr(func.body)
        childEmit(OP.return, [], func.body)
      }
    } else {
      childEmit(OP.return_undef, [], func)
    }
    
    childIR.varCount = childLocals.size
    childIR.localNameAtoms = childLocalNames.map(n => childAtoms.add(n))
    
    childAsm.assemble(!!options.enableShortOpcodes)
    
    // For isolated function, create a simplified bytecode buffer
    // In a full implementation, this would use proper bytecode generation
    // For now, store a simplified representation in the const pool
    const funcIndex = ir.constPool.list.length
    ir.constPool.list.push({
      kind: 'function',
      data: Buffer.from([0]) // Placeholder - would contain actual function bytecode
    })
    
    return funcIndex
  }

  const withStack: WithStatic[] = []
  let withDepth = 0

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
      const k = ir.constPool.indexNumber(n) 
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
      // Check if this is a var_ref (closure variable)
      const varRefIndex = ir.varRefIndexByNameAtom.get(atoms.add(name))
      if (varRefIndex !== undefined) {
        emit(OP.get_var_ref, u16(varRefIndex), n)
      } else {
        emit(OP.get_var, u32(atoms.add(name)), n)
      }
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
      // Check if this is a var_ref (closure variable)
      const varRefIndex = ir.varRefIndexByNameAtom.get(atoms.add(name))
      if (varRefIndex !== undefined) {
        emit(OP.put_var_ref, u16(varRefIndex), n)
      } else {
        emit(OP.put_var, u32(atoms.add(name)), n)
      }
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

    // if (__step.done) break
    emit(OP.get_loc, u16(stepLoc), stmt)
    emit(OP.get_field, u32(atoms.add('done')), stmt)
    emitIfFalseTo(/*not done? false -> continue*/ newLabel(), stmt) // we need invert: if_true break
    // Actually implement: if (__step.done) goto done
    // Fix: pop previous if; Implement correct:
    // Re-evaluate:
    ir.bytecode.splice(ir.bytecode.length-2, 2) // remove wrong emitIfFalseTo; quick fix (limited editor). We'll implement properly below.
    // Correct sequence:
    emit(OP.get_loc, u16(stepLoc), stmt)
    emit(OP.get_field, u32(atoms.add('done')), stmt)
    const notDoneL = newLabel()
    // if_false -> notDone
    emitIfFalseTo(notDoneL, stmt)
    // goto done
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

  function emitExpr(e: ts.Expression): void {
    typeck.ensureNoAny(e)

    // Handle function expressions and arrow functions
    if (ts.isFunctionExpression(e) || ts.isArrowFunction(e)) {
      const constIndex = compileFunction(e)
      emit(OP.push_const, u32(constIndex), e)
      emit(OP.fclosure, [], e)
      return
    }

    if (ts.isAwaitExpression(e)) { 
      emitAwait(e.expression, e)
      return
    }

    if (ts.isYieldExpression(e)) { 
      emitYield(e.expression ?? undefined, e) 
      return 
    }

    if (ts.isBigIntLiteral(e)) { 
      emitBigIntLiteral(e)
      return
    }

    if (ts.isNumericLiteral(e)) { 
      emitNumber(Number(e.text), e) 
      return
    }

    if (ts.isStringLiteral(e)) { 
      emit(OP.push_atom_value, u32(atoms.add(e.text)), e)
      return
    }

    if (e.kind === ts.SyntaxKind.TrueKeyword) {
      emit(OP.push_true, [], e) 
      return
    }

    if (e.kind === ts.SyntaxKind.FalseKeyword) { 
      emit(OP.push_false, [], e)
      return
    }

    if (e.kind === ts.SyntaxKind.NullKeyword) { 
      emit(OP.null, [], e) 
      return
    }

    if (ts.isIdentifier(e)) { 
      emitIdentLoad(e.text, e) 
      return
    }

    if (ts.isParenthesizedExpression(e)) { 
      emitExpr(e.expression) 
      return 
    }

    if (ts.isPrefixUnaryExpression(e)) {
      emitExpr(e.operand)

      switch (e.operator) {
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

    if (ts.isBinaryExpression(e)) { 
      emitBinary(e)
      return
    }
    if (ts.isCallExpression(e)) {
      if (ts.isIdentifier(e.expression) && e.expression.text === 'import') { 
        emitDynamicImport(e)
        return
      }

      if (ts.isIdentifier(e.expression) && e.expression.text === 'eval') { 
        emitEval(e) 
        return 
      }

      emitCall(e)
      return
    }

    if (ts.isPropertyAccessExpression(e)) {
      emitExpr(e.expression)
      emit(OP.get_field, u32(atoms.add(e.name.text)), e)
      return
    }

    if (ts.isElementAccessExpression(e)) { 
      emitElemLoad(e.expression, e.argumentExpression!, e) 
      return 
    }

    if (ts.isObjectLiteralExpression(e)) { 
      emitObjectLiteralWithShape(e)
      return
    }

    if (ts.isArrayLiteralExpression(e)) {
      let n = 0
      for (const el of e.elements) {
        if (ts.isSpreadElement(el) || ts.isOmittedExpression(el)) { 
          emit(OP.undefined, [], e)
          n++
        } else { 
          emitExpr(el)
          n++
        }
      }

      emit(OP.array_from, u16(n), e) 
      return
    }

    emit(OP.undefined, [], e)
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
    // Handle function declarations with hoisting
    if (ts.isFunctionDeclaration(s)) {
      if (s.name) {
        const funcName = s.name.text
        const constIndex = compileFunction(s)
        
        // For hoisting, we emit define_func which creates the function binding immediately
        emit(OP.push_const, u32(constIndex), s)
        emit(OP.define_func, u32(atoms.add(funcName)), s)
      }
      return
    }

    if (ts.isForOfStatement(s)) { 
      emitForOf(s) 
      return
    }

    if (ts.isWithStatement(s)) {
      let ws: WithStatic = null
      if (ts.isObjectLiteralExpression(s.expression) && s.expression.properties.every(p => ts.isPropertyAssignment(p))) {
        emitObjectLiteralWithShape(s.expression)
        const temp = addLocal(`__with_${withStack.length}`)
        emit(OP.put_loc, u16(temp), s.expression)

        const props: string[] = []
        for (const p of s.expression.properties) {
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
      emitStmtBlock(s.statement)
      withDepth--
      withStack.pop()
      return
    }

    if (ts.isVariableStatement(s)) {
      for (const d of s.declarationList.declarations) {
        if (!ts.isIdentifier(d.name)) {
          continue
        }
        const name = d.name.text
        addLocal(name)
        if (d.initializer) { 
          emitExpr(d.initializer)
          emitIdentStore(name, d) 
        }
      }
      return
    }

    if (ts.isExpressionStatement(s)) { 
      emitExpr(s.expression)
      return
    }

    if (ts.isReturnStatement(s)) {
      if (s.expression) { 
        emitExpr(s.expression)
        emit(OP.return, [], s)
      } else {
        emit(OP.return_undef, [], s)
      }
      return
    }

    if (ts.isIfStatement(s)) {
      emitExpr(s.expression)
      const elseL = newLabel()
      emitIfFalseTo(elseL, s)
      emitStmtBlock(s.thenStatement)

      if (s.elseStatement) {
        const endL = newLabel()
        emitGotoTo(endL, s)
        defLabel(elseL)
        emitStmtBlock(s.elseStatement)
        defLabel(endL)
      } else {
        defLabel(elseL)
      }
      return
    }

    if (ts.isWhileStatement(s)) {
      const loop = newLabel() 
      defLabel(loop)
      emitExpr(s.expression)
      const endL = newLabel()
      emitIfFalseTo(endL, s)
      emitStmtBlock(s.statement)
      emitGotoTo(loop, s)
      defLabel(endL)
      return
    }

    if (ts.isForStatement(s)) {
      if (s.initializer) {
        if (ts.isVariableDeclarationList(s.initializer)) {
          emitStmt(ts.factory.createVariableStatement(undefined, s.initializer))
        } else {
          emitExpr(s.initializer as ts.Expression)
        }
      }
      const loop = newLabel()
      defLabel(loop)
      let endL: number | null = null

      if (s.condition) { 
        emitExpr(s.condition) 
        endL = newLabel() 
        emitIfFalseTo(endL, s)
      }
      emitStmtBlock(s.statement)
      if (s.incrementor) {
        emitExpr(s.incrementor)
      }

      emitGotoTo(loop, s)
      if (endL) {
        defLabel(endL)
      }
      return
    }

    if (ts.isBlock(s)) { 
      for (const x of s.statements) {
        emitStmt(x)
      }
      return
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

  // Pre-scan for function declarations for hoisting
  function hoistFunctionDeclarations(statements: readonly ts.Statement[]) {
    for (const st of statements) {
      if (ts.isFunctionDeclaration(st) && st.name) {
        const funcName = st.name.text
        const constIndex = compileFunction(st)
        
        // Emit the hoisted function declaration
        emit(OP.push_const, u32(constIndex), st)
        emit(OP.define_func, u32(atoms.add(funcName)), st)
      }
    }
  }

  // Hoist all function declarations first
  hoistFunctionDeclarations(sf.statements)

  for (const st of sf.statements) {
    // Skip function declarations since they were already hoisted
    if (!ts.isFunctionDeclaration(st)) {
      emitStmt(st)
    }
  }

  if (!ir.isModule) {
    emit(OP.return_undef)
  }

  ir.argCount = 0
  ir.definedArgCount = 0
  ir.varCount = locals.size
  ir.paramNameAtoms = []
  ir.localNameAtoms = localNames.map(n => atoms.add(n))

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