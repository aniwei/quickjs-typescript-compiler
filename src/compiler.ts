/**
 * TypeScript AST Parser and Compiler
 * Converts TypeScript AST to QuickJS bytecode
 */

import ts from 'typescript'
import { CompilerFlags, OPCODES, getAllOpcodes } from './opcodes'
import { AtomTable } from './atoms'
import { createOpcodeGenerator, OpcodeGenerator } from './opcodeGenerator'
import { JSFunctionDef } from './functionDef'
import { LoopContext, Scope } from './types'

export interface CompilerContext {
  sourceFile: ts.SourceFile
  flags: CompilerFlags
  atomTable: AtomTable
  opcodeGenerator: OpcodeGenerator
  currentFunction: JSFunctionDef
}

export class TypeScriptCompilerCore {
  private context: CompilerContext
  private moduleNameAtom?: number
  
  constructor(flags: CompilerFlags, atomTable: AtomTable, opcodeOverride?: Map<string, number>) {
    const opcodeGenerator = createOpcodeGenerator(flags, opcodeOverride)
    
    this.context = {
      sourceFile: null as any,
      flags,
      atomTable,
      opcodeGenerator,
      currentFunction: null as any, // Will be initialized in compile()
    }
  }
  
  // Main compilation entry point
  compile(sourceCode: string, fileName = '<input>'): JSFunctionDef {
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
      ts.ScriptKind.TS
    )

    this.context.sourceFile = sourceFile

