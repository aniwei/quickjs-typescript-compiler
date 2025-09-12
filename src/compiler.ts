import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'
import { OP } from './opcodes'
import { BytecodeEmitter } from './emitter'

// AST 节点访问器，递归地将 TS AST 转换为字节码
function visit(node: ts.Node, emitter: BytecodeEmitter) {
  // 采用后序遍历（Post-order traversal）
  // 先处理所有子节点
  ts.forEachChild(node, (child) => visit(child, emitter))

    // 再处理当前节点
  switch (node.kind) {
    case ts.SyntaxKind.NumericLiteral: {
      const num = parseInt((node as ts.NumericLiteral).text, 10);
      emitter.emitOp(OP.push_i32);
      emitter.emitI32(num);
      break;
    }

    case ts.SyntaxKind.BinaryExpression: {
      const op = (node as ts.BinaryExpression).operatorToken.kind;
      switch (op) {
        case ts.SyntaxKind.PlusToken:
            emitter.emitOp(OP.add);
            break;
          case ts.SyntaxKind.MinusToken:
            emitter.emitOp(OP.sub);
            break;
          case ts.SyntaxKind.AsteriskToken:
            emitter.emitOp(OP.mul);
            break;
          case ts.SyntaxKind.SlashToken:
            emitter.emitOp(OP.div);
            break;
          default:
            // 对于不支持的操作符，我们暂时忽略，而不是抛出错误
            console.warn(`Warning: Unsupported binary operator: ${ts.SyntaxKind[op]}`);
      }
      break;
    }
      
    // 每个表达式语句结束后，其计算结果会留在栈顶，我们需要丢弃它以保持栈平衡
    case ts.SyntaxKind.ExpressionStatement: {
      emitter.emitOp(OP.drop);
      break;
    }

    default:
      // 对于不支持的节点类型，我们暂时忽略，而不是抛出错误
      // 这允许我们跳过诸如 `console.log` 之类的语句
      // console.warn(`Warning: Unsupported syntax kind: ${ts.SyntaxKind[node.kind]}`);
      break;
  }
}

// 编译器主函数
function main() {
  const inputFilePath = path.join(__dirname, '../test/input.ts');
  const outputFilePath = path.join(__dirname, '../dist/output.c');
    
  console.log(`Compiling: ${inputFilePath}`);

  const sourceFile = ts.createSourceFile(
    inputFilePath,
    fs.readFileSync(inputFilePath, 'utf8'),
    ts.ScriptTarget.ES2020,
    true
  );

  const emitter = new BytecodeEmitter();
    
    // 遍历 AST，生成字节码
  visit(sourceFile, emitter);

    // 所有语句执行完毕后，我们需要一个 `ret` 指令来结束脚本
    // 我们返回 0 (JS number) 作为脚本的默认返回值
    emitter.emitOp(OP.push_i32);
    emitter.emitI32(0);
    emitter.emitOp(OP.ret);

    // 生成 C 源码
    const cSource = emitter.toCSource("my_module");
    
    // 确保 dist 目录存在
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, cSource);

    console.log(`\nCompilation successful! Bytecode written to: ${outputFilePath}`);
    console.log(`\nNext steps:`);
    console.log(`1. Place 'dist/output.c' into your QuickJS source directory.`);
    console.log(`2. Add 'output.c' to the 'Makefile' SOURCES list.`);
    console.log(`3. Run 'make' in the QuickJS directory.`);
    console.log(`4. Run the compiled code with: './qjs -I output.c'`);
}

main();