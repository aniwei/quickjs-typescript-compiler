// 覆盖：复杂语法组合（label + for-of + try/catch/finally + switch + 逻辑赋值/空值合并赋值 + 逗号运算符）
let out = 0;

outer: for (let k of [0, 1, 2, 3]) {
  try {
    switch (k) {
      case 0:
        out += 1;
        break;
      case 1:
        out ||= 10;
        break;
      case 2:
        out ??= 20;
        break;
      default:
        out = (out, out + 3);
    }

    if (k === 2) continue outer;
    if (k === 3) break outer;
  } catch (e) {
    console.log('catch', e);
  } finally {
    out += 100;
  }
}

console.log(out);
