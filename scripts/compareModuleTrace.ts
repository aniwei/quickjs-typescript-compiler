import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import * as ts from 'typescript'
import { TypeScriptCompiler } from '../src'
import { QuickJSLib } from './QuickJSLib'

export type TraceCompareOptions = {
  inputTs: string
  artifactsDir: string
}

export type TraceCompareResult = {
  tsTracePath: string
  wasmTracePath: string
  summaryPath: string
  tsEventCount: number
  wasmEventCount: number
  differenceCount: number
  firstDifferenceIndex: number | null
}

function isProbablyText(buf: Buffer): boolean {
  // Heuristic: treat as text if no NUL bytes.
  const nulIndex = buf.indexOf(0)
  return nulIndex === -1
}

async function readMaybeTextFile(filePath: string): Promise<string | null> {
  const buf = await fs.readFile(filePath)
  if (!isProbablyText(buf)) return null
  return buf.toString('utf8')
}

function normalizeJavaScriptSource(code: string): string {
  return code.replace(/\r\n/g, '\n')
}

function basicStripTypeScript(tsCode: string): string {
  // Extremely conservative fallback: remove type-only constructs that commonly appear
  // in fixtures without attempting full TS parsing.
  // Keep runtime JS intact.
  return tsCode
    .replace(/\binterface\s+\w+[\s\S]*?\n\}/g, '')
    .replace(/\btype\s+\w+\s*=\s*[\s\S]*?;/g, '')
}

function stripTypeScript(tsCode: string, fileName?: string): string {
  try {
    const transpiled = ts.transpileModule(tsCode, {
      fileName,
      reportDiagnostics: true,
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.Preserve,
        importHelpers: false,
        esModuleInterop: false,
      },
    })

    const hasSyntaxError = (transpiled.diagnostics ?? []).some(
      (d) => d.category === ts.DiagnosticCategory.Error && typeof d.code === 'number' && d.code < 2000,
    )

    if (hasSyntaxError) {
      return basicStripTypeScript(tsCode)
    }

    return normalizeJavaScriptSource(transpiled.outputText)
  } catch {
    return basicStripTypeScript(tsCode)
  }
}

async function resolveReferenceJavaScript(inputTs: string): Promise<{ code: string; path: string }> {
  const inferredJsPath = inputTs.replace(/\.ts$/i, '.js')
  try {
    await fs.access(inferredJsPath)
    const maybeJs = await readMaybeTextFile(inferredJsPath)
    if (maybeJs !== null) {
      return { code: normalizeJavaScriptSource(maybeJs), path: inferredJsPath }
    }
  } catch {
    // fall through
  }

  const tsCode = await fs.readFile(inputTs, 'utf8')
  return { code: stripTypeScript(tsCode, inputTs), path: inferredJsPath }
}

function detectIsModule(code: string, fileName: string): boolean {
  const kind = /\.jsx?$/i.test(fileName) ? ts.ScriptKind.JS : ts.ScriptKind.TS
  const sf = ts.createSourceFile(fileName, code, ts.ScriptTarget.ESNext, true, kind)
  return (sf as any).externalModuleIndicator != null
}

function extractQtsLines(
  lines: string[],
  options?: {
    onlyCategories?: ReadonlySet<string>
  },
): string[] {
  const onlyCategories = options?.onlyCategories
  return lines
    .map((l) => String(l ?? '').trimEnd())
    .filter((l) => l.startsWith('[QTS]') || l.startsWith('[QTS:'))
    .filter((l) => {
      if (!onlyCategories) return true
      const m = /^\[QTS:([^\]]+)\]/.exec(l)
      if (!m) return false
      return onlyCategories.has(m[1])
    })
}

function diffLineByLine(a: string[], b: string[]): { count: number; first: number | null } {
  const max = Math.max(a.length, b.length)
  let count = 0
  let first: number | null = null
  for (let i = 0; i < max; i++) {
    const la = a[i] ?? ''
    const lb = b[i] ?? ''
    if (la !== lb) {
      count += 1
      if (first === null) first = i
    }
  }
  return { count, first }
}

