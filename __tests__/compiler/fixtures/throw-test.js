
function testThrow() {
    throw new Error("Something went wrong");
}

try {
    testThrow();
} catch (e) {
    console.log("Caught:", e);
}
