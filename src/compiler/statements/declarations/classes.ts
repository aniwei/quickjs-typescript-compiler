import * as ts from 'typescript'
import { Opcode } from '../../../env'
import type { Compiler } from '../../../compiler'
import { FunctionDef } from '../../../functionDef'
import { VarKind } from '../../../vars'
import { getInstructionSize } from '../../analysis/opcodeInfo'
import {
  createConstructorFunctionExpression,
  createInternalIdentifier,
  createMethodFunctionExpression,
} from './helpers'

const enum ClassFlags {
  None = 0,
  HasHeritage = 1 << 0,
}

const enum DefineMethodKind {
  Method = 0,
  Getter = 1,
  Setter = 2,
}

interface CompiledMethod {
  readonly constantIndex: number
  readonly atom: number
  readonly kind: DefineMethodKind
  readonly isStatic: boolean
  readonly node: ts.Node
}

export function compileClassDeclaration(compiler: Compiler, node: ts.ClassDeclaration) {
  const hasExportModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false
  const hasDefaultModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword) ?? false
  const isModuleTopLevel = compiler.isModuleTopLevelScope()

  const classIdentifier = ensureClassIdentifier(node, hasDefaultModifier)
  const classAtom = compiler.getAtomId(classIdentifier.text)
  ensureUniqueBinding(compiler, classIdentifier)

  const capture = isModuleTopLevel
  const classVarIndex = compiler.declareLexicalVariable(classAtom, { isConst: true, isLet: true, capture })
  const classVar = compiler.getFunctionVar(classVarIndex)
  const classLocalSlot = compiler.getLocalVarSlot(classAtom)
  if (classLocalSlot !== undefined) {
    compiler.emitSetLocalUninitialized(classLocalSlot, classVar.scopeLevel)
  }

  if (compiler.isGlobalVarContext() && isModuleTopLevel) {
    compiler.registerGlobalVar(classAtom, {
      scopeLevel: classVar.scopeLevel,
      isLexical: classVar.isLexical,
      isConst: classVar.isConst,
      forceInit: false,
    })
  }

  if (isModuleTopLevel && hasExportModifier) {
    const exportedAtom = hasDefaultModifier ? compiler.getAtomId('default') : classAtom
    compiler.registerModuleLocalExport(exportedAtom, classVarIndex)
  }

  const classFieldsAtom = compiler.getAtomId('class_fields_init')
  const classFieldsVarIndex = compiler.declareLexicalVariable(classFieldsAtom, {
    isConst: true,
    isLet: true,
    capture: true,
    kind: VarKind.NORMAL,
  })
  const classFieldsVar = compiler.getFunctionVar(classFieldsVarIndex)
  const classFieldsSlot = compiler.getLocalVarSlot(classFieldsAtom)
  if (classFieldsSlot !== undefined) {
    compiler.emitSetLocalUninitialized(classFieldsSlot, classFieldsVar.scopeLevel)
  }

  const heritageClause = node.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)
  const hasHeritage = Boolean(heritageClause)

  if (heritageClause) {
    const baseType = heritageClause.types[0]
    if (!baseType) {
      throw new Error('Extends clause must specify a base type')
    }
    compiler.withSourceNode(baseType.expression, () => {
      compiler.compileExpression(baseType.expression)
    })
  } else {
    compiler.emitRawOpcode(Opcode.OP_undefined, [], node)
  }
  const constructorInfo = compileConstructorFunction(compiler, node, classIdentifier, hasHeritage)
  compiler.emitPushConstantIndex(constructorInfo.constantIndex, constructorInfo.debugNode)
  compiler.emitDefineClass(classAtom, hasHeritage ? ClassFlags.HasHeritage : ClassFlags.None, node)

  const compiledMethods = compileMethods(compiler, node, classIdentifier)
  emitMethods(compiler, compiledMethods)

  compiler.emitRawOpcode(Opcode.OP_undefined, [], node)
  compiler.emitStoreToLexical(classFieldsAtom)
  compiler.emitRawOpcode(Opcode.OP_drop, [], node)
  compiler.emitStoreToLexical(classAtom)
  if (classFieldsSlot !== undefined) {
    compiler.emitRawOpcode(Opcode.OP_close_loc, [classFieldsSlot], node)
  }
  compiler.recordStatementDebug(node)
}

function ensureClassIdentifier(node: ts.ClassDeclaration, hasDefaultModifier: boolean): ts.Identifier {
  if (node.name) {
    return node.name
  }
  if (!hasDefaultModifier) {
    throw new Error('Class declaration must have a name unless it is a default export')
  }
  return createInternalIdentifier('default_class', node)
}