function captureWasmTraceInSubprocess(params: {
  jsCodePath: string
  sourcePath: string
  isModule: boolean
}): string[] {
  const scriptPath = path.resolve(process.cwd(), 'scripts/captureWasmTrace.ts')

  const r = spawnSync(
    'npx',
    [
      'tsx',
      scriptPath,
      '--input',
      params.jsCodePath,
      '--source-path',
      params.sourcePath,
      '--is-module',
      params.isModule ? '1' : '0',
    ],
    {
      cwd: process.cwd(),
      env: process.env,
      encoding: 'utf8',
      stdio: ['ignore', 'ignore', 'pipe'],
    },
  )

  const stderrText = String(r.stderr ?? '')
  const stderrLines = stderrText.split('\n').map((l) => l.trimEnd())

  if (r.status !== 0) {
    const msg = stderrLines.filter(Boolean).slice(-30).join('\n')
    throw new Error(`WASM trace subprocess failed (exit=${r.status}).\n${msg}`)
  }

  return stderrLines
}

async function captureStderr<T>(fn: () => Promise<T> | T): Promise<{ result: T; stderr: string[] }> {
  const captured: string[] = []
  const origWrite = process.stderr.write.bind(process.stderr)

  ;(process.stderr as any).write = (chunk: any, encoding?: any, cb?: any) => {
    const text = typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8')
    for (const line of text.split('\n')) {
      if (line.length) captured.push(line)
    }
    if (typeof cb === 'function') cb()
    return true
  }

  try {
    const result = await fn()
    return { result, stderr: captured }
  } finally {
    ;(process.stderr as any).write = origWrite
  }
}

export async function compareModuleTrace(options: TraceCompareOptions): Promise<TraceCompareResult> {
  const artifactsDir = options.artifactsDir
  await fs.mkdir(artifactsDir, { recursive: true })

  const reference = await resolveReferenceJavaScript(options.inputTs)
  const isModule = detectIsModule(reference.code, reference.path)

  // Write a stable JS snapshot for the subprocess.
  const referenceJsForWasmTrace = path.join(artifactsDir, 'reference.for-wasm-trace.js')
  await fs.writeFile(referenceJsForWasmTrace, reference.code, 'utf8')

  // TS side trace
  const tsOut = await captureStderr(async () => {
    let firstAtomId: number | undefined
    try {
      firstAtomId = await QuickJSLib.getFirstAtomId()
    } catch {}

    const compiler = new TypeScriptCompiler({
      bigInt: false,
      dump: false,
      shortCode: true,
      debug: false,
      strictMode: false,
      module: true,
      firstAtomId,
      referenceJsSource: reference.code,
      forceModule: isModule,
    } as any)

    const filename = path.relative(process.cwd(), reference.path)
    await compiler.compile(reference.code, filename)
  })

  // WASM side trace
  const wasmStderrLines = captureWasmTraceInSubprocess({
    jsCodePath: referenceJsForWasmTrace,
    sourcePath: reference.path,
    isModule,
  })

  const comparableCategories = new Set(['EMIT', 'PC2LINE'])
  const tsTrace = extractQtsLines(tsOut.stderr, { onlyCategories: comparableCategories })
  const wasmTrace = extractQtsLines(wasmStderrLines, { onlyCategories: comparableCategories })

  const tsTracePath = path.join(artifactsDir, 'ts.trace.log')
  const wasmTracePath = path.join(artifactsDir, 'wasm.trace.log')
  await fs.writeFile(tsTracePath, tsTrace.join('\n') + (tsTrace.length ? '\n' : ''), 'utf8')
  await fs.writeFile(wasmTracePath, wasmTrace.join('\n') + (wasmTrace.length ? '\n' : ''), 'utf8')

  const { count, first } = diffLineByLine(tsTrace, wasmTrace)

  const summary = {
    inputTs: options.inputTs,
    referenceJsPath: reference.path,
    isModule,
    tsEventCount: tsTrace.length,
    wasmEventCount: wasmTrace.length,
    differenceCount: count,
    firstDifferenceIndex: first,
  }

  const summaryPath = path.join(artifactsDir, 'trace.summary.json')
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf8')

  return {
    tsTracePath,
    wasmTracePath,
    summaryPath,
    tsEventCount: tsTrace.length,
    wasmEventCount: wasmTrace.length,
    differenceCount: count,
    firstDifferenceIndex: first,
  }
}
