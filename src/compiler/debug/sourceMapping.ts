import * as ts from 'typescript'

export type ColumnAdjustment = { startColumn: number; delta: number }

type StripSegment = { start: number; end: number; replacement: string }

type SourceMappingResult = {
	strippedSource: string
	normalizedPosByPos: Uint32Array
	columnAdjustments: Map<number, ColumnAdjustment[]>
}

export function buildSourceMapping(options: {
	source: string
	sourceFile: ts.SourceFile
	referenceJsSource?: string | null
}): SourceMappingResult {
	const { source, sourceFile, referenceJsSource } = options
	const segments: StripSegment[] = []

	collectStripSegments(source, /(?<=\b[_$a-zA-Z][_$0-9a-zA-Z]*)[ \t]*:(?![ \t]*\()[ \t]*[^=;,\){}\r\n]+(?=\s*[,)])/g, segments)
	collectStripSegments(source, /:[ \t]*(?!\()[ \t]*[^=;,\){}\r\n]+(?=\s*[=;,){}])/g, segments)
	removeObjectPropertyAssignmentSegments(source, sourceFile, segments)
	collectTypeArgumentAndParameterSegments(source, sourceFile, segments)
	collectStripSegments(source, /\b(interface|type)\s+\w+\s*=\s*[^;]+;?/g, segments)
	collectStripSegments(source, /\s+as\s+const\b/g, segments)

	if (referenceJsSource !== undefined && referenceJsSource !== null) {
		collectBlankLineAlignmentSegments(source, referenceJsSource, segments)
	} else {
		collectCollapsedBlankLineSegments(source, segments)
	}

	segments.sort((a, b) => a.start - b.start)

	const merged: StripSegment[] = []
	for (const segment of segments) {
		const start = Math.max(0, Math.min(segment.start, source.length))
		const end = Math.max(start, Math.min(segment.end, source.length))
		if (start === end) {
			continue
		}
		const last = merged[merged.length - 1]
		if (last && start <= last.end) {
			if (end > last.end) {
				last.end = end
			}
			if (!last.replacement && segment.replacement) {
				last.replacement = segment.replacement
			}
			continue
		}
		merged.push({ start, end, replacement: segment.replacement })
	}

	const normalizedPosByPos = new Uint32Array(source.length + 1)
	const builder: string[] = []
	let removedSoFar = 0
	let segmentIndex = 0
	let current = merged[segmentIndex]

	for (let pos = 0; pos <= source.length; pos++) {
		while (current && pos >= current.end) {
			const replacementLength = current.replacement.length
			removedSoFar += (current.end - current.start) - replacementLength
			segmentIndex += 1
			current = merged[segmentIndex]
		}

		if (current && pos >= current.start) {
			normalizedPosByPos[pos] = current.start - removedSoFar
		} else {
			normalizedPosByPos[pos] = pos - removedSoFar
		}

		if (pos === source.length) {
			break
		}

		if (current && pos === current.start && current.replacement.length > 0) {
			builder.push(current.replacement)
		}

		if (!(current && pos >= current.start && pos < current.end)) {
			builder.push(source.charAt(pos))
		}
	}

	const strippedSource = builder.join('')
	const columnAdjustments = computeColumnAdjustmentsFromSegments(
		source,
		strippedSource,
		normalizedPosByPos,
		merged
	)

	return { strippedSource, normalizedPosByPos, columnAdjustments }
}

	export function computeReferenceColumnAdjustments(
		strippedSource: string,
		originalSource: string,
		referenceJsSource: string | null | undefined,
		fileName: string
	): Map<number, ColumnAdjustment[]> {
		const adjustments = new Map<number, ColumnAdjustment[]>()
		if (referenceJsSource === null) {
			return adjustments
		}

		let comparisonJs: string | undefined
		if (typeof referenceJsSource === 'string') {
			comparisonJs = referenceJsSource
		} else {
			try {
				const result = ts.transpileModule(originalSource, {
					fileName,
					reportDiagnostics: false,
					compilerOptions: {
						module: ts.ModuleKind.ESNext,
						target: ts.ScriptTarget.ES2020,
						jsx: ts.JsxEmit.Preserve,
						importHelpers: false,
						esModuleInterop: false,
					},
				})
				comparisonJs = result.outputText ?? undefined
			} catch {
				comparisonJs = undefined
			}
		}

		if (!comparisonJs) {
			return adjustments
		}

		const originalLines = strippedSource.split(/\r?\n/)
		const comparisonLines = comparisonJs.split(/\r?\n/)
		const limit = Math.min(originalLines.length, comparisonLines.length)

		for (let lineIndex = 0; lineIndex < limit; lineIndex += 1) {
			const originalLine = originalLines[lineIndex] ?? ''
			const comparisonLine = comparisonLines[lineIndex] ?? ''
			const originalTrimmed = originalLine.trimStart()
			const comparisonTrimmed = comparisonLine.trimStart()
			if (originalTrimmed.length === 0 || comparisonTrimmed.length === 0) {
				continue
			}
			if (originalTrimmed.charCodeAt(0) !== comparisonTrimmed.charCodeAt(0)) {
				continue
			}

			const originalIndent = countLeadingColumns(originalLine)
			const comparisonIndent = countLeadingColumns(comparisonLine)
			const delta = comparisonIndent - originalIndent
			if (delta !== 0) {
				addColumnAdjustment(adjustments, lineIndex, originalIndent, delta)
			}

			const originalIndentLength = getLeadingWhitespaceLength(originalLine)
			const comparisonIndentLength = getLeadingWhitespaceLength(comparisonLine)
			const originalIndexStart = Math.min(originalIndentLength, originalLine.length)
			const comparisonIndexStart = Math.min(comparisonIndentLength, comparisonLine.length)
			applyIntraLineColumnAdjustments(
				adjustments,
				lineIndex,
				originalLine,
				comparisonLine,
				originalIndexStart,
				comparisonIndexStart,
				originalIndent,
				comparisonIndent,
				delta
			)
		}

		sortColumnAdjustments(adjustments)
		return adjustments
	}

	export function mergeColumnAdjustments(
		target: Map<number, ColumnAdjustment[]>,
		extra: Map<number, ColumnAdjustment[]>
	) {
		for (const [line, entries] of extra) {
			if (!target.has(line)) {
				target.set(line, [...entries])
				continue
			}
			const targetEntries = target.get(line)!
			targetEntries.push(...entries)
			targetEntries.sort((a, b) => a.startColumn - b.startColumn)
		}
	}

	export function sortColumnAdjustments(map: Map<number, ColumnAdjustment[]>) {
		for (const entries of map.values()) {
			entries.sort((a, b) => a.startColumn - b.startColumn)
		}
	}

	export function adjustColumnForTranspiled(
		columnAdjustments: Map<number, ColumnAdjustment[]>,
		line: number,
		column: number
	): number {
		const entries = columnAdjustments.get(line)
		if (!entries) {
			return 0
		}
		let delta = 0
		for (const entry of entries) {
			if (column < entry.startColumn) {
				break
			}
			delta += entry.delta
		}
		return delta
	}

	function computeColumnAdjustmentsFromSegments(
		originalSource: string,
		strippedSource: string,
		normalizedPosByPos: Uint32Array,
		segments: StripSegment[]
	): Map<number, ColumnAdjustment[]> {
		const adjustments = new Map<number, ColumnAdjustment[]>()
		if (segments.length === 0) {
			return adjustments
		}

		const lineStarts = collectLineStartOffsets(strippedSource)

		for (const segment of segments) {
			const removedLength = segment.end - segment.start
			const replacementLength = segment.replacement.length
			const delta = removedLength - replacementLength
			if (delta <= 0) {
				continue
			}

			const removedText = originalSource.slice(segment.start, segment.end)
			if (removedText.includes('\n')) {
				continue
			}

			const normalizedStart = normalizedPosByPos[segment.start]
			const { line, column } = getLineColumnFromStrippedOffset(strippedSource, lineStarts, normalizedStart)
			addColumnAdjustment(adjustments, line, column, delta)
		}

		sortColumnAdjustments(adjustments)
		return adjustments
	}

	function collectStripSegments(
		source: string,
		pattern: RegExp,
		segments: StripSegment[],
		replacement = ''
	) {
		pattern.lastIndex = 0
		for (const match of source.matchAll(pattern)) {
			const index = match.index ?? 0
			const text = match[0]
			if (!text) continue
			segments.push({ start: index, end: index + text.length, replacement })
		}
	}

	function removeObjectPropertyAssignmentSegments(
		source: string,
		sourceFile: ts.SourceFile,
		segments: StripSegment[]
	) {
		const indicesToRemove = new Set<number>()

		const visit = (node: ts.Node) => {
			if (ts.isObjectLiteralExpression(node)) {
				for (const property of node.properties) {
					if (!ts.isPropertyAssignment(property)) {
						continue
					}
					if (!ts.isIdentifier(property.name) && !ts.isStringLiteral(property.name) && !ts.isNumericLiteral(property.name)) {
						continue
					}
					if (!property.initializer) {
						continue
					}
					const nameEnd = property.name.getEnd()
					const initializerStart = property.initializer.getStart(sourceFile, false)
					if (initializerStart <= nameEnd) {
						continue
					}
					const colonIndex = source.indexOf(':', nameEnd)
					if (colonIndex < 0 || colonIndex >= initializerStart) {
						continue
					}
					for (let index = 0; index < segments.length; index += 1) {
						const segment = segments[index]
						if (segment.start <= colonIndex && colonIndex < segment.end) {
							indicesToRemove.add(index)
						}
					}
				}
			}
			ts.forEachChild(node, visit)
		}

		visit(sourceFile)

		if (indicesToRemove.size === 0) {
			return
		}

		const filtered: StripSegment[] = []
		for (let index = 0; index < segments.length; index += 1) {
			if (!indicesToRemove.has(index)) {
				filtered.push(segments[index])
			}
		}
		segments.length = 0
		segments.push(...filtered)
	}

	function collectTypeArgumentAndParameterSegments(
		source: string,
		sourceFile: ts.SourceFile,
		segments: StripSegment[]
	) {
		const pushSegment = (start: number, end: number) => {
			if (start < 0 || end <= start) {
				return
			}
			segments.push({ start, end, replacement: '' })
		}

		const addNodeArrayRange = (nodeArray?: ts.NodeArray<ts.Node>) => {
			if (!nodeArray || nodeArray.length === 0) {
				return
			}
			const range = findAngleBracketRange(source, nodeArray.pos, nodeArray.end)
			if (range) {
				pushSegment(range.start, range.end)
			}
		}

		const visit = (node: ts.Node) => {
			if (
				ts.isCallExpression(node) ||
				ts.isNewExpression(node) ||
				ts.isExpressionWithTypeArguments(node) ||
				ts.isJsxOpeningLikeElement(node)
			) {
				addNodeArrayRange(node.typeArguments)
			}

			if (ts.isTypeReferenceNode(node)) {
				addNodeArrayRange(node.typeArguments)
			}

			if (
				ts.isFunctionDeclaration(node) ||
				ts.isFunctionExpression(node) ||
				ts.isArrowFunction(node) ||
				ts.isMethodDeclaration(node) ||
				ts.isConstructorDeclaration(node) ||
				ts.isGetAccessorDeclaration(node) ||
				ts.isSetAccessorDeclaration(node) ||
				ts.isClassDeclaration(node) ||
				ts.isClassExpression(node) ||
				ts.isInterfaceDeclaration(node) ||
				ts.isTypeAliasDeclaration(node)
			) {
				addNodeArrayRange(node.typeParameters)
			}

			if (ts.isTypeAssertionExpression(node)) {
				const range = findAngleBracketRange(source, node.type.pos, node.type.end)
				if (range) {
					pushSegment(range.start, range.end)
				}
			}

			ts.forEachChild(node, visit)
		}

		visit(sourceFile)
	}

	function findAngleBracketRange(source: string, contentStart: number, contentEnd: number): { start: number; end: number } | null {
		let start = contentStart
		while (start > 0) {
			const code = source.charCodeAt(start - 1) | 0
			if (code === 60 /* < */) {
				start -= 1
				break
			}
			if (!ts.isWhiteSpaceLike(code)) {
				return null
			}
			start -= 1
		}

		if (start < 0 || source.charCodeAt(start) !== 60 /* < */) {
			return null
		}

		let end = contentEnd
		while (end < source.length) {
			const code = source.charCodeAt(end) | 0
			if (code === 62 /* > */) {
				end += 1
				break
			}
			if (!ts.isWhiteSpaceLike(code)) {
				end += 1
				continue
			}
			end += 1
		}

		if (end > source.length || source.charCodeAt(end - 1) !== 62 /* > */) {
			return null
		}

		return { start, end }
	}

	function collectCollapsedBlankLineSegments(source: string, segments: StripSegment[]) {
		const pattern = /(\r?\n)(?:\s*\r?\n)+/g
		for (const match of source.matchAll(pattern)) {
			const index = match.index ?? 0
			const text = match[0]
			if (!text) continue
			const newline = match[1] ?? '\n'
			const entry: StripSegment = { start: index, end: index + text.length, replacement: newline + newline }
			segments.push(entry)
		}
	}

	function collectBlankLineAlignmentSegments(
		source: string,
		referenceJsSource: string,
		segments: StripSegment[]
	) {
		const originalLines = getLineInfos(source)
		const referenceLines = getLineInfos(referenceJsSource)

		let refIndex = 0
		const collapseLineIndices: number[] = []

		for (let lineIndex = 0; lineIndex < originalLines.length; lineIndex += 1) {
			const line = originalLines[lineIndex]
			const isBlank = line.text.trim().length === 0
			const refLine = refIndex < referenceLines.length ? referenceLines[refIndex] : undefined
			const refIsBlank = refLine ? refLine.text.trim().length === 0 : false

			if (isBlank) {
				if (refLine && refIsBlank) {
					refIndex += 1
				} else {
					collapseLineIndices.push(lineIndex)
				}
			} else if (refIndex < referenceLines.length) {
				refIndex += 1
			}
		}

		if (collapseLineIndices.length === 0) {
			return
		}

		const ranges: Array<{ start: number; end: number }> = []
		let rangeStart = collapseLineIndices[0]
		let rangeEnd = collapseLineIndices[0]
		for (let index = 1; index < collapseLineIndices.length; index += 1) {
			const current = collapseLineIndices[index]
			if (current === rangeEnd + 1) {
				rangeEnd = current
			} else {
				ranges.push({ start: rangeStart, end: rangeEnd })
				rangeStart = current
				rangeEnd = current
			}
		}
		ranges.push({ start: rangeStart, end: rangeEnd })

		for (const range of ranges) {
			const startLine = range.start
			const endLine = range.end

			const previousLine = startLine > 0 ? originalLines[startLine - 1] : undefined
			const finalLine = originalLines[endLine]

			let segmentStart: number
			let replacement = ''

			if (previousLine) {
				segmentStart = previousLine.start + previousLine.text.length
				replacement = previousLine.newline
			} else {
				segmentStart = originalLines[startLine].start
			}

			const segmentEnd = finalLine.start + finalLine.text.length + finalLine.newline.length

			if (segmentEnd <= segmentStart) {
				continue
			}

			segments.push({ start: segmentStart, end: segmentEnd, replacement })
		}
	}

	function getLineInfos(text: string): Array<{ start: number; text: string; newline: string }> {
		const lines = text.split(/\r?\n/)
		const newlineValues: string[] = []
		for (let index = 0; index < text.length; ) {
			const code = text.charCodeAt(index)
			if (code === 0x0d) {
				if (index + 1 < text.length && text.charCodeAt(index + 1) === 0x0a) {
					newlineValues.push('\r\n')
					index += 2
				} else {
					newlineValues.push('\r')
					index += 1
				}
				continue
			}
			if (code === 0x0a) {
				newlineValues.push('\n')
				index += 1
				continue
			}
			index += 1
		}

		const infos: Array<{ start: number; text: string; newline: string }> = []
		let offset = 0
		for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
			const textPart = lines[lineIndex] ?? ''
			const newline = newlineValues[lineIndex] ?? ''
			infos.push({ start: offset, text: textPart, newline })
			offset += textPart.length + newline.length
		}

		if (lines.length === 0) {
			infos.push({ start: 0, text: '', newline: '' })
		}

		return infos
	}

	function collectLineStartOffsets(text: string): number[] {
		const starts: number[] = [0]
		for (let index = 0; index < text.length; index += 1) {
			if (text.charCodeAt(index) === 0x0a) {
				starts.push(index + 1)
			}
		}
		return starts
	}

	function getLineColumnFromStrippedOffset(
		text: string,
		lineStarts: number[],
		offset: number
	): { line: number; column: number } {
		const clampedOffset = Math.max(0, Math.min(offset, text.length))
		let line = 0
		while (line + 1 < lineStarts.length && lineStarts[line + 1] <= clampedOffset) {
			line += 1
		}

		const lineStart = lineStarts[line]
		let column = 0
		for (let index = lineStart; index < clampedOffset; ) {
			const codePoint = text.codePointAt(index) ?? 0
			column += 1
			index += codePoint > 0xffff ? 2 : 1
		}

		return { line, column }
	}

		function applyIntraLineColumnAdjustments(
			map: Map<number, ColumnAdjustment[]>,
			line: number,
			originalLine: string,
			referenceLine: string,
			originalIndexStart: number,
			referenceIndexStart: number,
			originalColumnStart: number,
			referenceColumnStart: number,
			initialDelta: number
		) {
			let originalIndex = originalIndexStart
			let referenceIndex = referenceIndexStart
			let originalColumn = originalColumnStart
			let referenceColumn = referenceColumnStart
			let activeDelta = initialDelta
			let mismatch = false

			const applyDelta = (column: number, desiredDelta: number) => {
				const deltaChange = desiredDelta - activeDelta
				if (deltaChange !== 0) {
					addColumnAdjustment(map, line, column, deltaChange)
					activeDelta = desiredDelta
				}
			}

			while (originalIndex < originalLine.length && referenceIndex < referenceLine.length) {
				const originalCodePoint = originalLine.codePointAt(originalIndex) ?? 0
				const referenceCodePoint = referenceLine.codePointAt(referenceIndex) ?? 0

				if (originalCodePoint === referenceCodePoint) {
					const desiredDelta = referenceColumn - originalColumn
					applyDelta(originalColumn, desiredDelta)
					const originalStep = originalCodePoint > 0xffff ? 2 : 1
					const referenceStep = referenceCodePoint > 0xffff ? 2 : 1
					originalIndex += originalStep
					referenceIndex += referenceStep
					originalColumn += 1
					referenceColumn += 1
					continue
				}

				if (isWhitespaceCode(referenceCodePoint) && !isWhitespaceCode(originalCodePoint)) {
					const referenceStep = referenceCodePoint > 0xffff ? 2 : 1
					referenceIndex += referenceStep
					referenceColumn += 1
					continue
				}

				if (isWhitespaceCode(originalCodePoint) && !isWhitespaceCode(referenceCodePoint)) {
					const desiredDelta = referenceColumn - originalColumn
					applyDelta(originalColumn, desiredDelta)
					const originalStep = originalCodePoint > 0xffff ? 2 : 1
					originalIndex += originalStep
					originalColumn += 1
					continue
				}

				mismatch = true
				break
			}

			if (!mismatch) {
				const desiredDelta = referenceColumn - originalColumn
				applyDelta(originalColumn, desiredDelta)
			}
		}

		function getLeadingWhitespaceLength(line: string): number {
			let index = 0
			while (index < line.length) {
				const code = line.charCodeAt(index)
				if (!isWhitespaceCode(code)) {
					break
				}
				index += 1
			}
			return index
		}

	function addColumnAdjustment(
		map: Map<number, ColumnAdjustment[]>,
		line: number,
		startColumn: number,
		delta: number
	) {
		if (!map.has(line)) {
			map.set(line, [])
		}
		map.get(line)!.push({ startColumn, delta })
	}

		function isWhitespaceCode(code: number): boolean {
			return code === 0x20 || code === 0x09 || code === 0x0d || code === 0x0a
		}

	function countLeadingColumns(line: string): number {
		let columns = 0
		for (let index = 0; index < line.length; index += 1) {
			const code = line.charCodeAt(index)
			if (code === 0x20) {
				columns += 1
				continue
			}
			if (code === 0x09) {
				columns += 1
				continue
			}
			if (code === 0x0d || code === 0x0a) {
				continue
			}
			break
		}
		return columns
	}
