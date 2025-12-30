// 组合：nested functions + arguments + new.target (indirect)
function outer95() {
    function inner() {
        return arguments.length + (95 % 3);
    }
    return inner(1, 2, 3);
}
console.log(outer95());
