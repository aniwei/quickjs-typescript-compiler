// 组合：nested functions + arguments + new.target (indirect)
function outer76() {
  function inner() {
    return arguments.length + (76%3);
  }
  return inner(1,2,3);
}
console.log(outer76());
