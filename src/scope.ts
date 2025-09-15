import * as ts from 'typescript'
import { AtomTable } from './atoms'
import { FunctionIR, VarRefEntry, CaptureInfo } from './ir'

/* 简单多层作用域与捕获分析：
   - 每个函数建立一个 ScopeStack：栈顶是当前函数作用域，包含参数和局部（let/const/var）。
   - 发现对未在当前函数声明但在外层函数声明的标识符引用 -> 标记为捕获：
     * 在父函数 IR.closures 增加 CaptureInfo（isVar=true 表示局部，false 表示参数；idx=索引）
     * 在子函数 IR.varRefs 中登记 VarRefEntry（name atom + 来源 isVar/index）
     * 子函数代码发射标识符时使用 OP_get_var_ref/OP_put_var_ref（操作数为 var_ref 索引）
   - liveness：函数内按基本块/跳转构建 CFG，迭代传播活跃变量索引集合（目前用于后续优化/校验）。
*/
export type Binding = { 
  kind: 'param' | 'local' 
  index: number
  name: string
}

export type Scope = {
  func: ts.FunctionLikeDeclaration | ts.SourceFile
  params: Map<string, number> // name -> param index
  locals: Map<string, number> // name -> local index
  parent?: Scope
}

export class ScopeManager {
  root: Scope

  constructor(rootNode: ts.SourceFile) {
    this.root = { 
      func: rootNode, 
      params: new Map(), 
      locals: new Map(), 
      parent: undefined 
    }
  }

  enterFunction(fn: ts.FunctionLikeDeclaration, parent: Scope): Scope {
    const s: Scope = { 
      func: fn, 
      params: new Map(), 
      locals: new Map(), 
      parent 
    }

    fn.parameters.forEach((p, i) => {
      const name = p.name.getText()
      s.params.set(name, i)
    })

    return s
  }

  declareLocal(scope: Scope, name: string, idx: number) {
    if (!scope.locals.has(name)) {
      scope.locals.set(name, idx)
    }
  }

  resolve(scope: Scope, name: string): { level: number; bind?: Binding } {
    let s: Scope | undefined = scope
    let level = 0
    while (s) {
      if (s.params.has(name)) {
        return { 
          level, 
          bind: { kind: 'param', index: s.params.get(name)!, name } 
        }
      }

      if (s.locals.has(name)) {
        return { 
          level, 
          bind: { kind: 'local', index: s.locals.get(name)!, name } 
        }
      }

      s = s.parent 
      level++
    }
    return { level }
  }
}

export function addClosureCapture(parentIR: FunctionIR, childIR: FunctionIR, source: { kind: 'param'|'local'; index: number; nameAtom: number }) {
  // register in child varRefs
  const keyAtom = source.nameAtom
  if (!childIR.varRefIndexByNameAtom.has(keyAtom)) {
    const idx = childIR.varRefs.length
    childIR.varRefs.push({
      nameAtom: keyAtom,
      fromParentIsVar: source.kind === 'local',
      fromParentIndex: source.index,
    })
    childIR.varRefIndexByNameAtom.set(keyAtom, idx)
  }
  // register in parent closures
  const exists = parentIR.closures.find(c => c.isVar === (source.kind==='local') && c.idx === source.index)
  if (!exists) {
    const cap: CaptureInfo = { isVar: source.kind === 'local', idx: source.index }
    parentIR.closures.push(cap)
  }
}