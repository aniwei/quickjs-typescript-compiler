/*
 * QuickJS Javascript Engine
 *
 * Copyright (c) 2017-2025 Fabrice Bellard
 * Copyright (c) 2017-2025 Charlie Gordon
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include "js-big-num.h"

#include "../convertion.h"
#include "../exception.h"
#include "../function.h"
#include "../object.h"
#include "../runtime.h"
#include "../string-utils.h"
#include "js-number.h"
#include "js-operator.h"

/* bigint support */

#define JS_BIGINT_MAX_SIZE ((1024 * 1024) / JS_LIMB_BITS) /* in limbs */

/* it is currently assumed that JS_SHORT_BIG_INT_BITS = JS_LIMB_BITS */
#if JS_SHORT_BIG_INT_BITS == 32
#define JS_SHORT_BIG_INT_MIN INT32_MIN
#define JS_SHORT_BIG_INT_MAX INT32_MAX
#elif JS_SHORT_BIG_INT_BITS == 64
#define JS_SHORT_BIG_INT_MIN INT64_MIN
#define JS_SHORT_BIG_INT_MAX INT64_MAX
#else
#error unsupported
#endif

JSValue JS_NewBigInt64(JSContext* ctx, int64_t v) {
#if JS_SHORT_BIG_INT_BITS == 64
  return __JS_NewShortBigInt(ctx, v);
#else
  if (v >= JS_SHORT_BIG_INT_MIN && v <= JS_SHORT_BIG_INT_MAX) {
    return __JS_NewShortBigInt(ctx, v);
  } else {
    JSBigInt* p;
    p = js_bigint_new_si64(ctx, v);
    if (!p)
      return JS_EXCEPTION;
    return JS_MKPTR(JS_TAG_BIG_INT, p);
  }
#endif
}

JSValue JS_NewBigUint64(JSContext* ctx, uint64_t v) {
  if (v <= JS_SHORT_BIG_INT_MAX) {
    return __JS_NewShortBigInt(ctx, v);
  } else {
    JSBigInt* p;
    p = js_bigint_new_ui64(ctx, v);
    if (!p)
      return JS_EXCEPTION;
    return JS_MKPTR(JS_TAG_BIG_INT, p);
  }
}

/* return NaN if bad bigint literal */
JSValue JS_StringToBigInt(JSContext* ctx, JSValue val) {
  const char *str, *p;
  size_t len;
  int flags;

  str = JS_ToCStringLen(ctx, &len, val);
  JS_FreeValue(ctx, val);
  if (!str)
    return JS_EXCEPTION;
  p = str;
  p += skip_spaces(p);
  if ((p - str) == len) {
    val = JS_NewBigInt64(ctx, 0);
  } else {
    flags = ATOD_INT_ONLY | ATOD_ACCEPT_BIN_OCT | ATOD_TYPE_BIG_INT;
    val = js_atof(ctx, p, &p, 0, flags);
    p += skip_spaces(p);
    if (!JS_IsException(val)) {
      if ((p - str) != len) {
        JS_FreeValue(ctx, val);
        val = JS_NAN;
      }
    }
  }
  JS_FreeCString(ctx, str);
  return val;
}

JSValue JS_StringToBigIntErr(JSContext* ctx, JSValue val) {
  val = JS_StringToBigInt(ctx, val);
  if (JS_VALUE_IS_NAN(val))
    return JS_ThrowSyntaxError(ctx, "invalid bigint literal");
  return val;
}

/* JS Numbers are not allowed */
JSValue JS_ToBigIntFree(JSContext* ctx, JSValue val) {
  uint32_t tag;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_SHORT_BIG_INT:
    case JS_TAG_BIG_INT:
      break;
    case JS_TAG_INT:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
    case JS_TAG_FLOAT64:
      goto fail;
    case JS_TAG_BOOL:
      val = __JS_NewShortBigInt(ctx, JS_VALUE_GET_INT(val));
      break;
    case JS_TAG_STRING:
    case JS_TAG_STRING_ROPE:
      val = JS_StringToBigIntErr(ctx, val);
      if (JS_IsException(val))
        return val;
      goto redo;
    case JS_TAG_OBJECT:
      val = JS_ToPrimitiveFree(ctx, val, HINT_NUMBER);
      if (JS_IsException(val))
        return val;
      goto redo;
    default:
    fail:
      JS_FreeValue(ctx, val);
      return JS_ThrowTypeError(ctx, "cannot convert to bigint");
  }
  return val;
}

JSValue JS_ToBigInt(JSContext* ctx, JSValueConst val) {
  return JS_ToBigIntFree(ctx, JS_DupValue(ctx, val));
}

/* XXX: merge with JS_ToInt64Free with a specific flag ? */
int JS_ToBigInt64Free(JSContext* ctx, int64_t* pres, JSValue val) {
  uint64_t res;

  val = JS_ToBigIntFree(ctx, val);
  if (JS_IsException(val)) {
    *pres = 0;
    return -1;
  }
  if (JS_VALUE_GET_TAG(val) == JS_TAG_SHORT_BIG_INT) {
    res = JS_VALUE_GET_SHORT_BIG_INT(val);
  } else {
    JSBigInt* p = JS_VALUE_GET_PTR(val);
    /* return the value mod 2^64 */
    res = p->tab[0];
#if JS_LIMB_BITS == 32
    if (p->len >= 2)
      res |= (uint64_t)p->tab[1] << 32;
#endif
    JS_FreeValue(ctx, val);
  }
  *pres = res;
  return 0;
}

int JS_ToBigInt64(JSContext* ctx, int64_t* pres, JSValueConst val) {
  return JS_ToBigInt64Free(ctx, pres, JS_DupValue(ctx, val));
}

no_inline __exception int
js_unary_arith_slow(JSContext* ctx, JSValue* sp, OPCodeEnum op) {
  JSValue op1;
  int v;
  uint32_t tag;
  JSBigIntBuf buf1;
  JSBigInt* p1;

  op1 = sp[-1];
  /* fast path for float64 */
  if (JS_TAG_IS_FLOAT64(JS_VALUE_GET_TAG(op1)))
    goto handle_float64;
  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1))
    goto exception;
  tag = JS_VALUE_GET_TAG(op1);
  switch (tag) {
    case JS_TAG_INT: {
      int64_t v64;
      v64 = JS_VALUE_GET_INT(op1);
      switch (op) {
        case OP_inc:
        case OP_dec:
          v = 2 * (op - OP_dec) - 1;
          v64 += v;
          break;
        case OP_plus:
          break;
        case OP_neg:
          if (v64 == 0) {
            sp[-1] = __JS_NewFloat64(ctx, -0.0);
            return 0;
          } else {
            v64 = -v64;
          }
          break;
        default:
          abort();
      }
      sp[-1] = JS_NewInt64(ctx, v64);
    } break;
    case JS_TAG_SHORT_BIG_INT: {
      int64_t v;
      v = JS_VALUE_GET_SHORT_BIG_INT(op1);
      switch (op) {
        case OP_plus:
          JS_ThrowTypeError(ctx, "bigint argument with unary +");
          goto exception;
        case OP_inc:
          if (v == JS_SHORT_BIG_INT_MAX)
            goto bigint_slow_case;
          sp[-1] = __JS_NewShortBigInt(ctx, v + 1);
          break;
        case OP_dec:
          if (v == JS_SHORT_BIG_INT_MIN)
            goto bigint_slow_case;
          sp[-1] = __JS_NewShortBigInt(ctx, v - 1);
          break;
        case OP_neg:
          v = JS_VALUE_GET_SHORT_BIG_INT(op1);
          if (v == JS_SHORT_BIG_INT_MIN) {
          bigint_slow_case:
            p1 = js_bigint_set_short(&buf1, op1);
            goto bigint_slow_case1;
          }
          sp[-1] = __JS_NewShortBigInt(ctx, -v);
          break;
        default:
          abort();
      }
    } break;
    case JS_TAG_BIG_INT: {
      JSBigInt* r;
      p1 = JS_VALUE_GET_PTR(op1);
    bigint_slow_case1:
      switch (op) {
        case OP_plus:
          JS_ThrowTypeError(ctx, "bigint argument with unary +");
          JS_FreeValue(ctx, op1);
          goto exception;
        case OP_inc:
        case OP_dec: {
          JSBigIntBuf buf2;
          JSBigInt* p2;
          p2 = js_bigint_set_si(&buf2, 2 * (op - OP_dec) - 1);
          r = js_bigint_add(ctx, p1, p2, 0);
        } break;
        case OP_neg:
          r = js_bigint_neg(ctx, p1);
          break;
        case OP_not:
          r = js_bigint_not(ctx, p1);
          break;
        default:
          abort();
      }
      JS_FreeValue(ctx, op1);
      if (!r)
        goto exception;
      sp[-1] = JS_CompactBigInt(ctx, r);
    } break;
    default:
    handle_float64: {
      double d;
      d = JS_VALUE_GET_FLOAT64(op1);
      switch (op) {
        case OP_inc:
        case OP_dec:
          v = 2 * (op - OP_dec) - 1;
          d += v;
          break;
        case OP_plus:
          break;
        case OP_neg:
          d = -d;
          break;
        default:
          abort();
      }
      sp[-1] = __JS_NewFloat64(ctx, d);
    } break;
  }
  return 0;
exception:
  sp[-1] = JS_UNDEFINED;
  return -1;
}

__exception int js_post_inc_slow(JSContext* ctx, JSValue* sp, OPCodeEnum op) {
  JSValue op1;

  /* XXX: allow custom operators */
  op1 = sp[-1];
  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1)) {
    sp[-1] = JS_UNDEFINED;
    return -1;
  }
  sp[-1] = op1;
  sp[0] = JS_DupValue(ctx, op1);
  return js_unary_arith_slow(ctx, sp + 1, op - OP_post_dec + OP_dec);
}

no_inline int js_not_slow(JSContext* ctx, JSValue* sp) {
  JSValue op1;

  op1 = sp[-1];
  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1))
    goto exception;
  if (JS_VALUE_GET_TAG(op1) == JS_TAG_SHORT_BIG_INT) {
    sp[-1] = __JS_NewShortBigInt(ctx, ~JS_VALUE_GET_SHORT_BIG_INT(op1));
  } else if (JS_VALUE_GET_TAG(op1) == JS_TAG_BIG_INT) {
    JSBigInt* r;
    r = js_bigint_not(ctx, JS_VALUE_GET_PTR(op1));
    JS_FreeValue(ctx, op1);
    if (!r)
      goto exception;
    sp[-1] = JS_CompactBigInt(ctx, r);
  } else {
    int32_t v1;
    if (unlikely(JS_ToInt32Free(ctx, &v1, op1)))
      goto exception;
    sp[-1] = JS_NewInt32(ctx, ~v1);
  }
  return 0;
exception:
  sp[-1] = JS_UNDEFINED;
  return -1;
}

