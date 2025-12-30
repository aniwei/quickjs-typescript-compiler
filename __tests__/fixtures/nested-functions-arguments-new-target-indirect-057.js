// 组合：nested functions + arguments + new.target (indirect)
function outer57() {
    function inner() {
        return arguments.length + (57 % 3);
    }
    return inner(1, 2, 3);
}
console.log(outer57());
