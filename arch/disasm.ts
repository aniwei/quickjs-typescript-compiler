import {
  parseBytecodeModule,
  type AtomRef,
  type ParsedClosureVar,
  type ParsedFunction,
  type ParsedInstruction,
  type ParsedModuleObject,
  type ParsedTaggedValue,
  type ParsedVarDef,
} from './bytecodeReader'
import { OpFormat, type OpcodeDefinition } from './env'
import { getOpcodeDefinition } from './utils/opcode'

const INDENT = '  '

type PendingRender =
  | { type: 'function'; source: string; func: ParsedFunction }
  | { type: 'module'; source: string; module: ParsedModuleObject }

interface RenderContext {
  lines: string[]
  nextFunctionIndex: number
}

export function createAdvancedDisassembly(bytecode: Uint8Array): string {
  try {
    const module = parseBytecodeModule(bytecode)
    const ctx: RenderContext = {
      lines: [],
      nextFunctionIndex: 0,
    }

    ctx.lines.push(`bytecode_version: ${module.version}`)
    if (module.atoms.length > 0) {
      ctx.lines.push(`atoms (${module.atoms.length}):`)
      module.atoms.forEach((atom, index) => {
        const atomValue = JSON.stringify(truncateString(atom.value, 80))
        ctx.lines.push(`${indent(1)}[${index}] @${atom.id} = ${atomValue}`)
      })
    } else {
      ctx.lines.push('atoms (0)')
    }

    ensureBlankLine(ctx.lines)
    renderModuleObject(module.root, ctx, 0)

    return ctx.lines.join('\n')
  } catch (error) {
    return buildFallbackDisassembly(bytecode, error)
  }
}

function renderModuleObject(moduleObj: ParsedModuleObject, ctx: RenderContext, indentLevel: number, origin?: string) {
  const moduleName = JSON.stringify(formatAtomRef(moduleObj.moduleName))
  const suffix = origin ? ` (${origin})` : ''
  ctx.lines.push(`${indent(indentLevel)}module ${moduleName}${suffix}`)

  if (moduleObj.requireEntries.length > 0) {
    ctx.lines.push(`${indent(indentLevel + 1)}requires (${moduleObj.requireEntries.length}):`)
    moduleObj.requireEntries.forEach((entry, index) => {
      const attrs = summarizeTaggedValueSimple(entry.attributes)
      ctx.lines.push(
        `${indent(indentLevel + 2)}[${index}] module=${formatAtomRef(entry.module)} attributes=${attrs}`
      )
    })
  }

  if (moduleObj.importEntries.length > 0) {
    ctx.lines.push(`${indent(indentLevel + 1)}imports (${moduleObj.importEntries.length}):`)
    moduleObj.importEntries.forEach((entry, index) => {
      const star = entry.isStar ? ' (star)' : ''
      ctx.lines.push(
        `${indent(indentLevel + 2)}[${index}] var=${entry.varIndex} name=${formatAtomRef(entry.importName)} from require[${entry.reqModuleIndex}]${star}`
      )
    })
  }

  if (moduleObj.exportEntries.length > 0) {
    ctx.lines.push(`${indent(indentLevel + 1)}exports (${moduleObj.exportEntries.length}):`)
    moduleObj.exportEntries.forEach((entry, index) => {
      if (entry.type === 'local') {
        ctx.lines.push(
          `${indent(indentLevel + 2)}[${index}] local ${formatAtomRef(entry.exportedName)} -> local#${entry.localVarIndex}`
        )
      } else {
        ctx.lines.push(
          `${indent(indentLevel + 2)}[${index}] re-export ${formatAtomRef(entry.localName)} as ${formatAtomRef(entry.exportedName)} from require[${entry.reqModuleIndex}]`
        )
      }
    })
  }

  if (moduleObj.starExportEntries.length > 0) {
    ctx.lines.push(`${indent(indentLevel + 1)}star_exports (${moduleObj.starExportEntries.length}):`)
    moduleObj.starExportEntries.forEach((entry, index) => {
      ctx.lines.push(`${indent(indentLevel + 2)}[${index}] require[${entry.reqModuleIndex}]`)
    })
  }

  if (moduleObj.hasTopLevelAwait) {
    ctx.lines.push(`${indent(indentLevel + 1)}has_top_level_await: true`)
  }

  ensureBlankLine(ctx.lines)
  renderFunction(moduleObj.function, ctx, indentLevel + 1, 'module body')
}