no_inline __exception int
js_binary_arith_slow(JSContext* ctx, JSValue* sp, OPCodeEnum op) {
  JSValue op1, op2;
  uint32_t tag1, tag2;
  double d1, d2;

  op1 = sp[-2];
  op2 = sp[-1];
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);
  /* fast path for float operations */
  if (tag1 == JS_TAG_FLOAT64 && tag2 == JS_TAG_FLOAT64) {
    d1 = JS_VALUE_GET_FLOAT64(op1);
    d2 = JS_VALUE_GET_FLOAT64(op2);
    goto handle_float64;
  }

  /* fast path for short big int operations */
  if (tag1 == JS_TAG_SHORT_BIG_INT && tag2 == JS_TAG_SHORT_BIG_INT) {
    js_slimb_t v1, v2;
    js_sdlimb_t v;
    v1 = JS_VALUE_GET_SHORT_BIG_INT(op1);
    v2 = JS_VALUE_GET_SHORT_BIG_INT(op2);
    switch (op) {
      case OP_sub:
        v = (js_sdlimb_t)v1 - (js_sdlimb_t)v2;
        break;
      case OP_mul:
        v = (js_sdlimb_t)v1 * (js_sdlimb_t)v2;
        break;
      case OP_div:
        if (v2 == 0 ||
            ((js_limb_t)v1 == (js_limb_t)1 << (JS_LIMB_BITS - 1) && v2 == -1)) {
          goto slow_big_int;
        }
        sp[-2] = __JS_NewShortBigInt(ctx, v1 / v2);
        return 0;
      case OP_mod:
        if (v2 == 0 ||
            ((js_limb_t)v1 == (js_limb_t)1 << (JS_LIMB_BITS - 1) && v2 == -1)) {
          goto slow_big_int;
        }
        sp[-2] = __JS_NewShortBigInt(ctx, v1 % v2);
        return 0;
      case OP_pow:
        goto slow_big_int;
      default:
        abort();
    }
    if (likely(v >= JS_SHORT_BIG_INT_MIN && v <= JS_SHORT_BIG_INT_MAX)) {
      sp[-2] = __JS_NewShortBigInt(ctx, v);
    } else {
      JSBigInt* r = js_bigint_new_di(ctx, v);
      if (!r)
        goto exception;
      sp[-2] = JS_MKPTR(JS_TAG_BIG_INT, r);
    }
    return 0;
  }
  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1)) {
    JS_FreeValue(ctx, op2);
    goto exception;
  }
  op2 = JS_ToNumericFree(ctx, op2);
  if (JS_IsException(op2)) {
    JS_FreeValue(ctx, op1);
    goto exception;
  }
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);

  if (tag1 == JS_TAG_INT && tag2 == JS_TAG_INT) {
    int32_t v1, v2;
    int64_t v;
    v1 = JS_VALUE_GET_INT(op1);
    v2 = JS_VALUE_GET_INT(op2);
    switch (op) {
      case OP_sub:
        v = (int64_t)v1 - (int64_t)v2;
        break;
      case OP_mul:
        v = (int64_t)v1 * (int64_t)v2;
        if (v == 0 && (v1 | v2) < 0) {
          sp[-2] = __JS_NewFloat64(ctx, -0.0);
          return 0;
        }
        break;
      case OP_div:
        sp[-2] = JS_NewFloat64(ctx, (double)v1 / (double)v2);
        return 0;
      case OP_mod:
        if (v1 < 0 || v2 <= 0) {
          sp[-2] = JS_NewFloat64(ctx, fmod(v1, v2));
          return 0;
        } else {
          v = (int64_t)v1 % (int64_t)v2;
        }
        break;
      case OP_pow:
        sp[-2] = JS_NewFloat64(ctx, js_pow(v1, v2));
        return 0;
      default:
        abort();
    }
    sp[-2] = JS_NewInt64(ctx, v);
  } else if (
      (tag1 == JS_TAG_SHORT_BIG_INT || tag1 == JS_TAG_BIG_INT) &&
      (tag2 == JS_TAG_SHORT_BIG_INT || tag2 == JS_TAG_BIG_INT)) {
    JSBigInt *p1, *p2, *r;
    JSBigIntBuf buf1, buf2;
  slow_big_int:
    /* bigint result */
    if (JS_VALUE_GET_TAG(op1) == JS_TAG_SHORT_BIG_INT)
      p1 = js_bigint_set_short(&buf1, op1);
    else
      p1 = JS_VALUE_GET_PTR(op1);
    if (JS_VALUE_GET_TAG(op2) == JS_TAG_SHORT_BIG_INT)
      p2 = js_bigint_set_short(&buf2, op2);
    else
      p2 = JS_VALUE_GET_PTR(op2);
    switch (op) {
      case OP_add:
        r = js_bigint_add(ctx, p1, p2, 0);
        break;
      case OP_sub:
        r = js_bigint_add(ctx, p1, p2, 1);
        break;
      case OP_mul:
        r = js_bigint_mul(ctx, p1, p2);
        break;
      case OP_div:
        r = js_bigint_divrem(ctx, p1, p2, FALSE);
        break;
      case OP_mod:
        r = js_bigint_divrem(ctx, p1, p2, TRUE);
        break;
      case OP_pow:
        r = js_bigint_pow(ctx, p1, p2);
        break;
      default:
        abort();
    }
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
    if (!r)
      goto exception;
    sp[-2] = JS_CompactBigInt(ctx, r);
  } else {
    double dr;
    /* float64 result */
    if (JS_ToFloat64Free(ctx, &d1, op1)) {
      JS_FreeValue(ctx, op2);
      goto exception;
    }
    if (JS_ToFloat64Free(ctx, &d2, op2))
      goto exception;
  handle_float64:
    switch (op) {
      case OP_sub:
        dr = d1 - d2;
        break;
      case OP_mul:
        dr = d1 * d2;
        break;
      case OP_div:
        dr = d1 / d2;
        break;
      case OP_mod:
        dr = fmod(d1, d2);
        break;
      case OP_pow:
        dr = js_pow(d1, d2);
        break;
      default:
        abort();
    }
    sp[-2] = __JS_NewFloat64(ctx, dr);
  }
  return 0;
exception:
  sp[-2] = JS_UNDEFINED;
  sp[-1] = JS_UNDEFINED;
  return -1;
}

BOOL tag_is_string(uint32_t tag) {
  return tag == JS_TAG_STRING || tag == JS_TAG_STRING_ROPE;
}

no_inline __exception int js_add_slow(JSContext* ctx, JSValue* sp) {
  JSValue op1, op2;
  uint32_t tag1, tag2;

  op1 = sp[-2];
  op2 = sp[-1];

  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);
  /* fast path for float64 */
  if (tag1 == JS_TAG_FLOAT64 && tag2 == JS_TAG_FLOAT64) {
    double d1, d2;
    d1 = JS_VALUE_GET_FLOAT64(op1);
    d2 = JS_VALUE_GET_FLOAT64(op2);
    sp[-2] = __JS_NewFloat64(ctx, d1 + d2);
    return 0;
  }
  /* fast path for short bigint */
  if (tag1 == JS_TAG_SHORT_BIG_INT && tag2 == JS_TAG_SHORT_BIG_INT) {
    js_slimb_t v1, v2;
    js_sdlimb_t v;
    v1 = JS_VALUE_GET_SHORT_BIG_INT(op1);
    v2 = JS_VALUE_GET_SHORT_BIG_INT(op2);
    v = (js_sdlimb_t)v1 + (js_sdlimb_t)v2;
    if (likely(v >= JS_SHORT_BIG_INT_MIN && v <= JS_SHORT_BIG_INT_MAX)) {
      sp[-2] = __JS_NewShortBigInt(ctx, v);
    } else {
      JSBigInt* r = js_bigint_new_di(ctx, v);
      if (!r)
        goto exception;
      sp[-2] = JS_MKPTR(JS_TAG_BIG_INT, r);
    }
    return 0;
  }

  if (tag1 == JS_TAG_OBJECT || tag2 == JS_TAG_OBJECT) {
    op1 = JS_ToPrimitiveFree(ctx, op1, HINT_NONE);
    if (JS_IsException(op1)) {
      JS_FreeValue(ctx, op2);
      goto exception;
    }

    op2 = JS_ToPrimitiveFree(ctx, op2, HINT_NONE);
    if (JS_IsException(op2)) {
      JS_FreeValue(ctx, op1);
      goto exception;
    }
    tag1 = JS_VALUE_GET_NORM_TAG(op1);
    tag2 = JS_VALUE_GET_NORM_TAG(op2);
  }

  if (tag_is_string(tag1) || tag_is_string(tag2)) {
    sp[-2] = JS_ConcatString(ctx, op1, op2);
    if (JS_IsException(sp[-2]))
      goto exception;
    return 0;
  }

  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1)) {
    JS_FreeValue(ctx, op2);
    goto exception;
  }
  op2 = JS_ToNumericFree(ctx, op2);
  if (JS_IsException(op2)) {
    JS_FreeValue(ctx, op1);
    goto exception;
  }
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);

  if (tag1 == JS_TAG_INT && tag2 == JS_TAG_INT) {
    int32_t v1, v2;
    int64_t v;
    v1 = JS_VALUE_GET_INT(op1);
    v2 = JS_VALUE_GET_INT(op2);
    v = (int64_t)v1 + (int64_t)v2;
    sp[-2] = JS_NewInt64(ctx, v);
  } else if (
      (tag1 == JS_TAG_BIG_INT || tag1 == JS_TAG_SHORT_BIG_INT) &&
      (tag2 == JS_TAG_BIG_INT || tag2 == JS_TAG_SHORT_BIG_INT)) {
    JSBigInt *p1, *p2, *r;
    JSBigIntBuf buf1, buf2;
    /* bigint result */
    if (JS_VALUE_GET_TAG(op1) == JS_TAG_SHORT_BIG_INT)
      p1 = js_bigint_set_short(&buf1, op1);
    else
      p1 = JS_VALUE_GET_PTR(op1);
    if (JS_VALUE_GET_TAG(op2) == JS_TAG_SHORT_BIG_INT)
      p2 = js_bigint_set_short(&buf2, op2);
    else
      p2 = JS_VALUE_GET_PTR(op2);
    r = js_bigint_add(ctx, p1, p2, 0);
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
    if (!r)
      goto exception;
    sp[-2] = JS_CompactBigInt(ctx, r);
  } else {
    double d1, d2;
    /* float64 result */
    if (JS_ToFloat64Free(ctx, &d1, op1)) {
      JS_FreeValue(ctx, op2);
      goto exception;
    }
    if (JS_ToFloat64Free(ctx, &d2, op2))
      goto exception;
    sp[-2] = __JS_NewFloat64(ctx, d1 + d2);
  }
  return 0;
exception:
  sp[-2] = JS_UNDEFINED;
  sp[-1] = JS_UNDEFINED;
  return -1;
}

