import { adjustColumnForTranspiled, type ColumnAdjustment } from './sourceMapping'

export interface Utf8PositionTrackerSnapshot {
  lineColCache: { offset: number; line: number; rawColumn: number }
}

interface Utf8PositionTrackerOptions {
  sourceUtf8: Uint8Array
  utf8OffsetByPos: Uint32Array
  normalizedPosByPos: Uint32Array
  columnAdjustments: Map<number, ColumnAdjustment[]>
}

export class Utf8PositionTracker {
  private lineColCache = { offset: 0, line: 0, rawColumn: 0 }

  private readonly sourceUtf8: Uint8Array
  private readonly utf8OffsetByPos: Uint32Array
  private readonly normalizedPosByPos: Uint32Array
  private readonly columnAdjustments: Map<number, ColumnAdjustment[]>

  constructor(options: Utf8PositionTrackerOptions) {
    this.sourceUtf8 = options.sourceUtf8
    this.utf8OffsetByPos = options.utf8OffsetByPos
    this.normalizedPosByPos = options.normalizedPosByPos
    this.columnAdjustments = options.columnAdjustments
  }

  public resetCache() {
    this.lineColCache = { offset: 0, line: 0, rawColumn: 0 }
  }

  public createSnapshot(): Utf8PositionTrackerSnapshot {
    return {
      lineColCache: { ...this.lineColCache },
    }
  }

  public restoreSnapshot(snapshot: Utf8PositionTrackerSnapshot) {
    this.lineColCache = { ...snapshot.lineColCache }
  }

  public toUtf8Offset(pos: number): number {
    const normalizedPos = this.getNormalizedPosition(pos)
    if (normalizedPos <= 0) {
      return 0
    }
    if (normalizedPos >= this.utf8OffsetByPos.length) {
      return this.utf8OffsetByPos[this.utf8OffsetByPos.length - 1]
    }
    return this.utf8OffsetByPos[normalizedPos]
  }

  public getLineColumnFromUtf8Offset(offset: number): { line: number; column: number } {
    const clampedOffset = Math.max(0, Math.min(offset, this.sourceUtf8.length))
    const cache = this.lineColCache
    let line: number
    let column: number

    if (clampedOffset >= cache.offset) {
      line = cache.line
      column = cache.rawColumn
      for (let index = cache.offset; index < clampedOffset; index += 1) {
        const byte = this.sourceUtf8[index]
        if (byte === 0x0a) {
          line += 1
          column = 0
        } else if (byte < 0x80 || byte >= 0xc0) {
          column += 1
        }
      }
    } else {
      line = 0
      column = 0
      for (let index = 0; index < clampedOffset; index += 1) {
        const byte = this.sourceUtf8[index]
        if (byte === 0x0a) {
          line += 1
          column = 0
        } else if (byte < 0x80 || byte >= 0xc0) {
          column += 1
        }
      }
    }

    this.lineColCache = { offset: clampedOffset, line, rawColumn: column }

    const adjustment = adjustColumnForTranspiled(this.columnAdjustments, line, column)
    const adjustedColumn = column + adjustment
    return {
      line,
      column: adjustedColumn < 0 ? 0 : adjustedColumn,
    }
  }

  public findLineStartUtf8Offset(offset: number): number {
    let current = offset
    while (current > 0) {
      const byte = this.sourceUtf8[current - 1]
      if (byte === 0x0a) {
        break
      }
      if (byte >= 0x80 && byte < 0xc0) {
        current -= 1
        continue
      }
      current -= 1
    }
    return current
  }

  public computeIndentColumnsFromUtf8Offset(offset: number): number {
    let indent = 0
    for (let index = offset; index < this.sourceUtf8.length; index += 1) {
      const byte = this.sourceUtf8[index]
      if (byte === 0x20) {
        indent += 1
        continue
      }
      if (byte === 0x09) {
        indent += 1
        continue
      }
      if (byte === 0x0d) {
        continue
      }
      break
    }
    return indent
  }

  private getNormalizedPosition(pos: number): number {
    if (pos <= 0) {
      return 0
    }

    if (pos >= this.normalizedPosByPos.length) {
      return this.normalizedPosByPos[this.normalizedPosByPos.length - 1]
    }

    return this.normalizedPosByPos[pos]
  }
}

export interface CreateUtf8PositionTrackerOptions {
  strippedSource: string
  normalizedPosByPos: Uint32Array
  columnAdjustments: Map<number, ColumnAdjustment[]>
}

export function createUtf8PositionTracker(options: CreateUtf8PositionTrackerOptions): Utf8PositionTracker {
  const encoder = new TextEncoder()
  const sourceUtf8 = encoder.encode(options.strippedSource)
  const utf8OffsetByPos = new Uint32Array(options.strippedSource.length + 1)

  utf8OffsetByPos[0] = 0
  let utf8Offset = 0
  let index = 0

  while (index < options.strippedSource.length) {
    const codePoint = options.strippedSource.codePointAt(index) ?? 0
    const step = codePoint > 0xffff ? 2 : 1
    utf8Offset += getUtf8ByteLength(codePoint)
    for (let j = 1; j <= step; j++) {
      const target = index + j
      if (target <= options.strippedSource.length) {
        utf8OffsetByPos[target] = utf8Offset
      }
    }
    index += step
  }

  return new Utf8PositionTracker({
    sourceUtf8,
    utf8OffsetByPos,
    normalizedPosByPos: options.normalizedPosByPos,
    columnAdjustments: options.columnAdjustments,
  })
}

function getUtf8ByteLength(codePoint: number): number {
  if (codePoint <= 0x7f) return 1
  if (codePoint <= 0x7ff) return 2
  if (codePoint <= 0xffff) return 3
  return 4
}
