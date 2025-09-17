// const capture write test: should throw TypeError at runtime assignment attempt
const x: number = 1;
function outer() {
  function inner() {
    // attempt to modify captured const
    // expected: TypeError
    // we just perform x = x + 1
    x = x + 1;
  }
  return inner;
}
const f = outer();
// call to trigger error
try { f(); } catch (e) { /* swallow to allow bytecode emission */ }
