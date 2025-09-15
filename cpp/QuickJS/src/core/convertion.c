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

#include "convertion.h"
#include "QuickJS/libregexp.h"
#include "QuickJS/libunicode.h"
#include "builtins/js-big-num.h"
#include "exception.h"
#include "function.h"
#include "string-utils.h"

int skip_spaces(const char* pc) {
  const uint8_t *p, *p_next, *p_start;
  uint32_t c;

  p = p_start = (const uint8_t*)pc;
  for (;;) {
    c = *p;
    if (c < 128) {
      if (!((c >= 0x09 && c <= 0x0d) || (c == 0x20)))
        break;
      p++;
    } else {
      c = unicode_from_utf8(p, UTF8_CHAR_LEN_MAX, &p_next);
      if (!lre_is_space(c))
        break;
      p = p_next;
    }
  }
  return p - p_start;
}

JSValue JS_ToPrimitiveFree(JSContext* ctx, JSValue val, int hint) {
  int i;
  BOOL force_ordinary;

  JSAtom method_name;
  JSValue method, ret;
  if (JS_VALUE_GET_TAG(val) != JS_TAG_OBJECT)
    return val;
  force_ordinary = hint & HINT_FORCE_ORDINARY;
  hint &= ~HINT_FORCE_ORDINARY;
  if (!force_ordinary) {
    method = JS_GetProperty(ctx, val, JS_ATOM_Symbol_toPrimitive);
    if (JS_IsException(method))
      goto exception;
    /* ECMA says *If exoticToPrim is not undefined* but tests in
       test262 use null as a non callable converter */
    if (!JS_IsUndefined(method) && !JS_IsNull(method)) {
      JSAtom atom;
      JSValue arg;
      switch (hint) {
        case HINT_STRING:
          atom = JS_ATOM_string;
          break;
        case HINT_NUMBER:
          atom = JS_ATOM_number;
          break;
        default:
        case HINT_NONE:
          atom = JS_ATOM_default;
          break;
      }
      arg = JS_AtomToString(ctx, atom);
      ret = JS_CallFree(ctx, method, val, 1, (JSValueConst*)&arg);
      JS_FreeValue(ctx, arg);
      if (JS_IsException(ret))
        goto exception;
      JS_FreeValue(ctx, val);
      if (JS_VALUE_GET_TAG(ret) != JS_TAG_OBJECT)
        return ret;
      JS_FreeValue(ctx, ret);
      return JS_ThrowTypeError(ctx, "toPrimitive");
    }
  }
  if (hint != HINT_STRING)
    hint = HINT_NUMBER;
  for (i = 0; i < 2; i++) {
    if ((i ^ hint) == 0) {
      method_name = JS_ATOM_toString;
    } else {
      method_name = JS_ATOM_valueOf;
    }
    method = JS_GetProperty(ctx, val, method_name);
    if (JS_IsException(method))
      goto exception;
    if (JS_IsFunction(ctx, method)) {
      ret = JS_CallFree(ctx, method, val, 0, NULL);
      if (JS_IsException(ret))
        goto exception;
      if (JS_VALUE_GET_TAG(ret) != JS_TAG_OBJECT) {
        JS_FreeValue(ctx, val);
        return ret;
      }
      JS_FreeValue(ctx, ret);
    } else {
      JS_FreeValue(ctx, method);
    }
  }
  JS_ThrowTypeError(ctx, "toPrimitive");
exception:
  JS_FreeValue(ctx, val);
  return JS_EXCEPTION;
}

JSValue JS_ToPrimitive(JSContext* ctx, JSValueConst val, int hint) {
  return JS_ToPrimitiveFree(ctx, JS_DupValue(ctx, val), hint);
}

