var ns_x = 10;
function ns_outer() {
  var ns_y = 20;
  function ns_inner() {
    var ns_z = 30;
    console.log(ns_x + ns_y + ns_z);
  }
  ns_inner();
}
ns_outer();
