// 组合：closure + recursion + default params
function make43(base = 43) {
    function f(k = 2) {
        if (k <= 0)
            return base;
        return f(k - 1) + 1;
    }
    return f;
}
const g = make43();
console.log(g(3));
