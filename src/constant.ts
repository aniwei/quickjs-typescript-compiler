/*
 * @see https://github.com/bellard/quickjs/blob/master/quickjs.h#L322
 */
export enum ConstantTag {
  UNDEFINED = 0,
  NULL = 1,
  BOOL_FALSE = 2,
  BOOL_TRUE = 3,
  INT32 = 4,
  FLOAT64 = 5,
  STRING = 6,
  OBJECT = 7,
  ARRAY = 8,
  BIG_INT = 9,
  BIG_FLOAT = 10,
  BIG_DECIMAL = 11,
  TEMPLATE = 12,
  FUNCTION_BYTECODE = 13,
  MODULE = 14,
  REGEXP = 15,
  // custom
  ATOM = 200,
  ATOM_NULL = 201,
}
