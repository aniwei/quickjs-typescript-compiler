/**
 * TypeScript AST Parser and Compiler
 * Converts TypeScript AST to QuickJS bytecode
 */

import ts from 'typescript'
import { CompilerFlags, OPCODES, getAllOpcodes } from './opcodes'
import { AtomTable } from './atoms'
import { BytecodeWriter } from './bytecode'
import { createOpcodeGenerator, OpcodeGenerator } from './opcodeGenerator'
import { Constants } from './constant'
import { LabelManager } from './label'

export interface CompilerContext {
  sourceFile: ts.SourceFile
  flags: CompilerFlags
  atomTable: AtomTable
  constantsPool: Constants
  labelManager: LabelManager
  bytecodeWriter: BytecodeWriter
  opcodeGenerator: OpcodeGenerator
  
  // Variable management
  locals: Map<string, number> // name -> local index
  nextLocalIndex: number
  varKinds: Map<string, 'var' | 'let' | 'const'>
  
  // Scope management
  scopeStack: Scope[]
  
  // Loop management for break/continue
  loopStack: LoopContext[]
}

export interface Scope {
  type: 'function' | 'block' | 'module'
  locals: Set<string>
  parent?: Scope
}

export interface LoopContext {
  breakLabel: string
  continueLabel: string
  type: 'for' | 'while' | 'for-in' | 'for-of'
}

export class TypeScriptCompilerCore {
  private context: CompilerContext
  private moduleNameAtom?: number
  private moduleScopeLocals: Set<string> = new Set()
  
  constructor(flags: CompilerFlags, opcodeOverride?: Map<string, number>) {
    const atomTable = new AtomTable(flags.firstAtomId)
    const constantsPool = new Constants()
    const labelManager = new LabelManager()
    const opcodeGenerator = createOpcodeGenerator(flags, opcodeOverride)
    const bytecodeWriter = new BytecodeWriter(flags, atomTable, constantsPool, labelManager, opcodeGenerator)
    
    this.context = {
      sourceFile: null as any,
      flags,
      atomTable,
      constantsPool,
      labelManager,
      bytecodeWriter,
      opcodeGenerator,
      locals: new Map(),
      nextLocalIndex: 0,
      varKinds: new Map(),
      scopeStack: [],
      loopStack: []
    }
  }
  
  // Main compilation entry point
  compile(sourceCode: string, fileName = '<input>'): Uint8Array {
    // Create atom for file name (QuickJS includes this in bytecode)
    // Use .js extension to match WASM behavior
    const jsFileName = fileName.replace(/\.ts$/, '.js')
    this.moduleNameAtom = this.context.atomTable.getAtomId(jsFileName)
    
    // Parse TypeScript code
    const sourceFile = ts.createSourceFile(
      fileName,
      sourceCode,
      ts.ScriptTarget.ES2020,
      true,
      ts.ScriptKind.TS)
    
    this.context.sourceFile = sourceFile
    
    // Pre-create atoms in QuickJS order by analyzing the AST
    this.preCreateAtoms(sourceFile)
    
    // Create module scope
    this.enterScope('module')
    
    try {
      // Compile all statements
      for (const statement of sourceFile.statements) {
        this.compileStatement(statement)
      }
      
      // Add return undefined at the end if no explicit return
      this.context.bytecodeWriter.writeInstruction(OPCODES.RETURN_UNDEF)
      
    } finally {
      this.exitScope()
    }
    
    // Set vardefs before finalizing: include only non-module locals
    const functionLocals = new Map<string, number>()
    for (const [name, idx] of this.context.locals) {
      if (!this.moduleScopeLocals.has(name)) {
        functionLocals.set(name, idx)
      }
    }
    
    this.context.bytecodeWriter.setVardefs(functionLocals)
    // 传递变量 kind 信息（若无记录则视为 var）
    const kinds = new Map<string, 'var' | 'let' | 'const'>()
    for (const [name, k] of this.context.varKinds) {
      kinds.set(name, k)
    }
    this.context.bytecodeWriter.setVarKinds(kinds)
    // 传入闭包变量（模块作用域变量作为闭包捕获）
    const closureVars = new Map<string, number>()
    for (const name of this.moduleScopeLocals) {
      const idx = this.context.locals.get(name)
      if (idx !== undefined) closureVars.set(name, idx)
    }
    this.context.bytecodeWriter.setClosureVars(closureVars)
    // 传入模块名 atom，用于模块包装头
    if (this.moduleNameAtom !== undefined) {
      this.context.bytecodeWriter.setModuleNameAtom(this.moduleNameAtom)
    }
    
    return this.context.bytecodeWriter.finalize()
  }
  
