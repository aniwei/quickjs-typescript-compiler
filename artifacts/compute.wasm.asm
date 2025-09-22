__tests__/compiler/fixtures/compute.js:1:0: function: <eval>
  mode: strict
  locals:
    0: const item [level:2 next:-1]
  closure vars:
    0: arr local loc0 const
  stack_size: 6
  opcodes (46 bytes):
   0 push_this
   1 if_false8  offset=2
   3 return_undef
   4 push_1
   5 push_2
   6 push_3
   7 array_from
  10 put_var_ref0
  11 set_loc_uninitialized
  14 get_var_ref_check
  17 for_of_start
  18 goto8  offset=19
  20 put_loc0
  21 get_var  atom=474 (console)
  26 get_field2  atom=475 (log)
  31 get_loc_check
  34 call_method
  37 drop
  38 for_of_next  0
  40 if_false8  offset=-21
  42 drop
  43 iterator_close
  44 undefined
  45 return_async
