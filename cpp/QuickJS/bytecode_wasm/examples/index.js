const path = require('path')
const fs = require('fs')
const QuickJSBytecode = require('../output/quickjs_bytecode.js')


QuickJSBytecode().then((module) => {
  const qjs = new module.QuickJSBytecode()

  const compile = (input, output) => {
    const bytes = qjs.compile(fs.readFileSync(path.join(__dirname, input), 'utf8'), input, new module.StringArray());
    const length = bytes.size();
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = bytes.get(i);
    }
    
    fs.writeFileSync(path.join(__dirname, output), result);
    console.log(`Compiled ${input} -> ${output} (${length} bytes)`);
  }

  // compile('index/data.js', 'data.bin');
  compile('index/index.js', 'index.bin');

  qjs.delete();
}).catch(err => {
  console.error('Failed to load WebAssembly module:', err);
});
