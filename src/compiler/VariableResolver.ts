import { CompilerContext } from './CompilerContext'
import { FunctionDef, JSVarDef, JSVarKind } from './FunctionDef'
import { Opcode, BytecodeTag, OPCODE_DEFS, JSAtom } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { Label, RecordedJump } from './Compiler'

// Internal opcodes used for variable resolution (not part of standard bytecode)
// Values chosen to avoid conflict with standard opcodes (max is ~236)


export class VariableResolver {
  constructor(private context: CompilerContext) {}

  private get compiler() {
    return this.context.compiler
  }

  /**
   * Mimics resolve_variables from QuickJS parser.c
   * Iterates over the bytecode and resolves Opcode.OP_scope_* opcodes.
   */
  resolveVariables(fd: FunctionDef): void {
    console.error('VariableResolver.resolveVariables called for ' + fd.funcName)
    const bcBuf = fd.byteCode.buffer
    const bcLen = fd.byteCode.size
    const bcOut = new BytecodeBuilder()
    
    // Get labels and jumps to patch
    const labels = this.compiler.labelsFor(fd)
    const jumps = this.compiler.jumpsFor(fd)
    
    const labelLookup = new Map<number, Label[]>()
    for (const l of labels) {
       if (!labelLookup.has(l.addr)) labelLookup.set(l.addr, [])
       labelLookup.get(l.addr)!.push(l)
    }
    
    const jumpLookup = new Map<number, RecordedJump[]>()
    for (const j of jumps) {
       if (!jumpLookup.has(j.pos)) jumpLookup.set(j.pos, [])
       jumpLookup.get(j.pos)!.push(j)
    }

    let pos = 0
    let posNext = 0
    let op: number
    let len: number

    // TODO: Handle global variable checks (first pass in QuickJS)
    // For now, we skip the global var check pass and focus on resolution.

    while (pos < bcLen) {
      // Patch labels pointing to this position
      if (labelLookup.has(pos)) {
        for (const l of labelLookup.get(pos)!) {
          l.addr = bcOut.size
        }
      }
      // Patch jumps at this position
      if (jumpLookup.has(pos)) {
        for (const j of jumpLookup.get(pos)!) {
          j.pos = bcOut.size
        }
      }

      op = bcBuf[pos]
      if (op >= 200) console.log(`VariableResolver: Found op ${op} at ${pos}`)
      const opInfo = OPCODE_DEFS[Opcode[op]]
      if (!opInfo) {
        // Should not happen if opcode is valid
        console.error(`Unknown opcode at pos ${pos}: ${op}`)
        break
      }
      len = opInfo.size
      posNext = pos + len

      switch (op) {
        case Opcode.OP_scope_get_var:
        case Opcode.OP_scope_put_var:
        case Opcode.OP_scope_delete_var:
        case Opcode.OP_scope_get_var_undef:
        case Opcode.OP_scope_get_var_checkthis:
        case Opcode.OP_scope_put_var_init:
        case Opcode.OP_scope_get_ref:
        {
          const varName = this.getU32(bcBuf, pos + 1)
          const scopeLevel = this.getU16(bcBuf, pos + 5)
          
          // Resolve the variable
          this.resolveScopeVar(fd, varName, scopeLevel, op, bcOut)
          break
        }
        
        case Opcode.OP_scope_make_ref: {
          const varName = this.getU32(bcBuf, pos + 1)
          const label = this.getU32(bcBuf, pos + 5)
          const scopeLevel = this.getU16(bcBuf, pos + 9)
          
          this.resolveScopeVar(fd, varName, scopeLevel, op, bcOut, label)
          break
        }

        case Opcode.OP_enter_scope: {
          const scope = this.getU16(bcBuf, pos + 1)
          
          // Instantiate hoisted definitions (functions) if this is the body scope
          // In QuickJS, body_scope is typically 0 (or 1 if arguments are separate).
          // We assume scope 0 is the body scope for now.
          if (scope === 0) {
             for (let i = 0; i < fd.vars.length; i++) {
                const v = fd.vars[i]
                // QuickJS checks scope_level == 0 for hoisted definitions
                if (v.scopeLevel === 0 && 
                   (v.varKind === JSVarKind.JS_VAR_FUNCTION_DECL || 
                    v.varKind === JSVarKind.JS_VAR_NEW_FUNCTION_DECL)) {
                    // Initialize hoisted function declaration
                    bcOut.putByte(Opcode.OP_fclosure)
                    bcOut.putU32(v.funcPoolIdx)
                    bcOut.putByte(Opcode.OP_put_loc)
                    bcOut.putU16(i)
                }
             }
          }

          // Initialize variables in this scope
          for (let i = 0; i < fd.vars.length; i++) {
            const v = fd.vars[i]
            if (v.scopeLevel === scope) {
              // Skip arguments? In QuickJS: if (scope_idx != s->arguments_arg_idx)
              // We assume arguments are not in fd.vars (they are in fd.args), or handled separately.
              // fd.vars usually contains locals.
              
              if (v.varKind === JSVarKind.JS_VAR_FUNCTION_DECL || 
                  v.varKind === JSVarKind.JS_VAR_NEW_FUNCTION_DECL) {
                // Initialize lexical variable upon entering scope
                bcOut.putByte(Opcode.OP_fclosure)
                bcOut.putU32(v.funcPoolIdx)
                bcOut.putByte(Opcode.OP_put_loc)
                bcOut.putU16(i)
              } else {
                // XXX: should check if variable can be used before initialization
                bcOut.putByte(Opcode.OP_set_loc_uninitialized)
                bcOut.putU16(i)
              }
            }
          }
          break
        }

        case Opcode.OP_leave_scope: {
          const scope = this.getU16(bcBuf, pos + 1)
          // Close captured variables in this scope
          for (let i = 0; i < fd.vars.length; i++) {
            const v = fd.vars[i]
            if (v.scopeLevel === scope) {
              if (v.isCaptured) {
                bcOut.putByte(Opcode.OP_close_loc)
                bcOut.putU16(i)
              }
            }
          }
          break
        }

        // TODO: Handle OP_eval, OP_apply_eval (scope fixups)

        default:
          // Copy instruction as is
          bcOut.put(bcBuf.subarray(pos, posNext))
          break
      }
      
      pos = posNext
    }

    // Patch labels pointing to end of bytecode
    if (labelLookup.has(pos)) {
      for (const l of labelLookup.get(pos)!) {
        l.addr = bcOut.size
      }
    }

    // Replace bytecode
    fd.byteCode = bcOut
  }

