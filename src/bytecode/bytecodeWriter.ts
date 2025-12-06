import { DynBuf } from './dynBuffer'
import { Opcode } from '../env'

export class BytecodeWriter {
  buf: DynBuf

  constructor() {
    this.buf = new DynBuf()
  }

  emitOp(op: Opcode): void {
    this.buf.putByte(op)
  }

  emitU8(val: number): void {
    this.buf.putByte(val)
  }

  emitU16(val: number): void {
    this.buf.putU16(val)
  }

  emitU32(val: number): void {
    this.buf.putU32(val)
  }

  emitU64(val: bigint): void {
    this.buf.putU64(val)
  }

  getOffset(): number {
    return this.buf.size
  }

  prepend(data: Uint8Array | number[]): void {
    this.buf.prepend(data)
  }

  buffer(): Uint8Array {
    return this.buf.buffer()
  }
}
