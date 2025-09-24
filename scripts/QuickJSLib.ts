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

interface BytecodeTag {
  id: number
  name: string
}

interface WasmInstance {
  runWithBinary: (input: Uint8Array, args: StringArray) => void
  dumpWithBinary: (input: Uint8Array, args: StringArray) => string
  compile: (source: string, sourcePath: string, args: StringArray) => Uint8Array
  getBytecodeVersion: () => number
  getFirstAtomId: () => number
  getAtoms: () => Atom[]
  getOpcodes: () => OpcodeMeta[]
  getBytecodeTags: () => BytecodeTag[]
  getCompileFlags: () => number
  getCompileEnums: () => Record<string, number>
}

export class QuickJSLib {
  // 使用 any 以避免对 Emscripten 模块结构的过度约束
  static WasmInstance: any | null = null

  static ensureWasmBuilt () {
    const path = resolve(process.cwd(), 'third_party/QuickJS/wasm/output/quickjs_wasm.js')
    if (existsSync(path)) return path

    const buildScript = resolve(process.cwd(), 'scripts/buildWasm.ts')
    const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
    
    if (r.status !== 0) return null
    return existsSync(path) ? path : null
  }

  static getWasmInstance = async (): Promise<any> => {
    if (QuickJSLib.WasmInstance) return QuickJSLib.WasmInstance

    const path = QuickJSLib.ensureWasmBuilt()
    if (!path) throw new Error('QuickJS wasm binding not available')

    const WasmModule: any = await import(path)
    QuickJSLib.WasmInstance = await WasmModule.default()
    return QuickJSLib.WasmInstance as WasmInstance
  }

  static async getQuickJSModule(): Promise<any> {
    return this.getWasmInstance()
  }

  static getCompileFlags = async (): Promise<number> => {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    return WasmInstance.QuickJSBinding.getCompileOptions()
  }

  static getCompileFlagEnums = async (): Promise<Record<string, number>> => {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const enums: Record<string, number> = {}

    enums['COMPILE_FLAG_NONE'] = WasmInstance.CompileFlags.COMPILE_FLAG_NONE.value
    enums['COMPILE_FLAG_DUMP'] = WasmInstance.CompileFlags.COMPILE_FLAG_DUMP.value
    enums['COMPILE_FLAG_BIGNUM'] = WasmInstance.CompileFlags.COMPILE_FLAG_BIGNUM.value
    enums['COMPILE_SHORT_OPCODES'] = WasmInstance.CompileFlags.COMPILE_FLAG_SHORT_OPCODES.value

    return enums
  }

  static async runWithBinaryPath(binaryPath: string) {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const source = readFileSync(binaryPath)

    const input = new WasmInstance.Uint8Array()
    for (let i = 0; i < source.length; i++) {
      input.push_back(source[i])
    }

    WasmInstance.QuickJSBinding.runWithBinary(input, new WasmInstance.StringArray())
  }

  static async dumpWithBinaryPath(binaryPath: string) {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const source = readFileSync(binaryPath)

    const input = new WasmInstance.Uint8Array()
    for (let i = 0; i < source.length; i++) {
      input.push_back(source[i])
    }

    const text = WasmInstance.QuickJSBinding.dumpWithBinary(input, new WasmInstance.StringArray())
    console.log(String(text || ''))
  }

  static async dumpBytesToString(bytes: Uint8Array | Buffer): Promise<string> {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const input = new WasmInstance.Uint8Array()
    for (let i = 0; i < bytes.length; i++) input.push_back(bytes[i])
    const text = WasmInstance.QuickJSBinding.dumpWithBinary(input, new WasmInstance.StringArray())
    return String(text || '')
  }

  static async getCompileEnums(): Promise<Record<string, number>> {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const enums: Record<string, number> = {}

    enums['COMPILE_FLAG_NONE'] = WasmInstance.QuickJSBinding.CompileFlags.COMPILE_FLAG_NONE
    enums['COMPILE_FLAG_DUMP'] = WasmInstance.QuickJSBinding.CompileFlags.COMPILE_FLAG_DUMP
    enums['COMPILE_FLAG_BIGNUM'] = WasmInstance.QuickJSBinding.CompileFlags.COMPILE_FLAG_BIGNUM
    enums['COMPILE_FLAG_SHORT_OPCODES'] = WasmInstance.QuickJSBinding.CompileFlags.COMPILE_FLAG_SHORT_OPCODES

    return enums
  }

  static async getOpcodes() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getOpcodes()
    const map: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const o = vec.get(i)
      map[o.name] = o.id
    }
    return map
  }

  static async getJSModes() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getJSModes()
    const map: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const m = vec.get(i)
      map[m.name] = m.id
    }
    return map
  }

  static async getFunctionKinds() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getFunctionKinds()
    const map: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const t = vec.get(i)
      map[t.name] = t.id
    }
    return map
  }

  static async getBytecodeTags() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getBytecodeTags()
    const map: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const t = vec.get(i)
      map[t.name] = t.id
    }
    return map
  }

  static async getBytecodeVersion() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    return WasmInstance.QuickJSBinding.getBytecodeVersion()
  }

  static async getFirstAtomId(): Promise<number> {
    const WasmInstance = await this.getWasmInstance();
    return WasmInstance.QuickJSBinding.getFirstAtomId();
  }

  static async getOpcodeName(opcode: number): Promise<string> {
    const WasmInstance = await this.getWasmInstance();
    return WasmInstance.QuickJSBinding.getOpcodeName(opcode);
  }

  static async getAllAtoms() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getAtoms()
    const atoms: Atom[] = []
    for (let i = 0; i < vec.size(); i++) {
      const a = vec.get(i)
      atoms.push({ id: a.id, key: a.name })
    }
    return atoms
  }

  static async getAllBytecodeTags() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getBytecodeTags()
    const tags: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const t = vec.get(i)
      tags[t.name] = t.id
    }
    return tags
  }

  static async getAllOpcodeFormats() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getOpcodeFormats()
    const formats: Record<string, number> = {}
    for (let i = 0; i < vec.size(); i++) {
      const f = vec.get(i)
      formats[f.name] = f.id
    }
    return formats
  }

  static async getAllOpcodes() {
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const vec = WasmInstance.QuickJSBinding.getOpcodes()
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
    const WasmInstance = await QuickJSLib.getWasmInstance()
    const options = WasmInstance.QuickJSBinding.getCompileOptions()
    return options
  }

  static async compileSource(source: string, sourcePath: string = '<eval>', cwd?: string): Promise<Buffer> {
    const WasmInstance = await QuickJSLib.getWasmInstance()

    const result = await WasmInstance.QuickJSBinding.compile(
      source, 
      relative(cwd || process.cwd(), sourcePath), 
      new WasmInstance.StringArray())

    const output: Buffer = Buffer.alloc(result.size())
    for (let i = 0; i < result.size(); i++) {
      output[i] = result.get(i)
    }
    
    return output
  }

  static async compileSourceWithPath(sourcePath: string, cwd?: string): Promise<Buffer> {
    const source = readFileSync(sourcePath, 'utf-8')
    return this.compileSource(source, sourcePath, cwd)
  }
}