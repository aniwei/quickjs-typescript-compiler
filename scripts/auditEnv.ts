import { QuickJSLib } from './QuickJSLib'

// 注意：env.ts 是自动生成文件；本脚本用于校验它与 WASM 导出是否一致。
import * as Env from '../src/env'

type Diff = { key: string; expected: unknown; actual: unknown }

type AuditSectionResult = {
  name: string
  ok: boolean
  diffs: Diff[]
}

function extractEnumForwardMapping(enumObj: any): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [key, value] of Object.entries(enumObj ?? {})) {
    if (typeof value === 'number') out[key] = value
  }
  return out
}

function diffNumberMap(expected: Record<string, number>, actual: Record<string, number>): Diff[] {
  const diffs: Diff[] = []

  const keys = new Set([...Object.keys(expected), ...Object.keys(actual)])
  for (const key of [...keys].sort()) {
    const e = expected[key]
    const a = actual[key]
    if (e !== a) diffs.push({ key, expected: e, actual: a })
  }

  return diffs
}

function printSection(result: AuditSectionResult) {
  const status = result.ok ? 'OK' : 'FAIL'
  console.log(`\n[${status}] ${result.name}`)
  if (!result.ok) {
    const max = 40
    const head = result.diffs.slice(0, max)
    for (const d of head) {
      console.log(`  - ${d.key}: env=${String(d.expected)} wasm=${String(d.actual)}`)
    }
    if (result.diffs.length > max) {
      console.log(`  ... (${result.diffs.length - max} more)`)
    }
  }
}

async function main() {
  const results: AuditSectionResult[] = []

  // 基础常量
  {
    const expected = {
      compileOptions: Env.compileOptions,
      bytecodeVersion: Env.bytecodeVersion,
      firstAtomId: Env.firstAtomId,
      GLOBAL_VAR_OFFSET: Env.GLOBAL_VAR_OFFSET,
      ARGUMENT_VAR_OFFSET: Env.ARGUMENT_VAR_OFFSET,
      ARG_SCOPE_INDEX: Env.ARG_SCOPE_INDEX,
      ARG_SCOPE_END: Env.ARG_SCOPE_END,
      DEBUG_SCOPE_INDEX: Env.DEBUG_SCOPE_INDEX,
      JS_MAX_LOCAL_VARS: Env.JS_MAX_LOCAL_VARS,
      JS_STACK_SIZE_MAX: Env.JS_STACK_SIZE_MAX
    }

    const actual = {
      compileOptions: await QuickJSLib.getCompileOptions(),
      bytecodeVersion: await QuickJSLib.getBytecodeVersion(),
      firstAtomId: await QuickJSLib.getFirstAtomId(),
      GLOBAL_VAR_OFFSET: await QuickJSLib.getGlobalVarOffset(),
      ARGUMENT_VAR_OFFSET: await QuickJSLib.getArgumentVarOffset(),
      ARG_SCOPE_INDEX: await QuickJSLib.getArgScopeIndex(),
      ARG_SCOPE_END: await QuickJSLib.getArgScopeEnd(),
      DEBUG_SCOPE_INDEX: await QuickJSLib.getDebugScopeIndex(),
      JS_MAX_LOCAL_VARS: await QuickJSLib.getMaxLocalVars(),
      JS_STACK_SIZE_MAX: await QuickJSLib.getStackSizeMax()
    }

    const diffs: Diff[] = []
    for (const k of Object.keys(expected) as Array<keyof typeof expected>) {
      if (expected[k] !== actual[k]) diffs.push({ key: k, expected: expected[k], actual: actual[k] })
    }

    results.push({ name: 'Constants', ok: diffs.length === 0, diffs })
  }

  // 枚举与数值映射
  {
    const wasm = await QuickJSLib.getCompileEnums()
    const env = extractEnumForwardMapping(Env.CompileFlags)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'CompileFlags', ok: diffs.length === 0, diffs })
  }

  {
    const wasm = await QuickJSLib.getPutLValueEnum()
    const env = extractEnumForwardMapping(Env.PutLValueEnum)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'PutLValueEnum', ok: diffs.length === 0, diffs })
  }

  {
    const wasm = await QuickJSLib.getAllBytecodeTags()
    const env = extractEnumForwardMapping(Env.BytecodeTag)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'BytecodeTag', ok: diffs.length === 0, diffs })
  }

  {
    const wasm = await QuickJSLib.getFunctionKinds()
    const env = extractEnumForwardMapping(Env.FunctionKind)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'FunctionKind', ok: diffs.length === 0, diffs })
  }

  {
    const wasm = await QuickJSLib.getJSModes()
    const env = extractEnumForwardMapping(Env.JSMode)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'JSMode', ok: diffs.length === 0, diffs })
  }

  {
    const wasm = await QuickJSLib.getPC2LineCodes()
    const env = extractEnumForwardMapping(Env.PC2Line)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'PC2Line', ok: diffs.length === 0, diffs })
  }

  {
    const wasm = await QuickJSLib.getSpecialObjects()
    const env = extractEnumForwardMapping(Env.OPSpecialObjectEnum)
    const diffs = diffNumberMap(env, wasm)
    results.push({ name: 'OPSpecialObjectEnum', ok: diffs.length === 0, diffs })
  }

  // 操作码
  {
    const all = await QuickJSLib.getAllOpcodes()
    const wasmFinal: Record<string, number> = {}
    const wasmTemp: Record<string, number> = {}
    for (const op of all) {
      if (op.isTemp) wasmTemp[op.name] = op.code
      else wasmFinal[op.name] = op.code
    }

    const diffsFinal = diffNumberMap(Env.OPCODE_NAME_TO_CODE, wasmFinal)
    results.push({ name: 'Opcodes (final)', ok: diffsFinal.length === 0, diffs: diffsFinal })

    const diffsTemp = diffNumberMap(Env.TEMP_OPCODE_NAME_TO_CODE, wasmTemp)
    results.push({ name: 'Opcodes (temp)', ok: diffsTemp.length === 0, diffs: diffsTemp })
  }

  // Atom 基本一致性检查（默认只做少量检查，避免输出过大）
  {
    const diffs: Diff[] = []
    const emptyId = (Env as any).JSAtom?.JS_ATOM_empty_string
    if (typeof emptyId === 'number') {
      if ((Env as any).ATOM_STRINGS?.[emptyId] !== '') {
        diffs.push({ key: 'ATOM_STRINGS[JS_ATOM_empty_string]', expected: '', actual: (Env as any).ATOM_STRINGS?.[emptyId] })
      }
    }

    const brandId = (Env as any).JSAtom?.JS_ATOM_Private_brand
    if (typeof brandId === 'number') {
      if ((Env as any).ATOM_STRINGS?.[brandId] !== '<brand>') {
        diffs.push({ key: 'ATOM_STRINGS[JS_ATOM_Private_brand]', expected: '<brand>', actual: (Env as any).ATOM_STRINGS?.[brandId] })
      }
    }

    results.push({ name: 'Atoms (sanity)', ok: diffs.length === 0, diffs })
  }

  // 输出结果并设置退出码
  for (const r of results) printSection(r)

  const failed = results.filter(r => !r.ok)
  console.log(`\nSummary: ${results.length - failed.length}/${results.length} sections OK`)

  if (failed.length > 0) {
    process.exitCode = 1
  }
}

main().catch(err => {
  console.error(err)
  process.exitCode = 1
})
