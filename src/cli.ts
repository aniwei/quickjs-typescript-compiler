import * as ts from 'typescript';
import * as fs from 'fs';
import { compileSource } from './compiler';
import { BytecodeWriter } from './bytecode-writer';

function loadEnvQuickJS() {
  try {
    if (fs.existsSync('.env.quickjs')) {
      const txt = fs.readFileSync('.env.quickjs', 'utf8');
      for (const line of txt.split(/\r?\n/)) {
        const m = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (m) process.env[m[1]] = m[2];
      }
      console.log('已加载 .env.quickjs（QJS_BC_MAGIC/QJS_BC_VERSION）');
    }
  } catch {}
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('用法: ts-node src/cli.ts input.ts output.qjbc [--module] [--short] [--bigint=error|coerce]');
    process.exit(1);
  }
  const input = args[0], output = args[1];
  const forceModule = args.includes('--module');
  const enableShort = args.includes('--short');
  const bigArg = (args.find(a => a.startsWith('--bigint=')) || '--bigint=error').split('=')[1] as 'error'|'coerce';

  loadEnvQuickJS();

  const program = ts.createProgram([input], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    strict: true,
    noEmit: true,
    sourceMap: true,
    skipLibCheck: true
  });
  const checker = program.getTypeChecker();
  const sf = program.getSourceFile(input);
  if (!sf) throw new Error('Source not found: '+input);

  const { atoms, ir } = compileSourceFileToIR(sf, checker, {
    forceModule,
    enableShortOpcodes: enableShort,
    bigintMixPolicy: bigArg
  });

  const writer = new BytecodeWriter(atoms);
  const { buf } = writer.writeTop(ir);
  fs.writeFileSync(output, buf);
  console.log(`已输出字节码: ${output} (${buf.length} bytes)`);
}

if (require.main === module) main();