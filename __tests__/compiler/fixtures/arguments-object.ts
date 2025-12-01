function testArgs() {
  // @ts-ignore
  console.log(arguments.length);
  // @ts-ignore
  console.log(arguments[0]);
}
// @ts-ignore
testArgs(1, 2, 3);