no_inline __exception int
js_binary_logic_slow(JSContext* ctx, JSValue* sp, OPCodeEnum op) {
  JSValue op1, op2;
  uint32_t tag1, tag2;
  uint32_t v1, v2, r;

  op1 = sp[-2];
  op2 = sp[-1];
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);

  if (tag1 == JS_TAG_SHORT_BIG_INT && tag2 == JS_TAG_SHORT_BIG_INT) {
    js_slimb_t v1, v2, v;
    js_sdlimb_t vd;
    v1 = JS_VALUE_GET_SHORT_BIG_INT(op1);
    v2 = JS_VALUE_GET_SHORT_BIG_INT(op2);
    /* bigint fast path */
    switch (op) {
      case OP_and:
        v = v1 & v2;
        break;
      case OP_or:
        v = v1 | v2;
        break;
      case OP_xor:
        v = v1 ^ v2;
        break;
      case OP_sar:
        if (v2 > (JS_LIMB_BITS - 1)) {
          goto slow_big_int;
        } else if (v2 < 0) {
          if (v2 < -(JS_LIMB_BITS - 1))
            goto slow_big_int;
          v2 = -v2;
          goto bigint_shl;
        }
      bigint_sar:
        v = v1 >> v2;
        break;
      case OP_shl:
        if (v2 > (JS_LIMB_BITS - 1)) {
          goto slow_big_int;
        } else if (v2 < 0) {
          if (v2 < -(JS_LIMB_BITS - 1))
            goto slow_big_int;
          v2 = -v2;
          goto bigint_sar;
        }
      bigint_shl:
        vd = (js_dlimb_t)v1 << v2;
        if (likely(vd >= JS_SHORT_BIG_INT_MIN && vd <= JS_SHORT_BIG_INT_MAX)) {
          v = vd;
        } else {
          JSBigInt* r = js_bigint_new_di(ctx, vd);
          if (!r)
            goto exception;
          sp[-2] = JS_MKPTR(JS_TAG_BIG_INT, r);
          return 0;
        }
        break;
      default:
        abort();
    }
    sp[-2] = __JS_NewShortBigInt(ctx, v);
    return 0;
  }
  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1)) {
    JS_FreeValue(ctx, op2);
    goto exception;
  }
  op2 = JS_ToNumericFree(ctx, op2);
  if (JS_IsException(op2)) {
    JS_FreeValue(ctx, op1);
    goto exception;
  }

  tag1 = JS_VALUE_GET_TAG(op1);
  tag2 = JS_VALUE_GET_TAG(op2);
  if ((tag1 == JS_TAG_BIG_INT || tag1 == JS_TAG_SHORT_BIG_INT) &&
      (tag2 == JS_TAG_BIG_INT || tag2 == JS_TAG_SHORT_BIG_INT)) {
    JSBigInt *p1, *p2, *r;
    JSBigIntBuf buf1, buf2;
  slow_big_int:
    if (JS_VALUE_GET_TAG(op1) == JS_TAG_SHORT_BIG_INT)
      p1 = js_bigint_set_short(&buf1, op1);
    else
      p1 = JS_VALUE_GET_PTR(op1);
    if (JS_VALUE_GET_TAG(op2) == JS_TAG_SHORT_BIG_INT)
      p2 = js_bigint_set_short(&buf2, op2);
    else
      p2 = JS_VALUE_GET_PTR(op2);
    switch (op) {
      case OP_and:
      case OP_or:
      case OP_xor:
        r = js_bigint_logic(ctx, p1, p2, op);
        break;
      case OP_shl:
      case OP_sar: {
        js_slimb_t shift;
        shift = js_bigint_get_si_sat(p2);
        if (shift > INT32_MAX)
          shift = INT32_MAX;
        else if (shift < -INT32_MAX)
          shift = -INT32_MAX;
        if (op == OP_sar)
          shift = -shift;
        if (shift >= 0)
          r = js_bigint_shl(ctx, p1, shift);
        else
          r = js_bigint_shr(ctx, p1, -shift);
      } break;
      default:
        abort();
    }
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
    if (!r)
      goto exception;
    sp[-2] = JS_CompactBigInt(ctx, r);
  } else {
    if (unlikely(JS_ToInt32Free(ctx, (int32_t*)&v1, op1))) {
      JS_FreeValue(ctx, op2);
      goto exception;
    }
    if (unlikely(JS_ToInt32Free(ctx, (int32_t*)&v2, op2)))
      goto exception;
    switch (op) {
      case OP_shl:
        r = v1 << (v2 & 0x1f);
        break;
      case OP_sar:
        r = (int)v1 >> (v2 & 0x1f);
        break;
      case OP_and:
        r = v1 & v2;
        break;
      case OP_or:
        r = v1 | v2;
        break;
      case OP_xor:
        r = v1 ^ v2;
        break;
      default:
        abort();
    }
    sp[-2] = JS_NewInt32(ctx, r);
  }
  return 0;
exception:
  sp[-2] = JS_UNDEFINED;
  sp[-1] = JS_UNDEFINED;
  return -1;
}

/* op1 must be a bigint or int. */
static JSBigInt*
JS_ToBigIntBuf(JSContext* ctx, JSBigIntBuf* buf1, JSValue op1) {
  JSBigInt* p1;

  switch (JS_VALUE_GET_TAG(op1)) {
    case JS_TAG_INT:
      p1 = js_bigint_set_si(buf1, JS_VALUE_GET_INT(op1));
      break;
    case JS_TAG_SHORT_BIG_INT:
      p1 = js_bigint_set_short(buf1, op1);
      break;
    case JS_TAG_BIG_INT:
      p1 = JS_VALUE_GET_PTR(op1);
      break;
    default:
      abort();
  }
  return p1;
}

/* op1 and op2 must be numeric types and at least one must be a
   bigint. No exception is generated. */
static int
js_compare_bigint(JSContext* ctx, OPCodeEnum op, JSValue op1, JSValue op2) {
  int res, val, tag1, tag2;
  JSBigIntBuf buf1, buf2;
  JSBigInt *p1, *p2;

  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);
  if ((tag1 == JS_TAG_SHORT_BIG_INT || tag1 == JS_TAG_INT) &&
      (tag2 == JS_TAG_SHORT_BIG_INT || tag2 == JS_TAG_INT)) {
    /* fast path */
    js_slimb_t v1, v2;
    if (tag1 == JS_TAG_INT)
      v1 = JS_VALUE_GET_INT(op1);
    else
      v1 = JS_VALUE_GET_SHORT_BIG_INT(op1);
    if (tag2 == JS_TAG_INT)
      v2 = JS_VALUE_GET_INT(op2);
    else
      v2 = JS_VALUE_GET_SHORT_BIG_INT(op2);
    val = (v1 > v2) - (v1 < v2);
  } else {
    if (tag1 == JS_TAG_FLOAT64) {
      p2 = JS_ToBigIntBuf(ctx, &buf2, op2);
      val = js_bigint_float64_cmp(ctx, p2, JS_VALUE_GET_FLOAT64(op1));
      if (val == 2)
        goto unordered;
      val = -val;
    } else if (tag2 == JS_TAG_FLOAT64) {
      p1 = JS_ToBigIntBuf(ctx, &buf1, op1);
      val = js_bigint_float64_cmp(ctx, p1, JS_VALUE_GET_FLOAT64(op2));
      if (val == 2) {
      unordered:
        JS_FreeValue(ctx, op1);
        JS_FreeValue(ctx, op2);
        return FALSE;
      }
    } else {
      p1 = JS_ToBigIntBuf(ctx, &buf1, op1);
      p2 = JS_ToBigIntBuf(ctx, &buf2, op2);
      val = js_bigint_cmp(ctx, p1, p2);
    }
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
  }

  switch (op) {
    case OP_lt:
      res = val < 0;
      break;
    case OP_lte:
      res = val <= 0;
      break;
    case OP_gt:
      res = val > 0;
      break;
    case OP_gte:
      res = val >= 0;
      break;
    case OP_eq:
      res = val == 0;
      break;
    default:
      abort();
  }
  return res;
}

no_inline int js_relational_slow(JSContext* ctx, JSValue* sp, OPCodeEnum op) {
  JSValue op1, op2;
  int res;
  uint32_t tag1, tag2;

  op1 = sp[-2];
  op2 = sp[-1];
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);
  op1 = JS_ToPrimitiveFree(ctx, op1, HINT_NUMBER);
  if (JS_IsException(op1)) {
    JS_FreeValue(ctx, op2);
    goto exception;
  }
  op2 = JS_ToPrimitiveFree(ctx, op2, HINT_NUMBER);
  if (JS_IsException(op2)) {
    JS_FreeValue(ctx, op1);
    goto exception;
  }
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);

  if (tag_is_string(tag1) && tag_is_string(tag2)) {
    if (tag1 == JS_TAG_STRING && tag2 == JS_TAG_STRING) {
      res = js_string_compare(
          ctx, JS_VALUE_GET_STRING(op1), JS_VALUE_GET_STRING(op2));
    } else {
      res = js_string_rope_compare(ctx, op1, op2, FALSE);
    }
    switch (op) {
      case OP_lt:
        res = (res < 0);
        break;
      case OP_lte:
        res = (res <= 0);
        break;
      case OP_gt:
        res = (res > 0);
        break;
      default:
      case OP_gte:
        res = (res >= 0);
        break;
    }
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
  } else if (
      (tag1 <= JS_TAG_NULL || tag1 == JS_TAG_FLOAT64) &&
      (tag2 <= JS_TAG_NULL || tag2 == JS_TAG_FLOAT64)) {
    /* fast path for float64/int */
    goto float64_compare;
  } else {
    if ((((tag1 == JS_TAG_BIG_INT || tag1 == JS_TAG_SHORT_BIG_INT) &&
          tag_is_string(tag2)) ||
         ((tag2 == JS_TAG_BIG_INT || tag2 == JS_TAG_SHORT_BIG_INT) &&
          tag_is_string(tag1)))) {
      if (tag_is_string(tag1)) {
        op1 = JS_StringToBigInt(ctx, op1);
        if (JS_VALUE_GET_TAG(op1) != JS_TAG_BIG_INT &&
            JS_VALUE_GET_TAG(op1) != JS_TAG_SHORT_BIG_INT)
          goto invalid_bigint_string;
      }
      if (tag_is_string(tag2)) {
        op2 = JS_StringToBigInt(ctx, op2);
        if (JS_VALUE_GET_TAG(op2) != JS_TAG_BIG_INT &&
            JS_VALUE_GET_TAG(op2) != JS_TAG_SHORT_BIG_INT) {
        invalid_bigint_string:
          JS_FreeValue(ctx, op1);
          JS_FreeValue(ctx, op2);
          res = FALSE;
          goto done;
        }
      }
    } else {
      op1 = JS_ToNumericFree(ctx, op1);
      if (JS_IsException(op1)) {
        JS_FreeValue(ctx, op2);
        goto exception;
      }
      op2 = JS_ToNumericFree(ctx, op2);
      if (JS_IsException(op2)) {
        JS_FreeValue(ctx, op1);
        goto exception;
      }
    }

    tag1 = JS_VALUE_GET_NORM_TAG(op1);
    tag2 = JS_VALUE_GET_NORM_TAG(op2);

    if (tag1 == JS_TAG_BIG_INT || tag1 == JS_TAG_SHORT_BIG_INT ||
        tag2 == JS_TAG_BIG_INT || tag2 == JS_TAG_SHORT_BIG_INT) {
      res = js_compare_bigint(ctx, op, op1, op2);
    } else {
      double d1, d2;

    float64_compare:
      /* can use floating point comparison */
      if (tag1 == JS_TAG_FLOAT64) {
        d1 = JS_VALUE_GET_FLOAT64(op1);
      } else {
        d1 = JS_VALUE_GET_INT(op1);
      }
      if (tag2 == JS_TAG_FLOAT64) {
        d2 = JS_VALUE_GET_FLOAT64(op2);
      } else {
        d2 = JS_VALUE_GET_INT(op2);
      }
      switch (op) {
        case OP_lt:
          res = (d1 < d2); /* if NaN return false */
          break;
        case OP_lte:
          res = (d1 <= d2); /* if NaN return false */
          break;
        case OP_gt:
          res = (d1 > d2); /* if NaN return false */
          break;
        default:
        case OP_gte:
          res = (d1 >= d2); /* if NaN return false */
          break;
      }
    }
  }
done:
  sp[-2] = JS_NewBool(ctx, res);
  return 0;
exception:
  sp[-2] = JS_UNDEFINED;
  sp[-1] = JS_UNDEFINED;
  return -1;
}

BOOL tag_is_number(uint32_t tag) {
  return (
      tag == JS_TAG_INT || tag == JS_TAG_FLOAT64 || tag == JS_TAG_BIG_INT ||
      tag == JS_TAG_SHORT_BIG_INT);
}

