var t = true;
var f = false;
console.log(t && f);
console.log(t || f);
console.log(!t);
console.log(t && true);
console.log(f || false);

var obj_l = null;
var res = obj_l && obj_l.prop;
console.log(res);

var val_l = 0;
var res2 = val_l || 10;
console.log(res2);
