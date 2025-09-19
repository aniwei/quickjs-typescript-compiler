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

#include "js-weak-ref.h"

#include "../common.h"
#include "../runtime.h"
#include "../types.h"

BOOL js_weakref_is_target(JSValueConst val) {
  switch (JS_VALUE_GET_TAG(val)) {
    case JS_TAG_OBJECT:
      return TRUE;
    case JS_TAG_SYMBOL: {
      JSAtomStruct* p = JS_VALUE_GET_PTR(val);
      if (p->atom_type == JS_ATOM_TYPE_SYMBOL &&
          p->hash != JS_ATOM_HASH_PRIVATE)
        return TRUE;
    } break;
    default:
      break;
  }
  return FALSE;
}

/* JS_UNDEFINED is considered as a live weakref */
/* XXX: add a specific JSWeakRef value type ? */
BOOL js_weakref_is_live(JSValueConst val) {
  int* pref_count;
  if (JS_IsUndefined(val))
    return TRUE;
  pref_count = JS_VALUE_GET_PTR(val);
  return (*pref_count != 0);
}

/* 'val' can be JS_UNDEFINED */
void js_weakref_free(JSRuntime* rt, JSValue val) {
  if (JS_VALUE_GET_TAG(val) == JS_TAG_OBJECT) {
    JSObject* p = JS_VALUE_GET_OBJ(val);
    JS_ASSERT(p->weakref_count >= 1);
    p->weakref_count--;
    /* 'mark' is tested to avoid freeing the object structure when
       it is about to be freed in a cycle or in
       free_zero_refcount() */
    if (p->weakref_count == 0 && p->header.ref_count == 0 &&
        p->header.mark == 0) {
      js_free_rt(rt, p);
    }
  } else if (JS_VALUE_GET_TAG(val) == JS_TAG_SYMBOL) {
    JSString* p = JS_VALUE_GET_STRING(val);
    JS_ASSERT(p->hash >= 1);
    p->hash--;
    if (p->hash == 0 && p->header.ref_count == 0) {
      /* can remove the dummy structure */
      js_free_rt(rt, p);
    }
  }
}

/* val must be an object, a symbol or undefined (see
   js_weakref_is_target). */
JSValue js_weakref_new(JSContext* ctx, JSValueConst val) {
  if (JS_VALUE_GET_TAG(val) == JS_TAG_OBJECT) {
    JSObject* p = JS_VALUE_GET_OBJ(val);
    p->weakref_count++;
  } else if (JS_VALUE_GET_TAG(val) == JS_TAG_SYMBOL) {
    JSString* p = JS_VALUE_GET_STRING(val);
    /* XXX: could return an exception if too many references */
    JS_ASSERT_CONTEXT(ctx, p->hash < JS_ATOM_HASH_MASK - 2);
    p->hash++;
  } else {
    JS_ASSERT_CONTEXT(ctx, JS_IsUndefined(val));
  }
  return (JSValue)val;
}

/* WeakRef */

typedef struct JSWeakRefData {
  JSWeakRefHeader weakref_header;
  JSValue target;
} JSWeakRefData;

static void js_weakref_finalizer(JSRuntime* rt, JSValue val) {
  JSWeakRefData* wrd = JS_GetOpaque(val, JS_CLASS_WEAK_REF);
  if (!wrd)
    return;
  js_weakref_free(rt, wrd->target);
  list_del(&wrd->weakref_header.link);
  js_free_rt(rt, wrd);
}

void weakref_delete_weakref(JSRuntime* rt, JSWeakRefHeader* wh) {
  JSWeakRefData* wrd = container_of(wh, JSWeakRefData, weakref_header);

  if (!js_weakref_is_live(wrd->target)) {
    js_weakref_free(rt, wrd->target);
    wrd->target = JS_UNDEFINED;
  }
}

static JSValue js_weakref_constructor(
    JSContext* ctx,
    JSValueConst new_target,
    int argc,
    JSValueConst* argv) {
  JSValueConst arg;
  JSValue obj;

  if (JS_IsUndefined(new_target))
    return JS_ThrowTypeError(ctx, "constructor requires 'new'");
  arg = argv[0];
  if (!js_weakref_is_target(arg))
    return JS_ThrowTypeError(ctx, "invalid target");
  obj = js_create_from_ctor(ctx, new_target, JS_CLASS_WEAK_REF);
  if (JS_IsException(obj))
    return JS_EXCEPTION;
  JSWeakRefData* wrd = js_mallocz(ctx, sizeof(*wrd));
  if (!wrd) {
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
  }
  wrd->target = js_weakref_new(ctx, arg);
  wrd->weakref_header.weakref_type = JS_WEAKREF_TYPE_WEAKREF;
  list_add_tail(&wrd->weakref_header.link, &ctx->rt->weakref_list);
  JS_SetOpaque(obj, wrd);
  return obj;
}

