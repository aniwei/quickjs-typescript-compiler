export class BytecodeWriter {
	private buf: number[] = [];

	get length(): number {
		return this.buf.length;
	}

	putU8(v: number) { this.buf.push(v & 0xFF); }
	putU16(v: number) { this.putU8(v); this.putU8(v >>> 8); }
	putU32(v: number) { this.putU8(v); this.putU8(v >>> 8); this.putU8(v >>> 16); this.putU8(v >>> 24); }
	bytes(arr: number[] | Uint8Array) { for (const b of arr) this.putU8(b); }

	patchU16(offset: number, v: number) {
		this.buf[offset] = v & 0xFF;
		this.buf[offset + 1] = (v >>> 8) & 0xFF;
	}

	toUint8Array(): Uint8Array { return new Uint8Array(this.buf); }
}