__exception int JS_ToArrayLengthFree(
    JSContext* ctx,
    uint32_t* plen,
    JSValue val,
    BOOL is_array_ctor) {
  uint32_t tag, len;

  tag = JS_VALUE_GET_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL: {
      int v;
      v = JS_VALUE_GET_INT(val);
      if (v < 0)
        goto fail;
      len = v;
    } break;
    default:
      if (JS_TAG_IS_FLOAT64(tag)) {
        double d;
        d = JS_VALUE_GET_FLOAT64(val);
        if (!(d >= 0 && d <= UINT32_MAX))
          goto fail;
        len = (uint32_t)d;
        if (len != d)
          goto fail;
      } else {
        uint32_t len1;

        if (is_array_ctor) {
          val = JS_ToNumberFree(ctx, val);
          if (JS_IsException(val))
            return -1;
          /* cannot recurse because val is a number */
          if (JS_ToArrayLengthFree(ctx, &len, val, TRUE))
            return -1;
        } else {
          /* legacy behavior: must do the conversion twice and compare */
          if (JS_ToUint32(ctx, &len, val)) {
            JS_FreeValue(ctx, val);
            return -1;
          }
          val = JS_ToNumberFree(ctx, val);
          if (JS_IsException(val))
            return -1;
          /* cannot recurse because val is a number */
          if (JS_ToArrayLengthFree(ctx, &len1, val, FALSE))
            return -1;
          if (len1 != len) {
          fail:
            JS_ThrowRangeError(ctx, "invalid array length");
            return -1;
          }
        }
      }
      break;
  }
  *plen = len;
  return 0;
}

static JSValue
JS_ToNumberHintFree(JSContext* ctx, JSValue val, JSToNumberHintEnum flag) {
  uint32_t tag;
  JSValue ret;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_BIG_INT:
    case JS_TAG_SHORT_BIG_INT:
      if (flag != TON_FLAG_NUMERIC) {
        JS_FreeValue(ctx, val);
        return JS_ThrowTypeError(ctx, "cannot convert bigint to number");
      }
      ret = val;
      break;
    case JS_TAG_FLOAT64:
    case JS_TAG_INT:
    case JS_TAG_EXCEPTION:
      ret = val;
      break;
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
      ret = JS_NewInt32(ctx, JS_VALUE_GET_INT(val));
      break;
    case JS_TAG_UNDEFINED:
      ret = JS_NAN;
      break;
    case JS_TAG_OBJECT:
      val = JS_ToPrimitiveFree(ctx, val, HINT_NUMBER);
      if (JS_IsException(val))
        return JS_EXCEPTION;
      goto redo;
    case JS_TAG_STRING:
    case JS_TAG_STRING_ROPE: {
      const char* str;
      const char* p;
      size_t len;

      str = JS_ToCStringLen(ctx, &len, val);
      JS_FreeValue(ctx, val);
      if (!str)
        return JS_EXCEPTION;
      p = str;
      p += skip_spaces(p);
      if ((p - str) == len) {
        ret = JS_NewInt32(ctx, 0);
      } else {
        int flags = ATOD_ACCEPT_BIN_OCT;
        ret = js_atof(ctx, p, &p, 0, flags);
        if (!JS_IsException(ret)) {
          p += skip_spaces(p);
          if ((p - str) != len) {
            JS_FreeValue(ctx, ret);
            ret = JS_NAN;
          }
        }
      }
      JS_FreeCString(ctx, str);
    } break;
    case JS_TAG_SYMBOL:
      JS_FreeValue(ctx, val);
      return JS_ThrowTypeError(ctx, "cannot convert symbol to number");
    default:
      JS_FreeValue(ctx, val);
      ret = JS_NAN;
      break;
  }
  return ret;
}

JSValue JS_ToNumberFree(JSContext* ctx, JSValue val) {
  return JS_ToNumberHintFree(ctx, val, TON_FLAG_NUMBER);
}

JSValue JS_ToNumericFree(JSContext* ctx, JSValue val) {
  return JS_ToNumberHintFree(ctx, val, TON_FLAG_NUMERIC);
}

JSValue JS_ToNumeric(JSContext* ctx, JSValueConst val) {
  return JS_ToNumericFree(ctx, JS_DupValue(ctx, val));
}

__exception int __JS_ToFloat64Free(JSContext* ctx, double* pres, JSValue val) {
  double d;
  uint32_t tag;

  val = JS_ToNumberFree(ctx, val);
  if (JS_IsException(val))
    goto fail;
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
      d = JS_VALUE_GET_INT(val);
      break;
    case JS_TAG_FLOAT64:
      d = JS_VALUE_GET_FLOAT64(val);
      break;
    default:
      abort();
  }
  *pres = d;
  return 0;