no_inline __exception int js_eq_slow(JSContext* ctx, JSValue* sp, BOOL is_neq) {
  JSValue op1, op2;
  int res;
  uint32_t tag1, tag2;

  op1 = sp[-2];
  op2 = sp[-1];
redo:
  tag1 = JS_VALUE_GET_NORM_TAG(op1);
  tag2 = JS_VALUE_GET_NORM_TAG(op2);
  if (tag_is_number(tag1) && tag_is_number(tag2)) {
    if (tag1 == JS_TAG_INT && tag2 == JS_TAG_INT) {
      res = JS_VALUE_GET_INT(op1) == JS_VALUE_GET_INT(op2);
    } else if (
        (tag1 == JS_TAG_FLOAT64 &&
         (tag2 == JS_TAG_INT || tag2 == JS_TAG_FLOAT64)) ||
        (tag2 == JS_TAG_FLOAT64 &&
         (tag1 == JS_TAG_INT || tag1 == JS_TAG_FLOAT64))) {
      double d1, d2;
      if (tag1 == JS_TAG_FLOAT64) {
        d1 = JS_VALUE_GET_FLOAT64(op1);
      } else {
        d1 = JS_VALUE_GET_INT(op1);
      }
      if (tag2 == JS_TAG_FLOAT64) {
        d2 = JS_VALUE_GET_FLOAT64(op2);
      } else {
        d2 = JS_VALUE_GET_INT(op2);
      }
      res = (d1 == d2);
    } else {
      res = js_compare_bigint(ctx, OP_eq, op1, op2);
    }
  } else if (tag1 == tag2) {
    res = js_strict_eq2(ctx, op1, op2, JS_EQ_STRICT);
  } else if (
      (tag1 == JS_TAG_NULL && tag2 == JS_TAG_UNDEFINED) ||
      (tag2 == JS_TAG_NULL && tag1 == JS_TAG_UNDEFINED)) {
    res = TRUE;
  } else if (tag_is_string(tag1) && tag_is_string(tag2)) {
    /* needed when comparing strings and ropes */
    res = js_strict_eq2(ctx, op1, op2, JS_EQ_STRICT);
  } else if (
      (tag_is_string(tag1) && tag_is_number(tag2)) ||
      (tag_is_string(tag2) && tag_is_number(tag1))) {
    if (tag1 == JS_TAG_BIG_INT || tag1 == JS_TAG_SHORT_BIG_INT ||
        tag2 == JS_TAG_BIG_INT || tag2 == JS_TAG_SHORT_BIG_INT) {
      if (tag_is_string(tag1)) {
        op1 = JS_StringToBigInt(ctx, op1);
        if (JS_VALUE_GET_TAG(op1) != JS_TAG_BIG_INT &&
            JS_VALUE_GET_TAG(op1) != JS_TAG_SHORT_BIG_INT)
          goto invalid_bigint_string;
      }
      if (tag_is_string(tag2)) {
        op2 = JS_StringToBigInt(ctx, op2);
        if (JS_VALUE_GET_TAG(op2) != JS_TAG_BIG_INT &&
            JS_VALUE_GET_TAG(op2) != JS_TAG_SHORT_BIG_INT) {
        invalid_bigint_string:
          JS_FreeValue(ctx, op1);
          JS_FreeValue(ctx, op2);
          res = FALSE;
          goto done;
        }
      }
    } else {
      op1 = JS_ToNumericFree(ctx, op1);
      if (JS_IsException(op1)) {
        JS_FreeValue(ctx, op2);
        goto exception;
      }
      op2 = JS_ToNumericFree(ctx, op2);
      if (JS_IsException(op2)) {
        JS_FreeValue(ctx, op1);
        goto exception;
      }
    }
    res = js_strict_eq2(ctx, op1, op2, JS_EQ_STRICT);
  } else if (tag1 == JS_TAG_BOOL) {
    op1 = JS_NewInt32(ctx, JS_VALUE_GET_INT(op1));
    goto redo;
  } else if (tag2 == JS_TAG_BOOL) {
    op2 = JS_NewInt32(ctx, JS_VALUE_GET_INT(op2));
    goto redo;
  } else if (
      (tag1 == JS_TAG_OBJECT &&
       (tag_is_number(tag2) || tag_is_string(tag2) || tag2 == JS_TAG_SYMBOL)) ||
      (tag2 == JS_TAG_OBJECT &&
       (tag_is_number(tag1) || tag_is_string(tag1) || tag1 == JS_TAG_SYMBOL))) {
    op1 = JS_ToPrimitiveFree(ctx, op1, HINT_NONE);
    if (JS_IsException(op1)) {
      JS_FreeValue(ctx, op2);
      goto exception;
    }
    op2 = JS_ToPrimitiveFree(ctx, op2, HINT_NONE);
    if (JS_IsException(op2)) {
      JS_FreeValue(ctx, op1);
      goto exception;
    }
    goto redo;
  } else {
    /* IsHTMLDDA object is equivalent to undefined for '==' and '!=' */
    if ((JS_IsHTMLDDA(ctx, op1) &&
         (tag2 == JS_TAG_NULL || tag2 == JS_TAG_UNDEFINED)) ||
        (JS_IsHTMLDDA(ctx, op2) &&
         (tag1 == JS_TAG_NULL || tag1 == JS_TAG_UNDEFINED))) {
      res = TRUE;
    } else {
      res = FALSE;
    }
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
  }
done:
  sp[-2] = JS_NewBool(ctx, res ^ is_neq);
  return 0;
exception:
  sp[-2] = JS_UNDEFINED;
  sp[-1] = JS_UNDEFINED;
  return -1;
}

no_inline int js_shr_slow(JSContext* ctx, JSValue* sp) {
  JSValue op1, op2;
  uint32_t v1, v2, r;

  op1 = sp[-2];
  op2 = sp[-1];
  op1 = JS_ToNumericFree(ctx, op1);
  if (JS_IsException(op1)) {
    JS_FreeValue(ctx, op2);
    goto exception;
  }
  op2 = JS_ToNumericFree(ctx, op2);
  if (JS_IsException(op2)) {
    JS_FreeValue(ctx, op1);
    goto exception;
  }
  if (JS_VALUE_GET_TAG(op1) == JS_TAG_BIG_INT ||
      JS_VALUE_GET_TAG(op1) == JS_TAG_SHORT_BIG_INT ||
      JS_VALUE_GET_TAG(op2) == JS_TAG_BIG_INT ||
      JS_VALUE_GET_TAG(op2) == JS_TAG_SHORT_BIG_INT) {
    JS_ThrowTypeError(ctx, "bigint operands are forbidden for >>>");
    JS_FreeValue(ctx, op1);
    JS_FreeValue(ctx, op2);
    goto exception;
  }
  /* cannot give an exception */
  JS_ToUint32Free(ctx, &v1, op1);
  JS_ToUint32Free(ctx, &v2, op2);
  r = v1 >> (v2 & 0x1f);
  sp[-2] = JS_NewUint32(ctx, r);
  return 0;
exception:
  sp[-2] = JS_UNDEFINED;
  sp[-1] = JS_UNDEFINED;
  return -1;
}

/* BigInt */

JSValue JS_ToBigIntCtorFree(JSContext* ctx, JSValue val) {
  uint32_t tag;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
      val = JS_NewBigInt64(ctx, JS_VALUE_GET_INT(val));
      break;
    case JS_TAG_SHORT_BIG_INT:
    case JS_TAG_BIG_INT:
      break;
    case JS_TAG_FLOAT64: {
      double d = JS_VALUE_GET_FLOAT64(val);
      JSBigInt* r;
      int res;
      r = js_bigint_from_float64(ctx, &res, d);
      if (!r) {
        if (res == 0) {
          val = JS_EXCEPTION;
        } else if (res == 1) {
          val = JS_ThrowRangeError(
              ctx, "cannot convert to BigInt: not an integer");
        } else {
          val = JS_ThrowRangeError(
              ctx, "cannot convert NaN or Infinity to BigInt");
        }
      } else {
        val = JS_CompactBigInt(ctx, r);
      }
    } break;
    case JS_TAG_STRING:
    case JS_TAG_STRING_ROPE:
      val = JS_StringToBigIntErr(ctx, val);
      break;
    case JS_TAG_OBJECT:
      val = JS_ToPrimitiveFree(ctx, val, HINT_NUMBER);
      if (JS_IsException(val))
        break;
      goto redo;
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
    default:
      JS_FreeValue(ctx, val);
      return JS_ThrowTypeError(ctx, "cannot convert to BigInt");
  }
  return val;
}

JSValue js_bigint_constructor(
    JSContext* ctx,
    JSValueConst new_target,
    int argc,
    JSValueConst* argv) {
  if (!JS_IsUndefined(new_target))
    return JS_ThrowTypeError(ctx, "not a constructor");
  return JS_ToBigIntCtorFree(ctx, JS_DupValue(ctx, argv[0]));
}

JSValue js_thisBigIntValue(JSContext* ctx, JSValueConst this_val) {
  if (JS_IsBigInt(ctx, this_val))
    return JS_DupValue(ctx, this_val);

  if (JS_VALUE_GET_TAG(this_val) == JS_TAG_OBJECT) {
    JSObject* p = JS_VALUE_GET_OBJ(this_val);
    if (p->class_id == JS_CLASS_BIG_INT) {
      if (JS_IsBigInt(ctx, p->u.object_data))
        return JS_DupValue(ctx, p->u.object_data);
    }
  }
  return JS_ThrowTypeError(ctx, "not a BigInt");
}

JSValue js_bigint_toString(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv) {
  JSValue val;
  int base;
  JSValue ret;

  val = js_thisBigIntValue(ctx, this_val);
  if (JS_IsException(val))
    return val;
  if (argc == 0 || JS_IsUndefined(argv[0])) {
    base = 10;
  } else {
    base = js_get_radix(ctx, argv[0]);
    if (base < 0)
      goto fail;
  }
  ret = js_bigint_to_string1(ctx, val, base);
  JS_FreeValue(ctx, val);
  return ret;
fail:
  JS_FreeValue(ctx, val);
  return JS_EXCEPTION;
}

JSValue js_bigint_valueOf(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv) {
  return js_thisBigIntValue(ctx, this_val);
}

#define ADDC(res, carry_out, op1, op2, carry_in) \
  do {                                           \
    js_limb_t __v, __a, __k, __k1;               \
    __v = (op1);                                 \
    __a = __v + (op2);                           \
    __k1 = __a < __v;                            \
    __k = (carry_in);                            \
    __a = __a + __k;                             \
    carry_out = (__a < __k) | __k1;              \
    res = __a;                                   \
  } while (0)

#if JS_LIMB_BITS == 32
/* a != 0 */
static inline js_limb_t js_limb_clz(js_limb_t a) {
  return clz32(a);
}
#else
static inline js_limb_t js_limb_clz(js_limb_t a) {
  return clz64(a);
}
#endif

/* handle a = 0 too */
static inline js_limb_t js_limb_safe_clz(js_limb_t a) {
  if (a == 0)
    return JS_LIMB_BITS;
  else
    return js_limb_clz(a);
}

static js_limb_t mp_add(
    js_limb_t* res,
    const js_limb_t* op1,
    const js_limb_t* op2,
    js_limb_t n,
    js_limb_t carry) {
  int i;
  for (i = 0; i < n; i++) {
    ADDC(res[i], carry, op1[i], op2[i], carry);
  }
  return carry;
}

static js_limb_t mp_sub(
    js_limb_t* res,
    const js_limb_t* op1,
    const js_limb_t* op2,
    int n,
    js_limb_t carry) {
  int i;
  js_limb_t k, a, v, k1;

  k = carry;
  for (i = 0; i < n; i++) {
    v = op1[i];
    a = v - op2[i];
    k1 = a > v;
    v = a - k;
    k = (v > a) | k1;
    res[i] = v;
  }
  return k;
}

/* compute 0 - op2. carry = 0 or 1. */
static js_limb_t mp_neg(js_limb_t* res, const js_limb_t* op2, int n) {
  int i;
  js_limb_t v, carry;

  carry = 1;
  for (i = 0; i < n; i++) {
    v = ~op2[i] + carry;
    carry = v < carry;
    res[i] = v;
  }
  return carry;
}

/* tabr[] = taba[] * b + l. Return the high carry */
static js_limb_t mp_mul1(
    js_limb_t* tabr,
    const js_limb_t* taba,
    js_limb_t n,
    js_limb_t b,
    js_limb_t l) {
  js_limb_t i;
  js_dlimb_t t;

  for (i = 0; i < n; i++) {
    t = (js_dlimb_t)taba[i] * (js_dlimb_t)b + l;
    tabr[i] = t;
    l = t >> JS_LIMB_BITS;
  }
  return l;
}

static js_limb_t mp_div1(
    js_limb_t* tabr,
    const js_limb_t* taba,
    js_limb_t n,
    js_limb_t b,
    js_limb_t r) {
  js_slimb_t i;
  js_dlimb_t a1;
  for (i = n - 1; i >= 0; i--) {
    a1 = ((js_dlimb_t)r << JS_LIMB_BITS) | taba[i];
    tabr[i] = a1 / b;
    r = a1 % b;
  }
  return r;
}

/* tabr[] += taba[] * b, return the high word. */
static js_limb_t
mp_add_mul1(js_limb_t* tabr, const js_limb_t* taba, js_limb_t n, js_limb_t b) {
  js_limb_t i, l;
  js_dlimb_t t;

  l = 0;
  for (i = 0; i < n; i++) {
    t = (js_dlimb_t)taba[i] * (js_dlimb_t)b + l + tabr[i];
    tabr[i] = t;
    l = t >> JS_LIMB_BITS;
  }
  return l;
}