  private resolveScopeVar(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number,
    op: number,
    bcOut: BytecodeBuilder,
    label: number = 0
  ): void {
    // Mimics resolve_scope_var logic
    console.log(`[VariableResolver] resolveScopeVar: varName=${varName} scopeLevel=${scopeLevel} op=${op}`)
    
    let varIdx = -1
    let isPut = (op === Opcode.OP_scope_put_var || op === Opcode.OP_scope_put_var_init || op === Opcode.OP_scope_make_ref)
    
    // 1. Check local scopes
    // QuickJS iterates s->scopes[scope_level] linked list.
    // In our FunctionDef, we have fd.vars which contains all locals.
    // We need to filter by scope level?
    // Or we can assume fd.vars is the flat list of all locals in this function.
    // But we need to respect the requested scopeLevel (from the opcode).
    // The opcode's scopeLevel is the index into s->scopes.
    
    // In our current implementation, we might not be populating s->scopes fully yet.
    // But let's assume we can search fd.vars.
    
    // QuickJS logic:
    // for (idx = s->scopes[scope_level].first; idx >= 0; idx = vd->scope_next)
    
    // We need to find the variable in fd.vars that matches varName and is visible from scopeLevel.
    // Since we don't have the linked list structure fully mirrored in TS yet (maybe),
    // we can iterate all vars and check scope compatibility?
    // Actually, HoistVariables sets up scopeLevel on vars.
    
    // Let's iterate fd.vars backwards (shadowing)
    for (let i = fd.vars.length - 1; i >= 0; i--) {
      const v = fd.vars[i]
      if (v.varName === varName && v.scopeLevel <= scopeLevel) {
        // Found local variable
        varIdx = i
        break
      }
    }
    
    if (varIdx >= 0) {
      // Found local variable
      const v = fd.vars[varIdx]
      
      if (op === Opcode.OP_scope_put_var || op === Opcode.OP_scope_make_ref) {
        if (v.isConst) {
           bcOut.putByte(Opcode.OP_throw_error)
           bcOut.putU32(varName)
           bcOut.putByte(0) // JS_THROW_VAR_RO
           return
        }
      }
      
      // Emit appropriate opcode
      switch (op) {
        case Opcode.OP_scope_put_var:
        case Opcode.OP_scope_put_var_init:
          if (v.isLexical) {
             if (op === Opcode.OP_scope_put_var_init) {
               if (varName === JSAtom.JS_ATOM_this) {
                 bcOut.putByte(Opcode.OP_put_loc_check_init)
               } else {
                 bcOut.putByte(Opcode.OP_put_loc)
               }
             } else {
               bcOut.putByte(Opcode.OP_put_loc_check)
             }
          } else {
             bcOut.putByte(Opcode.OP_put_loc)
          }
          bcOut.putU16(varIdx)
          break
          
        case Opcode.OP_scope_get_var:
        case Opcode.OP_scope_get_var_undef:
        case Opcode.OP_scope_get_var_checkthis:
           if (v.isLexical) {
             if (op === Opcode.OP_scope_get_var_checkthis) {
               bcOut.putByte(Opcode.OP_get_loc_checkthis)
             } else {
               bcOut.putByte(Opcode.OP_get_loc_check)
             }
           } else {
             bcOut.putByte(Opcode.OP_get_loc)
           }
           bcOut.putU16(varIdx)
           break
           
        case Opcode.OP_scope_make_ref:
           bcOut.putByte(Opcode.OP_make_loc_ref)
           bcOut.putU16(varIdx)
           bcOut.putU32(label)
           break

        case Opcode.OP_scope_delete_var:
           bcOut.putByte(Opcode.OP_push_false)
           break
      }
      return
    }
    
    // 2. If not found locally, check arguments
    for (let i = 0; i < fd.args.length; i++) {
      const arg = fd.args[i]
      if (arg.varName === varName) {
        // Found argument
        switch (op) {
          case Opcode.OP_scope_put_var:
            if (i === 0) {
              bcOut.putByte(Opcode.OP_put_arg0 - 19)
            } else if (i === 1) {
              bcOut.putByte(Opcode.OP_put_arg1 - 19)
            } else if (i === 2) {
              bcOut.putByte(Opcode.OP_put_arg2 - 19)
            } else if (i === 3) {
              bcOut.putByte(Opcode.OP_put_arg3 - 19)
            } else {
              bcOut.putByte(Opcode.OP_put_arg)
              bcOut.putU16(i)
            }
            break
          case Opcode.OP_scope_get_var:
          case Opcode.OP_scope_get_var_undef:
          case Opcode.OP_scope_get_var_checkthis:
            if (i === 0) {
              bcOut.putByte(Opcode.OP_get_arg0 - 19)
            } else if (i === 1) {
              bcOut.putByte(Opcode.OP_get_arg1 - 19)
            } else if (i === 2) {
              bcOut.putByte(Opcode.OP_get_arg2 - 19)
            } else if (i === 3) {
              bcOut.putByte(Opcode.OP_get_arg3 - 19)
            } else {
              bcOut.putByte(Opcode.OP_get_arg)
              bcOut.putU16(i)
            }
            break
          case Opcode.OP_scope_make_ref:
            bcOut.putByte(Opcode.OP_make_arg_ref)
            bcOut.putU16(i)
            bcOut.putU32(label)
            break
          case Opcode.OP_scope_delete_var:
            bcOut.putByte(Opcode.OP_push_false)
            break
        }
        return
      }
    }
    
    // 3. Find in parent (Closure)
    // This requires modifying fd.closureVars if found.
    const closureIdx = this.findVarInParent(fd, varName)
    if (closureIdx >= 0) {
      // Found in parent, added as closure var
      switch (op) {
        case Opcode.OP_scope_put_var:
          bcOut.putByte(Opcode.OP_put_var_ref)
          bcOut.putU16(closureIdx)
          break
        case Opcode.OP_scope_get_var:
          bcOut.putByte(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          break
        case Opcode.OP_scope_make_ref:
          bcOut.putByte(Opcode.OP_make_var_ref_ref)
          bcOut.putU16(closureIdx)
          bcOut.putU32(label)
          break
        case Opcode.OP_scope_delete_var:
          bcOut.putByte(Opcode.OP_push_false)
          break
      }
      return
    }
    
    // 4. Global variable
    switch (op) {
      case Opcode.OP_scope_put_var:
        bcOut.putByte(Opcode.OP_put_var)
        bcOut.putU32(varName)
        break
      case Opcode.OP_scope_get_var:
        bcOut.putByte(Opcode.OP_get_var)
        bcOut.putU32(varName)
        break
      case Opcode.OP_scope_make_ref:
        bcOut.putByte(Opcode.OP_make_var_ref)
        bcOut.putU32(varName)
        bcOut.putU32(label)
        break
      case Opcode.OP_scope_delete_var:
        bcOut.putByte(Opcode.OP_delete_var)
        bcOut.putU32(varName)
        break
    }
  }

  private findVarInParent(fd: FunctionDef, varName: number): number {
    if (!fd.parent) return -1
    const parent = fd.parent
    
    // Check parent locals
    for (let i = 0; i < parent.vars.length; i++) {
      if (parent.vars[i].varName === varName) {
        return this.compiler.addClosureVarWithAtom(fd, varName, true, false, i, parent.vars[i].varKind, parent.vars[i].isConst, parent.vars[i].isLexical)
      }
    }
    
    // Check parent args
    for (let i = 0; i < parent.args.length; i++) {
      if (parent.args[i].varName === varName) {
        return this.compiler.addClosureVarWithAtom(fd, varName, false, true, i, JSVarKind.JS_VAR_NORMAL, false, false)
      }
    }
    
    // Check parent closures
    for (let i = 0; i < parent.closureVar.length; i++) {
      if (parent.closureVar[i].varName === varName) {
        const cv = parent.closureVar[i]
        return this.compiler.addClosureVarWithAtom(fd, varName, false, false, i, cv.varKind, cv.isConst, cv.isLexical)
      }
    }
    
    // Recurse
    const parentClosureIdx = this.findVarInParent(parent, varName)
    if (parentClosureIdx >= 0) {
      const cv = parent.closureVar[parentClosureIdx]
      return this.compiler.addClosureVarWithAtom(fd, varName, false, false, parentClosureIdx, cv.varKind, cv.isConst, cv.isLexical)
    }
    
    return -1
  }

  private getU16(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8)
  }

  private getU32(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)
  }
}
