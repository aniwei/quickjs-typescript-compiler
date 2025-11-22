try {
  throw new Error("oops");
} catch (e) {
  console.log("caught", e);
} finally {
  console.log("finally");
}