function renderFunction(func: ParsedFunction, ctx: RenderContext, indentLevel: number, origin?: string) {
  const fnIndex = ctx.nextFunctionIndex++
  const headerParts = [`function[${fnIndex}]`, formatFunctionName(func)]
  if (origin) {
    headerParts.push(`(${origin})`)
  }
  const kindName = func.flags.funcKind.name ?? `kind#${func.flags.funcKind.value}`
  headerParts.push(`kind=${kindName}`)
  const flagList = collectFunctionFlags(func)
  if (flagList.length > 0) {
    headerParts.push(`flags=[${flagList.join(', ')}]`)
  }
  ctx.lines.push(`${indent(indentLevel)}${headerParts.join(' ')}`)

  const indent1 = indent(indentLevel + 1)
  ctx.lines.push(`${indent1}mode: ${formatMode(func)}`)
  ctx.lines.push(`${indent1}stack_size: ${func.stackSize}`)
  ctx.lines.push(
    `${indent1}args: total=${func.argCount}, defined=${func.definedArgCount}, vars=${func.varCount}, closures=${func.closureVarCount}`
  )

  if (func.varDefs.length > 0) {
    ctx.lines.push(`${indent1}locals (${func.varDefs.length}):`)
    func.varDefs.forEach((local, index) => {
      ctx.lines.push(
        `${indent(indentLevel + 2)}[${index}] ${formatAtomRef(local.name)} kind=${local.kind.name ?? `kind#${local.kind.value}`} level=${local.scopeLevel} next=${
          local.scopeNext >= 0 ? local.scopeNext : 'null'
        }${formatVarFlags(local)}`
      )
    })
  }

  if (func.closureVars.length > 0) {
    ctx.lines.push(`${indent1}closure_vars (${func.closureVars.length}):`)
    func.closureVars.forEach((cv, index) => {
      ctx.lines.push(
        `${indent(indentLevel + 2)}[${index}] ${formatAtomRef(cv.name)} -> var#${cv.varIndex}${formatClosureFlags(cv)}`
      )
    })
  }

  const { summaries: constSummaries, pending } = renderConstantPoolSection(func, ctx, indentLevel + 1)

  if (func.debug) {
    ensureBlankLine(ctx.lines)
    renderDebugInfo(func, ctx, indentLevel + 1)
  }

  if (func.instructions.length > 0) {
    ensureBlankLine(ctx.lines)
    renderInstructions(func, ctx, indentLevel + 1, constSummaries)
  }

  for (const item of pending) {
    ensureBlankLine(ctx.lines)
    if (item.type === 'function') {
      renderFunction(item.func, ctx, indentLevel + 1, item.source)
    } else {
      renderModuleObject(item.module, ctx, indentLevel + 1, item.source)
    }
  }
}

function renderConstantPoolSection(
  func: ParsedFunction,
  ctx: RenderContext,
  indentLevel: number
): { summaries: Map<number, string>; pending: PendingRender[] } {
  const summaries = new Map<number, string>()
  const pending: PendingRender[] = []

  if (func.constantPool.length === 0) {
    return { summaries, pending }
  }

  ctx.lines.push(`${indent(indentLevel)}constant_pool (${func.constantPool.length}):`)
  func.constantPool.forEach((entry, index) => {
    const label = `const[${index}]`
    const { display, summary } = summarizeConstantEntry(entry, label, pending)
    ctx.lines.push(`${indent(indentLevel + 1)}[${index}] ${display}`)
    summaries.set(index, summary)
  })

  return { summaries, pending }
}

function renderDebugInfo(func: ParsedFunction, ctx: RenderContext, indentLevel: number) {
  const debug = func.debug
  if (!debug) {
    return
  }

  ctx.lines.push(`${indent(indentLevel)}debug:`)
  ctx.lines.push(`${indent(indentLevel + 1)}filename: ${formatAtomRef(debug.filename)}`)
  ctx.lines.push(`${indent(indentLevel + 1)}pc2line_bytes: ${debug.pc2line.length}`)
  ctx.lines.push(`${indent(indentLevel + 1)}source_length: ${debug.sourceLength}`)

  if (debug.source && debug.source.length > 0) {
    ctx.lines.push(
      `${indent(indentLevel + 1)}source_preview: ${JSON.stringify(truncateString(debug.source, 120))}`
    )
  }
}

