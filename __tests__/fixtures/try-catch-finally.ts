// ES3+: try/catch/finally
try {
  throw 1;
} catch (e) {
  console.log(e);
} finally {
  console.log('f');
}
