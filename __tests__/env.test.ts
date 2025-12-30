import { Opcode } from '../src/env'
import { QuickJSLib } from '../scripts/QuickJSLib'

describe('Environment Consistency', () => {
  it('should match Opcode values with WASM export', async () => {
    // Iterate over all keys in the Opcode enum
    for (const key in Opcode) {
      if (isNaN(Number(key))) {
        // key is the name (e.g., "OP_push_i32")
        const enumName = key
        const enumValue = (Opcode as any)[enumName]
        
        // Remove "OP_" prefix to get the WASM name
        const wasmName = enumName.substring(3)
        
        const wasmValue = await QuickJSLib.getOpcodeId(wasmName)
        
        if (wasmValue === -1) {
           // Some opcodes might not be in the WASM export if they are internal or handled differently?
           // But generally they should be there.
           // Let's warn for now, or fail if strict.
           // console.warn(`Opcode ${enumName} not found in WASM`)
           // Actually, if it's in env.ts, it should be in WASM because env.ts is generated from WASM.
           // However, env.ts might have some extra things? No, it's auto generated.
           // Wait, getOpcodeId returns -1 if not found.
           
           // Special case: OP_invalid is 0, but might not be in the macro loop if not defined?
           // DEF(invalid, 1, 0, 0, none) is in quickjs-opcode.h
           
           expect(wasmValue).not.toBe(-1)
        }

        expect(enumValue).toBe(wasmValue)
      }
    }
  })

  it('should match SHORT_OPCODES specifically', async () => {
     const shortOpcodes = [
       'push_minus1', 'push_0', 'push_1', 'push_2', 'push_3', 
       'push_4', 'push_5', 'push_6', 'push_7', 
       'push_i8', 'push_i16', 'push_const8', 'fclosure8', 'push_empty_string'
     ]

     for (const name of shortOpcodes) {
       const wasmValue = await QuickJSLib.getOpcodeId(name)
       expect(wasmValue).not.toBe(-1)
       
       const enumName = `OP_${name}`
       const enumValue = (Opcode as any)[enumName]
       expect(enumValue).toBe(wasmValue)
     }
  })
})
