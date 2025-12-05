function defaultBasic(a = 1) {
  return a;
}
function defaultExpr(a = 1 + 2) {
  return a;
}
function defaultRef(a, b = a) {
  return b;
}
