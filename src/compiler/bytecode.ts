import * as ts from 'typescript'
import * as fs from 'fs'
import { OpCode } from './opcodes'
import { parse } from './parser'

export enum FeatureFlags {
  ShortOpCodes = 1 << 0,
  BigNum = 1 << 1,
}

class BytecodeGenerator {
  private bytecode: number[] = []
  private constants: any[] = []
  private atoms: string[] = []
  private flags: FeatureFlags
  private labels: { patches: number[]; pos: number }[] = []

  constructor(
    private ast: ts.SourceFile, 
    flags: FeatureFlags
  ) {
    this.flags = flags
  }

  generate(): Uint8Array {
    this.visitNode(this.ast)
    return new Uint8Array(this.bytecode)
  }

  private isSupportShortOpCodes(): boolean {
    return !!(this.flags & FeatureFlags.ShortOpCodes)
  }

  private isSupportBigNum(): boolean {
    return !!(this.flags & FeatureFlags.BigNum)
  }

  private visitNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.SourceFile:
        ts.forEachChild(node, this.visitNode.bind(this))
        break
      case ts.SyntaxKind.VariableStatement:
        this.visitVariableStatement(node as ts.VariableStatement)
        break
      case ts.SyntaxKind.ExpressionStatement:
        this.visitNode((node as ts.ExpressionStatement).expression)
        // 仅在顶层（SourceFile 直接子级）才合成 return，
        // 在块/循环体内不应插入 return
        if (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile) {
          this.emit(OpCode.return)
        }
        break
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.visitArrayLiteralExpression(node as ts.ArrayLiteralExpression)
        break
      case ts.SyntaxKind.BinaryExpression:
        this.visitBinaryExpression(node as ts.BinaryExpression)
        break
      case ts.SyntaxKind.NumericLiteral:
        this.visitNumericLiteral(node as ts.NumericLiteral)
        break
      case ts.SyntaxKind.Identifier:
        this.visitIdentifier(node as ts.Identifier)
        break
      case ts.SyntaxKind.PropertyAccessExpression:
        this.visitPropertyAccessExpression(node as ts.PropertyAccessExpression)
        break
      case ts.SyntaxKind.Block: {
        const blk = node as ts.Block
        for (const st of blk.statements) {
          this.visitNode(st)
        }
        break
      }
      case ts.SyntaxKind.CallExpression:
        this.visitCallExpression(node as ts.CallExpression)
        break
      case ts.SyntaxKind.ForOfStatement: {
        const st = node as ts.ForOfStatement
        // for (const x of expr) { body }
        // 1) eval iterable
        this.visitNode(st.expression)
        // 2) init iterator
        this.emit(OpCode.for_of_start)

        const head = this.newLabel()
        const body = this.newLabel()
        const end = this.newLabel()

        // loop head
        this.markLabel(head)
        // 3) next -> value/done
        this.emit(OpCode.for_of_next)
        this.emitU8(0) // offset = 0 (we keep iterator record at top region in our simplified model)
        this.emit(OpCode.iterator_get_value_done)

        // if (done == false) jump to body; else fallthrough to end
        this.emitIfFalse(body)
        this.emitGoto(end)

        // body
        this.markLabel(body)

        // assign loop variable from value on stack
        if (ts.isVariableDeclarationList(st.initializer)) {
          const decl = st.initializer.declarations[0]
          if (decl && ts.isIdentifier(decl.name)) {
            const atom = this.getAtomIndex(decl.name.text)
            this.emit(OpCode.put_var)
            this.emitInt32(atom)
          }
        } else if (ts.isIdentifier(st.initializer as any)) {
          const id = st.initializer as any as ts.Identifier
          const atom = this.getAtomIndex(id.text)
          this.emit(OpCode.put_var)
          this.emitInt32(atom)
        }

        this.visitNode(st.statement)
        this.emitGoto(head)

        // end / close iterator
        this.markLabel(end)
        this.emit(OpCode.iterator_close)
        break
      }
      case ts.SyntaxKind.EmptyStatement:
      case ts.SyntaxKind.EndOfFileToken:
        // Ignore
        break
      default:
        console.warn(`Unsupported node kind: ${ts.SyntaxKind[node.kind]}`)
    }
  }

  private visitVariableStatement(node: ts.VariableStatement) {
    for (const decl of node.declarationList.declarations) {
      if (decl.initializer) {
        this.visitNode(decl.initializer)
      } else {
        this.emit(OpCode.undefined)
      }
      if (ts.isIdentifier(decl.name)) {
        const atomIndex = this.getAtomIndex(decl.name.text)
        this.emit(OpCode.put_var)
        this.emitInt32(atomIndex)
      }
    }
  }

  private visitIdentifier(node: ts.Identifier) {
    const atomIndex = this.getAtomIndex(node.text)
    this.emit(OpCode.get_var)
    this.emitInt32(atomIndex)
  }

  private visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    // obj.prop -> push obj then get_field atom(prop)
    this.visitNode(node.expression)
    const propAtom = this.getAtomIndex(node.name.text)
    this.emit(OpCode.get_field)
    this.emitInt32(propAtom)
  }

  private visitCallExpression(node: ts.CallExpression) {
    // callee(args...)
    // Emit callee value on stack, then args left-to-right, then call with argc
    this.visitNode(node.expression)
    for (const arg of node.arguments) {
      this.visitNode(arg)
    }
    this.emit(OpCode.call)
    this.emitU16(node.arguments.length)
  }

  private visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    this.emit(OpCode.object)
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i]
      this.visitNode(element)
      this.emit(OpCode.define_array_el)
    }
  }

  private visitBinaryExpression(node: ts.BinaryExpression) {
    this.visitNode(node.left)
    this.visitNode(node.right)

    switch (node.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        this.emit(OpCode.add)
        break
      default:
        console.warn(`Unsupported binary operator: ${ts.SyntaxKind[node.operatorToken.kind]}`)
    }
  }

  private visitNumericLiteral(node: ts.NumericLiteral) {
    const value = parseInt(node.text, 10)
    if (this.isSupportShortOpCodes() && value >= -1 && value <= 7) {
      this.emit(OpCode.push_0 + value)
      return
    }
    this.emit(OpCode.push_i32)
    this.emitInt32(value)
  }

  private getAtomIndex(name: string): number {
    let index = this.atoms.indexOf(name)
    if (index === -1) {
      index = this.atoms.length
      this.atoms.push(name)
    }
    return index
  }

  private emit(opcode: OpCode) {
    this.bytecode.push(opcode)
  }

  private emitInt32(value: number) {
    this.bytecode.push(
      (value >> 0) & 0xff,
      (value >> 8) & 0xff,
      (value >> 16) & 0xff,
      (value >> 24) & 0xff
    )
  }

  private emitU16(value: number) {
    this.bytecode.push(value & 0xff, (value >> 8) & 0xff)
  }

  private emitU8(value: number) {
    this.bytecode.push(value & 0xff)
  }

  private emitU32(value: number) {
    this.bytecode.push(
      value & 0xff,
      (value >> 8) & 0xff,
      (value >> 16) & 0xff,
      (value >> 24) & 0xff
    )
  }

  private newLabel(): number {
    const id = this.labels.length
    this.labels.push({ patches: [], pos: -1 })
    return id
  }

  private markLabel(labelId: number) {
    const target = this.bytecode.length
    const lab = this.labels[labelId]
    lab.pos = target
    for (const immPos of lab.patches) {
      const rel = target - immPos
      this.bytecode[immPos + 0] = (rel >> 0) & 0xff
      this.bytecode[immPos + 1] = (rel >> 8) & 0xff
      this.bytecode[immPos + 2] = (rel >> 16) & 0xff
      this.bytecode[immPos + 3] = (rel >> 24) & 0xff
    }
    lab.patches.length = 0
  }

  private emitJump(op: OpCode, labelId: number) {
    this.emit(op)
    const immPos = this.bytecode.length
    this.emitU32(0)
    this.labels[labelId].patches.push(immPos)
  }

  private emitIfFalse(labelId: number) {
    this.emitJump(OpCode.if_false, labelId)
  }

  private emitGoto(labelId: number) {
    this.emitJump(OpCode.goto, labelId)
  }
}

export function compile(
  filePath: string,
  flags?: Partial<FeatureFlags>
): Uint8Array {
  const sourceCode = fs.readFileSync(filePath, 'utf8')
  const ast = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.ES2020,
    true)
  
  const effective: FeatureFlags = flags ?? (FeatureFlags.BigNum | FeatureFlags.ShortOpCodes)
  const generator = new BytecodeGenerator(ast, effective)
  return generator.generate()
}
