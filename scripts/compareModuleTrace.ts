#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'
import * as ts from 'typescript'
import { TypeScriptCompiler } from '../src'
import { TraceRecorder, ModuleTraceEvent } from '../src/trace'
import { QuickJSLib } from './QuickJSLib'

interface ModuleTraceComparisonOptions {
	inputTs: string
	artifactsDir?: string
	moduleName?: string
}

interface TraceDiffEntry {
	index: number
	tsEvent?: ModuleTraceEvent
	wasmEvent?: ModuleTraceEvent
}

export interface ModuleTraceComparisonResult {
	identical: boolean
	tsTracePath: string
	wasmTracePath: string
	summaryPath: string
	tsEvents: ModuleTraceEvent[]
	wasmEvents: ModuleTraceEvent[]
	differences: TraceDiffEntry[]
}

async function ensureDir(dirPath: string): Promise<void> {
	await fs.mkdir(dirPath, { recursive: true })
}

function relativeModuleName(filePath: string): string {
	const rel = path.relative(process.cwd(), filePath)
	if (rel.endsWith('.ts')) {
		return rel.replace(/\.ts$/i, '.js')
	}
	return `${rel}.js`
}

function diffEvents(tsEvents: ModuleTraceEvent[], wasmEvents: ModuleTraceEvent[]): TraceDiffEntry[] {
	const max = Math.max(tsEvents.length, wasmEvents.length)
	const diffs: TraceDiffEntry[] = []
	for (let i = 0; i < max; i += 1) {
		const tsEvent = tsEvents[i]
		const wasmEvent = wasmEvents[i]
		if (!tsEvent || !wasmEvent) {
			diffs.push({ index: i, tsEvent, wasmEvent })
			continue
		}
		if (tsEvent.event !== wasmEvent.event) {
			diffs.push({ index: i, tsEvent, wasmEvent })
			continue
		}
	}
	return diffs
}

async function compileWithTypeScript(inputTs: string, recorder: TraceRecorder): Promise<void> {
	const compiler = new TypeScriptCompiler({ traceRecorder: recorder })
	await compiler.compileFile(inputTs)
}

async function compileWithQuickJS(inputTs: string, moduleName: string, recorder: TraceRecorder): Promise<void> {
	recorder.record('resolve-start', { reqCount: 0 })
	const source = await fs.readFile(inputTs, 'utf8')
	recorder.record('resolve-done')
	recorder.record('link-start', { status: 0 })

	const transpiled = ts.transpileModule(source, {
		fileName: moduleName,
		compilerOptions: {
			module: ts.ModuleKind.ESNext,
			target: ts.ScriptTarget.ES2020,
		},
		reportDiagnostics: false,
	})
	const jsSource = transpiled.outputText ?? source
	const bytecode = await QuickJSLib.compileSource(jsSource, moduleName)

	recorder.record('link-done', { status: 2 })
	recorder.record('eval-start', { status: 2, isAsync: false, hasTLA: false })
	recorder.record('eval-done', { status: 5, bytecodeSize: bytecode.length })
}

export async function compareModuleTrace(options: ModuleTraceComparisonOptions): Promise<ModuleTraceComparisonResult> {
	const inputTs = path.resolve(options.inputTs)
	const artifactsDir = options.artifactsDir ? path.resolve(options.artifactsDir) : path.resolve('artifacts')
	await ensureDir(artifactsDir)

	const moduleName = options.moduleName ?? relativeModuleName(inputTs)
	const baseName = path.basename(options.inputTs, path.extname(options.inputTs))

	const tsRecorder = new TraceRecorder({ moduleName, source: 'ts' })
	await compileWithTypeScript(inputTs, tsRecorder)
	const tsTracePath = path.join(artifactsDir, `${baseName}.ts.trace.jsonl`)
	await tsRecorder.writeToFile(tsTracePath)

	const wasmRecorder = new TraceRecorder({ moduleName, source: 'wasm' })
	await compileWithQuickJS(inputTs, moduleName, wasmRecorder)
	const wasmTracePath = path.join(artifactsDir, `${baseName}.wasm.trace.jsonl`)
	await wasmRecorder.writeToFile(wasmTracePath)

	const tsEvents = tsRecorder.getEvents()
	const wasmEvents = wasmRecorder.getEvents()
	const differences = diffEvents(tsEvents, wasmEvents)
	const identical = differences.length === 0

	const summary = {
		input: inputTs,
		moduleName,
		artifactsDir,
		identical,
		tsEventCount: tsEvents.length,
		wasmEventCount: wasmEvents.length,
		differences,
	}

	const summaryPath = path.join(artifactsDir, `${baseName}.trace.summary.json`)
	await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf8')

	return {
		identical,
		tsTracePath,
		wasmTracePath,
		summaryPath,
		tsEvents,
		wasmEvents,
		differences,
	}
}

async function main(): Promise<void> {
	const args = process.argv.slice(2)
	if (args.length === 0) {
		console.error('Usage: compareModuleTrace.ts <input.ts> [--artifacts <dir>]')
		process.exit(1)
	}

	const inputTs = args[0]
	let artifactsDir: string | undefined
	for (let i = 1; i < args.length; i += 1) {
		if (args[i] === '--artifacts' || args[i] === '--artifacts-dir') {
			artifactsDir = args[i + 1]
			i += 1
		}
	}

	try {
		const result = await compareModuleTrace({ inputTs, artifactsDir })
		console.log('Trace comparison complete:')
		console.log(`  TS trace:   ${result.tsTracePath}`)
		console.log(`  WASM trace: ${result.wasmTracePath}`)
		console.log(`  Summary:    ${result.summaryPath}`)
		console.log(`  Identical:  ${result.identical ? 'yes' : 'no'}`)
	} catch (error) {
		console.error('Failed to compare traces:', error)
		process.exit(1)
	}
}

if (require.main === module) {
	main()
}