fail:
  *pres = JS_FLOAT64_NAN;
  return -1;
}

int JS_ToFloat64(JSContext* ctx, double* pres, JSValueConst val) {
  return JS_ToFloat64Free(ctx, pres, JS_DupValue(ctx, val));
}

JSValue JS_ToNumber(JSContext* ctx, JSValueConst val) {
  return JS_ToNumberFree(ctx, JS_DupValue(ctx, val));
}

/* same as JS_ToNumber() but return 0 in case of NaN/Undefined */
__maybe_unused JSValue JS_ToIntegerFree(JSContext* ctx, JSValue val) {
  uint32_t tag;
  JSValue ret;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      ret = JS_NewInt32(ctx, JS_VALUE_GET_INT(val));
      break;
    case JS_TAG_FLOAT64: {
      double d = JS_VALUE_GET_FLOAT64(val);
      if (isnan(d)) {
        ret = JS_NewInt32(ctx, 0);
      } else {
        /* convert -0 to +0 */
        d = trunc(d) + 0.0;
        ret = JS_NewFloat64(ctx, d);
      }
    } break;
    default:
      val = JS_ToNumberFree(ctx, val);
      if (JS_IsException(val))
        return val;
      goto redo;
  }
  return ret;
}

/* Note: the integer value is satured to 32 bits */
int JS_ToInt32SatFree(JSContext* ctx, int* pres, JSValue val) {
  uint32_t tag;
  int ret;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      ret = JS_VALUE_GET_INT(val);
      break;
    case JS_TAG_EXCEPTION:
      *pres = 0;
      return -1;
    case JS_TAG_FLOAT64: {
      double d = JS_VALUE_GET_FLOAT64(val);
      if (isnan(d)) {
        ret = 0;
      } else {
        if (d < INT32_MIN)
          ret = INT32_MIN;
        else if (d > INT32_MAX)
          ret = INT32_MAX;
        else
          ret = (int)d;
      }
    } break;
    default:
      val = JS_ToNumberFree(ctx, val);
      if (JS_IsException(val)) {
        *pres = 0;
        return -1;
      }
      goto redo;
  }
  *pres = ret;
  return 0;
}

int JS_ToInt32Sat(JSContext* ctx, int* pres, JSValueConst val) {
  return JS_ToInt32SatFree(ctx, pres, JS_DupValue(ctx, val));
}

int JS_ToInt32Clamp(
    JSContext* ctx,
    int* pres,
    JSValueConst val,
    int min,
    int max,
    int min_offset) {
  int res = JS_ToInt32SatFree(ctx, pres, JS_DupValue(ctx, val));
  if (res == 0) {
    if (*pres < min) {
      *pres += min_offset;
      if (*pres < min)
        *pres = min;
    } else {
      if (*pres > max)
        *pres = max;
    }
  }
  return res;
}

int JS_ToInt64SatFree(JSContext* ctx, int64_t* pres, JSValue val) {
  uint32_t tag;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      *pres = JS_VALUE_GET_INT(val);
      return 0;
    case JS_TAG_EXCEPTION:
      *pres = 0;
      return -1;
    case JS_TAG_FLOAT64: {
      double d = JS_VALUE_GET_FLOAT64(val);
      if (isnan(d)) {
        *pres = 0;
      } else {
        if (d < INT64_MIN)
          *pres = INT64_MIN;
        else if (d >= 0x1p63) /* must use INT64_MAX + 1 because INT64_MAX cannot
                                 be exactly represented as a double */
          *pres = INT64_MAX;
        else
          *pres = (int64_t)d;
      }
    }
      return 0;
    default:
      val = JS_ToNumberFree(ctx, val);
      if (JS_IsException(val)) {
        *pres = 0;
        return -1;
      }
      goto redo;
  }
}

int JS_ToInt64Sat(JSContext* ctx, int64_t* pres, JSValueConst val) {
  return JS_ToInt64SatFree(ctx, pres, JS_DupValue(ctx, val));
}

