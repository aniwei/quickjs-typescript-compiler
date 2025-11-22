const obj = { a: 1, b: 2 };
console.log(delete obj.a);
console.log(delete obj['b']);
console.log(delete obj.c); // true (prop doesn't exist)
console.log(delete (obj as any).d);

// delete non-reference
console.log(delete 1); // true
console.log(delete 'str'); // true
