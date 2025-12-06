
function testFinallyReturn() {
    try {
        return 1;
    } finally {
        return 2;
    }
}

function testFinallyBreak() {
    let x = 0;
    while (true) {
        try {
            break;
        } finally {
            x = 1;
        }
    }
    return x;
}

function testFinallyContinue() {
    let x = 0;
    let i = 0;
    while (i < 2) {
        i++;
        try {
            continue;
        } finally {
            x++;
        }
    }
    return x;
}

function testNestedFinally() {
    let x = 0;
    try {
        try {
            return 1;
        } finally {
            x++;
        }
    } finally {
        x++;
    }
    return x; // Should not be reached if return 1 works (but finally executes)
}

console.log(testFinallyReturn()); // Expected: 2
console.log(testFinallyBreak()); // Expected: 1
console.log(testFinallyContinue()); // Expected: 2
console.log(testNestedFinally()); // Expected: 1 (Wait, return 1 returns 1. Finally increments x. But return value is already set to 1? No, finally runs before return. But return value is saved. So x increments, but return value is 1.)
// Actually testNestedFinally returns 1.
// x is local variable.
// return 1 saves 1 to _ret_.
// inner finally runs. x becomes 1.
// outer finally runs. x becomes 2.
// function returns _ret_ (which is 1).
