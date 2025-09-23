/**
 * Represents the definition of a function during compilation, analogous to
 * `JSFunctionDef` in QuickJS's `parser.h`. This class serves as a workspace
 * for collecting all information needed to compile a single function.
 */

import { AtomTable, Atom } from './atoms';
import { Constants } from './constant';
import { LabelManager } from './label';
import { OpcodeGenerator } from './opcodeGenerator';
import { BytecodeWriter, Instruction } from './bytecode';
import { CompilerFlags } from './opcodes';
import { ConfigManager } from './config';
import { LoopContext, Scope } from './types';

type JSFunctionKind = 0 | 1 | 2 | 3; // JS_FUNC_NORMAL, JS_FUNC_GENERATOR, JS_FUNC_ASYNC, JS_FUNC_ASYNC_GENERATOR

export class JSFunctionDef {
  parent?: JSFunctionDef;
  parent_scope_level: number = 0;

  func_kind: JSFunctionKind = 0;
  func_name: Atom = 0;

  // Scope management
  scopes: Scope[] = [];
  scopeLevel: number = 0;

  has_prototype: boolean = false;
  has_simple_parameter_list: boolean = true;
  is_derived_class_constructor: boolean = false;
  need_home_object: boolean = false;
  new_target_allowed: boolean = false;
  super_call_allowed: boolean = false;
  super_allowed: boolean = false;
  arguments_allowed: boolean = true;
  has_debug: boolean = true; // Assume we always generate debug info for now
  is_direct_or_indirect_eval: boolean = false;

  // Variable management
  vars: {
    name: string
    scopeLevel: number
    scopeNext: number
    kind: 'var' | 'let' | 'const'
  }[] = []
  locals: Map<string, number> = new Map()
  nextLocalIndex: number = 0
  varKinds: Map<string, 'var' | 'let' | 'const'> = new Map()
  moduleScopeLocals: Set<string> = new Set()

  // Loop management
  loopStack: LoopContext[] = []

  // Bytecode generation components
  bytecodeWriter: BytecodeWriter;
  opcodeGenerator: OpcodeGenerator;
  constantsPool: Constants;
  labelManager: LabelManager;

  constructor(atomTable: AtomTable, opcodeGenerator: OpcodeGenerator, flags: CompilerFlags, parent?: JSFunctionDef) {
    this.parent = parent;
    this.opcodeGenerator = opcodeGenerator;
    this.constantsPool = new Constants();
    this.labelManager = new LabelManager();
    this.bytecodeWriter = new BytecodeWriter(flags, atomTable, this.constantsPool, this.labelManager, opcodeGenerator);
  }

  // Scope management methods
  enterScope(type: Scope['type']): void {
    const scope: Scope = {
      type,
      locals: new Set(),
      parent: this.scopes[this.scopes.length - 1],
    };
    this.scopes.push(scope);
  }

  exitScope(): void {
    this.scopes.pop();
  }

  getCurrentScope(): Scope | undefined {
    return this.scopes[this.scopes.length - 1];
  }

  // Local variable management methods
  declareLocal(name: string): number {
    const index = this.nextLocalIndex++;
    this.locals.set(name, index);

    const scope = this.getCurrentScope();
    if (scope) {
      scope.locals.add(name);
      if (scope.type === 'module') {
        this.moduleScopeLocals.add(name);
      }
    }

    return index;
  }

  getLocalIndex(name: string): number | undefined {
    return this.locals.get(name);
  }

  isModuleVar(name: string): boolean {
    return this.moduleScopeLocals.has(name);
  }
}
