import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

// 通过子进程执行 getEnv.ts，验证生成文件与基础结构
describe('scripts/getEnv', () => {
  const envPath = path.resolve(process.cwd(), 'src/env.ts')

  // 不再预删除 env.ts，避免与并行测试产生竞争；脚本会覆盖写入

  it('generates env.ts with enums and env object', async () => {
    // 动态执行脚本（直接通过 tsx）
    const { spawnSync } = await import('node:child_process')
    const r = spawnSync('pnpm', ['-s', 'exec', 'tsx', 'scripts/getEnv.ts'], { encoding: 'utf-8' })
    expect(r.status).toBe(0)
    expect(fs.existsSync(envPath)).toBe(true)

    const content = fs.readFileSync(envPath, 'utf-8')

    // 基本的片段检查，避免对具体数值强耦合
  expect(content).toContain('export enum CompileFlags')
    expect(content).toContain('export enum OpFormat')
    expect(content).toContain('export enum Opcode')
    expect(content).toContain('export enum JSAtom')
    expect(content).toMatch(/export const env = /)

  // 解析出 env 常量（用一种安全而宽松的方式）
  // 在独立沙箱中对对象字面量求值，避免污染全局
    const envMatch = content.match(/export const env = ([\s\S]*?) as const/)
    expect(envMatch).toBeTruthy()
    const jsonText = envMatch![1]
  const envObj = vm.runInNewContext(`(${jsonText})`, {}, { timeout: 1000 }) as any

    // 字段存在与类型检查
    expect(typeof envObj.bytecodeVersion).toBe('number')
    expect(typeof envObj.compileOptions).toBe('number')
    expect(typeof envObj.firstAtomId).toBe('number')
  })
})