int JS_ToInt64Clamp(
    JSContext* ctx,
    int64_t* pres,
    JSValueConst val,
    int64_t min,
    int64_t max,
    int64_t neg_offset) {
  int res = JS_ToInt64SatFree(ctx, pres, JS_DupValue(ctx, val));
  if (res == 0) {
    if (*pres < 0)
      *pres += neg_offset;
    if (*pres < min)
      *pres = min;
    else if (*pres > max)
      *pres = max;
  }
  return res;
}

/* Same as JS_ToInt32Free() but with a 64 bit result. Return (<0, 0)
   in case of exception */
int JS_ToInt64Free(JSContext* ctx, int64_t* pres, JSValue val) {
  uint32_t tag;
  int64_t ret;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      ret = JS_VALUE_GET_INT(val);
      break;
    case JS_TAG_FLOAT64: {
      JSFloat64Union u;
      double d;
      int e;
      d = JS_VALUE_GET_FLOAT64(val);
      u.d = d;
      /* we avoid doing fmod(x, 2^64) */
      e = (u.u64 >> 52) & 0x7ff;
      if (likely(e <= (1023 + 62))) {
        /* fast case */
        ret = (int64_t)d;
      } else if (e <= (1023 + 62 + 53)) {
        uint64_t v;
        /* remainder modulo 2^64 */
        v = (u.u64 & (((uint64_t)1 << 52) - 1)) | ((uint64_t)1 << 52);
        ret = v << ((e - 1023) - 52);
        /* take the sign into account */
        if (u.u64 >> 63)
          ret = -ret;
      } else {
        ret = 0; /* also handles NaN and +inf */
      }
    } break;
    default:
      val = JS_ToNumberFree(ctx, val);
      if (JS_IsException(val)) {
        *pres = 0;
        return -1;
      }
      goto redo;
  }
  *pres = ret;
  return 0;
}

int JS_ToInt64(JSContext* ctx, int64_t* pres, JSValueConst val) {
  return JS_ToInt64Free(ctx, pres, JS_DupValue(ctx, val));
}

int JS_ToInt64Ext(JSContext* ctx, int64_t* pres, JSValueConst val) {
  if (JS_IsBigInt(ctx, val))
    return JS_ToBigInt64(ctx, pres, val);
  else
    return JS_ToInt64(ctx, pres, val);
}

/* return (<0, 0) in case of exception */
int JS_ToInt32Free(JSContext* ctx, int32_t* pres, JSValue val) {
  uint32_t tag;
  int32_t ret;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      ret = JS_VALUE_GET_INT(val);
      break;
    case JS_TAG_FLOAT64: {
      JSFloat64Union u;
      double d;
      int e;
      d = JS_VALUE_GET_FLOAT64(val);
      u.d = d;
      /* we avoid doing fmod(x, 2^32) */
      e = (u.u64 >> 52) & 0x7ff;
      if (likely(e <= (1023 + 30))) {
        /* fast case */
        ret = (int32_t)d;
      } else if (e <= (1023 + 30 + 53)) {
        uint64_t v;
        /* remainder modulo 2^32 */
        v = (u.u64 & (((uint64_t)1 << 52) - 1)) | ((uint64_t)1 << 52);
        v = v << ((e - 1023) - 52 + 32);
        ret = v >> 32;
        /* take the sign into account */
        if (u.u64 >> 63)
          ret = -ret;
      } else {
        ret = 0; /* also handles NaN and +inf */
      }
    } break;
    default:
      val = JS_ToNumberFree(ctx, val);
      if (JS_IsException(val)) {
        *pres = 0;
        return -1;
      }
      goto redo;
  }
  *pres = ret;
  return 0;
}

int JS_ToInt32(JSContext* ctx, int32_t* pres, JSValueConst val) {
  return JS_ToInt32Free(ctx, pres, JS_DupValue(ctx, val));
}

int JS_ToUint8ClampFree(JSContext* ctx, int32_t* pres, JSValue val) {
  uint32_t tag;
  int res;

redo:
  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      res = JS_VALUE_GET_INT(val);
      res = max_int(0, min_int(255, res));
      break;
    case JS_TAG_FLOAT64: {
      double d = JS_VALUE_GET_FLOAT64(val);
      if (isnan(d)) {
        res = 0;
      } else {
        if (d < 0)
          res = 0;
        else if (d > 255)
          res = 255;
        else
          res = lrint(d);
      }
    } break;
    default:
      val = JS_ToNumberFree(ctx, val);
      if (JS_IsException(val)) {
        *pres = 0;
        return -1;
      }
      goto redo;
  }
  *pres = res;
  return 0;
}