static JSValue js_weakref_deref(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv) {
  JSWeakRefData* wrd = JS_GetOpaque2(ctx, this_val, JS_CLASS_WEAK_REF);
  if (!wrd)
    return JS_EXCEPTION;
  if (js_weakref_is_live(wrd->target))
    return JS_DupValue(ctx, wrd->target);
  else
    return JS_UNDEFINED;
}

static const JSCFunctionListEntry js_weakref_proto_funcs[] = {
    JS_CFUNC_DEF("deref", 0, js_weakref_deref),
    JS_PROP_STRING_DEF("[Symbol.toStringTag]", "WeakRef", JS_PROP_CONFIGURABLE),
};

static const JSClassShortDef js_weakref_class_def[] = {
    {JS_ATOM_WeakRef, js_weakref_finalizer, NULL}, /* JS_CLASS_WEAK_REF */
};

typedef struct JSFinRecEntry {
  struct list_head link;
  JSValue target;
  JSValue held_val;
  JSValue token;
} JSFinRecEntry;

typedef struct JSFinalizationRegistryData {
  JSWeakRefHeader weakref_header;
  struct list_head entries; /* list of JSFinRecEntry.link */
  JSContext* realm;
  JSValue cb;
} JSFinalizationRegistryData;

static void js_finrec_finalizer(JSRuntime* rt, JSValue val) {
  JSFinalizationRegistryData* frd =
      JS_GetOpaque(val, JS_CLASS_FINALIZATION_REGISTRY);
  if (frd) {
    struct list_head *el, *el1;
    list_for_each_safe(el, el1, &frd->entries) {
      JSFinRecEntry* fre = list_entry(el, JSFinRecEntry, link);
      js_weakref_free(rt, fre->target);
      js_weakref_free(rt, fre->token);
      JS_FreeValueRT(rt, fre->held_val);
      js_free_rt(rt, fre);
    }
    JS_FreeValueRT(rt, frd->cb);
    JS_FreeContext(frd->realm);
    list_del(&frd->weakref_header.link);
    js_free_rt(rt, frd);
  }
}

static void
js_finrec_mark(JSRuntime* rt, JSValueConst val, JS_MarkFunc* mark_func) {
  JSFinalizationRegistryData* frd =
      JS_GetOpaque(val, JS_CLASS_FINALIZATION_REGISTRY);
  struct list_head* el;
  if (frd) {
    list_for_each(el, &frd->entries) {
      JSFinRecEntry* fre = list_entry(el, JSFinRecEntry, link);
      JS_MarkValue(rt, fre->held_val, mark_func);
    }
    JS_MarkValue(rt, frd->cb, mark_func);
    mark_func(rt, &frd->realm->header);
  }
}

static JSValue js_finrec_job(JSContext* ctx, int argc, JSValueConst* argv) {
  return JS_Call(ctx, argv[0], JS_UNDEFINED, 1, &argv[1]);
}

void finrec_delete_weakref(JSRuntime* rt, JSWeakRefHeader* wh) {
  JSFinalizationRegistryData* frd =
      container_of(wh, JSFinalizationRegistryData, weakref_header);
  struct list_head *el, *el1;

  list_for_each_safe(el, el1, &frd->entries) {
    JSFinRecEntry* fre = list_entry(el, JSFinRecEntry, link);

    if (!js_weakref_is_live(fre->token)) {
      js_weakref_free(rt, fre->token);
      fre->token = JS_UNDEFINED;
    }

    if (!js_weakref_is_live(fre->target)) {
      JSValueConst args[2];
      args[0] = frd->cb;
      args[1] = fre->held_val;
      JS_EnqueueJob(frd->realm, js_finrec_job, 2, args);

      js_weakref_free(rt, fre->target);
      js_weakref_free(rt, fre->token);
      JS_FreeValueRT(rt, fre->held_val);
      list_del(&fre->link);
      js_free_rt(rt, fre);
    }
  }
}

static JSValue js_finrec_constructor(
    JSContext* ctx,
    JSValueConst new_target,
    int argc,
    JSValueConst* argv) {
  JSValueConst cb;
  JSValue obj;
  JSFinalizationRegistryData* frd;

  if (JS_IsUndefined(new_target))
    return JS_ThrowTypeError(ctx, "constructor requires 'new'");
  cb = argv[0];
  if (!JS_IsFunction(ctx, cb))
    return JS_ThrowTypeError(ctx, "argument must be a function");

  obj = js_create_from_ctor(ctx, new_target, JS_CLASS_FINALIZATION_REGISTRY);
  if (JS_IsException(obj))
    return JS_EXCEPTION;
  frd = js_mallocz(ctx, sizeof(*frd));
  if (!frd) {
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
  }
  frd->weakref_header.weakref_type = JS_WEAKREF_TYPE_FINREC;
  list_add_tail(&frd->weakref_header.link, &ctx->rt->weakref_list);
  init_list_head(&frd->entries);
  frd->realm = JS_DupContext(ctx);
  frd->cb = JS_DupValue(ctx, cb);
  JS_SetOpaque(obj, frd);
  return obj;
}

