try {
  console.log("try");
  throw "error";
} catch (e) {
  console.log("catch", e);
} finally {
  console.log("finally");
}