int JS_ToBoolFree(JSContext* ctx, JSValue val) {
  uint32_t tag = JS_VALUE_GET_TAG(val);
  switch (tag) {
    case JS_TAG_INT:
      return JS_VALUE_GET_INT(val) != 0;
    case JS_TAG_BOOL:
    case JS_TAG_NULL:
    case JS_TAG_UNDEFINED:
      return JS_VALUE_GET_INT(val);
    case JS_TAG_EXCEPTION:
      return -1;
    case JS_TAG_STRING: {
      BOOL ret = JS_VALUE_GET_STRING(val)->len != 0;
      JS_FreeValue(ctx, val);
      return ret;
    }
    case JS_TAG_STRING_ROPE: {
      BOOL ret = JS_VALUE_GET_STRING_ROPE(val)->len != 0;
      JS_FreeValue(ctx, val);
      return ret;
    }
    case JS_TAG_SHORT_BIG_INT:
      return JS_VALUE_GET_SHORT_BIG_INT(val) != 0;
    case JS_TAG_BIG_INT: {
      JSBigInt* p = JS_VALUE_GET_PTR(val);
      BOOL ret;
      int i;

      /* fail safe: we assume it is not necessarily
         normalized. Beginning from the MSB ensures that the
         test is fast. */
      ret = FALSE;
      for (i = p->len - 1; i >= 0; i--) {
        if (p->tab[i] != 0) {
          ret = TRUE;
          break;
        }
      }
      JS_FreeValue(ctx, val);
      return ret;
    }
    case JS_TAG_OBJECT: {
      JSObject* p = JS_VALUE_GET_OBJ(val);
      BOOL ret;
      ret = !p->is_HTMLDDA;
      JS_FreeValue(ctx, val);
      return ret;
    } break;
    default:
      if (JS_TAG_IS_FLOAT64(tag)) {
        double d = JS_VALUE_GET_FLOAT64(val);
        return !isnan(d) && d != 0;
      } else {
        JS_FreeValue(ctx, val);
        return TRUE;
      }
  }
}

int JS_ToBool(JSContext* ctx, JSValueConst val) {
  return JS_ToBoolFree(ctx, JS_DupValue(ctx, val));
}

/* return an exception in case of memory error. Return JS_NAN if
   invalid syntax */