    // Create the root function definition for the module
    const rootFuncDef = new JSFunctionDef(
      this.context.atomTable,
      this.context.opcodeGenerator,
      this.context.flags
    )
    this.context.currentFunction = rootFuncDef
    rootFuncDef.func_name = this.moduleNameAtom

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
      this.context.currentFunction.bytecodeWriter.writeInstruction(
        OPCODES.RETURN_UNDEF
      )
    } finally {
      this.exitScope()
    }

    return this.context.currentFunction
  }
  
  // Pre-create atoms by analyzing the AST.
  private preCreateAtoms(sourceFile: ts.SourceFile): void {
    // Collect all identifiers that will need atoms.
    const identifiers = new Set<string>();

    function visitNode(node: ts.Node): void {
      if (ts.isIdentifier(node)) {
        identifiers.add(node.text);
      }
      ts.forEachChild(node, visitNode);
    }

    visitNode(sourceFile);

    // Create atoms for all collected identifiers. The order is not critical here
    // as the final bytecode generation will map them correctly.
    for (const id of identifiers) {
      this.context.atomTable.getAtomId(id);
    }
  }
  
  // Scope management
  private enterScope(type: Scope['type']): void {
    this.context.currentFunction.enterScope(type)
  }
  
  private exitScope(): void {
    this.context.currentFunction.exitScope()
  }
  
  private getCurrentScope(): Scope | undefined {
    return this.context.currentFunction.getCurrentScope()
  }
  
  // Local variable management
  private declareLocal(name: string): number {
    return this.context.currentFunction.declareLocal(name)
  }
  
  private getLocalIndex(name: string): number | undefined {
    return this.context.currentFunction.getLocalIndex(name)
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
  private defineVar(
    varName: string,
    kind: 'var' | 'let' | 'const',
    isLexical: boolean
  ) {
    if (!this.context.currentFunction.vars.some((v) => v.name === varName)) {
      this.context.currentFunction.vars.push({
        name: varName,
        scopeLevel: this.context.currentFunction.scopeLevel,
        scopeNext: 0, // placeholder
        kind,
      })
    }
  }

  private compileVariableStatement(node: ts.VariableStatement): void {
    for (const declaration of node.declarationList.declarations) {
      this.compileVariableDeclaration(declaration);
    }
  }

  private compileVariableDeclaration(node: ts.VariableDeclaration) {
    const varName = node.name.getText();
    const list = node.parent as ts.VariableDeclarationList;
    const isConst = (list.flags & ts.NodeFlags.Const) !== 0;
    const isLet = (list.flags & ts.NodeFlags.Let) !== 0;
    const kind = isConst ? 'const' : isLet ? 'let' : 'var';
    this.defineVar(varName, kind, isLet || isConst);

    if (node.initializer) {
      this.compileExpression(node.initializer);
      this.context.currentFunction.bytecodeWriter.putVar(varName);
    }
  }
  
  // Expression statements
  private compileExpressionStatement(node: ts.ExpressionStatement): void {
    this.compileExpression(node.expression)
    // Drop the result since it's not used
    this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DROP)
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
    const constantIndex = this.context.currentFunction.constantsPool.add(functionBody)
    
    // Create closure
    this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.FCLOSURE, constantIndex)
    
    // Store in global scope or local scope
    if (this.context.currentFunction.scopes.length === 1) {
      // Global function - use PUT_VAR to define global variable
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR, functionAtom)
    } else {
      // Local function - store in local variable
      const localIndex = this.declareLocal(functionName)
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
    }
  }
  
  private compileFunctionBody(node: ts.FunctionDeclaration): any {
    // Create a new compilation context for the function
    const parentFunc = this.context.currentFunction
    const newFunc = new JSFunctionDef(this.context.atomTable, this.context.opcodeGenerator, this.context.flags, parentFunc)
    this.context.currentFunction = newFunc

    try {
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
          this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.RETURN)
        }
      }
      
      // If no explicit return, add undefined return
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.UNDEFINED)
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.RETURN)
      
      // Create function bytecode object
      const functionBytecode = {
        paramCount: node.parameters?.length || 0,
        localCount: this.context.currentFunction.locals.size,
        bytecode: this.context.currentFunction.bytecodeWriter.finalize()
      }
      
      return functionBytecode
      
    } finally {
      // Exit function scope
      this.exitScope()
      
      // Restore previous context
      this.context.currentFunction = parentFunc
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
    this.context.currentFunction.varKinds.set(iterVar, isConst ? 'const' : (isLet ? 'let' : 'var'))
    
    // Create labels for loop control
    const startLabel = this.context.currentFunction.labelManager.createLabel('for_of_start')
    const endLabel = this.context.currentFunction.labelManager.createLabel('for_of_end')
    const continueLabel = this.context.currentFunction.labelManager.createLabel('for_of_continue')
    
    // Push loop context
    this.context.currentFunction.loopStack.push({
      breakLabel: endLabel,
      continueLabel,
      type: 'for-of'
    })
    
    try {
      // Compile iterable expression
      this.compileExpression(node.expression)
      
      // Start for-of iteration
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.FOR_OF_START)
      
      // Set start label
      this.context.currentFunction.labelManager.setLabel(
        startLabel,
        this.context.currentFunction.bytecodeWriter.getCurrentPosition()
      )
      
      // Get next value
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.FOR_OF_NEXT, 0)
      
      // Check if done (iterator protocol)
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DUP1) // duplicate done flag
      this.context.currentFunction.bytecodeWriter.writeInstruction(
        OPCODES.IF_TRUE,
        this.context.currentFunction.labelManager.getAddress(endLabel) || 0
      )
      
      // Store current value in iterator variable
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, iterLocalIndex)
      
      // Compile loop body (already inside loop block scope)
      this.compileStatement(node.statement)
      
      // Continue label
      this.context.currentFunction.labelManager.setLabel(
        continueLabel,
        this.context.currentFunction.bytecodeWriter.getCurrentPosition()
      )
      
      // Jump back to start
      this.context.currentFunction.bytecodeWriter.writeInstruction(
        OPCODES.GOTO,
        this.context.currentFunction.labelManager.getAddress(startLabel) || 0
      )
      
      // End label
      this.context.currentFunction.labelManager.setLabel(
        endLabel,
        this.context.currentFunction.bytecodeWriter.getCurrentPosition()
      )
      
      // Clean up iterator
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DROP) // drop done flag
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DROP) // drop iterator
      
    } finally {
      this.context.currentFunction.loopStack.pop()
      // Exit loop block scope
      this.exitScope()
    }
  }
  
  // If statements
  private compileIfStatement(node: ts.IfStatement): void {
    // Compile condition
    this.compileExpression(node.expression)
    
    const elseLabel = this.context.currentFunction.labelManager.createLabel('if_else')
    const endLabel = this.context.currentFunction.labelManager.createLabel('if_end')
    
    // Jump to else if condition is false
    this.context.currentFunction.bytecodeWriter.writeInstruction(
      OPCODES.IF_FALSE,
      this.context.currentFunction.labelManager.getAddress(elseLabel) || 0
    )
    
    // Compile then branch
    this.compileStatement(node.thenStatement)
    
    if (node.elseStatement) {
      // Jump to end after then branch
      this.context.currentFunction.bytecodeWriter.writeInstruction(
        OPCODES.GOTO,
        this.context.currentFunction.labelManager.getAddress(endLabel) || 0
      )
      
      // Else label
      this.context.currentFunction.labelManager.setLabel(
        elseLabel,
        this.context.currentFunction.bytecodeWriter.getCurrentPosition()
      )
      
      // Compile else branch
      this.compileStatement(node.elseStatement)
      
      // End label
      this.context.currentFunction.labelManager.setLabel(
        endLabel,
        this.context.currentFunction.bytecodeWriter.getCurrentPosition()
      )
    } else {
      // No else branch, else label is the end
      this.context.currentFunction.labelManager.setLabel(
        elseLabel,
        this.context.currentFunction.bytecodeWriter.getCurrentPosition()
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
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.RETURN)
    } else {
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.RETURN_UNDEF)
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
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUSH_TRUE)
        break
        
      case ts.SyntaxKind.FalseKeyword:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUSH_FALSE)
        break
        
      case ts.SyntaxKind.NullKeyword:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.NULL)
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
        
      case ts.SyntaxKind.ObjectLiteralExpression:
        this.compileObjectLiteral(node as ts.ObjectLiteralExpression)
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
          this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes.PUSH_MINUS1)
          return
        } else if (value >= 0 && value <= 7) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes[`PUSH_${value}`])
          return
        } else if (value >= -128 && value <= 127) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes.PUSH_I8, value)
          return
        } else if (value >= -32768 && value <= 32767) {
          const opcodes = getAllOpcodes(this.context.flags)
          this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes.PUSH_I16, value)
          return
        }
      }
      
      // Use 32-bit integer
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUSH_I32, value)
    } else {
      // Floating point - add to constants pool
      const constIndex = this.context.currentFunction.constantsPool.add(value)
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUSH_CONST, constIndex)
    }
  }
  
  // Object literals
  private compileObjectLiteral(node: ts.ObjectLiteralExpression): void {
    this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.OBJECT)
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DUP)
        const propName = prop.name.getText(this.context.sourceFile)
        const atomId = this.context.atomTable.getAtomId(propName)
        this.compileExpression(prop.initializer)
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_FIELD, atomId)
      } else {
        throw new Error(`Unsupported property kind in object literal: ${ts.SyntaxKind[prop.kind]}`)
      }
    }
  }
  
  // String literals
  private compileStringLiteral(node: ts.StringLiteral): void {
    const value = node.text
    
    if (this.context.flags.shortCode && value === '') {
      const opcodes = getAllOpcodes(this.context.flags)
      this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes.PUSH_EMPTY_STRING)
    } else {
      const constIndex = this.context.currentFunction.constantsPool.add(value)
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUSH_CONST, constIndex)
    }
  }
  
  // Identifiers
  private compileIdentifier(node: ts.Identifier): void {
    const name = node.text
    const localIndex = this.getLocalIndex(name)
    
    if (localIndex !== undefined && !this.context.currentFunction.isModuleVar(name)) {
      // Local variable
      if (this.context.flags.shortCode && localIndex < 4) {
        const opcodes = getAllOpcodes(this.context.flags)
        this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes[`GET_LOC${localIndex}`])
      } else if (this.context.flags.shortCode && localIndex < 256) {
        const opcodes = getAllOpcodes(this.context.flags)
        this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes.GET_LOC8, localIndex)
      } else {
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GET_LOC, localIndex)
      }
    } else {
      // Global variable
      const atomId = this.context.atomTable.getAtomId(name)
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GET_VAR, atomId)
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
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.ADD)
        break
      case ts.SyntaxKind.MinusToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.SUB)
        break
      case ts.SyntaxKind.AsteriskToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.MUL)
        break
      case ts.SyntaxKind.SlashToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DIV)
        break
      case ts.SyntaxKind.PercentToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.MOD)
        break
      case ts.SyntaxKind.LessThanToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.LT)
        break
      case ts.SyntaxKind.LessThanEqualsToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.LTE)
        break
      case ts.SyntaxKind.GreaterThanToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GT)
        break
      case ts.SyntaxKind.GreaterThanEqualsToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GTE)
        break
      case ts.SyntaxKind.EqualsEqualsToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.EQ)
        break
      case ts.SyntaxKind.ExclamationEqualsToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.NEQ)
        break
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.STRICT_EQ)
        break
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.STRICT_NEQ)
        break
      default:
        throw new Error(`Unsupported binary operator: ${ts.SyntaxKind[node.operatorToken.kind]}`)
    }
  }
  
  // Array literals
  private compileArrayLiteral(node: ts.ArrayLiteralExpression): void {
    // Create new array
    this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.OBJECT) // Array constructor
    
    // Add elements
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i]
      
      // Duplicate array reference
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DUP)
      
      // Push index
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUSH_I32, i)
      
      // Compile element value
      this.compileExpression(element)
      
      // Set array element
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_ARRAY_EL)
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
      this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.CALL_METHOD, argCount)
      
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
        this.context.currentFunction.bytecodeWriter.writeInstruction(opcodes[`CALL${argCount}`])
      } else {
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.CALL, argCount)
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
    this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GET_FIELD2, atomId)
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
      if (this.context.currentFunction.locals.has(varName) && !this.context.currentFunction.isModuleVar(varName)) {
        const localIndex = this.context.currentFunction.locals.get(varName)!
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
      } else {
        // Module/global variable
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR, atomId)
      }
    } else {
      // Compound assignment: x += value, x -= value, etc.
      
      // Load current value of variable
      if (this.context.currentFunction.locals.has(varName) && !this.context.currentFunction.isModuleVar(varName)) {
        const localIndex = this.context.currentFunction.locals.get(varName)!
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GET_LOC, localIndex)
      } else {
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.GET_VAR, atomId)
      }
      
      // Compile right operand
      this.compileExpression(node.right)
      
      // Apply the compound operation
      switch (node.operatorToken.kind) {
        case ts.SyntaxKind.PlusEqualsToken:
          this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.ADD)
          break
        case ts.SyntaxKind.MinusEqualsToken:
          this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.SUB)
          break
        case ts.SyntaxKind.AsteriskEqualsToken:
          this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.MUL)
          break
        case ts.SyntaxKind.SlashEqualsToken:
          this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.DIV)
          break
        case ts.SyntaxKind.PercentEqualsToken:
          this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.MOD)
          break
        default:
          throw new Error(`Unsupported compound assignment operator: ${ts.SyntaxKind[node.operatorToken.kind]}`)
      }
      
      // Store result back to variable
      if (this.context.currentFunction.locals.has(varName) && !this.context.currentFunction.isModuleVar(varName)) {
        const localIndex = this.context.currentFunction.locals.get(varName)!
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_LOC, localIndex)
      } else {
        const atomId = this.context.atomTable.getAtomId(varName)
        this.context.currentFunction.bytecodeWriter.writeInstruction(OPCODES.PUT_VAR, atomId)
      }
    }
  }
}