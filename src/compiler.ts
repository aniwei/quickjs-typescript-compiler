import * as ts from 'typescript'
import { Atom, AtomTable } from './atoms'
import { FunctionDef } from './functionDef'
import { ScopeManager } from './scopeManager'
import { Var, VarKind } from './vars'
import { Opcode, OPCODE_DEFS, type OpcodeDefinition } from './env'

export interface CompilerOptions {
  atomTable?: AtomTable
}

export class Compiler {
  private readonly sourceFile: ts.SourceFile
  private readonly program: ts.Program
  private readonly checker: ts.TypeChecker

  private readonly atomTable: AtomTable
  private currentFunction!: FunctionDef
  private scopeManager!: ScopeManager
  private readonly bindingStack: Map<Atom, number>[] = []
  private readonly opcodeInfoByCode = new Map<number, OpcodeDefinition>()

  private stackDepth = 0
  private maxStackDepth = 0

  constructor(private readonly fileName: string, private readonly sourceCode: string, options: CompilerOptions = {}) {
    this.atomTable = options.atomTable ?? new AtomTable()
    this.sourceFile = ts.createSourceFile(
      this.fileName,
      this.sourceCode,
      ts.ScriptTarget.ES2020,
      true
    )

    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
    }

    const host = ts.createCompilerHost(compilerOptions)
    host.getSourceFile = (fileName, languageVersion) => {
      if (fileName === this.fileName) {
        return this.sourceFile
      }
      return undefined
    }

    this.program = ts.createProgram([this.fileName], compilerOptions, host)
    this.checker = this.program.getTypeChecker()

    const opcodeEnum = Opcode as unknown as Record<string, number>
    for (const [key, def] of Object.entries(OPCODE_DEFS)) {
      const opcodeValue = opcodeEnum[key]
      if (typeof opcodeValue === 'number') {
        this.opcodeInfoByCode.set(opcodeValue, def)
      }
    }
  }

  compile(): FunctionDef {
    const mainAtom = this.atomTable.getAtomId('<main>')
    const rootFunction = new FunctionDef(mainAtom, this.sourceCode, this.fileName)
    this.currentFunction = rootFunction
    this.scopeManager = new ScopeManager(rootFunction)

    this.pushScope()
    ts.forEachChild(this.sourceFile, (node) => this.visitNode(node))
    this.emitOpcode(Opcode.OP_return_undef)
    this.popScope()

    rootFunction.bytecode.stackSize = this.maxStackDepth
    return rootFunction
  }

  private visitNode(node: ts.Node): void {
    switch (node.kind) {
      case ts.SyntaxKind.VariableStatement:
        this.compileVariableStatement(node as ts.VariableStatement)
        return
      case ts.SyntaxKind.NumericLiteral:
        this.compileNumericLiteral(node as ts.NumericLiteral)
        return
      default:
        ts.forEachChild(node, (child) => this.visitNode(child))
    }
  }

  private compileVariableStatement(node: ts.VariableStatement) {
    const flags = node.declarationList.flags
    const isConst = (flags & ts.NodeFlags.Const) !== 0
    const isLet = (flags & ts.NodeFlags.Let) !== 0

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) {
        throw new Error('Destructuring is not supported yet')
      }

      const nameText = declaration.name.text
      const atom = this.atomTable.getAtomId(nameText)

      const varIndex = this.declareLexicalVariable(atom, { isConst, isLet })
      this.bindCurrentScope(atom, varIndex)

      if (declaration.initializer) {
        this.visitNode(declaration.initializer)
      } else if (isConst || isLet) {
        // Lexical declarations without initializer are initialized to undefined
        this.emitOpcode(Opcode.OP_undefined)
      }

      if (isConst || isLet) {
        this.emitPutVarInit(atom)
      } else {
        // var declarations: TODO
        throw new Error('var declarations are not implemented yet')
      }
    }
  }

  private compileNumericLiteral(node: ts.NumericLiteral) {
    const value = Number(node.text)
    this.emitOpcode(Opcode.OP_push_i32, [value | 0])
  }

  private declareLexicalVariable(atom: Atom, options: { isConst: boolean; isLet: boolean }): number {
    const variable = new Var(atom, {
      isConst: options.isConst,
      isLexical: true,
      kind: VarKind.NORMAL,
      scopeLevel: this.scopeManager.currentScope(),
    })
    return this.currentFunction.addVar(variable)
  }

  private bindCurrentScope(atom: Atom, index: number) {
    this.scopeManager.bindVarToCurrentScope(index)
    const bindings = this.bindingStack[this.bindingStack.length - 1]
    bindings.set(atom, index)
  }

  private emitPutVarInit(atom: Atom) {
    this.emitOpcode(Opcode.OP_put_var_init, [atom])
  }

  private emitOpcode(opcode: Opcode, operands: number[] = []) {
    const def = this.opcodeInfoByCode.get(opcode)
    if (!def) {
      throw new Error(`Unknown opcode: ${opcode}`)
    }

    this.stackDepth -= def.nPop
    if (this.stackDepth < 0) {
      this.stackDepth = 0
    }
    this.stackDepth += def.nPush
    if (this.stackDepth > this.maxStackDepth) {
      this.maxStackDepth = this.stackDepth
    }

    this.currentFunction.bytecode.pushOpcode(opcode, operands)
    this.currentFunction.bytecode.stackSize = this.maxStackDepth
  }

  private pushScope() {
    this.scopeManager.enterScope()
    this.bindingStack.push(new Map())
  }

  private popScope() {
    this.scopeManager.leaveScope()
    this.bindingStack.pop()
  }
}

export function createNewCompiler(fileName: string, sourceCode: string, options: CompilerOptions = {}) {
  return new Compiler(fileName, sourceCode, options)
}