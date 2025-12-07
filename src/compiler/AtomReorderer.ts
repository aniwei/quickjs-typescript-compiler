import { Compiler } from './Compiler'
import { FunctionDef } from './FunctionDef'
import { Opcode, OpFormat, OPCODE_DEFS } from '../env'

export class AtomReorderer {
  private compiler: Compiler
  private newAtoms: string[] = []
  private atomMap: Map<string, number> = new Map()
  private oldToNew: Map<number, number> = new Map()
  private visitedFunctions: Set<FunctionDef> = new Set()

  constructor(compiler: Compiler) {
    this.compiler = compiler
  }

  reorder(rootFd: FunctionDef, extraAtoms: number[] = []) {
    // 1. Collect atoms in usage order
    this.collectAtoms(rootFd)
    
    // Add extra atoms (e.g. module name)
    for (const atomIdx of extraAtoms) {
      // console.log(`AtomReorderer: Adding extra atom ${atomIdx}`)
      this.addAtom(atomIdx)
    }

    // 2. Rewrite bytecode and function definitions with new atom IDs
    this.visitedFunctions.clear()
    this.rewriteFunction(rootFd)

    // 3. Update compiler atom table
    this.compiler.atoms = this.newAtoms
    this.compiler.atomMap = this.atomMap
  }

  getNewId(oldIdx: number): number {
    if (oldIdx < this.compiler.firstAtomId) {
      return oldIdx
    }
    if (this.oldToNew.has(oldIdx)) {
      // console.log(`AtomReorderer: Remapped ${oldIdx} -> ${this.oldToNew.get(oldIdx)}`)
      return this.oldToNew.get(oldIdx)!
    }
    // console.log(`AtomReorderer: Failed to remap ${oldIdx}`)
    return oldIdx
  }
  private addAtom(oldIdx: number) {
    if (this.oldToNew.has(oldIdx)) {
      return
    }

    // Check if it's a built-in atom
    if (oldIdx < this.compiler.firstAtomId) {
      return
    }

    const atomStr = this.compiler.atoms[oldIdx - this.compiler.firstAtomId]
    if (!atomStr) {
      // console.log(`AtomReorderer: Missing atom for oldIdx ${oldIdx}. firstAtomId=${this.compiler.firstAtomId}, atoms.length=${this.compiler.atoms.length}`)
      return
    }
    if (!this.atomMap.has(atomStr)) {
      const newIdx = this.newAtoms.length + this.compiler.firstAtomId
      this.newAtoms.push(atomStr)
      this.atomMap.set(atomStr, newIdx)
    }

    const newIdx = this.atomMap.get(atomStr)!
    this.oldToNew.set(oldIdx, newIdx)
  }

  private collectAtoms(fd: FunctionDef) {
    if (this.visitedFunctions.has(fd)) {
      return
    }
    this.visitedFunctions.add(fd)

    // Collect atoms from function definition
    if (fd.funcName !== 0) {
      this.addAtom(fd.funcName)
    }
    if (fd.filename !== 0) {
      this.addAtom(fd.filename)
    }
    
    for (const arg of fd.args) {
      if (arg.varName !== 0) this.addAtom(arg.varName)
    }
    
    for (const v of fd.vars) {
      if (v.varName !== 0) {
        // console.log(`AtomReorderer: Collecting var atom ${v.varName} (${this.compiler.atoms[v.varName - this.compiler.firstAtomId]})`)
        this.addAtom(v.varName)
      }
    }
    
    for (const cv of fd.closureVar) {
      if (cv.varName !== 0) {
        // console.log(`AtomReorderer: Collecting closure var atom ${cv.varName} (${this.compiler.atoms[cv.varName - this.compiler.firstAtomId]})`)
        this.addAtom(cv.varName)
      }
    }

    const buf = fd.byteCode.data()
    const childFds: FunctionDef[] = []
    let pc = 0

    while (pc < buf.length) {
      const op = buf[pc]
      const opDef = OPCODE_DEFS[Opcode[op]]
      
      if (!opDef) {
        pc++
        continue
      }

      // Handle atom arguments
      if (opDef.format === OpFormat.atom || 
        opDef.format === OpFormat.atom_u8 || 
        opDef.format === OpFormat.atom_u16 ||
        opDef.format === OpFormat.atom_label_u8 ||
        opDef.format === OpFormat.atom_label_u16) {
        
        let atomIdx = 0
        if (opDef.format === OpFormat.atom) {
          atomIdx = this.readU32(buf, pc + 1)
        } else if (opDef.format === OpFormat.atom_u8 || opDef.format === OpFormat.atom_label_u8) {
          atomIdx = buf[pc + 1]
        } else if (opDef.format === OpFormat.atom_u16 || opDef.format === OpFormat.atom_label_u16) {
          atomIdx = this.readU16(buf, pc + 1)
        }
        
        this.addAtom(atomIdx)
      }

      // Queue child functions for recursion (QuickJS writes CPool after bytecode)
      if (op === Opcode.OP_fclosure) {
        const cpoolIdx = this.readU32(buf, pc + 1)
        const childFd = fd.cpool[cpoolIdx]
        if (childFd instanceof FunctionDef) {
          childFds.push(childFd)
        }
      } else if (op === Opcode.OP_fclosure8) {
        const cpoolIdx = buf[pc + 1]
        const childFd = fd.cpool[cpoolIdx]
        if (childFd instanceof FunctionDef) {
          childFds.push(childFd)
        }
      } else if (op === Opcode.OP_push_const8) {
        const cpoolIdx = buf[pc + 1]
        const childFd = fd.cpool[cpoolIdx]
        if (childFd instanceof FunctionDef) {
          childFds.push(childFd)
        }
      } else if (op === Opcode.OP_push_const) {
        const cpoolIdx = this.readU32(buf, pc + 1)
        const childFd = fd.cpool[cpoolIdx]
        if (childFd instanceof FunctionDef) {
          childFds.push(childFd)
        }
      }

      pc += opDef.size
    }

    // Recurse into child functions
    for (const childFd of childFds) {
      this.collectAtoms(childFd)
    }
  }

