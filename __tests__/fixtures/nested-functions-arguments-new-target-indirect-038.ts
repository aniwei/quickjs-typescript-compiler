// 组合：nested functions + arguments + new.target (indirect)
function outer38() {
  function inner() {
    return arguments.length + (38%3);
  }
  return inner(1,2,3);
}
console.log(outer38());