function renderInstructions(
  func: ParsedFunction,
  ctx: RenderContext,
  indentLevel: number,
  constSummaries: Map<number, string>
) {
  ctx.lines.push(`${indent(indentLevel)}opcodes (${func.instructions.length}):`)
  func.instructions.forEach((instruction) => {
    const def = getOpcodeDefinition(instruction.opcode)
    const operandText = formatOperand(instruction, def, func, constSummaries)
    const opcodeName = instruction.opcodeName.startsWith('OP_')
      ? instruction.opcodeName.slice(3)
      : instruction.opcodeName
    const line = `${indent(indentLevel + 1)}${instruction.offset
      .toString()
      .padStart(4, '0')}: ${opcodeName}`
    ctx.lines.push(operandText ? `${line} ${operandText}` : line)
  })
}

function formatOperand(
  instruction: ParsedInstruction,
  def: OpcodeDefinition | undefined,
  func: ParsedFunction,
  constSummaries: Map<number, string>
): string | undefined {
  const operand = instruction.operand
  if (operand === undefined || operand === null) {
    return undefined
  }

  if (!def) {
    return formatGenericOperand(operand)
  }

  switch (def.format) {
    case OpFormat.const:
    case OpFormat.const8: {
      if (typeof operand === 'number') {
        const summary = constSummaries.get(operand)
        return `const[${operand}]${summary ? ` ${summary}` : ''}`
      }
      return formatGenericOperand(operand)
    }
    case OpFormat.loc:
    case OpFormat.loc8: {
      if (typeof operand === 'number') {
        const local = func.varDefs[operand]
        const name = local ? ` ${formatAtomRef(local.name)}` : ''
        return `local[${operand}]${name}`
      }
      return formatGenericOperand(operand)
    }
    case OpFormat.var_ref: {
      if (typeof operand === 'number') {
        const closure = func.closureVars[operand]
        const suffix = closure ? ` ${formatAtomRef(closure.name)}` : ''
        return `var_ref[${operand}]${suffix}`
      }
      return formatGenericOperand(operand)
    }
    case OpFormat.arg: {
      if (typeof operand === 'number') {
        return `arg[${operand}]`
      }
      return formatGenericOperand(operand)
    }
    case OpFormat.atom:
      return formatAtomOperand(operand as AtomRef)
    case OpFormat.atom_u8: {
      const value = operand as { atom: AtomRef; value: number }
      return `${formatAtomOperand(value.atom)}, ${value.value}`
    }
    case OpFormat.atom_u16: {
      const value = operand as { atom: AtomRef; value: number }
      return `${formatAtomOperand(value.atom)}, ${value.value}`
    }
    case OpFormat.atom_label_u8: {
      const value = operand as { atom: AtomRef; label: number; delta: number }
      return `${formatAtomOperand(value.atom)}, label=${value.label}, delta=${value.delta}`
    }
    case OpFormat.atom_label_u16: {
      const value = operand as { atom: AtomRef; label: number; value: number }
      return `${formatAtomOperand(value.atom)}, label=${value.label}, value=${value.value}`
    }
    case OpFormat.label_u16: {
      const value = operand as { label: number; value: number }
      return `label=${value.label}, value=${value.value}`
    }
    case OpFormat.label8:
    case OpFormat.label16:
    case OpFormat.label: {
      if (typeof operand === 'number') {
        const delta = operand
        const base = getJumpBaseOffset(def)
        const target = instruction.offset + base + delta
        const sign = delta >= 0 ? '+' : ''
        return `${sign}${delta} -> ${target}`
      }
      return formatGenericOperand(operand)
    }
    default:
      return formatGenericOperand(operand)
  }
}