/* XXX: directly use js_atod() */
JSValue js_atof(
    JSContext* ctx,
    const char* str,
    const char** pp,
    int radix,
    int flags) {
  const char *p, *p_start;
  int sep, is_neg;
  BOOL is_float, has_legacy_octal;
  int atod_type = flags & ATOD_TYPE_MASK;
  char buf1[64], *buf;
  int i, j, len;
  BOOL buf_allocated = FALSE;
  JSValue val;
  JSATODTempMem atod_mem;

  /* optional separator between digits */
  sep = (flags & ATOD_ACCEPT_UNDERSCORES) ? '_' : 256;
  has_legacy_octal = FALSE;

  p = str;
  p_start = p;
  is_neg = 0;
  if (p[0] == '+') {
    p++;
    p_start++;
    if (!(flags & ATOD_ACCEPT_PREFIX_AFTER_SIGN))
      goto no_radix_prefix;
  } else if (p[0] == '-') {
    p++;
    p_start++;
    is_neg = 1;
    if (!(flags & ATOD_ACCEPT_PREFIX_AFTER_SIGN))
      goto no_radix_prefix;
  }
  if (p[0] == '0') {
    if ((p[1] == 'x' || p[1] == 'X') && (radix == 0 || radix == 16)) {
      p += 2;
      radix = 16;
    } else if (
        (p[1] == 'o' || p[1] == 'O') && radix == 0 &&
        (flags & ATOD_ACCEPT_BIN_OCT)) {
      p += 2;
      radix = 8;
    } else if (
        (p[1] == 'b' || p[1] == 'B') && radix == 0 &&
        (flags & ATOD_ACCEPT_BIN_OCT)) {
      p += 2;
      radix = 2;
    } else if (
        (p[1] >= '0' && p[1] <= '9') && radix == 0 &&
        (flags & ATOD_ACCEPT_LEGACY_OCTAL)) {
      int i;
      has_legacy_octal = TRUE;
      sep = 256;
      for (i = 1; (p[i] >= '0' && p[i] <= '7'); i++)
        continue;
      if (p[i] == '8' || p[i] == '9')
        goto no_prefix;
      p += 1;
      radix = 8;
    } else {
      goto no_prefix;
    }
    /* there must be a digit after the prefix */
    if (to_digit((uint8_t)*p) >= radix)
      goto fail;
  no_prefix:;
  } else {
  no_radix_prefix:
    if (!(flags & ATOD_INT_ONLY) && (atod_type == ATOD_TYPE_FLOAT64) &&
        strstart(p, "Infinity", &p)) {
      double d = 1.0 / 0.0;
      if (is_neg)
        d = -d;
      val = JS_NewFloat64(ctx, d);
      goto done;
    }
  }
  if (radix == 0)
    radix = 10;
  is_float = FALSE;
  p_start = p;
  while (to_digit((uint8_t)*p) < radix ||
         (*p == sep && (radix != 10 || p != p_start + 1 || p[-1] != '0') &&
          to_digit((uint8_t)p[1]) < radix)) {
    p++;
  }
  if (!(flags & ATOD_INT_ONLY)) {
    if (*p == '.' && (p > p_start || to_digit((uint8_t)p[1]) < radix)) {
      is_float = TRUE;
      p++;
      if (*p == sep)
        goto fail;
      while (to_digit((uint8_t)*p) < radix ||
             (*p == sep && to_digit((uint8_t)p[1]) < radix))
        p++;
    }
    if (p > p_start &&
        (((*p == 'e' || *p == 'E') && radix == 10) ||
         ((*p == 'p' || *p == 'P') &&
          (radix == 2 || radix == 8 || radix == 16)))) {
      const char* p1 = p + 1;
      is_float = TRUE;
      if (*p1 == '+') {
        p1++;
      } else if (*p1 == '-') {
        p1++;
      }
      if (is_digit((uint8_t)*p1)) {
        p = p1 + 1;
        while (is_digit((uint8_t)*p) || (*p == sep && is_digit((uint8_t)p[1])))
          p++;
      }
    }
  }
  if (p == p_start)
    goto fail;

  buf = buf1;
  buf_allocated = FALSE;
  len = p - p_start;
  if (unlikely((len + 2) > sizeof(buf1))) {
    buf = js_malloc_rt(ctx->rt, len + 2); /* no exception raised */
    if (!buf)
      goto mem_error;
    buf_allocated = TRUE;
  }
  /* remove the separators and the radix prefixes */
  j = 0;
  if (is_neg)
    buf[j++] = '-';
  for (i = 0; i < len; i++) {
    if (p_start[i] != '_')
      buf[j++] = p_start[i];
  }
  buf[j] = '\0';

  if (flags & ATOD_ACCEPT_SUFFIX) {
    if (*p == 'n') {
      p++;
      atod_type = ATOD_TYPE_BIG_INT;
    } else {
      if (is_float && radix != 10)
        goto fail;
    }
  } else {
    if (atod_type == ATOD_TYPE_FLOAT64) {
      if (is_float && radix != 10)
        goto fail;
    }
  }

  switch (atod_type) {
    case ATOD_TYPE_FLOAT64: {
      double d;
      d = js_atod(buf, NULL, radix, is_float ? 0 : JS_ATOD_INT_ONLY, &atod_mem);
      /* return int or float64 */
      val = JS_NewFloat64(ctx, d);
    } break;
    case ATOD_TYPE_BIG_INT: {
      JSBigInt* r;
      if (has_legacy_octal || is_float)
        goto fail;
      r = js_bigint_from_string(ctx, buf, radix);
      if (!r)
        goto mem_error;
      val = JS_CompactBigInt(ctx, r);
    } break;
    default:
      abort();
  }

done:
  if (buf_allocated)
    js_free_rt(ctx->rt, buf);
  if (pp)
    *pp = p;
  return val;
fail:
  val = JS_NAN;
  goto done;
mem_error:
  val = JS_ThrowOutOfMemory(ctx);
  goto done;
}

