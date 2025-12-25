// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts
// @ts-nocheck
// Source: third_party/QuickJS/__tests__/test_promise_gc_crash.js
async function createTask() {
  return Promise.resolve().then(function () {
    new Uint8Array(1000000)
  })
}

run()
async function run() {
  let fn = (v) => { console.log(v.length); }
  let done = (v) => fn(v)
  createTask().then(done)
  const p = new Promise(() => { })
  await p
}
