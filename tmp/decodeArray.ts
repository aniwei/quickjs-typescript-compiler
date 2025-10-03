const PC2LINE_OP_FIRST = 1
const PC2LINE_RANGE = 5
const PC2LINE_BASE = -1

function decodePc2line(buffer: number[]) {
	const data = buffer.slice()
	let offset = 0
	const readULEB = (): number => {
		let result = 0
		let shift = 0
		while (true) {
			const byte = data[offset++]
			result |= (byte & 0x7f) << shift
			if ((byte & 0x80) === 0) break
			shift += 7
		}
		return result >>> 0
	}
	const readSLEB = (): number => {
		const encoded = readULEB()
		return ((encoded >>> 1) ^ -(encoded & 1)) | 0
	}

	const entries: Array<{ pc: number; line: number; column: number; diffPc: number; diffLine: number; diffColumn: number }> = []
	let pc = 0
	let line = readULEB()
	let column = readULEB()
	entries.push({ pc, line, column, diffPc: 0, diffLine: 0, diffColumn: 0 })

	while (offset < data.length) {
		const op = data[offset++]
		let diffPc: number
		let diffLine: number

		if (op === 0) {
			diffPc = readULEB()
			diffLine = readSLEB()
		} else {
			const encoded = op - PC2LINE_OP_FIRST
			diffPc = Math.floor(encoded / PC2LINE_RANGE)
			diffLine = (encoded % PC2LINE_RANGE) + PC2LINE_BASE
		}
		const diffColumn = readSLEB()

		pc += diffPc
		line += diffLine
		column += diffColumn

		entries.push({ pc, line, column, diffPc, diffLine, diffColumn })
	}

	return entries
}

const arr = [0, 0, 3, 24, 7, 15, 29, 30, 7, 13, 34, 14, 12, 12, 7, 25, 9, 14, 12, 12, 7, 25]
console.log(decodePc2line(arr))
