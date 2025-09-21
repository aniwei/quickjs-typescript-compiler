/*
 * QuickJS opcode definitions
 *
 * This file is ported from quickjs-opcode.h
 */

export enum OpCode {
  // push values
  push_i32 = 0x01,
  push_const,
  fclosure,
  push_atom_value,
  private_symbol,
  undefined,
  null,
  push_this,
  push_false,
  push_true,
  object,
  special_object,
  rest,

  // call/return
  return = 0x23,
  return_undef,

  // arithmetic/logic
  neg = 0x80,
  plus,
  dec,
  inc,
  post_dec,
  post_inc,
  dec_loc,
  inc_loc,
  add_loc,
  not,
  lnot,
  typeof,
  delete,
  delete_var,

  mul,
  div,
  mod,
  add,
  sub,
  pow,
  shl,
  sar,
  shr,
  lt,
  lte,
  gt,
  gte,
  instanceof,
  in,
  eq,
  neq,
  strict_eq,
  strict_neq,
  and,
  xor,
  or,

  get_var = 0x15,
  put_var = 0x16,
  put_var_init = 0x17,

  get_field = 0x1d,
  put_field = 0x1e,
  call = 0x1f,
  // 0x20 is tail_call in QuickJS, skipping for now
  call_method = 0x21,

  define_array_el = 0x3a,
  append = 0x3b,

  // control-flow (minimal subset for loops/branches)
  if_false = 0x70,
  goto = 0x71,

  // iterator/for-of support (subset)
  for_of_start = 0x72,
  for_of_next = 0x73,
  iterator_get_value_done = 0x74,
  iterator_close = 0x75,

  // short opcodes
  push_minus1 = 0xc0,
  push_0,
  push_1,
  push_2,
  push_3,
  push_4,
  push_5,
  push_6,
  push_7,
}
