try {
  throw "error";
} catch (e) {
  console.log("caught", e);
} finally {
  console.log("finally");
}