/* size of the result : op1_size + op2_size. */
static void mp_mul_basecase(
    js_limb_t* result,
    const js_limb_t* op1,
    js_limb_t op1_size,
    const js_limb_t* op2,
    js_limb_t op2_size) {
  int i;
  js_limb_t r;

  result[op1_size] = mp_mul1(result, op1, op1_size, op2[0], 0);
  for (i = 1; i < op2_size; i++) {
    r = mp_add_mul1(result + i, op1, op1_size, op2[i]);
    result[i + op1_size] = r;
  }
}

/* tabr[] -= taba[] * b. Return the value to substract to the high
   word. */
static js_limb_t
mp_sub_mul1(js_limb_t* tabr, const js_limb_t* taba, js_limb_t n, js_limb_t b) {
  js_limb_t i, l;
  js_dlimb_t t;

  l = 0;
  for (i = 0; i < n; i++) {
    t = tabr[i] - (js_dlimb_t)taba[i] * (js_dlimb_t)b - l;
    tabr[i] = t;
    l = -(t >> JS_LIMB_BITS);
  }
  return l;
}

/* WARNING: d must be >= 2^(JS_LIMB_BITS-1) */
static inline js_limb_t udiv1norm_init(js_limb_t d) {
  js_limb_t a0, a1;
  a1 = -d - 1;
  a0 = -1;
  return (((js_dlimb_t)a1 << JS_LIMB_BITS) | a0) / d;
}

/* return the quotient and the remainder in '*pr'of 'a1*2^JS_LIMB_BITS+a0
   / d' with 0 <= a1 < d. */
static inline js_limb_t udiv1norm(
    js_limb_t* pr,
    js_limb_t a1,
    js_limb_t a0,
    js_limb_t d,
    js_limb_t d_inv) {
  js_limb_t n1m, n_adj, q, r, ah;
  js_dlimb_t a;
  n1m = ((js_slimb_t)a0 >> (JS_LIMB_BITS - 1));
  n_adj = a0 + (n1m & d);
  a = (js_dlimb_t)d_inv * (a1 - n1m) + n_adj;
  q = (a >> JS_LIMB_BITS) + a1;
  /* compute a - q * r and update q so that the remainder is\
     between 0 and d - 1 */
  a = ((js_dlimb_t)a1 << JS_LIMB_BITS) | a0;
  a = a - (js_dlimb_t)q * d - d;
  ah = a >> JS_LIMB_BITS;
  q += 1 + ah;
  r = (js_limb_t)a + (ah & d);
  *pr = r;
  return q;
}

#define UDIV1NORM_THRESHOLD 3

/* b must be >= 1 << (JS_LIMB_BITS - 1) */
static js_limb_t mp_div1norm(
    js_limb_t* tabr,
    const js_limb_t* taba,
    js_limb_t n,
    js_limb_t b,
    js_limb_t r) {
  js_slimb_t i;

  if (n >= UDIV1NORM_THRESHOLD) {
    js_limb_t b_inv;
    b_inv = udiv1norm_init(b);
    for (i = n - 1; i >= 0; i--) {
      tabr[i] = udiv1norm(&r, r, taba[i], b, b_inv);
    }
  } else {
    js_dlimb_t a1;
    for (i = n - 1; i >= 0; i--) {
      a1 = ((js_dlimb_t)r << JS_LIMB_BITS) | taba[i];
      tabr[i] = a1 / b;
      r = a1 % b;
    }
  }
  return r;
}

/* base case division: divides taba[0..na-1] by tabb[0..nb-1]. tabb[nb
   - 1] must be >= 1 << (JS_LIMB_BITS - 1). na - nb must be >= 0. 'taba'
   is modified and contains the remainder (nb limbs). tabq[0..na-nb]
   contains the quotient with tabq[na - nb] <= 1. */
static void mp_divnorm(
    js_limb_t* tabq,
    js_limb_t* taba,
    js_limb_t na,
    const js_limb_t* tabb,
    js_limb_t nb) {
  js_limb_t r, a, c, q, v, b1, b1_inv, n, dummy_r;
  int i, j;

  b1 = tabb[nb - 1];
  if (nb == 1) {
    taba[0] = mp_div1norm(tabq, taba, na, b1, 0);
    return;
  }
  n = na - nb;

  if (n >= UDIV1NORM_THRESHOLD)
    b1_inv = udiv1norm_init(b1);
  else
    b1_inv = 0;

  /* first iteration: the quotient is only 0 or 1 */
  q = 1;
  for (j = nb - 1; j >= 0; j--) {
    if (taba[n + j] != tabb[j]) {
      if (taba[n + j] < tabb[j])
        q = 0;
      break;
    }
  }
  tabq[n] = q;
  if (q) {
    mp_sub(taba + n, taba + n, tabb, nb, 0);
  }

  for (i = n - 1; i >= 0; i--) {
    if (unlikely(taba[i + nb] >= b1)) {
      q = -1;
    } else if (b1_inv) {
      q = udiv1norm(&dummy_r, taba[i + nb], taba[i + nb - 1], b1, b1_inv);
    } else {
      js_dlimb_t al;
      al = ((js_dlimb_t)taba[i + nb] << JS_LIMB_BITS) | taba[i + nb - 1];
      q = al / b1;
      r = al % b1;
    }
    r = mp_sub_mul1(taba + i, tabb, nb, q);

    v = taba[i + nb];
    a = v - r;
    c = (a > v);
    taba[i + nb] = a;

    if (c != 0) {
      /* negative result */
      for (;;) {
        q--;
        c = mp_add(taba + i, taba + i, tabb, nb, 0);
        /* propagate carry and test if positive result */
        if (c != 0) {
          if (++taba[i + nb] == 0) {
            break;
          }
        }
      }
    }
    tabq[i] = q;
  }
}

/* 1 <= shift <= JS_LIMB_BITS - 1 */
static js_limb_t
mp_shl(js_limb_t* tabr, const js_limb_t* taba, int n, int shift) {
  int i;
  js_limb_t l, v;
  l = 0;
  for (i = 0; i < n; i++) {
    v = taba[i];
    tabr[i] = (v << shift) | l;
    l = v >> (JS_LIMB_BITS - shift);
  }
  return l;
}

/* r = (a + high*B^n) >> shift. Return the remainder r (0 <= r < 2^shift).
   1 <= shift <= LIMB_BITS - 1 */
static js_limb_t mp_shr(
    js_limb_t* tab_r,
    const js_limb_t* tab,
    int n,
    int shift,
    js_limb_t high) {
  int i;
  js_limb_t l, a;

  l = high;
  for (i = n - 1; i >= 0; i--) {
    a = tab[i];
    tab_r[i] = (a >> shift) | (l << (JS_LIMB_BITS - shift));
    l = a;
  }
  return l & (((js_limb_t)1 << shift) - 1);
}

JSBigInt* js_bigint_new(JSContext* ctx, int len) {
  JSBigInt* r;
  if (len > JS_BIGINT_MAX_SIZE) {
    JS_ThrowRangeError(ctx, "BigInt is too large to allocate");
    return NULL;
  }
  r = js_malloc(ctx, sizeof(JSBigInt) + len * sizeof(js_limb_t));
  if (!r)
    return NULL;
  r->header.ref_count = 1;
  r->len = len;
  return r;
}

JSBigInt* js_bigint_set_si(JSBigIntBuf* buf, js_slimb_t a) {
  JSBigInt* r = (JSBigInt*)buf->big_int_buf;
  r->header.ref_count = 0; /* fail safe */
  r->len = 1;
  r->tab[0] = a;
  return r;
}

static JSBigInt* js_bigint_set_si64(JSBigIntBuf* buf, int64_t a) {
#if JS_LIMB_BITS == 64
  return js_bigint_set_si(buf, a);
#else
  JSBigInt* r = (JSBigInt*)buf->big_int_buf;
  r->header.ref_count = 0; /* fail safe */
  if (a >= INT32_MIN && a <= INT32_MAX) {
    r->len = 1;
    r->tab[0] = a;
  } else {
    r->len = 2;
    r->tab[0] = a;
    r->tab[1] = a >> JS_LIMB_BITS;
  }
  return r;
#endif
}

/* val must be a short big int */
JSBigInt* js_bigint_set_short(JSBigIntBuf* buf, JSValueConst val) {
  return js_bigint_set_si(buf, JS_VALUE_GET_SHORT_BIG_INT(val));
}

static __maybe_unused void js_bigint_dump1(
    JSContext* ctx,
    const char* str,
    const js_limb_t* tab,
    int len) {
  int i;
  printf("%s: ", str);
  for (i = len - 1; i >= 0; i--) {
#if JS_LIMB_BITS == 32
    printf(" %08x", tab[i]);
#else
    printf(" %016" PRIx64, tab[i]);
#endif
  }
  printf("\n");
}

static __maybe_unused void
js_bigint_dump(JSContext* ctx, const char* str, const JSBigInt* p) {
  js_bigint_dump1(ctx, str, p->tab, p->len);
}

static JSBigInt* js_bigint_new_si(JSContext* ctx, js_slimb_t a) {
  JSBigInt* r;
  r = js_bigint_new(ctx, 1);
  if (!r)
    return NULL;
  r->tab[0] = a;
  return r;
}

JSBigInt* js_bigint_new_si64(JSContext* ctx, int64_t a) {
#if JS_LIMB_BITS == 64
  return js_bigint_new_si(ctx, a);
#else
  if (a >= INT32_MIN && a <= INT32_MAX) {
    return js_bigint_new_si(ctx, a);
  } else {
    JSBigInt* r;
    r = js_bigint_new(ctx, 2);
    if (!r)
      return NULL;
    r->tab[0] = a;
    r->tab[1] = a >> 32;
    return r;
  }
#endif
}

JSBigInt* js_bigint_new_ui64(JSContext* ctx, uint64_t a) {
  if (a <= INT64_MAX) {
    return js_bigint_new_si64(ctx, a);
  } else {
    JSBigInt* r;
    r = js_bigint_new(ctx, (65 + JS_LIMB_BITS - 1) / JS_LIMB_BITS);
    if (!r)
      return NULL;
#if JS_LIMB_BITS == 64
    r->tab[0] = a;
    r->tab[1] = 0;
#else
    r->tab[0] = a;
    r->tab[1] = a >> 32;
    r->tab[2] = 0;
#endif
    return r;
  }
}

JSBigInt* js_bigint_new_di(JSContext* ctx, js_sdlimb_t a) {
  JSBigInt* r;
  if (a == (js_slimb_t)a) {
    r = js_bigint_new(ctx, 1);
    if (!r)
      return NULL;
    r->tab[0] = a;
  } else {
    r = js_bigint_new(ctx, 2);
    if (!r)
      return NULL;
    r->tab[0] = a;
    r->tab[1] = a >> JS_LIMB_BITS;
  }
  return r;
}

/* Remove redundant high order limbs. Warning: 'a' may be
   reallocated. Can never fail.
*/
static JSBigInt* js_bigint_normalize1(JSContext* ctx, JSBigInt* a, int l) {
  js_limb_t v;

  assert(a->header.ref_count == 1);
  while (l > 1) {
    v = a->tab[l - 1];
    if ((v != 0 && v != -1) ||
        (v & 1) != (a->tab[l - 2] >> (JS_LIMB_BITS - 1))) {
      break;
    }
    l--;
  }
  if (l != a->len) {
    JSBigInt* a1;
    /* realloc to reduce the size */
    a->len = l;
    a1 = js_realloc(ctx, a, sizeof(JSBigInt) + l * sizeof(js_limb_t));
    if (a1)
      a = a1;
  }
  return a;
}

static JSBigInt* js_bigint_normalize(JSContext* ctx, JSBigInt* a) {
  return js_bigint_normalize1(ctx, a, a->len);
}

