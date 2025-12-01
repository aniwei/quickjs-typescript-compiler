var a_op = 10;
a_op += 5;
console.log(a_op);
a_op -= 3;
console.log(a_op);
a_op *= 2;
console.log(a_op);
a_op /= 4;
console.log(a_op);
a_op %= 3;
console.log(a_op);

var b_op = 1;
b_op <<= 1;
console.log(b_op);
b_op >>= 1;
console.log(b_op);
b_op >>>= 1;
console.log(b_op);

var c_op = 5; // 101
c_op &= 3;    // 011 => 001 (1)
console.log(c_op);
c_op |= 2;    // 010 => 011 (3)
console.log(c_op);
c_op ^= 1;    // 001 => 010 (2)
console.log(c_op);