static JSValue js_finrec_register(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv) {
  JSValueConst target, held_val, token;
  JSFinalizationRegistryData* frd;
  JSFinRecEntry* fre;

  frd = JS_GetOpaque2(ctx, this_val, JS_CLASS_FINALIZATION_REGISTRY);
  if (!frd)
    return JS_EXCEPTION;
  target = argv[0];
  held_val = argv[1];
  token = argc > 2 ? argv[2] : JS_UNDEFINED;

  if (!js_weakref_is_target(target))
    return JS_ThrowTypeError(ctx, "invalid target");
  if (js_same_value(ctx, target, held_val))
    return JS_ThrowTypeError(ctx, "held value cannot be the target");
  if (!JS_IsUndefined(token) && !js_weakref_is_target(token))
    return JS_ThrowTypeError(ctx, "invalid unregister token");
  fre = js_malloc(ctx, sizeof(*fre));
  if (!fre)
    return JS_EXCEPTION;
  fre->target = js_weakref_new(ctx, target);
  fre->held_val = JS_DupValue(ctx, held_val);
  fre->token = js_weakref_new(ctx, token);
  list_add_tail(&fre->link, &frd->entries);
  return JS_UNDEFINED;
}

static JSValue js_finrec_unregister(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv) {
  JSFinalizationRegistryData* frd =
      JS_GetOpaque2(ctx, this_val, JS_CLASS_FINALIZATION_REGISTRY);
  JSValueConst token;
  BOOL removed;
  struct list_head *el, *el1;

  if (!frd)
    return JS_EXCEPTION;
  token = argv[0];
  if (!js_weakref_is_target(token))
    return JS_ThrowTypeError(ctx, "invalid unregister token");

  removed = FALSE;
  list_for_each_safe(el, el1, &frd->entries) {
    JSFinRecEntry* fre = list_entry(el, JSFinRecEntry, link);
    if (js_weakref_is_live(fre->token) &&
        js_same_value(ctx, fre->token, token)) {
      js_weakref_free(ctx->rt, fre->target);
      js_weakref_free(ctx->rt, fre->token);
      JS_FreeValue(ctx, fre->held_val);
      list_del(&fre->link);
      js_free(ctx, fre);
      removed = TRUE;
    }
  }
  return JS_NewBool(ctx, removed);
}

static const JSCFunctionListEntry js_finrec_proto_funcs[] = {
    JS_CFUNC_DEF("register", 2, js_finrec_register),
    JS_CFUNC_DEF("unregister", 1, js_finrec_unregister),
    JS_PROP_STRING_DEF(
        "[Symbol.toStringTag]",
        "FinalizationRegistry",
        JS_PROP_CONFIGURABLE),
};

static const JSClassShortDef js_finrec_class_def[] = {
    {JS_ATOM_FinalizationRegistry,
     js_finrec_finalizer,
     js_finrec_mark}, /* JS_CLASS_FINALIZATION_REGISTRY */
};

void JS_AddIntrinsicWeakRef(JSContext* ctx) {
  JSRuntime* rt = ctx->rt;

  /* WeakRef */
  if (!JS_IsRegisteredClass(rt, JS_CLASS_WEAK_REF)) {
    init_class_range(
        rt,
        js_weakref_class_def,
        JS_CLASS_WEAK_REF,
        countof(js_weakref_class_def));
  }
  ctx->class_proto[JS_CLASS_WEAK_REF] = JS_NewObject(ctx);
  JS_SetPropertyFunctionList(
      ctx,
      ctx->class_proto[JS_CLASS_WEAK_REF],
      js_weakref_proto_funcs,
      countof(js_weakref_proto_funcs));
  JS_NewGlobalCConstructor(
      ctx,
      "WeakRef",
      js_weakref_constructor,
      1,
      ctx->class_proto[JS_CLASS_WEAK_REF]);

  /* FinalizationRegistry */
  if (!JS_IsRegisteredClass(rt, JS_CLASS_FINALIZATION_REGISTRY)) {
    init_class_range(
        rt,
        js_finrec_class_def,
        JS_CLASS_FINALIZATION_REGISTRY,
        countof(js_finrec_class_def));
  }
  ctx->class_proto[JS_CLASS_FINALIZATION_REGISTRY] = JS_NewObject(ctx);
  JS_SetPropertyFunctionList(
      ctx,
      ctx->class_proto[JS_CLASS_FINALIZATION_REGISTRY],
      js_finrec_proto_funcs,
      countof(js_finrec_proto_funcs));
  JS_NewGlobalCConstructor(
      ctx,
      "FinalizationRegistry",
      js_finrec_constructor,
      1,
      ctx->class_proto[JS_CLASS_FINALIZATION_REGISTRY]);
}
