/* Align these values with your bellard/quickjs build (quickjs-opcode.h). */
export enum OP {
  invalid = 0,

  // push/load
  push_i32 = 1,
  push_const = 2,
  fclosure = 3,
  push_atom_value = 4,
  undefined = 6,
  null = 7,
  push_false = 9,
  push_true = 10,
  object = 11,

  // stack
  drop = 14,
  dup = 17,
  swap = 27,

  // calls
  call_constructor = 33,
  call = 34,
  call_method = 36,
  array_from = 38,
  apply = 39,

  // return/throw
  return = 40,
  return_undef = 41,
  throw = 48,
  throw_error = 49,

  // eval (npop=u16)
  eval = 50,
  apply_eval = 51,

  // import()
  import = 54,

  // globals
  check_var = 55,
  get_var_undef = 56,
  get_var = 57,
  put_var = 58,
  put_var_init = 59,
  put_var_strict = 60,

  // ref
  get_ref_value = 61,
  put_ref_value = 62,

  // fields
  define_var = 63,
  check_define_var = 64,
  define_func = 65,
  get_field = 66,
  get_field2 = 67,
  put_field = 68,

  // array elements
  get_array_el = 72,
  put_array_el = 75,

  define_field = 78,

  // locals/args/var_ref
  get_loc = 90,
  put_loc = 91,
  set_loc = 92,
  get_arg = 93,
  put_arg = 94,
  get_var_ref = 96,
  put_var_ref = 97,
  set_var_ref = 98,

  // branches (i32 rel)
  if_false = 108,
  if_true = 109,
  goto = 110,
  catch = 111,
  gosub = 112,
  ret = 113,
  nip_catch = 114,

  to_object = 115,
  to_propkey = 116,

  // with final opcodes: atom(u32) + label(i32) + u8(scopeIndex)
  with_get_var = 117,
  with_put_var = 118,
  with_delete_var = 119,
  with_make_ref = 120,
  with_get_ref = 121,

  // closures/make ref
  make_loc_ref = 122,
  make_arg_ref = 123,
  make_var_ref_ref = 124,
  make_var_ref = 125,

  // arithmetic/logic
  mul = 156,
  div = 157,
  mod = 158,
  add = 159,
  sub = 160,
  shl = 162,
  sar = 163,
  shr = 164,
  lt = 165,
  lte = 166,
  gt = 167,
  gte = 168,
  instanceof = 169,
  in = 170,
  eq = 171,
  neq = 172,
  strict_eq = 173,
  strict_neq = 174,
  and = 175,
  xor = 176,
  or = 177,
  not = 178,
  lnot = 179,

  // short branches (peephole)
  if_false8 = 236,
  if_true8 = 237,
  goto8 = 238,
  goto16 = 239, // NOTE: 仅当你的 quickjs 启用该变体；可通过 HAS_GOTO16 控制是否发射。

  // inline cache
  nop = 181,
  get_field_ic = 248,
  get_field2_ic = 249,
  put_field_ic = 250,
  debugger = 251,
}
