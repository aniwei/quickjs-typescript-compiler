// 组合：nested functions + arguments + new.target (indirect)
function outer19() {
    function inner() {
        return arguments.length + (19 % 3);
    }
    return inner(1, 2, 3);
}
console.log(outer19());