BOOL is_safe_integer(double d) {
  return isfinite(d) && floor(d) == d && fabs(d) <= (double)MAX_SAFE_INTEGER;
}

int JS_ToIndex(JSContext* ctx, uint64_t* plen, JSValueConst val) {
  int64_t v;
  if (JS_ToInt64Sat(ctx, &v, val))
    return -1;
  if (v < 0 || v > MAX_SAFE_INTEGER) {
    JS_ThrowRangeError(ctx, "invalid array index");
    *plen = 0;
    return -1;
  }
  *plen = v;
  return 0;
}

/* convert a value to a length between 0 and MAX_SAFE_INTEGER.
   return -1 for exception */
__exception int JS_ToLengthFree(JSContext* ctx, int64_t* plen, JSValue val) {
  int res = JS_ToInt64Clamp(ctx, plen, val, 0, MAX_SAFE_INTEGER, 0);
  JS_FreeValue(ctx, val);
  return res;
}

/* Note: can return an exception */
int JS_NumberIsInteger(JSContext* ctx, JSValueConst val) {
  double d;
  if (!JS_IsNumber(val))
    return FALSE;
  if (unlikely(JS_ToFloat64(ctx, &d, val)))
    return -1;
  return isfinite(d) && floor(d) == d;
}

BOOL JS_NumberIsNegativeOrMinusZero(JSContext* ctx, JSValueConst val) {
  uint32_t tag;

  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_INT: {
      int v;
      v = JS_VALUE_GET_INT(val);
      return (v < 0);
    }
    case JS_TAG_FLOAT64: {
      JSFloat64Union u;
      u.d = JS_VALUE_GET_FLOAT64(val);
      return (u.u64 >> 63);
    }
    case JS_TAG_SHORT_BIG_INT:
      return (JS_VALUE_GET_SHORT_BIG_INT(val) < 0);
    case JS_TAG_BIG_INT: {
      JSBigInt* p = JS_VALUE_GET_PTR(val);
      return js_bigint_sign(p);
    }
    default:
      return FALSE;
  }
}

JSValue js_dtoa2(JSContext* ctx, double d, int radix, int n_digits, int flags) {
  char static_buf[128], *buf, *tmp_buf;
  int len, len_max;
  JSValue res;
  JSDTOATempMem dtoa_mem;
  len_max = js_dtoa_max_len(d, radix, n_digits, flags);

  /* longer buffer may be used if radix != 10 */
  if (len_max > sizeof(static_buf) - 1) {
    tmp_buf = js_malloc(ctx, len_max + 1);
    if (!tmp_buf)
      return JS_EXCEPTION;
    buf = tmp_buf;
  } else {
    tmp_buf = NULL;
    buf = static_buf;
  }
  len = js_dtoa(buf, d, radix, n_digits, flags, &dtoa_mem);
  res = js_new_string8_len(ctx, buf, len);
  js_free(ctx, tmp_buf);
  return res;
}

