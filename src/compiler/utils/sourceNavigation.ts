import * as ts from 'typescript'

export function isWhitespaceChar(code: number): boolean {
  return code === 0x20 || code === 0x09 || code === 0x0b || code === 0x0c || code === 0x0d || code === 0x0a
}

export function isLineTerminator(code: number): boolean {
  return code === 0x0a || code === 0x0d || code === 0x2028 || code === 0x2029
}

export function skipLineComment(source: string, pos: number): number {
  let current = pos
  while (current < source.length) {
    const code = source.charCodeAt(current)
    if (isLineTerminator(code)) {
      return current
    }
    current += 1
  }
  return current
}

export function skipBlockComment(source: string, pos: number): number {
  let current = pos
  while (current < source.length) {
    const code = source.charCodeAt(current)
    if (code === 0x2a && current + 1 < source.length && source.charCodeAt(current + 1) === 0x2f) {
      return current + 2
    }
    current += 1
  }
  return current
}

export function skipStringLiteral(source: string, pos: number): number {
  const quote = source.charCodeAt(pos)
  let current = pos + 1
  while (current < source.length) {
    const code = source.charCodeAt(current)
    if (code === quote) {
      return current + 1
    }
    if (code === 0x5c) {
      current += 2
      continue
    }
    current += 1
  }
  return current
}

export function skipTypeArgumentSequence(source: string, pos: number): number {
  let current = pos
  let depth = 0
  while (current < source.length) {
    const code = source.charCodeAt(current)
    if (code === 0x3c) {
      depth += 1
    } else if (code === 0x3e) {
      depth -= 1
      current += 1
      if (depth <= 0) {
        return current
      }
      continue
    } else if (code === 0x27 || code === 0x22) {
      current = skipStringLiteral(source, current)
      continue
    } else if (code === 0x2f && current + 1 < source.length) {
      const next = source.charCodeAt(current + 1)
      if (next === 0x2f) {
        current = skipLineComment(source, current + 2)
        continue
      }
      if (next === 0x2a) {
        current = skipBlockComment(source, current + 2)
        continue
      }
    }
    current += 1
  }
  return current
}

export function skipTriviaForward(source: string, pos: number): number {
  let current = pos
  while (current < source.length) {
    const code = source.charCodeAt(current)
    if (isWhitespaceChar(code)) {
      current += 1
      continue
    }
    if (code === 0x2f && current + 1 < source.length) {
      const next = source.charCodeAt(current + 1)
      if (next === 0x2f) {
        current = skipLineComment(source, current + 2)
        continue
      }
      if (next === 0x2a) {
        current = skipBlockComment(source, current + 2)
        continue
      }
    }
    break
  }
  return current
}

interface PropertyAccessParams {
  source: string
  sourceFile: ts.SourceFile
  node: ts.PropertyAccessExpression
}

export function getPropertyAccessOperatorPos(params: PropertyAccessParams): number | undefined {
  const { source, sourceFile, node } = params
  const nameStart = node.name.getStart(sourceFile, false)
  let pos = skipTriviaForward(source, node.expression.getEnd())
  if (pos >= nameStart) {
    pos = nameStart - 1
  }
  while (pos >= 0 && pos < nameStart) {
    const code = source.charCodeAt(pos)
    if (code === 0x2e) {
      return pos
    }
    if (code === 0x3f && pos + 1 < nameStart && source.charCodeAt(pos + 1) === 0x2e) {
      return pos + 1
    }
    if (!isWhitespaceChar(code)) {
      break
    }
    pos += 1
  }
  return undefined
}

interface CallOpenParenParams {
  source: string
  node: ts.CallExpression
}

export function getCallExpressionOpenParenPos(params: CallOpenParenParams): number | undefined {
  const { source, node } = params
  let pos = node.expression.getEnd()
  if (node.typeArguments && node.typeArguments.length > 0) {
    pos = node.typeArguments.end
  }
  while (pos < source.length) {
    pos = skipTriviaForward(source, pos)
    if (pos >= source.length) {
      break
    }
    const code = source.charCodeAt(pos)
    if (code === 0x28) {
      return pos
    }
    if (code === 0x3c) {
      pos = skipTypeArgumentSequence(source, pos)
      continue
    }
    break
  }
  return undefined
}

interface NewOpenParenParams {
  source: string
  node: ts.NewExpression
}

export function getNewExpressionOpenParenPos(params: NewOpenParenParams): number | undefined {
  const { source, node } = params
  let pos = node.expression.getEnd()
  if (node.typeArguments && node.typeArguments.length > 0) {
    pos = node.typeArguments.end
  }
  while (pos < source.length) {
    pos = skipTriviaForward(source, pos)
    if (pos >= source.length) {
      break
    }
    const code = source.charCodeAt(pos)
    if (code === 0x28) {
      return pos
    }
    if (code === 0x3c) {
      pos = skipTypeArgumentSequence(source, pos)
      continue
    }
    break
  }
  return undefined
}
