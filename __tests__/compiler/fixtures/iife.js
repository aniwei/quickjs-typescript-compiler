(function() {
  var iife_var = "I am in an IIFE";
  console.log(iife_var);
})();

var iife_result = (function(name) {
  return "Hello " + name;
})("World");
console.log(iife_result);
