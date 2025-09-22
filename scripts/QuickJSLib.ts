import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, relative, basename } from 'node:path'

export class QuickJSLib {
  static QuickJSModule: unknown = null

  static ensureWasmBuilt () {
    const path = resolve(process.cwd(), 'third_party/QuickJS/wasm/output/quickjs_wasm.js')
    if (existsSync(path)) return path

    const buildScript = resolve(process.cwd(), 'scripts/buildWasm.ts')
    const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
    
    if (r.status !== 0) return null
    return existsSync(path) ? path : null
  }

  static getQuickJSModule = async () => {
    if (QuickJSLib.QuickJSModule) return QuickJSLib.QuickJSModule

    const path = QuickJSLib.ensureWasmBuilt()
    if (!path) throw new Error('QuickJS wasm binding not available')

    const WasmModule = await import(path)
    QuickJSLib.QuickJSModule = await WasmModule.default()
    return QuickJSLib.QuickJSModule as any
  }

  static async runWithBinaryPath(binaryPath: string) {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const source = readFileSync(binaryPath)

    const input = new QuickJSModule.Uint8Array()
    for (let i = 0; i < source.length; i++) {
      input.push_back(source[i])
    }

    QuickJSModule.QuickJSLib.runWithBinary(input, new QuickJSModule.StringArray())
  }

  static async dumpWithBinaryPath(binaryPath: string) {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const source = readFileSync(binaryPath)

    const input = new QuickJSModule.Uint8Array()
    for (let i = 0; i < source.length; i++) {
      input.push_back(source[i])
    }

    const text = QuickJSModule.QuickJSLib.dumpWithBinary(input, new QuickJSModule.StringArray())
    console.log(String(text || ''))
  }

  static async dumpBytesToString(bytes: Uint8Array | Buffer): Promise<string> {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const input = new QuickJSModule.Uint8Array()
    for (let i = 0; i < bytes.length; i++) input.push_back(bytes[i])
    const text = QuickJSModule.QuickJSLib.dumpWithBinary(input, new QuickJSModule.StringArray())
    return String(text || '')
  }

  static async getOpcodes() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const opcodesMap = QuickJSModule.QuickJSLib.getAllOpCodes()
    const opcodes: Record<string, number> = {}
    const keys = opcodesMap.keys()
    for (let i = 0; i < keys.size(); i++) {
      const key = keys.get(i)
      opcodes[key] = opcodesMap.get(key)
    }
    return opcodes
  }

  static async getBytecodeVersion() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    return QuickJSModule.QuickJSLib.getBytecodeVersion()
  }

  static async getFirstAtomId() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    return QuickJSModule.QuickJSLib.getFirstAtomId()
  }

  static async getConfig() {
    const QuickJSModule = await QuickJSLib.getQuickJSModule()
    const config = QuickJSModule.QuickJSLib.getConfig()
    return {
      bignum: config.get('bignum')
    }
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