/* return 0 or 1 depending on the sign */
int js_bigint_sign(const JSBigInt* a) {
  return a->tab[a->len - 1] >> (JS_LIMB_BITS - 1);
}

js_slimb_t js_bigint_get_si_sat(const JSBigInt* a) {
  if (a->len == 1) {
    return a->tab[0];
  } else {
#if JS_LIMB_BITS == 32
    if (js_bigint_sign(a))
      return INT32_MIN;
    else
      return INT32_MAX;
#else
    if (js_bigint_sign(a))
      return INT64_MIN;
    else
      return INT64_MAX;
#endif
  }
}

/* add the op1 limb */
static JSBigInt* js_bigint_extend(JSContext* ctx, JSBigInt* r, js_limb_t op1) {
  int n2 = r->len;
  if ((op1 != 0 && op1 != -1) ||
      (op1 & 1) != r->tab[n2 - 1] >> (JS_LIMB_BITS - 1)) {
    JSBigInt* r1;
    r1 = js_realloc(ctx, r, sizeof(JSBigInt) + (n2 + 1) * sizeof(js_limb_t));
    if (!r1) {
      js_free(ctx, r);
      return NULL;
    }
    r = r1;
    r->len = n2 + 1;
    r->tab[n2] = op1;
  } else {
    /* otherwise still need to normalize the result */
    r = js_bigint_normalize(ctx, r);
  }
  return r;
}

/* return NULL in case of error. Compute a + b (b_neg = 0) or a - b
   (b_neg = 1) */
/* XXX: optimize */
JSBigInt*
js_bigint_add(JSContext* ctx, const JSBigInt* a, const JSBigInt* b, int b_neg) {
  JSBigInt* r;
  int n1, n2, i;
  js_limb_t carry, op1, op2, a_sign, b_sign;

  n2 = max_int(a->len, b->len);
  n1 = min_int(a->len, b->len);
  r = js_bigint_new(ctx, n2);
  if (!r)
    return NULL;
  /* XXX: optimize */
  /* common part */
  carry = b_neg;
  for (i = 0; i < n1; i++) {
    op1 = a->tab[i];
    op2 = b->tab[i] ^ (-b_neg);
    ADDC(r->tab[i], carry, op1, op2, carry);
  }
  a_sign = -js_bigint_sign(a);
  b_sign = (-js_bigint_sign(b)) ^ (-b_neg);
  /* part with sign extension of one operand  */
  if (a->len > b->len) {
    for (i = n1; i < n2; i++) {
      op1 = a->tab[i];
      ADDC(r->tab[i], carry, op1, b_sign, carry);
    }
  } else if (a->len < b->len) {
    for (i = n1; i < n2; i++) {
      op2 = b->tab[i] ^ (-b_neg);
      ADDC(r->tab[i], carry, a_sign, op2, carry);
    }
  }

  /* part with sign extension for both operands. Extend the result
     if necessary */
  return js_bigint_extend(ctx, r, a_sign + b_sign + carry);
}

/* XXX: optimize */
JSBigInt* js_bigint_neg(JSContext* ctx, const JSBigInt* a) {
  JSBigIntBuf buf;
  JSBigInt* b;
  b = js_bigint_set_si(&buf, 0);
  return js_bigint_add(ctx, b, a, 1);
}

JSBigInt* js_bigint_mul(JSContext* ctx, const JSBigInt* a, const JSBigInt* b) {
  JSBigInt* r;

  r = js_bigint_new(ctx, a->len + b->len);
  if (!r)
    return NULL;
  mp_mul_basecase(r->tab, a->tab, a->len, b->tab, b->len);
  /* correct the result if negative operands (no overflow is
     possible) */
  if (js_bigint_sign(a))
    mp_sub(r->tab + a->len, r->tab + a->len, b->tab, b->len, 0);
  if (js_bigint_sign(b))
    mp_sub(r->tab + b->len, r->tab + b->len, a->tab, a->len, 0);
  return js_bigint_normalize(ctx, r);
}

/* return the division or the remainder. 'b' must be != 0. return NULL
   in case of exception (division by zero or memory error) */
JSBigInt* js_bigint_divrem(
    JSContext* ctx,
    const JSBigInt* a,
    const JSBigInt* b,
    BOOL is_rem) {
  JSBigInt *r, *q;
  js_limb_t *tabb, h;
  int na, nb, a_sign, b_sign, shift;

  if (b->len == 1 && b->tab[0] == 0) {
    JS_ThrowRangeError(ctx, "BigInt division by zero");
    return NULL;
  }

  a_sign = js_bigint_sign(a);
  b_sign = js_bigint_sign(b);
  na = a->len;
  nb = b->len;

  r = js_bigint_new(ctx, na + 2);
  if (!r)
    return NULL;
  if (a_sign) {
    mp_neg(r->tab, a->tab, na);
  } else {
    memcpy(r->tab, a->tab, na * sizeof(a->tab[0]));
  }
  /* normalize */
  while (na > 1 && r->tab[na - 1] == 0)
    na--;

  tabb = js_malloc(ctx, nb * sizeof(tabb[0]));
  if (!tabb) {
    js_free(ctx, r);
    return NULL;
  }
  if (b_sign) {
    mp_neg(tabb, b->tab, nb);
  } else {
    memcpy(tabb, b->tab, nb * sizeof(tabb[0]));
  }
  /* normalize */
  while (nb > 1 && tabb[nb - 1] == 0)
    nb--;

  /* trivial case if 'a' is small */
  if (na < nb) {
    js_free(ctx, r);
    js_free(ctx, tabb);
    if (is_rem) {
      /* r = a */
      r = js_bigint_new(ctx, a->len);
      if (!r)
        return NULL;
      memcpy(r->tab, a->tab, a->len * sizeof(a->tab[0]));
      return r;
    } else {
      /* q = 0 */
      return js_bigint_new_si(ctx, 0);
    }
  }

  /* normalize 'b' */
  shift = js_limb_clz(tabb[nb - 1]);
  if (shift != 0) {
    mp_shl(tabb, tabb, nb, shift);
    h = mp_shl(r->tab, r->tab, na, shift);
    if (h != 0)
      r->tab[na++] = h;
  }

  q = js_bigint_new(ctx, na - nb + 2); /* one more limb for the sign */
  if (!q) {
    js_free(ctx, r);
    js_free(ctx, tabb);
    return NULL;
  }

  //    js_bigint_dump1(ctx, "a", r->tab, na);
  //    js_bigint_dump1(ctx, "b", tabb, nb);
  mp_divnorm(q->tab, r->tab, na, tabb, nb);
  js_free(ctx, tabb);

  if (is_rem) {
    js_free(ctx, q);
    if (shift != 0)
      mp_shr(r->tab, r->tab, nb, shift, 0);
    r->tab[nb++] = 0;
    if (a_sign)
      mp_neg(r->tab, r->tab, nb);
    r = js_bigint_normalize1(ctx, r, nb);
    return r;
  } else {
    js_free(ctx, r);
    q->tab[na - nb + 1] = 0;
    if (a_sign ^ b_sign) {
      mp_neg(q->tab, q->tab, q->len);
    }
    q = js_bigint_normalize(ctx, q);
    return q;
  }
}

/* and, or, xor */
JSBigInt* js_bigint_logic(
    JSContext* ctx,
    const JSBigInt* a,
    const JSBigInt* b,
    OPCodeEnum op) {
  JSBigInt* r;
  js_limb_t b_sign;
  int a_len, b_len, i;

  if (a->len < b->len) {
    const JSBigInt* tmp;
    tmp = a;
    a = b;
    b = tmp;
  }
  /* a_len >= b_len */
  a_len = a->len;
  b_len = b->len;
  b_sign = -js_bigint_sign(b);

  r = js_bigint_new(ctx, a_len);
  if (!r)
    return NULL;
  switch (op) {
    case OP_or:
      for (i = 0; i < b_len; i++) {
        r->tab[i] = a->tab[i] | b->tab[i];
      }
      for (i = b_len; i < a_len; i++) {
        r->tab[i] = a->tab[i] | b_sign;
      }
      break;
    case OP_and:
      for (i = 0; i < b_len; i++) {
        r->tab[i] = a->tab[i] & b->tab[i];
      }
      for (i = b_len; i < a_len; i++) {
        r->tab[i] = a->tab[i] & b_sign;
      }
      break;
    case OP_xor:
      for (i = 0; i < b_len; i++) {
        r->tab[i] = a->tab[i] ^ b->tab[i];
      }
      for (i = b_len; i < a_len; i++) {
        r->tab[i] = a->tab[i] ^ b_sign;
      }
      break;
    default:
      abort();
  }
  return js_bigint_normalize(ctx, r);
}

JSBigInt* js_bigint_not(JSContext* ctx, const JSBigInt* a) {
  JSBigInt* r;
  int i;

  r = js_bigint_new(ctx, a->len);
  if (!r)
    return NULL;
  for (i = 0; i < a->len; i++) {
    r->tab[i] = ~a->tab[i];
  }
  /* no normalization is needed */
  return r;
}

JSBigInt*
js_bigint_shl(JSContext* ctx, const JSBigInt* a, unsigned int shift1) {
  int d, i, shift;
  JSBigInt* r;
  js_limb_t l;

  if (a->len == 1 && a->tab[0] == 0)
    return js_bigint_new_si(ctx, 0); /* zero case */
  d = shift1 / JS_LIMB_BITS;
  shift = shift1 % JS_LIMB_BITS;
  r = js_bigint_new(ctx, a->len + d);
  if (!r)
    return NULL;
  for (i = 0; i < d; i++)
    r->tab[i] = 0;
  if (shift == 0) {
    for (i = 0; i < a->len; i++) {
      r->tab[i + d] = a->tab[i];
    }
  } else {
    l = mp_shl(r->tab + d, a->tab, a->len, shift);
    if (js_bigint_sign(a))
      l |= (js_limb_t)(-1) << shift;
    r = js_bigint_extend(ctx, r, l);
  }
  return r;
}

JSBigInt*
js_bigint_shr(JSContext* ctx, const JSBigInt* a, unsigned int shift1) {
  int d, i, shift, a_sign, n1;
  JSBigInt* r;

  d = shift1 / JS_LIMB_BITS;
  shift = shift1 % JS_LIMB_BITS;
  a_sign = js_bigint_sign(a);
  if (d >= a->len)
    return js_bigint_new_si(ctx, -a_sign);
  n1 = a->len - d;
  r = js_bigint_new(ctx, n1);
  if (!r)
    return NULL;
  if (shift == 0) {
    for (i = 0; i < n1; i++) {
      r->tab[i] = a->tab[i + d];
    }
    /* no normalization is needed */
  } else {
    mp_shr(r->tab, a->tab + d, n1, shift, -a_sign);
    r = js_bigint_normalize(ctx, r);
  }
  return r;
}