  private rewriteFunction(fd: FunctionDef) {
    if (this.visitedFunctions.has(fd)) {
      return
    }
    this.visitedFunctions.add(fd)

    // Rewrite function definition atoms
    if (fd.funcName !== 0 && this.oldToNew.has(fd.funcName)) {
      fd.funcName = this.oldToNew.get(fd.funcName)!
    }
    if (fd.filename !== 0 && this.oldToNew.has(fd.filename)) {
      fd.filename = this.oldToNew.get(fd.filename)!
    }
    
    for (const arg of fd.args) {
      if (arg.varName !== 0 && this.oldToNew.has(arg.varName)) {
        arg.varName = this.oldToNew.get(arg.varName)!
      }
    }
    
    for (const v of fd.vars) {
      if (v.varName !== 0 && this.oldToNew.has(v.varName)) {
        v.varName = this.oldToNew.get(v.varName)!
      }
    }
    
    for (const cv of fd.closureVar) {
      if (cv.varName !== 0 && this.oldToNew.has(cv.varName)) {
        cv.varName = this.oldToNew.get(cv.varName)!
      }
    }

    // Rewrite bytecode
    const buf = fd.byteCode.buffer // Access raw buffer to modify
    const len = fd.byteCode.size
    let pc = 0
    while (pc < len) {
      const op = buf[pc]
      const opDef = OPCODE_DEFS[Opcode[op]]
      
      if (!opDef) {
        pc++
        continue
      }

      if (opDef.format === OpFormat.atom || 
        opDef.format === OpFormat.atom_u8 || 
        opDef.format === OpFormat.atom_u16 ||
        opDef.format === OpFormat.atom_label_u8 ||
        opDef.format === OpFormat.atom_label_u16) {
        
        let oldIdx = 0
        let offset = pc + 1
        
        if (opDef.format === OpFormat.atom) {
          oldIdx = this.readU32(buf, offset)
        } else if (opDef.format === OpFormat.atom_u8 || opDef.format === OpFormat.atom_label_u8) {
          oldIdx = buf[offset]
        } else if (opDef.format === OpFormat.atom_u16 || opDef.format === OpFormat.atom_label_u16) {
          oldIdx = this.readU16(buf, offset)
        }

        if (this.oldToNew.has(oldIdx)) {
          const newIdx = this.oldToNew.get(oldIdx)!
          
          if (opDef.format === OpFormat.atom) {
            this.writeU32(buf, offset, newIdx)
          } else if (opDef.format === OpFormat.atom_u8 || opDef.format === OpFormat.atom_label_u8) {
            if (newIdx > 255) throw new Error(`Atom index ${newIdx} too large for u8`)
            buf[offset] = newIdx
          } else if (opDef.format === OpFormat.atom_u16 || opDef.format === OpFormat.atom_label_u16) {
            if (newIdx > 65535) throw new Error(`Atom index ${newIdx} too large for u16`)
            this.writeU16(buf, offset, newIdx)
          }
        }
      }

      // Recurse into child functions
      if (op === Opcode.OP_fclosure) {
        const cpoolIdx = this.readU32(buf, pc + 1)
        const childFd = fd.cpool[cpoolIdx]
        if (childFd instanceof FunctionDef) {
          this.rewriteFunction(childFd)
        }
      } else if (op === Opcode.OP_fclosure8) {
        const cpoolIdx = buf[pc + 1]
        const childFd = fd.cpool[cpoolIdx]
        if (childFd instanceof FunctionDef) {
          this.rewriteFunction(childFd)
        }
      }

      pc += opDef.size
    }
  }

  private readU16(buf: Uint8Array, offset: number): number {
    return buf[offset] | (buf[offset + 1] << 8)
  }

  private readU32(buf: Uint8Array, offset: number): number {
    return buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16) | (buf[offset + 3] << 24)
  }

  private writeU16(buf: Uint8Array, offset: number, val: number) {
    buf[offset] = val & 0xff
    buf[offset + 1] = (val >> 8) & 0xff
  }

  private writeU32(buf: Uint8Array, offset: number, val: number) {
    buf[offset] = val & 0xff
    buf[offset + 1] = (val >> 8) & 0xff
    buf[offset + 2] = (val >> 16) & 0xff
    buf[offset + 3] = (val >> 24) & 0xff
  }
}
