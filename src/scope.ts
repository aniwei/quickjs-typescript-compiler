import * as ts from 'typescript'
import { AtomTable } from './atoms'
import { FunctionIR, VarRefEntry, CaptureInfo } from './ir'

/*
  多层作用域与捕获分析（最小可用版）：
  - 每个函数建立一个 Scope：记录参数与局部（let/const/var）符号到索引的映射。
  - 解析标识符：自内向外查找，命中则返回绑定信息，否则返回未解析。
  - addClosureCapture：当子函数需要捕获父函数的 param/local 时：
    * 在父 IR.closures 增加 CaptureInfo（isVar: true=local, false=param；idx=对应索引）
    * 在子 IR.varRefs 增加 VarRefEntry（nameAtom, fromParentIsVar, fromParentIndex）
    * 返回子函数里的 var_ref 索引，便于后续发射 OP_get_var_ref/OP_put_var_ref
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

type Resolved = { 
  level: number // 0=当前函数，1=父函数，...
  bind?: Binding
}

type Source = Binding & { nameAtom: number };

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

  resolve(scope: Scope, name: string): Resolved {
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

export function addClosureCapture(
  parentIR: FunctionIR,
  childIR: FunctionIR,
  source: Source
): number {
  // 1) 在父 IR.closures 确保登记该捕获（去重）
  const wantIsVar = source.kind === 'local'
  const wantIdx = source.index

  let foundCaptureIdx = parentIR.closures.findIndex(c => c.isVar === wantIsVar && c.idx === wantIdx)
  if (foundCaptureIdx < 0) {
    const cap: CaptureInfo = { isVar: wantIsVar, idx: wantIdx }
    parentIR.closures.push(cap)
    foundCaptureIdx = parentIR.closures.length - 1
  }

  // 2) 在子 IR.varRefs 登记引用（按 nameAtom 去重）
  const keyAtom = source.nameAtom
  let vrIdx = childIR.varRefIndexByNameAtom.get(keyAtom)
  if (vrIdx === undefined) {
    const vr: VarRefEntry = {
      nameAtom: keyAtom,
      fromParentIsVar: wantIsVar,
      // 注意：QuickJS var_ref 的 fromParentIndex 语义是“父函数帧里的索引（param/local）”，
      // 与父 closures 中的顺序不同。这里保持 fromParentIndex = source.index。
      fromParentIndex: wantIdx
    }
    childIR.varRefs.push(vr)
    vrIdx = childIR.varRefs.length - 1
    childIR.varRefIndexByNameAtom.set(keyAtom, vrIdx)
  }
  return vrIdx
}