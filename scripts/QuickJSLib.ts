import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, relative, basename } from 'node:path'

interface Atom {
  id: number
  key: string
}

interface OpcodeMeta {
  name: string
  code: number
  nPop: number
  nPush: number
  fmt: number
  size: number
}

interface StringArray {
  size: () => number
  get: (index: number) => string
  push_back: (str: string) => void
}

interface QuickJSBinding {
  runWithBinary: (input: Uint8Array, args: StringArray) => void
  dumpWithBinary: (input: Uint8Array, args: StringArray) => string
  compile: (source: string, sourcePath: string, args: StringArray) => Uint8Array
  getBytecodeVersion: () => number
  getFirstAtomId: () => number
  getAtoms: () => Map<string, number>
  getOpcodes: () => Map<string, number>
}

export class QuickJSLib {
  // 使用 any 以避免对 Emscripten 模块结构的过度约束
  static Module: any = null

  static ensureWasmBuilt () {
    const path = resolve(process.cwd(), 'third_party/QuickJS/wasm/output/quickjs_wasm.js')
    if (existsSync(path)) return path

    const buildScript = resolve(process.cwd(), 'scripts/buildWasm.ts')
    const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
    
    if (r.status !== 0) return null
    return existsSync(path) ? path : null
  }

  static getQuickJSModule = async (): Promise<any> => {
    if (QuickJSLib.Module) return QuickJSLib.Module

    const path = QuickJSLib.ensureWasmBuilt()
    if (!path) throw new Error('QuickJS wasm binding not available')

    const WasmModule: any = await import(path)
    QuickJSLib.Module = await WasmModule.default()
    // 返回 Emscripten 模块本体，包含 QuickJSBinding/Uint8Array/StringArray 等类型
    return QuickJSLib.Module
  }

  static async runWithBinaryPath(binaryPath: string) {
    const Module = await QuickJSLib.getQuickJSModule()
    const source = readFileSync(binaryPath)

    const input = new Module.Uint8Array()
    for (let i = 0; i < source.length; i++) {
      input.push_back(source[i])
    }

    Module.QuickJSBinding.runWithBinary(input, new Module.StringArray())
  }

  static async dumpWithBinaryPath(binaryPath: string) {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const source = readFileSync(binaryPath)

    const input = new QuickJSModule.Uint8Array()
    for (let i = 0; i < source.length; i++) {
      input.push_back(source[i])
    }

    const text = QuickJSModule.QuickJSBinding.dumpWithBinary(input, new QuickJSModule.StringArray())
    console.log(String(text || ''))
  }

  static async dumpBytesToString(bytes: Uint8Array | Buffer): Promise<string> {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const input = new QuickJSModule.Uint8Array()
    for (let i = 0; i < bytes.length; i++) input.push_back(bytes[i])
    const text = QuickJSModule.QuickJSBinding.dumpWithBinary(input, new QuickJSModule.StringArray())
    return String(text || '')
  }

  static async getOpcodes() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const vec = QuickJSModule.QuickJSBinding.getOpcodes()
    const map: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const o = vec.get(i)
      map[o.name] = o.id
    }
    return map
  }

  static async getBytecodeVersion() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    return QuickJSModule.QuickJSBinding.getBytecodeVersion()
  }

  static async getFirstAtomId() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    return QuickJSModule.QuickJSBinding.getFirstAtomId()
  }

  static async getAllAtoms() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const vec = QuickJSModule.QuickJSBinding.getAtoms()
    const atoms: Atom[] = []
    for (let i = 0; i < vec.size(); i++) {
      const a = vec.get(i)
      atoms.push({ id: a.id, key: a.name })
    }
    return atoms
  }

  static async getAllOpcodeFormats() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const vec = QuickJSModule.QuickJSBinding.getOpcodeFormats()
    const formats: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const f = vec.get(i)
      formats[f.name] = f.id
    }
    return formats
  }

  static async getAllOpcodes() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const vec = QuickJSModule.QuickJSBinding.getOpcodes()
    const out: OpcodeMeta[] = []
    for (let i = 0; i < vec.size(); i++) {
      const o = vec.get(i)
      out.push({ name: o.name, code: o.id, nPop: o.nPop, nPush: o.nPush, fmt: o.fmt, size: o.size })
    }
    return out
  }

  static async getOpcodeOverrideMap(): Promise<Map<string, number>> {
    const list = await QuickJSLib.getAllOpcodes()
    return new Map(list.map(o => [o.name, o.code]))
  }

  static async getCompileOptions() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const options = QuickJSModule.QuickJSBinding.getCompileOptions()
    return options
  }

  static async compileSource(source: string, sourcePath: string = '<eval>', cwd?: string): Promise<Buffer> {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()

    const result = await QuickJSModule.QuickJSBinding.compile(
      source, 
      relative(cwd || process.cwd(), sourcePath), 
      new QuickJSModule.StringArray())

    const output: Buffer = Buffer.alloc(result.size())
    for (let i = 0; i < result.size(); i++) {
      output[i] = result.get(i)
    }
    
    return output
  }

  static async compileSourceWithPath(sourcePath: string, cwd?: string): Promise<Buffer> {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const source = readFileSync(sourcePath, 'utf-8')
    return this.compileSource(source, sourcePath, cwd)
  }
}