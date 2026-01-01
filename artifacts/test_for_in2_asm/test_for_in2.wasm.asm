__tests__/fixtures/test_for_in2.js:1:0: function: <eval>
  locals:
    0: var <ret>
    1: catch e [level:3 next:-1]
  stack_size: 3
  opcodes (62 bytes):
   0 check_define_var  atom=472 (assert) flags=64
   6 check_define_var  atom=473 (test_for_in2) flags=64
  12 fclosure8
  14 define_func  atom=472 (assert) flags=0
  20 fclosure8
  22 define_func  atom=473 (test_for_in2) flags=0
  28 undefined
  29 put_loc0
  30 catch  offset=19
  35 get_var  atom=474 (__loadScript)
  40 push_atom_value  atom=475 (test_assert.js)
  45 call1
  46 put_loc0
  47 drop
  48 goto8  offset=11
  50 put_loc1
  51 catch  offset=7
  56 drop
  57 goto8  offset=2
  59 throw
  60 get_loc0
  61 return
TTT