function summarizeConstantEntry(
  entry: ParsedTaggedValue,
  label: string,
  pending: PendingRender[]
): { display: string; summary: string } {
  switch (entry.tag) {
    case 'TC_TAG_NULL':
      return { display: 'null', summary: 'null' }
    case 'TC_TAG_UNDEFINED':
      return { display: 'undefined', summary: 'undefined' }
    case 'TC_TAG_BOOL_FALSE':
      return { display: 'false', summary: 'false' }
    case 'TC_TAG_BOOL_TRUE':
      return { display: 'true', summary: 'true' }
    case 'TC_TAG_INT32':
    case 'TC_TAG_FLOAT64':
      return { display: String(entry.value), summary: String(entry.value) }
    case 'TC_TAG_STRING': {
      const value = typeof entry.value === 'string' ? entry.value : String(entry.value)
      const truncated = truncateString(value, 60)
      return {
        display: `string ${JSON.stringify(truncated)}`,
        summary: JSON.stringify(truncateString(value, 20)),
      }
    }
    case 'TC_TAG_ARRAY': {
      const arr = entry.value as ParsedTaggedValue[]
      const preview = arr
        .slice(0, 3)
        .map((item) => summarizeTaggedValueSimple(item, 1))
        .join(', ')
      const suffix = arr.length > 3 ? ', …' : ''
      return {
        display: `array(len=${arr.length}) [${preview}${suffix}]`,
        summary: `array(len=${arr.length})`,
      }
    }
    case 'TC_TAG_OBJECT': {
      const props = entry.value as Array<{ name: AtomRef; value: ParsedTaggedValue }>
      const preview = props
        .slice(0, 3)
        .map((prop) => `${formatAtomRef(prop.name)}: ${summarizeTaggedValueSimple(prop.value, 1)}`)
        .join(', ')
      const suffix = props.length > 3 ? ', …' : ''
      return {
        display: `object(len=${props.length}) {${preview}${suffix}}`,
        summary: `object(len=${props.length})`,
      }
    }
    case 'TC_TAG_TEMPLATE_OBJECT': {
      const value = entry.value as { elements: ParsedTaggedValue[] }
      return { display: `template(len=${value.elements.length})`, summary: `template(len=${value.elements.length})` }
    }
    case 'TC_TAG_BIG_INT': {
      const value = entry.value as { byteLength: number; littleEndianHex: string }
      return {
        display: `bigint(len=${value.byteLength}, hex=0x${value.littleEndianHex})`,
        summary: `bigint(len=${value.byteLength})`,
      }
    }
    case 'TC_TAG_FUNCTION_BYTECODE': {
      const func = entry.value as ParsedFunction
      const name = formatFunctionName(func)
      const display = `function ${name}`
      pending.push({ type: 'function', source: label, func })
      return { display, summary: display }
    }
    case 'TC_TAG_MODULE': {
      const moduleValue = entry.value as ParsedModuleObject
      const display = `module ${formatAtomRef(moduleValue.moduleName)}`
      pending.push({ type: 'module', source: label, module: moduleValue })
      return { display, summary: display }
    }
    default:
      return { display: entry.tag, summary: entry.tag }
  }
}

function summarizeTaggedValueSimple(entry: ParsedTaggedValue, depth = 0): string {
  switch (entry.tag) {
    case 'TC_TAG_NULL':
      return 'null'
    case 'TC_TAG_UNDEFINED':
      return 'undefined'
    case 'TC_TAG_BOOL_FALSE':
      return 'false'
    case 'TC_TAG_BOOL_TRUE':
      return 'true'
    case 'TC_TAG_INT32':
    case 'TC_TAG_FLOAT64':
      return String(entry.value)
    case 'TC_TAG_STRING': {
      const value = typeof entry.value === 'string' ? entry.value : String(entry.value)
      return JSON.stringify(truncateString(value, depth === 0 ? 40 : 20))
    }
    case 'TC_TAG_ARRAY': {
      if (depth > 1) {
        const arr = entry.value as ParsedTaggedValue[]
        return `array(len=${arr.length})`
      }
      const arr = entry.value as ParsedTaggedValue[]
      const preview = arr
        .slice(0, 2)
        .map((item) => summarizeTaggedValueSimple(item, depth + 1))
        .join(', ')
      const suffix = arr.length > 2 ? ', …' : ''
      return `[${preview}${suffix}]`
    }
    case 'TC_TAG_OBJECT': {
      if (depth > 1) {
        const props = entry.value as Array<{ name: AtomRef; value: ParsedTaggedValue }>
        return `object(len=${props.length})`
      }
      const props = entry.value as Array<{ name: AtomRef; value: ParsedTaggedValue }>
      const preview = props
        .slice(0, 2)
        .map((prop) => `${formatAtomRef(prop.name)}: ${summarizeTaggedValueSimple(prop.value, depth + 1)}`)
        .join(', ')
      const suffix = props.length > 2 ? ', …' : ''
      return `{${preview}${suffix}}`
    }
    case 'TC_TAG_TEMPLATE_OBJECT':
      return 'template'
    case 'TC_TAG_BIG_INT': {
      const value = entry.value as { byteLength: number }
      return `bigint(len=${value.byteLength})`
    }
    case 'TC_TAG_FUNCTION_BYTECODE':
      return 'function'
    case 'TC_TAG_MODULE':
      return 'module'
    default:
      return entry.tag
  }
}

