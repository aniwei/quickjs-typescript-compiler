__tests__/compiler/fixtures/arrow-fn-basic.js:1:0: function: <eval>
  mode: strict
  closure vars:
    0: total local loc0 const
    1: doubled local loc1 const
    2: combined local loc2 const
  stack_size: 3
  opcodes (38 bytes):
   0 push_this
   1 if_false8  offset=2
   3 return_undef
   4 fclosure8
   6 push_1
   7 push_2
   8 call2
   9 put_var_ref0
  10 fclosure8
  12 get_var_ref_check
  15 call1
  16 put_var_ref1
  17 fclosure8
  19 get_var_ref_check
  22 call1
  23 put_var_ref2
  24 get_var_ref_check
  27 drop
  28 get_var_ref_check
  31 drop
  32 get_var_ref_check
  35 drop
  36 undefined
  37 return_async