JSBigInt* js_bigint_pow(JSContext* ctx, const JSBigInt* a, JSBigInt* b) {
  uint32_t e;
  int n_bits, i;
  JSBigInt *r, *r1;

  /* b must be >= 0 */
  if (js_bigint_sign(b)) {
    JS_ThrowRangeError(ctx, "BigInt negative exponent");
    return NULL;
  }
  if (b->len == 1 && b->tab[0] == 0) {
    /* a^0 = 1 */
    return js_bigint_new_si(ctx, 1);
  } else if (a->len == 1) {
    js_limb_t v;
    BOOL is_neg;

    v = a->tab[0];
    if (v <= 1)
      return js_bigint_new_si(ctx, v);
    else if (v == -1)
      return js_bigint_new_si(ctx, 1 - 2 * (b->tab[0] & 1));
    is_neg = (js_slimb_t)v < 0;
    if (is_neg)
      v = -v;
    if ((v & (v - 1)) == 0) {
      uint64_t e1;
      int n;
      /* v = 2^n */
      n = JS_LIMB_BITS - 1 - js_limb_clz(v);
      if (b->len > 1)
        goto overflow;
      if (b->tab[0] > INT32_MAX)
        goto overflow;
      e = b->tab[0];
      e1 = (uint64_t)e * n;
      if (e1 > JS_BIGINT_MAX_SIZE * JS_LIMB_BITS)
        goto overflow;
      e = e1;
      if (is_neg)
        is_neg = b->tab[0] & 1;
      r = js_bigint_new(ctx, (e + JS_LIMB_BITS + 1 - is_neg) / JS_LIMB_BITS);
      if (!r)
        return NULL;
      memset(r->tab, 0, sizeof(r->tab[0]) * r->len);
      r->tab[e / JS_LIMB_BITS] = (js_limb_t)(1 - 2 * is_neg)
          << (e % JS_LIMB_BITS);
      return r;
    }
  }
  if (b->len > 1)
    goto overflow;
  if (b->tab[0] > INT32_MAX)
    goto overflow;
  e = b->tab[0];
  n_bits = 32 - clz32(e);

  r = js_bigint_new(ctx, a->len);
  if (!r)
    return NULL;
  memcpy(r->tab, a->tab, a->len * sizeof(a->tab[0]));
  for (i = n_bits - 2; i >= 0; i--) {
    r1 = js_bigint_mul(ctx, r, r);
    if (!r1)
      return NULL;
    js_free(ctx, r);
    r = r1;
    if ((e >> i) & 1) {
      r1 = js_bigint_mul(ctx, r, a);
      if (!r1)
        return NULL;
      js_free(ctx, r);
      r = r1;
    }
  }
  return r;
overflow:
  JS_ThrowRangeError(ctx, "BigInt is too large");
  return NULL;
}

/* return (mant, exp) so that abs(a) ~ mant*2^(exp - (limb_bits -
   1). a must be != 0. */
static uint64_t
js_bigint_get_mant_exp(JSContext* ctx, int* pexp, const JSBigInt* a) {
  js_limb_t t[4 - JS_LIMB_BITS / 32], carry, v, low_bits;
  int n1, n2, sgn, shift, i, j, e;
  uint64_t a1, a0;

  n2 = 4 - JS_LIMB_BITS / 32;
  n1 = a->len - n2;
  sgn = js_bigint_sign(a);

  /* low_bits != 0 if there are a non zero low bit in abs(a) */
  low_bits = 0;
  carry = sgn;
  for (i = 0; i < n1; i++) {
    v = (a->tab[i] ^ (-sgn)) + carry;
    carry = v < carry;
    low_bits |= v;
  }
  /* get the n2 high limbs of abs(a) */
  for (j = 0; j < n2; j++) {
    i = j + n1;
    if (i < 0) {
      v = 0;
    } else {
      v = (a->tab[i] ^ (-sgn)) + carry;
      carry = v < carry;
    }
    t[j] = v;
  }

#if JS_LIMB_BITS == 32
  a1 = ((uint64_t)t[2] << 32) | t[1];
  a0 = (uint64_t)t[0] << 32;
#else
  a1 = t[1];
  a0 = t[0];
#endif
  a0 |= (low_bits != 0);
  /* normalize */
  if (a1 == 0) {
    /* JS_LIMB_BITS = 64 bit only */
    shift = 64;
    a1 = a0;
    a0 = 0;
  } else {
    shift = clz64(a1);
    if (shift != 0) {
      a1 = (a1 << shift) | (a0 >> (64 - shift));
      a0 <<= shift;
    }
  }
  a1 |= (a0 != 0); /* keep the bits for the final rounding */
  /* compute the exponent */
  e = a->len * JS_LIMB_BITS - shift - 1;
  *pexp = e;
  return a1;
}

/* shift left with round to nearest, ties to even. n >= 1 */
static uint64_t shr_rndn(uint64_t a, int n) {
  uint64_t addend = ((a >> n) & 1) + ((1 << (n - 1)) - 1);
  return (a + addend) >> n;
}

/* convert to float64 with round to nearest, ties to even. Return
   +/-infinity if too large. */
double js_bigint_to_float64(JSContext* ctx, const JSBigInt* a) {
  int sgn, e;
  uint64_t mant;

  if (a->len == 1) {
    /* fast case, including zero */
    return (double)(js_slimb_t)a->tab[0];
  }

  sgn = js_bigint_sign(a);
  mant = js_bigint_get_mant_exp(ctx, &e, a);
  if (e > 1023) {
    /* overflow: return infinity */
    mant = 0;
    e = 1024;
  } else {
    mant = (mant >> 1) | (mant & 1); /* avoid overflow in rounding */
    mant = shr_rndn(mant, 10);
    /* rounding can cause an overflow */
    if (mant >= ((uint64_t)1 << 53)) {
      mant >>= 1;
      e++;
    }
    mant &= (((uint64_t)1 << 52) - 1);
  }
  return uint64_as_float64(
      ((uint64_t)sgn << 63) | ((uint64_t)(e + 1023) << 52) | mant);
}

/* return (1, NULL) if not an integer, (2, NULL) if NaN or Infinity,
   (0, n) if an integer, (0, NULL) in case of memory error */
JSBigInt* js_bigint_from_float64(JSContext* ctx, int* pres, double a1) {
  uint64_t a = float64_as_uint64(a1);
  int sgn, e, shift;
  uint64_t mant;
  JSBigIntBuf buf;
  JSBigInt* r;

  sgn = a >> 63;
  e = (a >> 52) & ((1 << 11) - 1);
  mant = a & (((uint64_t)1 << 52) - 1);
  if (e == 2047) {
    /* NaN, Infinity */
    *pres = 2;
    return NULL;
  }
  if (e == 0 && mant == 0) {
    /* zero */
    *pres = 0;
    return js_bigint_new_si(ctx, 0);
  }
  e -= 1023;
  /* 0 < a < 1 : not an integer */
  if (e < 0)
    goto not_an_integer;
  mant |= (uint64_t)1 << 52;
  if (e < 52) {
    shift = 52 - e;
    /* check that there is no fractional part */
    if (mant & (((uint64_t)1 << shift) - 1)) {
    not_an_integer:
      *pres = 1;
      return NULL;
    }
    mant >>= shift;
    e = 0;
  } else {
    e -= 52;
  }
  if (sgn)
    mant = -mant;
  /* the integer is mant*2^e */
  r = js_bigint_set_si64(&buf, (int64_t)mant);
  *pres = 0;
  return js_bigint_shl(ctx, r, e);
}

/* return -1, 0, 1 or (2) (unordered) */
int js_bigint_float64_cmp(JSContext* ctx, const JSBigInt* a, double b) {
  int b_sign, a_sign, e, f;
  uint64_t mant, b1, a_mant;

  b1 = float64_as_uint64(b);
  b_sign = b1 >> 63;
  e = (b1 >> 52) & ((1 << 11) - 1);
  mant = b1 & (((uint64_t)1 << 52) - 1);
  a_sign = js_bigint_sign(a);
  if (e == 2047) {
    if (mant != 0) {
      /* NaN */
      return 2;
    } else {
      /* +/- infinity */
      return 2 * b_sign - 1;
    }
  } else if (e == 0 && mant == 0) {
    /* b = +/-0 */
    if (a->len == 1 && a->tab[0] == 0)
      return 0;
    else
      return 1 - 2 * a_sign;
  } else if (a->len == 1 && a->tab[0] == 0) {
    /* a = 0, b != 0 */
    return 2 * b_sign - 1;
  } else if (a_sign != b_sign) {
    return 1 - 2 * a_sign;
  } else {
    e -= 1023;
    /* Note: handling denormals is not necessary because we
       compare to integers hence f >= 0 */
    /* compute f so that 2^f <= abs(a) < 2^(f+1) */
    a_mant = js_bigint_get_mant_exp(ctx, &f, a);
    if (f != e) {
      if (f < e)
        return -1;
      else
        return 1;
    } else {
      mant = (mant | ((uint64_t)1 << 52)) << 11; /* align to a_mant */
      if (a_mant < mant)
        return 2 * a_sign - 1;
      else if (a_mant > mant)
        return 1 - 2 * a_sign;
      else
        return 0;
    }
  }
}

/* return -1, 0 or 1 */
int js_bigint_cmp(JSContext* ctx, const JSBigInt* a, const JSBigInt* b) {
  int a_sign, b_sign, res, i;
  a_sign = js_bigint_sign(a);
  b_sign = js_bigint_sign(b);
  if (a_sign != b_sign) {
    res = 1 - 2 * a_sign;
  } else {
    /* we assume the numbers are normalized */
    if (a->len != b->len) {
      if (a->len < b->len)
        res = 2 * a_sign - 1;
      else
        res = 1 - 2 * a_sign;
    } else {
      res = 0;
      for (i = a->len - 1; i >= 0; i--) {
        if (a->tab[i] != b->tab[i]) {
          if (a->tab[i] < b->tab[i])
            res = -1;
          else
            res = 1;
          break;
        }
      }
    }
  }
  return res;
}

/* contains 10^i */
static const js_limb_t js_pow_dec[JS_LIMB_DIGITS + 1] = {
    1U,
    10U,
    100U,
    1000U,
    10000U,
    100000U,
    1000000U,
    10000000U,
    100000000U,
    1000000000U,
#if JS_LIMB_BITS == 64
    10000000000U,
    100000000000U,
    1000000000000U,
    10000000000000U,
    100000000000000U,
    1000000000000000U,
    10000000000000000U,
    100000000000000000U,
    1000000000000000000U,
    10000000000000000000U,
#endif
};

/* syntax: [-]digits in base radix. Return NULL if memory error. radix
   = 10, 2, 8 or 16. */
JSBigInt* js_bigint_from_string(JSContext* ctx, const char* str, int radix) {
  const char* p = str;
  int is_neg, n_digits, n_limbs, len, log2_radix, n_bits, i;
  JSBigInt* r;
  js_limb_t v, c, h;

  is_neg = 0;
  if (*p == '-') {
    is_neg = 1;
    p++;
  }
  while (*p == '0')
    p++;
  n_digits = strlen(p);
  log2_radix = 32 - clz32(radix - 1); /* ceil(log2(radix)) */
  /* compute the maximum number of limbs */
  /* XXX: overflow */
  if (radix == 10) {
    n_bits = (n_digits * 27 + 7) / 8; /* >= ceil(n_digits * log2(10)) */
  } else {
    n_bits = n_digits * log2_radix;
  }
  /* we add one extra bit for the sign */
  n_limbs = max_int(1, n_bits / JS_LIMB_BITS + 1);
  r = js_bigint_new(ctx, n_limbs);
  if (!r)
    return NULL;
  if (radix == 10) {
    int digits_per_limb = JS_LIMB_DIGITS;
    len = 1;
    r->tab[0] = 0;
    for (;;) {
      /* XXX: slow */
      v = 0;
      for (i = 0; i < digits_per_limb; i++) {
        c = to_digit(*p);
        if (c >= radix)
          break;
        p++;
        v = v * 10 + c;
      }
      if (i == 0)
        break;
      if (len == 1 && r->tab[0] == 0) {
        r->tab[0] = v;
      } else {
        h = mp_mul1(r->tab, r->tab, len, js_pow_dec[i], v);
        if (h != 0) {
          r->tab[len++] = h;
        }
      }
    }
    /* add one extra limb to have the correct sign*/
    if ((r->tab[len - 1] >> (JS_LIMB_BITS - 1)) != 0)
      r->tab[len++] = 0;
    r->len = len;
  } else {
    unsigned int bit_pos, shift, pos;

    /* power of two base: no multiplication is needed */
    r->len = n_limbs;
    memset(r->tab, 0, sizeof(r->tab[0]) * n_limbs);
    for (i = 0; i < n_digits; i++) {
      c = to_digit(p[n_digits - 1 - i]);
      JS_ASSERT_CONTEXT(ctx, c < radix);
      bit_pos = i * log2_radix;
      shift = bit_pos & (JS_LIMB_BITS - 1);
      pos = bit_pos / JS_LIMB_BITS;
      r->tab[pos] |= c << shift;
      /* if log2_radix does not divide JS_LIMB_BITS, needed an
         additional op */
      if (shift + log2_radix > JS_LIMB_BITS) {
        r->tab[pos + 1] |= c >> (JS_LIMB_BITS - shift);
      }
    }
  }
  r = js_bigint_normalize(ctx, r);
  /* XXX: could do it in place */
  if (is_neg) {
    JSBigInt* r1;
    r1 = js_bigint_neg(ctx, r);
    js_free(ctx, r);
    r = r1;
  }
  return r;
}

