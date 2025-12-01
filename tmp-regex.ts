const re = /ab+c/;
console.log("Is RegExp:", re instanceof RegExp);
console.log("Test:", re.test("abbbc"));
