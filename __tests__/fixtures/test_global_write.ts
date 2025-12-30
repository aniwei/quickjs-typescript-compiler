var global_write =
    (1, eval)(`(function global_write(n)
           {
               var j;
               for(j = 0; j < n; j++) {
                   global_var0 = j;
                   global_var0 = j;
                   global_var0 = j;
                   global_var0 = j;
               }
               return n * 4;
           })`);