function ensureUniqueBinding(compiler: Compiler, identifier: ts.Identifier) {
  const atom = compiler.getAtomId(identifier.text)
  if (compiler.hasBindingInCurrentScope(atom)) {
    throw new Error(`Identifier '${identifier.text}' has already been declared in this scope`)
  }
}

function compileConstructorFunction(
  compiler: Compiler,
  classNode: ts.ClassDeclaration,
  classIdentifier: ts.Identifier,
  hasHeritage: boolean,
) {
  const constructorDecl = classNode.members.find((member): member is ts.ConstructorDeclaration => ts.isConstructorDeclaration(member))
  
  if (hasHeritage) {
    compiler.scheduleChildSetup((childCompiler: Compiler) => {
      childCompiler.beginDerivedConstructorContext()
    })
  }

  let constructorFunction: FunctionDef
  if (constructorDecl) {
    constructorFunction = compiler.compileChildFunction(constructorDecl, compiler.getAtomId(classIdentifier.text), {
      isExpression: true,
    })
  } else {
    let ctorExpression = createConstructorFunctionExpression(classNode, classIdentifier, constructorDecl, hasHeritage)
    constructorFunction = compiler.compileChildFunction(ctorExpression, compiler.getAtomId(classIdentifier.text), {
      isExpression: true,
    })
  }

  constructorFunction.bytecode.hasPrototype = false
  constructorFunction.bytecode.newTargetAllowed = true
  constructorFunction.bytecode.superAllowed = true
  constructorFunction.bytecode.superCallAllowed = hasHeritage
  constructorFunction.bytecode.isDerivedClassConstructor = hasHeritage

  if (process.env.DEBUG_DERIVED === '1' && hasHeritage) {
    const dump: Array<{ offset: number; opcode: string | number; rawOpcode: number; operands: number[] }> = []
    let offset = 0
    for (const instruction of constructorFunction.bytecode.instructions) {
      dump.push({
        offset,
        opcode: Opcode[instruction.opcode] ?? instruction.opcode,
        rawOpcode: instruction.opcode,
        operands: instruction.operands,
      })
      offset += getInstructionSize(instruction)
    }
    console.log('derived constructor before constant', {
      className: classIdentifier.text,
      instructionCount: dump.length,
      dump,
    })
  }

  const constantIndex = compiler.addFunctionConstant(constructorFunction)
  return { constantIndex, debugNode: constructorDecl ?? classNode }
}

function compileMethods(
  compiler: Compiler,
  node: ts.ClassDeclaration,
  classIdentifier: ts.Identifier,
): CompiledMethod[] {
  const results: CompiledMethod[] = []
  for (const member of node.members) {
    if (ts.isConstructorDeclaration(member)) {
      continue
    }
    const modifiers = ts.canHaveModifiers(member) ? ts.getModifiers(member) : undefined
    const isStatic = modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) ?? false

    if (ts.isMethodDeclaration(member) || ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member)) {
      const methodName = ts.isIdentifier(member.name) ? member.name.text : ''
      const methodFunc = compiler.compileChildFunction(member, compiler.getAtomId(methodName), { isExpression: true })
      methodFunc.bytecode.hasPrototype = false
      methodFunc.bytecode.newTargetAllowed = false
      methodFunc.bytecode.needHomeObject = !isStatic
      const constantIndex = compiler.addFunctionConstant(methodFunc)
      const atom = getMemberAtom(compiler, member.name)
      results.push({
        constantIndex,
        atom,
        kind: getMethodKind(member),
        isStatic,
        node: member,
      })
      continue
    }

    if (ts.isPropertyDeclaration(member)) {
      if (member.initializer) {
        throw new Error('Class field initializers are not supported yet')
      }
      continue
    }

    throw new Error(`Unsupported class member kind: ${ts.SyntaxKind[member.kind]}`)
  }
  return results
}

function emitMethods(compiler: Compiler, methods: CompiledMethod[]) {
  for (const method of methods) {
    if (method.isStatic) {
      compiler.emitRawOpcode(Opcode.OP_swap, [], method.node)
    }
    compiler.emitPushConstantIndex(method.constantIndex, method.node)
    compiler.emitRawOpcode(Opcode.OP_define_method, [method.atom, method.kind], method.node)
    if (method.isStatic) {
      compiler.emitRawOpcode(Opcode.OP_swap, [], method.node)
    }
  }
}

function getMemberAtom(compiler: Compiler, name: ts.PropertyName): number {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) || ts.isNumericLiteral(name)) {
    return compiler.getAtomId(name.text)
  }
  throw new Error('Computed property names are not supported in classes yet')
}

function getMethodKind(member: ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration): DefineMethodKind {
  if (ts.isGetAccessorDeclaration(member)) {
    return DefineMethodKind.Getter
  }
  if (ts.isSetAccessorDeclaration(member)) {
    return DefineMethodKind.Setter
  }
  return DefineMethodKind.Method
}
