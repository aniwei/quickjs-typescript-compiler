import { readFile } from 'node:fs/promises'
import path from 'node:path'

interface Instruction {
  offset: number
  opcodeName: string
  operand?: any
}

interface FunctionNode {
  name?: { name?: string } | null
  instructions?: Instruction[]
  constantPool?: Array<{ tag: string; value?: FunctionNode }>
}

async function loadJson(filePath: string) {
  const abs = path.resolve(filePath)
  const text = await readFile(abs, 'utf-8')
  return JSON.parse(text)
}

interface CollectedFunction {
  label: string
  node: FunctionNode
}

function collectFunctions(node: FunctionNode | undefined, parentLabel: string, out: CollectedFunction[]) {
  if (!node)
    return
  const name = typeof node.name === 'object' && node.name ? node.name.name ?? null : null
  const label = parentLabel ? `${parentLabel}/${name ?? '<anonymous>'}` : name ?? '<anonymous>'
  out.push({ label, node })
  const constantPool = node.constantPool ?? []
  for (const entry of constantPool) {
    if (entry.tag === 'TC_TAG_FUNCTION_BYTECODE') {
      collectFunctions(entry.value, label, out)
    }
  }
}

function formatInstruction(inst: Instruction): string {
  const op = inst.opcodeName?.replace(/^OP_/, '') ?? '<unknown>'
  if (inst.operand === undefined)
    return `${inst.offset.toString().padStart(4, '0')}: ${op}`
  if (typeof inst.operand === 'object' && inst.operand !== null) {
    if ('name' in inst.operand)
      return `${inst.offset.toString().padStart(4, '0')}: ${op} ${inst.operand.name}`
    if ('value' in inst.operand)
      return `${inst.offset.toString().padStart(4, '0')}: ${op} ${inst.operand.value}`
  }
  return `${inst.offset.toString().padStart(4, '0')}: ${op} ${inst.operand}`
}

async function main() {
  const [ , , jsonPath, filter ] = process.argv
  if (!jsonPath) {
    console.error('Usage: tsx tmp/inspectWasmJson.ts <module.json> [filter]')
    process.exit(1)
  }
  const data = await loadJson(jsonPath)
  const rootFunc: FunctionNode | undefined = data?.root?.function
  if (!rootFunc) {
    console.error('No root.function found in JSON')
    process.exit(1)
  }

  const collected: CollectedFunction[] = []
  collectFunctions(rootFunc, '', collected)

  const needle = filter?.toLowerCase()
  const target = needle
    ? collected.filter(entry => entry.label.toLowerCase().includes(needle))
    : collected

  if (target.length === 0) {
    console.error(`No functions match filter "${filter}"`)
    process.exit(1)
  }

  for (const entry of target) {
    console.log(`\nFunction: ${entry.label}`)
    const instrs = entry.node.instructions ?? []
    for (const inst of instrs) {
      console.log(formatInstruction(inst))
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