JSValue
JS_ToStringInternal(JSContext* ctx, JSValueConst val, BOOL is_ToPropertyKey) {
  uint32_t tag;
  char buf[32];

  tag = JS_VALUE_GET_NORM_TAG(val);
  switch (tag) {
    case JS_TAG_STRING:
      return JS_DupValue(ctx, val);
    case JS_TAG_STRING_ROPE:
      return js_linearize_string_rope(ctx, JS_DupValue(ctx, val));
    case JS_TAG_INT: {
      size_t len;
      len = i32toa(buf, JS_VALUE_GET_INT(val));
      return js_new_string8_len(ctx, buf, len);
    } break;
    case JS_TAG_BOOL:
      return JS_AtomToString(
          ctx, JS_VALUE_GET_BOOL(val) ? JS_ATOM_true : JS_ATOM_false);
    case JS_TAG_NULL:
      return JS_AtomToString(ctx, JS_ATOM_null);
    case JS_TAG_UNDEFINED:
      return JS_AtomToString(ctx, JS_ATOM_undefined);
    case JS_TAG_EXCEPTION:
      return JS_EXCEPTION;
    case JS_TAG_OBJECT: {
      JSValue val1, ret;
      val1 = JS_ToPrimitive(ctx, val, HINT_STRING);
      if (JS_IsException(val1))
        return val1;
      ret = JS_ToStringInternal(ctx, val1, is_ToPropertyKey);
      JS_FreeValue(ctx, val1);
      return ret;
    } break;
    case JS_TAG_FUNCTION_BYTECODE:
      return js_new_string8(ctx, "[function bytecode]");
    case JS_TAG_SYMBOL:
      if (is_ToPropertyKey) {
        return JS_DupValue(ctx, val);
      } else {
        return JS_ThrowTypeError(ctx, "cannot convert symbol to string");
      }
    case JS_TAG_FLOAT64:
      return js_dtoa2(
          ctx, JS_VALUE_GET_FLOAT64(val), 10, 0, JS_DTOA_FORMAT_FREE);
    case JS_TAG_SHORT_BIG_INT:
    case JS_TAG_BIG_INT:
      return js_bigint_to_string(ctx, val);
    default:
      return js_new_string8(ctx, "[unsupported type]");
  }
}

JSValue JS_ToString(JSContext* ctx, JSValueConst val) {
  return JS_ToStringInternal(ctx, val, FALSE);
}

JSValue JS_ToStringFree(JSContext* ctx, JSValue val) {
  JSValue ret;
  ret = JS_ToString(ctx, val);
  JS_FreeValue(ctx, val);
  return ret;
}

JSValue JS_ToLocaleStringFree(JSContext* ctx, JSValue val) {
  if (JS_IsUndefined(val) || JS_IsNull(val))
    return JS_ToStringFree(ctx, val);
  return JS_InvokeFree(ctx, val, JS_ATOM_toLocaleString, 0, NULL);
}

JSValue JS_ToPropertyKey(JSContext* ctx, JSValueConst val) {
  return JS_ToStringInternal(ctx, val, TRUE);
}

JSValue JS_ToStringCheckObject(JSContext* ctx, JSValueConst val) {
  uint32_t tag = JS_VALUE_GET_TAG(val);
  if (tag == JS_TAG_NULL || tag == JS_TAG_UNDEFINED)
    return JS_ThrowTypeError(ctx, "null or undefined are forbidden");
  return JS_ToString(ctx, val);
}

JSValue JS_ToQuotedString(JSContext* ctx, JSValueConst val1) {
  JSValue val;
  JSString* p;
  int i;
  uint32_t c;
  StringBuffer b_s, *b = &b_s;
  char buf[16];

  val = JS_ToStringCheckObject(ctx, val1);
  if (JS_IsException(val))
    return val;
  p = JS_VALUE_GET_STRING(val);

  if (string_buffer_init(ctx, b, p->len + 2))
    goto fail;

  if (string_buffer_putc8(b, '\"'))
    goto fail;
  for (i = 0; i < p->len;) {
    c = string_getc(p, &i);
    switch (c) {
      case '\t':
        c = 't';
        goto quote;
      case '\r':
        c = 'r';
        goto quote;
      case '\n':
        c = 'n';
        goto quote;
      case '\b':
        c = 'b';
        goto quote;
      case '\f':
        c = 'f';
        goto quote;
      case '\"':
      case '\\':
      quote:
        if (string_buffer_putc8(b, '\\'))
          goto fail;
        if (string_buffer_putc8(b, c))
          goto fail;
        break;
      default:
        if (c < 32 || is_surrogate(c)) {
          snprintf(buf, sizeof(buf), "\\u%04x", c);
          if (string_buffer_puts8(b, buf))
            goto fail;
        } else {
          if (string_buffer_putc(b, c))
            goto fail;
        }
        break;
    }
  }
  if (string_buffer_putc8(b, '\"'))
    goto fail;
  JS_FreeValue(ctx, val);
  return string_buffer_end(b);
fail:
  JS_FreeValue(ctx, val);
  string_buffer_free(b);
  return JS_EXCEPTION;
}