/* 2 <= base <= 36 */
static const char digits[36] = "0123456789abcdefghijklmnopqrstuvwxyz";

/* special version going backwards */
/* XXX: use dtoa.c */
static char* js_u64toa(char* q, int64_t n, unsigned int base) {
  int digit;
  if (base == 10) {
    /* division by known base uses multiplication */
    do {
      digit = (uint64_t)n % 10;
      n = (uint64_t)n / 10;
      *--q = '0' + digit;
    } while (n != 0);
  } else {
    do {
      digit = (uint64_t)n % base;
      n = (uint64_t)n / base;
      *--q = digits[digit];
    } while (n != 0);
  }
  return q;
}

/* len >= 1. 2 <= radix <= 36 */
static char* limb_to_a(char* q, js_limb_t n, unsigned int radix, int len) {
  int digit, i;

  if (radix == 10) {
    /* specific case with constant divisor */
    /* XXX: optimize */
    for (i = 0; i < len; i++) {
      digit = (js_limb_t)n % 10;
      n = (js_limb_t)n / 10;
      *--q = digit + '0';
    }
  } else {
    for (i = 0; i < len; i++) {
      digit = (js_limb_t)n % radix;
      n = (js_limb_t)n / radix;
      *--q = digits[digit];
    }
  }
  return q;
}

#define JS_RADIX_MAX 36

static const uint8_t digits_per_limb_table[JS_RADIX_MAX - 1] = {
#if JS_LIMB_BITS == 32
    32, 20, 16, 13, 12, 11, 10, 10, 9, 9, 8, 8, 8, 8, 8, 7, 7, 7,
    7,  7,  7,  7,  6,  6,  6,  6,  6, 6, 6, 6, 6, 6, 6, 6, 6,
#else
    64, 40, 32, 27, 24, 22, 21, 20, 19, 18, 17, 17, 16, 16, 16, 15, 15, 15,
    14, 14, 14, 14, 13, 13, 13, 13, 13, 13, 13, 12, 12, 12, 12, 12, 12,
#endif
};

static const js_limb_t radix_base_table[JS_RADIX_MAX - 1] = {
#if JS_LIMB_BITS == 32
    0x00000000, 0xcfd41b91, 0x00000000, 0x48c27395, 0x81bf1000, 0x75db9c97,
    0x40000000, 0xcfd41b91, 0x3b9aca00, 0x8c8b6d2b, 0x19a10000, 0x309f1021,
    0x57f6c100, 0x98c29b81, 0x00000000, 0x18754571, 0x247dbc80, 0x3547667b,
    0x4c4b4000, 0x6b5a6e1d, 0x94ace180, 0xcaf18367, 0x0b640000, 0x0e8d4a51,
    0x1269ae40, 0x17179149, 0x1cb91000, 0x23744899, 0x2b73a840, 0x34e63b41,
    0x40000000, 0x4cfa3cc1, 0x5c13d840, 0x6d91b519, 0x81bf1000,
#else
    0x0000000000000000, 0xa8b8b452291fe821, 0x0000000000000000,
    0x6765c793fa10079d, 0x41c21cb8e1000000, 0x3642798750226111,
    0x8000000000000000, 0xa8b8b452291fe821, 0x8ac7230489e80000,
    0x4d28cb56c33fa539, 0x1eca170c00000000, 0x780c7372621bd74d,
    0x1e39a5057d810000, 0x5b27ac993df97701, 0x0000000000000000,
    0x27b95e997e21d9f1, 0x5da0e1e53c5c8000, 0xd2ae3299c1c4aedb,
    0x16bcc41e90000000, 0x2d04b7fdd9c0ef49, 0x5658597bcaa24000,
    0xa0e2073737609371, 0x0c29e98000000000, 0x14adf4b7320334b9,
    0x226ed36478bfa000, 0x383d9170b85ff80b, 0x5a3c23e39c000000,
    0x8e65137388122bcd, 0xdd41bb36d259e000, 0x0aee5720ee830681,
    0x1000000000000000, 0x172588ad4f5f0981, 0x211e44f7d02c1000,
    0x2ee56725f06e5c71, 0x41c21cb8e1000000,
#endif
};

JSValue js_bigint_to_string1(JSContext* ctx, JSValueConst val, int radix) {
  if (JS_VALUE_GET_TAG(val) == JS_TAG_SHORT_BIG_INT) {
    char buf[66];
    int len;
    len = i64toa_radix(buf, JS_VALUE_GET_SHORT_BIG_INT(val), radix);
    return js_new_string8_len(ctx, buf, len);
  } else {
    JSBigInt *r, *tmp = NULL;
    char *buf, *q, *buf_end;
    int is_neg, n_bits, log2_radix, n_digits;
    BOOL is_binary_radix;
    JSValue res;

    assert(JS_VALUE_GET_TAG(val) == JS_TAG_BIG_INT);
    r = JS_VALUE_GET_PTR(val);
    if (r->len == 1 && r->tab[0] == 0) {
      /* '0' case */
      return js_new_string8_len(ctx, "0", 1);
    }
    is_binary_radix = ((radix & (radix - 1)) == 0);
    is_neg = js_bigint_sign(r);
    if (is_neg) {
      tmp = js_bigint_neg(ctx, r);
      if (!tmp)
        return JS_EXCEPTION;
      r = tmp;
    } else if (!is_binary_radix) {
      /* need to modify 'r' */
      tmp = js_bigint_new(ctx, r->len);
      if (!tmp)
        return JS_EXCEPTION;
      memcpy(tmp->tab, r->tab, r->len * sizeof(r->tab[0]));
      r = tmp;
    }
    log2_radix = 31 - clz32(radix); /* floor(log2(radix)) */
    n_bits = r->len * JS_LIMB_BITS - js_limb_safe_clz(r->tab[r->len - 1]);
    /* n_digits is exact only if radix is a power of
       two. Otherwise it is >= the exact number of digits */
    n_digits = (n_bits + log2_radix - 1) / log2_radix;
    /* XXX: could directly build the JSString */
    buf = js_malloc(ctx, n_digits + is_neg + 1);
    if (!buf) {
      js_free(ctx, tmp);
      return JS_EXCEPTION;
    }
    q = buf + n_digits + is_neg + 1;
    *--q = '\0';
    buf_end = q;
    if (!is_binary_radix) {
      int len;
      js_limb_t radix_base, v;
      radix_base = radix_base_table[radix - 2];
      len = r->len;
      for (;;) {
        /* remove leading zero limbs */
        while (len > 1 && r->tab[len - 1] == 0)
          len--;
        if (len == 1 && r->tab[0] < radix_base) {
          v = r->tab[0];
          if (v != 0) {
            q = js_u64toa(q, v, radix);
          }
          break;
        } else {
          v = mp_div1(r->tab, r->tab, len, radix_base, 0);
          q = limb_to_a(q, v, radix, digits_per_limb_table[radix - 2]);
        }
      }
    } else {
      int i, shift;
      unsigned int bit_pos, pos, c;

      /* radix is a power of two */
      for (i = 0; i < n_digits; i++) {
        bit_pos = i * log2_radix;
        pos = bit_pos / JS_LIMB_BITS;
        shift = bit_pos % JS_LIMB_BITS;
        if (likely((shift + log2_radix) <= JS_LIMB_BITS)) {
          c = r->tab[pos] >> shift;
        } else {
          c = (r->tab[pos] >> shift) |
              (r->tab[pos + 1] << (JS_LIMB_BITS - shift));
        }
        c &= (radix - 1);
        *--q = digits[c];
      }
    }
    if (is_neg)
      *--q = '-';
    js_free(ctx, tmp);
    res = js_new_string8_len(ctx, q, buf_end - q);
    js_free(ctx, buf);
    return res;
  }
}

JSValue js_bigint_to_string(JSContext* ctx, JSValueConst val) {
  return js_bigint_to_string1(ctx, val, 10);
}

/* if possible transform a BigInt to short big and free it, otherwise
   return a normal bigint */
JSValue JS_CompactBigInt(JSContext* ctx, JSBigInt* p) {
  JSValue res;
  if (p->len == 1) {
    res = __JS_NewShortBigInt(ctx, (js_slimb_t)p->tab[0]);
    js_free(ctx, p);
    return res;
  } else {
    return JS_MKPTR(JS_TAG_BIG_INT, p);
  }
}

JSValue js_bigint_asUintN(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv,
    int asIntN) {
  uint64_t bits;
  JSValue res, a;

  if (JS_ToIndex(ctx, &bits, argv[0]))
    return JS_EXCEPTION;
  a = JS_ToBigInt(ctx, argv[1]);
  if (JS_IsException(a))
    return JS_EXCEPTION;
  if (bits == 0) {
    JS_FreeValue(ctx, a);
    res = __JS_NewShortBigInt(ctx, 0);
  } else if (JS_VALUE_GET_TAG(a) == JS_TAG_SHORT_BIG_INT) {
    /* fast case */
    if (bits >= JS_SHORT_BIG_INT_BITS) {
      res = a;
    } else {
      uint64_t v;
      int shift;
      shift = 64 - bits;
      v = JS_VALUE_GET_SHORT_BIG_INT(a);
      v = v << shift;
      if (asIntN)
        v = (int64_t)v >> shift;
      else
        v = v >> shift;
      res = __JS_NewShortBigInt(ctx, v);
    }
  } else {
    JSBigInt *r, *p = JS_VALUE_GET_PTR(a);
    if (bits >= p->len * JS_LIMB_BITS) {
      res = a;
    } else {
      int len, shift, i;
      js_limb_t v;
      len = (bits + JS_LIMB_BITS - 1) / JS_LIMB_BITS;
      r = js_bigint_new(ctx, len);
      if (!r) {
        JS_FreeValue(ctx, a);
        return JS_EXCEPTION;
      }
      r->len = len;
      for (i = 0; i < len - 1; i++)
        r->tab[i] = p->tab[i];
      shift = (-bits) & (JS_LIMB_BITS - 1);
      /* 0 <= shift <= JS_LIMB_BITS - 1 */
      v = p->tab[len - 1] << shift;
      if (asIntN)
        v = (js_slimb_t)v >> shift;
      else
        v = v >> shift;
      r->tab[len - 1] = v;
      r = js_bigint_normalize(ctx, r);
      JS_FreeValue(ctx, a);
      res = JS_CompactBigInt(ctx, r);
    }
  }
  return res;
}

const JSCFunctionListEntry js_bigint_funcs[] = {
    JS_CFUNC_MAGIC_DEF("asUintN", 2, js_bigint_asUintN, 0),
    JS_CFUNC_MAGIC_DEF("asIntN", 2, js_bigint_asUintN, 1),
};

const JSCFunctionListEntry js_bigint_proto_funcs[] = {
    JS_CFUNC_DEF("toString", 0, js_bigint_toString),
    JS_CFUNC_DEF("valueOf", 0, js_bigint_valueOf),
    JS_PROP_STRING_DEF("[Symbol.toStringTag]", "BigInt", JS_PROP_CONFIGURABLE),
};

void JS_AddIntrinsicBigInt(JSContext* ctx) {
  JSValueConst obj1;

  ctx->class_proto[JS_CLASS_BIG_INT] = JS_NewObject(ctx);
  JS_SetPropertyFunctionList(
      ctx,
      ctx->class_proto[JS_CLASS_BIG_INT],
      js_bigint_proto_funcs,
      countof(js_bigint_proto_funcs));
  obj1 = JS_NewGlobalCConstructor(
      ctx,
      "BigInt",
      js_bigint_constructor,
      1,
      ctx->class_proto[JS_CLASS_BIG_INT]);
  JS_SetPropertyFunctionList(
      ctx, obj1, js_bigint_funcs, countof(js_bigint_funcs));
}