function formatMode(func: ParsedFunction): string {
  const flags = new Set(func.jsModeFlags ?? [])
  const base = flags.has('JS_MODE_STRICT') ? 'strict' : 'sloppy'
  flags.delete('JS_MODE_STRICT')
  const extras = Array.from(flags)
    .map((flag) => flag.replace('JS_MODE_', '').toLowerCase())
  return extras.length ? `${base} (${extras.join(', ')})` : base
}

function collectFunctionFlags(func: ParsedFunction): string[] {
  const flags: string[] = []
  if (func.flags.hasPrototype) flags.push('hasPrototype')
  if (func.flags.hasSimpleParameterList) flags.push('hasSimpleParameters')
  if (func.flags.isDerivedClassConstructor) flags.push('derivedCtor')
  if (func.flags.needHomeObject) flags.push('needHomeObject')
  if (func.flags.newTargetAllowed) flags.push('newTarget')
  if (func.flags.superCallAllowed) flags.push('superCall')
  if (func.flags.superAllowed) flags.push('super')
  if (!func.flags.argumentsAllowed) flags.push('argumentsDisallowed')
  if (func.flags.hasDebug) flags.push('hasDebug')
  if (func.flags.isDirectOrIndirectEval) flags.push('eval')
  return flags
}

function formatVarFlags(local: ParsedVarDef): string {
  const flags: string[] = []
  if (local.isConst) flags.push('const')
  if (local.isLexical) flags.push('lexical')
  if (local.isCaptured) flags.push('captured')
  return flags.length ? ` [${flags.join(', ')}]` : ''
}

function formatClosureFlags(cv: ParsedClosureVar): string {
  const flags: string[] = []
  if (cv.isLocal) flags.push('local')
  if (cv.isArgument) flags.push('arg')
  if (cv.isConst) flags.push('const')
  if (cv.isLexical) flags.push('lexical')
  flags.push(cv.kind.name ?? `kind#${cv.kind.value}`)
  return flags.length ? ` [${flags.join(', ')}]` : ''
}

function formatAtomRef(ref?: AtomRef | null): string {
  if (!ref) {
    return '<anonymous>'
  }
  if (ref.type === 'atom') {
    return ref.name ?? `atom#${ref.id}`
  }
  return `tagged-int(${ref.value})`
}

function formatFunctionName(func: ParsedFunction): string {
  return formatAtomRef(func.name)
}

function formatAtomOperand(atom: AtomRef): string {
  return formatAtomRef(atom)
}

function formatGenericOperand(operand: unknown): string {
  if (operand === null || operand === undefined) {
    return String(operand)
  }
  if (typeof operand === 'number' || typeof operand === 'boolean') {
    return String(operand)
  }
  if (typeof operand === 'string') {
    return operand
  }
  if (Array.isArray(operand)) {
    return `[${operand.map((item) => formatGenericOperand(item)).join(', ')}]`
  }
  if (typeof operand === 'object') {
    const maybeAtom = operand as Partial<AtomRef>
    if (maybeAtom && typeof maybeAtom.type === 'string' && (maybeAtom.type === 'atom' || maybeAtom.type === 'tagged-int')) {
      return formatAtomRef(maybeAtom as AtomRef)
    }
    try {
      return JSON.stringify(operand)
    } catch {
      return String(operand)
    }
  }
  return String(operand)
}

function getJumpBaseOffset(def: OpcodeDefinition): number {
  switch (def.format) {
    case OpFormat.label:
    case OpFormat.label8:
    case OpFormat.label16:
    case OpFormat.label_u16:
      return 1
    case OpFormat.atom_label_u8:
    case OpFormat.atom_label_u16:
      return 5
    default:
      return def.size
  }
}

function indent(level: number): string {
  return INDENT.repeat(level)
}

function ensureBlankLine(lines: string[]) {
  if (lines.length === 0) {
    return
  }
  if (lines[lines.length - 1] !== '') {
    lines.push('')
  }
}

function truncateString(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value
  }
  return `${value.slice(0, Math.max(0, maxLength - 1))}…`
}

function buildFallbackDisassembly(bytecode: Uint8Array, error: unknown): string {
  const reason = error instanceof Error ? error.message : String(error)
  const lines = [`; failed to parse bytecode: ${reason}`, '; fallback hex dump:']

  for (let i = 0; i < bytecode.length; i += 16) {
    const chunk = bytecode.slice(i, i + 16)
    const hex = Array.from(chunk)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ')
    const ascii = Array.from(chunk)
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('')
    lines.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47)} |${ascii}|`)
  }

  return lines.join('\n')
}