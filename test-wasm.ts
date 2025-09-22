import { QuickJSLib } from './scripts/QuickJSLib.js'

async function testWasmModule() {
  try {
    console.log('Loading QuickJS WASM module...')
    const module = await QuickJSLib.getQuickJSModule()
    console.log('Module loaded:', !!module)
    console.log('QuickJSLib available:', !!module.QuickJSLib)
    
    if (module.QuickJSLib) {
      console.log('runWithBinary available:', typeof module.QuickJSLib.runWithBinary)
      console.log('Available methods:', Object.getOwnPropertyNames(module.QuickJSLib))
    }
  } catch (error) {
    console.error('Error loading WASM module:', error)
  }
}

testWasmModule()