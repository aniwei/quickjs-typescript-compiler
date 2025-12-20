import { TypeScriptCompiler } from '../src/TypeScriptCompiler'

const source = `let i = 0;
while (i < 3) {
    console.log(i);
    i++;
}
`

const compiler = new TypeScriptCompiler()
const bytecode = compiler.compile(source, 'test.ts')
console.log('Bytecode size:', bytecode.length)
