#!/usr/bin/env tsx
import { existsSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

type Options = {
  emsdk?: string
  buildType?: 'Release' | 'Debug'
  reinstall?: boolean
  verbose?: boolean
}

function run(
  cmd: string, 
  args: string[], 
  opts?: { cwd?: string, env?: NodeJS.ProcessEnv, shell?: boolean, verbose?: boolean }
) {
  const { cwd, env, shell, verbose } = opts || {}

  if (verbose) {
    console.log('$', cmd, args.join(' '), cwd ? `(cwd=${cwd})` : '')
  }
  
  const r = spawnSync(cmd, args, { 
    stdio: 'inherit', 
    cwd, 
    env: { ...process.env, ...env }, 
    shell 
  })

  if (r.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
  }
}

function runBash(
  script: string, 
  opts?: { cwd?: string, env?: NodeJS.ProcessEnv, verbose?: boolean }
) {
  const { cwd, env, verbose } = opts || {}

  if (verbose) {
    console.log('$ bash -lc', JSON.stringify(script), cwd ? `(cwd=${cwd})` : '')
  }

  const r = spawnSync('/bin/bash', ['-lc', script], { 
    stdio: 'inherit', 
    cwd, 
    env: { ...process.env, ...env } 
  })

  if (r.status !== 0) {
    throw new Error('Shell command failed')
  }
}

function which(bin: string): string | null {
  const r = spawnSync('which', [bin], { encoding: 'utf8' })

  if (r.status === 0) {
    return (r.stdout || '').trim() || null
  }

  return null
}

function parseArgs(): Options {
  const args = process.argv.slice(2)
  const opts: Options = { 
    buildType: 'Release', 
    reinstall: false, 
    verbose: false 
  }

  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--emsdk' && args[i+1]) { 
      opts.emsdk = resolve(args[++i]) 
    } else if (a === '--debug') { 
      opts.buildType = 'Debug' 
    } else if (a === '--release') { 
      opts.buildType = 'Release' 
    } else if (a === '--reinstall') { 
      opts.reinstall = true 
    } else if (a === '--verbose' || a === '-v') { 
      opts.verbose = true 
    }
  }

  return opts
}

function ensureEmsdk(opts: Options, repoRoot: string): { emsdkDir: string, envScript: string } {
  // Priority: provided --emsdk, then EMSDK env, else local third_party/emsdk install
  let emsdkDir = opts.emsdk || process.env.EMSDK || ''
  
  if (emsdkDir) {
    emsdkDir = resolve(emsdkDir)
    const envScript = join(emsdkDir, 'emsdk_env.sh')
    
    if (!existsSync(envScript)) {
      throw new Error(`emsdk_env.sh not found under ${emsdkDir}`)
    }
    
    return { emsdkDir, envScript }
  }

  // Detect existing emcc/emcmake in PATH
  const emcc = which('emcc')
  const emcmake = which('emcmake')

  if (emcc && emcmake) {
    // Try to infer emsdk root via emcc path
    // If not determinable, allow using PATH and source no script.
    const guessed = process.env.EMSDK || ''

    if (guessed && existsSync(join(guessed, 'emsdk_env.sh'))) {
      return { 
        emsdkDir: resolve(guessed), 
        envScript: join(resolve(guessed), 'emsdk_env.sh') 
      }
    }

    // PATH-based use without env script
    return { emsdkDir: '', envScript: '' }
  }

  // Install locally into third_party/emsdk
  const thirdParty = join(repoRoot, 'third_party')
  const localEmsdk = join(thirdParty, 'emsdk')
  
  if (!existsSync(thirdParty)) {
    mkdirSync(thirdParty, { recursive: true })
  }
  
  if (!existsSync(localEmsdk)) {
    console.log('Cloning emsdk into', localEmsdk)
    run('git', ['clone', 'https://github.com/emscripten-core/emsdk.git', localEmsdk], { verbose: opts.verbose })
  }
  
  const envScript = join(localEmsdk, 'emsdk_env.sh')
  console.log('Installing/activating latest emsdk ...')
  
  runBash('./emsdk install latest', { 
    cwd: localEmsdk, 
    verbose: opts.verbose 
  })
  
  runBash('./emsdk activate latest', { 
    cwd: localEmsdk, 
    verbose: opts.verbose 
  })

  return { 
    emsdkDir: localEmsdk, 
    envScript 
  }
}

function buildWasm(opts: Options) {
  const repoRoot = resolve(process.cwd())
  const wasmRoot = resolve(repoRoot, 'third_party/QuickJS/wasm')
  const buildDir = resolve(wasmRoot, 'build')
  const outJs = resolve(wasmRoot, 'output/quickjs_wasm.js')
  const outWasm = resolve(wasmRoot, 'output/quickjs_wasm.wasm')

  const { emsdkDir, envScript } = ensureEmsdk(opts, repoRoot)
  if (!existsSync(buildDir)) mkdirSync(buildDir, { recursive: true })

  const prefix = envScript ? `source ${envScript} && ` : ''
  // Configure
  runBash(`${prefix}emcmake cmake -S ${JSON.stringify(wasmRoot)} -B ${JSON.stringify(buildDir)} -DCMAKE_BUILD_TYPE=${opts.buildType}`, { cwd: repoRoot, verbose: opts.verbose })
  // Build
  runBash(`${prefix}cmake --build ${JSON.stringify(buildDir)} -j`, { cwd: repoRoot, verbose: opts.verbose })

  if (!existsSync(outJs) || !existsSync(outWasm)) {
    throw new Error(`Build completed but outputs not found: ${outJs} / ${outWasm}`)
  }

  console.log('WASM build outputs ready:')
  console.log(' -', outJs)
  console.log(' -', outWasm)
}

function main() {
  try {
    const opts = parseArgs()
    buildWasm(opts)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('Build failed:', msg)
    process.exit(1)
  }
}

if (require.main === module) main()