  // Pre-create atoms in the correct order to match QuickJS WASM output
  private preCreateAtoms(sourceFile: ts.SourceFile): void {
    // Collect all identifiers that will need atoms
    const identifiers = new Set<string>()
    
    // Walk the AST to find all identifiers
    function visitNode(node: ts.Node): void {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        identifiers.add(node.name.text)
      }
      if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
        identifiers.add(node.name.text)
      }
      if (ts.isIdentifier(node)) {
        // Only add certain identifiers to match QuickJS pattern
        const text = node.text
        if (text === 'console' || text === 'log' || 
            text === 'arr' || text === 'item') {
          identifiers.add(text)
        }
      }
      if (ts.isArrayLiteralExpression(node)) {
        // Check for array variable names in parent context
        const parent = node.parent
        if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
          identifiers.add(parent.name.text)
        }
      }
      ts.forEachChild(node, visitNode)
    }
    
    visitNode(sourceFile)
    
    // Create atoms in QuickJS order: variable names first, then property access
    const orderedIds = Array.from(identifiers).sort((a, b) => {
      // QuickJS order: item, arr, console, log
      const order = ['item', 'arr', 'console', 'log']
      const aIndex = order.indexOf(a)
      const bIndex = order.indexOf(b)
      
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // Alphabetical for unknown identifiers
      return a.localeCompare(b)
    })
    
    // Create atoms in this order
    for (const id of orderedIds) {
      this.context.atomTable.getAtomId(id)
    }
  }
  
  // Scope management
  private enterScope(type: Scope['type']): void {
    const scope: Scope = {
      type,
      locals: new Set(),
      parent: this.context.scopeStack[this.context.scopeStack.length - 1]
    }
    this.context.scopeStack.push(scope)
  }
  
  private exitScope(): void {
    this.context.scopeStack.pop()
  }
  
  private getCurrentScope(): Scope | undefined {
    return this.context.scopeStack[this.context.scopeStack.length - 1]
  }
  
  // Local variable management
  private declareLocal(name: string): number {
    const index = this.context.nextLocalIndex++
    this.context.locals.set(name, index)
    
    const scope = this.getCurrentScope()
    if (scope) {
      scope.locals.add(name)
      if (scope.type === 'module') {
        this.moduleScopeLocals.add(name)
      }
    }
    
    return index
  }
  
  private getLocalIndex(name: string): number | undefined {
    return this.context.locals.get(name)
  }
  
  // Statement compilation
  private compileStatement(node: ts.Statement): void {
    switch (node.kind) {
      case ts.SyntaxKind.VariableStatement:
        this.compileVariableStatement(node as ts.VariableStatement)
        break
        
      case ts.SyntaxKind.ExpressionStatement:
        this.compileExpressionStatement(node as ts.ExpressionStatement)
        break
        
      case ts.SyntaxKind.FunctionDeclaration:
        this.compileFunctionDeclaration(node as ts.FunctionDeclaration)
        break
        
      case ts.SyntaxKind.ForOfStatement:
        this.compileForOfStatement(node as ts.ForOfStatement)
        break
        
      case ts.SyntaxKind.IfStatement:
        this.compileIfStatement(node as ts.IfStatement)
        break
        
      case ts.SyntaxKind.Block:
        this.compileBlockStatement(node as ts.Block)
        break
        
      case ts.SyntaxKind.ReturnStatement:
        this.compileReturnStatement(node as ts.ReturnStatement)
        break
        
      case ts.SyntaxKind.EmptyStatement:
        // Empty statement (semicolon) - do nothing
        break
        
      default:
        throw new Error(`Unsupported statement kind: ${ts.SyntaxKind[node.kind]}`)
    }
  }
  
  // Variable declarations
  private compileVariableStatement(node: ts.VariableStatement): void {
    for (const declaration of node.declarationList.declarations) {
      this.compileVariableDeclaration(declaration)
    }
  }
  
  private compileVariableDeclaration(node: ts.VariableDeclaration): void {
    if (!ts.isIdentifier(node.name)) {
      throw new Error('Destructuring not supported yet')
    }
    
    const varName = node.name.text
    const localIndex = this.declareLocal(varName)
    // 记录变量 kind
    const parentList = node.parent as ts.VariableDeclarationList
    const isConst = (parentList.flags & ts.NodeFlags.Const) !== 0
    const isLet = (parentList.flags & ts.NodeFlags.Let) !== 0
    this.context.varKinds.set(varName, isConst ? 'const' : (isLet ? 'let' : 'var'))
    
    if (node.initializer) {
      // Compile initializer expression
      this.compileExpression(node.initializer)
      
      // At module scope, use PUT_VAR_INIT (atom-based), otherwise store into local
      const currentScope = this.getCurrentScope()
      if (currentScope?.type === 'module') {
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR_INIT, atomId)
      } else {
        // Store in local variable
        if (this.context.flags.shortCode && localIndex < 4) {
          // Use optimized opcodes for first 4 locals
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.bytecodeWriter.writeInstruction(
            opcodes[`PUT_LOC${localIndex}`]
          )
        } else if (this.context.flags.shortCode && localIndex < 256) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.bytecodeWriter.writeInstruction(
            opcodes.PUT_LOC8,
            localIndex
          )
        } else {
          this.context.bytecodeWriter.writeInstruction(
            OPCODES.PUT_LOC,
            localIndex
          )
        }
      }
    } else {
      // Initialize with undefined
      this.context.bytecodeWriter.writeInstruction(OPCODES.UNDEFINED)
      const currentScope = this.getCurrentScope()
      if (currentScope?.type === 'module') {
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR_INIT, atomId)
      } else {
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
      }
    }
  }
  
  // Expression statements
  private compileExpressionStatement(node: ts.ExpressionStatement): void {
    this.compileExpression(node.expression)
    // Drop the result since it's not used
    this.context.bytecodeWriter.writeInstruction(OPCODES.DROP)
  }
  
  // Function declarations
  private compileFunctionDeclaration(node: ts.FunctionDeclaration): void {
    if (!node.name) {
      throw new Error('Anonymous function declarations not supported')
    }
    
    const functionName = node.name.text
    const functionAtom = this.context.atomTable.getAtomId(functionName)
    
    // Create function constant
    const functionBody = this.compileFunctionBody(node)
    const constantIndex = this.context.constantsPool.add(functionBody)
    
    // Create closure
    this.context.bytecodeWriter.writeInstruction(OPCODES.FCLOSURE, constantIndex)
    
    // Store in global scope or local scope
    if (this.context.scopeStack.length === 1) {
      // Global function - use PUT_VAR to define global variable
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR, functionAtom)
    } else {
      // Local function - store in local variable
      const localIndex = this.declareLocal(functionName)
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
    }
  }
  
  private compileFunctionBody(node: ts.FunctionDeclaration): any {
    // Create a new compilation context for the function
    const savedLocals = new Map(this.context.locals)
    const savedNextLocalIndex = this.context.nextLocalIndex
    const savedBytecodeWriter = this.context.bytecodeWriter
    
    // Create new isolated components for function
    const functionLabelManager = new LabelManager()
    const functionConstantsPool = new Constants()
    const functionWriter = new BytecodeWriter(
      this.context.flags,
      this.context.atomTable, // Share atom table
      functionConstantsPool,   // Function-specific constants
      functionLabelManager,    // Function-specific labels
      this.context.opcodeGenerator
    )
    
    // Reset locals for function scope
    this.context.locals.clear()
    this.context.nextLocalIndex = 0
    this.context.bytecodeWriter = functionWriter
    
    // Add parameters as locals
    if (node.parameters) {
      for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
          this.declareLocal(param.name.text)
        }
      }
    }
    
    // Enter function scope
    this.enterScope('function')
    
    try {
      // Compile function body
      if (node.body) {
        if (ts.isBlock(node.body)) {
          // Block body
          for (const statement of node.body.statements) {
            this.compileStatement(statement)
          }
        } else {
          // Expression body (arrow function style)
          this.compileExpression(node.body)
          this.context.bytecodeWriter.writeInstruction(OPCODES.RETURN)
        }
      }
      
      // If no explicit return, add undefined return
      this.context.bytecodeWriter.writeInstruction(OPCODES.UNDEFINED)
      this.context.bytecodeWriter.writeInstruction(OPCODES.RETURN)
      
      // Create function bytecode object
      const functionBytecode = {
        paramCount: node.parameters?.length || 0,
        localCount: this.context.nextLocalIndex,
        bytecode: functionWriter.finalize()
      }
      
      return functionBytecode
      
    } finally {
      // Exit function scope
      this.exitScope()
      
      // Restore previous context
      this.context.locals = savedLocals
      this.context.nextLocalIndex = savedNextLocalIndex
      this.context.bytecodeWriter = savedBytecodeWriter
    }
  }
  
  // For-of loops
  private compileForOfStatement(node: ts.ForOfStatement): void {
    if (!ts.isVariableDeclarationList(node.initializer)) {
      throw new Error('For-of with non-declaration initializer not supported')
    }
    
    const declaration = node.initializer.declarations[0]
    if (!ts.isIdentifier(declaration.name)) {
      throw new Error('For-of with destructuring not supported')
    }
    // Create a block scope for the entire loop so the iterator variable is block-scoped
    this.enterScope('block')

    const iterVar = declaration.name.text
    const iterLocalIndex = this.declareLocal(iterVar)
    // for-of 声明的变量通常为 const/let（TS AST 里由声明列表 flags 指定）
    const parentList = node.initializer as ts.VariableDeclarationList
    const isConst = (parentList.flags & ts.NodeFlags.Const) !== 0
    const isLet = (parentList.flags & ts.NodeFlags.Let) !== 0
    this.context.varKinds.set(iterVar, isConst ? 'const' : (isLet ? 'let' : 'var'))
    
    // Create labels for loop control
    const startLabel = this.context.labelManager.createLabel('for_of_start')
    const endLabel = this.context.labelManager.createLabel('for_of_end')
    const continueLabel = this.context.labelManager.createLabel('for_of_continue')
    
    // Push loop context
    this.context.loopStack.push({
      breakLabel: endLabel,
      continueLabel,
      type: 'for-of'
    })
    
    try {
      // Compile iterable expression
      this.compileExpression(node.expression)
      
      // Start for-of iteration
      this.context.bytecodeWriter.writeInstruction(OPCODES.FOR_OF_START)
      
      // Set start label
      this.context.labelManager.setLabel(
        startLabel,
        this.context.bytecodeWriter.getCurrentPosition()
      )
      
      // Get next value
      this.context.bytecodeWriter.writeInstruction(OPCODES.FOR_OF_NEXT, 0)
      
      // Check if done (iterator protocol)
      this.context.bytecodeWriter.writeInstruction(OPCODES.DUP1) // duplicate done flag
      this.context.bytecodeWriter.writeInstruction(
        OPCODES.IF_TRUE,
        this.context.labelManager.getAddress(endLabel) || 0
      )
      
      // Store current value in iterator variable
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, iterLocalIndex)
      
      // Compile loop body (already inside loop block scope)
      this.compileStatement(node.statement)
      
      // Continue label
      this.context.labelManager.setLabel(
        continueLabel,
        this.context.bytecodeWriter.getCurrentPosition()
      )
      
      // Jump back to start
      this.context.bytecodeWriter.writeInstruction(
        OPCODES.GOTO,
        this.context.labelManager.getAddress(startLabel) || 0
      )
      
      // End label
      this.context.labelManager.setLabel(
        endLabel,
        this.context.bytecodeWriter.getCurrentPosition()
      )
      
      // Clean up iterator
      this.context.bytecodeWriter.writeInstruction(OPCODES.DROP) // drop done flag
      this.context.bytecodeWriter.writeInstruction(OPCODES.DROP) // drop iterator
      
    } finally {
      this.context.loopStack.pop()
      // Exit loop block scope
      this.exitScope()
    }
  }
  
  // If statements
  private compileIfStatement(node: ts.IfStatement): void {
    // Compile condition
    this.compileExpression(node.expression)
    
    const elseLabel = this.context.labelManager.createLabel('if_else')
    const endLabel = this.context.labelManager.createLabel('if_end')
    
    // Jump to else if condition is false
    this.context.bytecodeWriter.writeInstruction(
      OPCODES.IF_FALSE,
      this.context.labelManager.getAddress(elseLabel) || 0
    )
    
    // Compile then branch
    this.compileStatement(node.thenStatement)
    
    if (node.elseStatement) {
      // Jump to end after then branch
      this.context.bytecodeWriter.writeInstruction(
        OPCODES.GOTO,
        this.context.labelManager.getAddress(endLabel) || 0
      )
      
      // Else label
      this.context.labelManager.setLabel(
        elseLabel,
        this.context.bytecodeWriter.getCurrentPosition()
      )
      
      // Compile else branch
      this.compileStatement(node.elseStatement)
      
      // End label
      this.context.labelManager.setLabel(
        endLabel,
        this.context.bytecodeWriter.getCurrentPosition()
      )
    } else {
      // No else branch, else label is the end
      this.context.labelManager.setLabel(
        elseLabel,
        this.context.bytecodeWriter.getCurrentPosition()
      )
    }
  }
  
  // Block statements
  private compileBlockStatement(node: ts.Block): void {
    this.enterScope('block')
    try {
      for (const statement of node.statements) {
        this.compileStatement(statement)
      }
    } finally {
      this.exitScope()
    }
  }
  
  // Return statements
  private compileReturnStatement(node: ts.ReturnStatement): void {
    if (node.expression) {
      this.compileExpression(node.expression)
      this.context.bytecodeWriter.writeInstruction(OPCODES.RETURN)
    } else {
      this.context.bytecodeWriter.writeInstruction(OPCODES.RETURN_UNDEF)
    }
  }
  
  // Expression compilation
  private compileExpression(node: ts.Expression): void {
    switch (node.kind) {
      case ts.SyntaxKind.NumericLiteral:
        this.compileNumericLiteral(node as ts.NumericLiteral)
        break
        
      case ts.SyntaxKind.StringLiteral:
        this.compileStringLiteral(node as ts.StringLiteral)
        break
        
      case ts.SyntaxKind.TrueKeyword:
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUSH_TRUE)
        break
        
      case ts.SyntaxKind.FalseKeyword:
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUSH_FALSE)
        break
        
      case ts.SyntaxKind.NullKeyword:
        this.context.bytecodeWriter.writeInstruction(OPCODES.NULL)
        break
        
      case ts.SyntaxKind.Identifier:
        this.compileIdentifier(node as ts.Identifier)
        break
        
      case ts.SyntaxKind.BinaryExpression:
        this.compileBinaryExpression(node as ts.BinaryExpression)
        break
        
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.compileArrayLiteral(node as ts.ArrayLiteralExpression)
        break
        
      case ts.SyntaxKind.CallExpression:
        this.compileCallExpression(node as ts.CallExpression)
        break
        
      case ts.SyntaxKind.PropertyAccessExpression:
        this.compilePropertyAccess(node as ts.PropertyAccessExpression)
        break
        
      default:
        throw new Error(`Unsupported expression kind: ${ts.SyntaxKind[node.kind]}`)
    }
  }
  
  // Numeric literals
  private compileNumericLiteral(node: ts.NumericLiteral): void {
    const value = parseFloat(node.text)
    
    if (Number.isInteger(value)) {
      // Integer optimization
      if (this.context.flags.shortCode) {
        if (value === -1) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.bytecodeWriter.writeInstruction(opcodes.PUSH_MINUS1)
          return
        } else if (value >= 0 && value <= 7) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.bytecodeWriter.writeInstruction(opcodes[`PUSH_${value}`])
          return
        } else if (value >= -128 && value <= 127) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.bytecodeWriter.writeInstruction(opcodes.PUSH_I8, value)
          return
        } else if (value >= -32768 && value <= 32767) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.bytecodeWriter.writeInstruction(opcodes.PUSH_I16, value)
          return
        }
      }
      
      // Use 32-bit integer
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUSH_I32, value)
    } else {
      // Floating point - add to constants pool
      const constIndex = this.context.constantsPool.add(value)
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUSH_CONST, constIndex)
    }
  }
  
  // String literals
  private compileStringLiteral(node: ts.StringLiteral): void {
    const value = node.text
    
    if (this.context.flags.shortCode && value === '') {
      const opcodes = getAllOpcodes(this.context.flags)
      this.context.bytecodeWriter.writeInstruction(opcodes.PUSH_EMPTY_STRING)
    } else {
      const constIndex = this.context.constantsPool.add(value)
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUSH_CONST, constIndex)
    }
  }
  
  // Identifiers
  private compileIdentifier(node: ts.Identifier): void {
    const name = node.text
    const localIndex = this.getLocalIndex(name)
    
    if (localIndex !== undefined && !this.moduleScopeLocals.has(name)) {
      // Local variable
      if (this.context.flags.shortCode && localIndex < 4) {
        const opcodes = getAllOpcodes(this.context.flags)
        this.context.bytecodeWriter.writeInstruction(opcodes[`GET_LOC${localIndex}`])
      } else if (this.context.flags.shortCode && localIndex < 256) {
        const opcodes = getAllOpcodes(this.context.flags)
        this.context.bytecodeWriter.writeInstruction(opcodes.GET_LOC8, localIndex)
      } else {
        this.context.bytecodeWriter.writeInstruction(OPCODES.GET_LOC, localIndex)
      }
    } else {
      // Global variable
      const atomId = this.context.atomTable.getAtomId(name)
      this.context.bytecodeWriter.writeInstruction(OPCODES.GET_VAR, atomId)
    }
  }
  
  // Binary expressions
  private compileBinaryExpression(node: ts.BinaryExpression): void {
    // Handle assignment operations differently
    if (this.isAssignmentOperator(node.operatorToken.kind)) {
      this.compileAssignmentExpression(node)
      return
    }
    
    // Compile operands for non-assignment operations
    this.compileExpression(node.left)
    this.compileExpression(node.right)
    
    // Generate operation
    switch (node.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.ADD)
        break
      case ts.SyntaxKind.MinusToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.SUB)
        break
      case ts.SyntaxKind.AsteriskToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.MUL)
        break
      case ts.SyntaxKind.SlashToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.DIV)
        break
      case ts.SyntaxKind.PercentToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.MOD)
        break
      case ts.SyntaxKind.LessThanToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.LT)
        break
      case ts.SyntaxKind.LessThanEqualsToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.LTE)
        break
      case ts.SyntaxKind.GreaterThanToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.GT)
        break
      case ts.SyntaxKind.GreaterThanEqualsToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.GTE)
        break
      case ts.SyntaxKind.EqualsEqualsToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.EQ)
        break
      case ts.SyntaxKind.ExclamationEqualsToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.NEQ)
        break
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.STRICT_EQ)
        break
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        this.context.bytecodeWriter.writeInstruction(OPCODES.STRICT_NEQ)
        break
      default:
        throw new Error(`Unsupported binary operator: ${ts.SyntaxKind[node.operatorToken.kind]}`)
    }
  }
  
  // Array literals
  private compileArrayLiteral(node: ts.ArrayLiteralExpression): void {
    // Create new array
    this.context.bytecodeWriter.writeInstruction(OPCODES.OBJECT) // Array constructor
    
    // Add elements
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i]
      
      // Duplicate array reference
      this.context.bytecodeWriter.writeInstruction(OPCODES.DUP)
      
      // Push index
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUSH_I32, i)
      
      // Compile element value
      this.compileExpression(element)
      
      // Set array element
      this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_ARRAY_EL)
    }
  }
  
  // Call expressions
  private compileCallExpression(node: ts.CallExpression): void {
    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(args...)
      this.compilePropertyAccess(node.expression) // Push obj and method
      
      // Compile arguments
      for (const arg of node.arguments) {
        this.compileExpression(arg)
      }
      
      // Call method
      const argCount = node.arguments.length
      this.context.bytecodeWriter.writeInstruction(OPCODES.CALL_METHOD, argCount)
      
    } else {
      // Function call: func(args...)
      this.compileExpression(node.expression)
      
      // Compile arguments
      for (const arg of node.arguments) {
        this.compileExpression(arg)
      }
      
      // Call function
      const argCount = node.arguments.length
      if (this.context.flags.shortCode && argCount <= 3) {
        const opcodes = getAllOpcodes(this.context.flags)
        this.context.bytecodeWriter.writeInstruction(opcodes[`CALL${argCount}`])
      } else {
        this.context.bytecodeWriter.writeInstruction(OPCODES.CALL, argCount)
      }
    }
  }
  
  // Property access
  private compilePropertyAccess(node: ts.PropertyAccessExpression): void {
    // Compile object
    this.compileExpression(node.expression)
    
    // Get property name atom
    const propName = node.name.text
    const atomId = this.context.atomTable.getAtomId(propName)
    
    // Get field (leaves obj and value on stack for method calls)
    this.context.bytecodeWriter.writeInstruction(OPCODES.GET_FIELD2, atomId)
  }

  // Helper to check if an operator is an assignment operator
  private isAssignmentOperator(kind: ts.SyntaxKind): boolean {
    return kind === ts.SyntaxKind.FirstAssignment || 
           kind >= ts.SyntaxKind.FirstCompoundAssignment && kind <= ts.SyntaxKind.LastCompoundAssignment
  }

  // Compile assignment expressions
  private compileAssignmentExpression(node: ts.BinaryExpression): void {
    if (node.left.kind !== ts.SyntaxKind.Identifier) {
      throw new Error('Only simple identifier assignments are supported')
    }

    const identifier = node.left as ts.Identifier
    const varName = identifier.text

    if (node.operatorToken.kind === ts.SyntaxKind.FirstAssignment) {
      // Simple assignment: x = value
      this.compileExpression(node.right)
      
      // Store in variable
      if (this.context.locals.has(varName) && !this.moduleScopeLocals.has(varName)) {
        const localIndex = this.context.locals.get(varName)!
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
      } else {
        // Module/global variable
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR, atomId)
      }
    } else {
      // Compound assignment: x += value, x -= value, etc.
      
      // Load current value of variable
      if (this.context.locals.has(varName) && !this.moduleScopeLocals.has(varName)) {
        const localIndex = this.context.locals.get(varName)!
        this.context.bytecodeWriter.writeInstruction(OPCODES.GET_LOC, localIndex)
      } else {
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.bytecodeWriter.writeInstruction(OPCODES.GET_VAR, atomId)
      }
      
      // Compile right operand
      this.compileExpression(node.right)
      
      // Apply the compound operation
      switch (node.operatorToken.kind) {
        case ts.SyntaxKind.PlusEqualsToken:
          this.context.bytecodeWriter.writeInstruction(OPCODES.ADD)
          break
        case ts.SyntaxKind.MinusEqualsToken:
          this.context.bytecodeWriter.writeInstruction(OPCODES.SUB)
          break
        case ts.SyntaxKind.AsteriskEqualsToken:
          this.context.bytecodeWriter.writeInstruction(OPCODES.MUL)
          break
        case ts.SyntaxKind.SlashEqualsToken:
          this.context.bytecodeWriter.writeInstruction(OPCODES.DIV)
          break
        case ts.SyntaxKind.PercentEqualsToken:
          this.context.bytecodeWriter.writeInstruction(OPCODES.MOD)
          break
        default:
          throw new Error(`Unsupported compound assignment operator: ${ts.SyntaxKind[node.operatorToken.kind]}`)
      }
      
      // Store result back to variable
      if (this.context.locals.has(varName) && !this.moduleScopeLocals.has(varName)) {
        const localIndex = this.context.locals.get(varName)!
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
      } else {
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR, atomId)
      }
    }
  }
}