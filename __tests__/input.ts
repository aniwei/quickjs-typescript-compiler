'use strict';

import def, { foo as f, bar } from './lib.mjs';
import * as NS from './lib.mjs';
export { f as foo, bar } from './lib.mjs';
export * from './lib.mjs';
export default function hello(name: string) {
  return def(name);
}

const x = 1;
function makeAdder(a: number) {
  return (b: number) => a + b + x;
}

async function load() {
  const m = await import('./lazy.mjs');
  return m.default;
}

with ({a: 123}) {
  // demo with semantics; actual resolution depends on runtime
  const z = a + 1;
}

const y = eval('1+2'); // demo eval