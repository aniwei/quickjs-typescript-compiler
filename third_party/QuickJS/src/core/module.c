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

#include "module.h"
#include "builtins/js-async-function.h"
#include "builtins/js-promise.h"
#include "exception.h"
#include "function.h"
#include "gc.h"
#include "malloc.h"
#include "parser.h"
#include "runtime.h"
#include "string-utils.h"

/* 'name' is freed. The module is referenced by 'ctx->loaded_modules' */
JSModuleDef* js_new_module_def(JSContext* ctx, JSAtom name) {
  JSModuleDef* m;
  m = js_mallocz(ctx, sizeof(*m));
  if (!m) {
    JS_FreeAtom(ctx, name);
    return NULL;
  }
  m->header.ref_count = 1;
  add_gc_object(ctx->rt, &m->header, JS_GC_OBJ_TYPE_MODULE);
  m->module_name = name;
  m->module_ns = JS_UNDEFINED;
  m->func_obj = JS_UNDEFINED;
  m->eval_exception = JS_UNDEFINED;
  m->meta_obj = JS_UNDEFINED;
  m->promise = JS_UNDEFINED;
  m->resolving_funcs[0] = JS_UNDEFINED;
  m->resolving_funcs[1] = JS_UNDEFINED;
  m->private_value = JS_UNDEFINED;
  list_add_tail(&m->link, &ctx->loaded_modules);
  return m;
}

void js_mark_module_def(JSRuntime* rt, JSModuleDef* m, JS_MarkFunc* mark_func) {
  int i;

  for (i = 0; i < m->req_module_entries_count; i++) {
    JSReqModuleEntry* rme = &m->req_module_entries[i];
    JS_MarkValue(rt, rme->attributes, mark_func);
  }

  for (i = 0; i < m->export_entries_count; i++) {
    JSExportEntry* me = &m->export_entries[i];
    if (me->export_type == JS_EXPORT_TYPE_LOCAL && me->u.local.var_ref) {
      mark_func(rt, &me->u.local.var_ref->header);
    }
  }

  JS_MarkValue(rt, m->module_ns, mark_func);
  JS_MarkValue(rt, m->func_obj, mark_func);
  JS_MarkValue(rt, m->eval_exception, mark_func);
  JS_MarkValue(rt, m->meta_obj, mark_func);
  JS_MarkValue(rt, m->promise, mark_func);
  JS_MarkValue(rt, m->resolving_funcs[0], mark_func);
  JS_MarkValue(rt, m->resolving_funcs[1], mark_func);
  JS_MarkValue(rt, m->private_value, mark_func);
}

void js_free_module_def(JSRuntime* rt, JSModuleDef* m) {
  int i;

  JS_FreeAtomRT(rt, m->module_name);

  for (i = 0; i < m->req_module_entries_count; i++) {
    JSReqModuleEntry* rme = &m->req_module_entries[i];
    JS_FreeAtomRT(rt, rme->module_name);
    JS_FreeValueRT(rt, rme->attributes);
  }
  js_free_rt(rt, m->req_module_entries);

  for (i = 0; i < m->export_entries_count; i++) {
    JSExportEntry* me = &m->export_entries[i];
    if (me->export_type == JS_EXPORT_TYPE_LOCAL)
      free_var_ref(rt, me->u.local.var_ref);
    JS_FreeAtomRT(rt, me->export_name);
    JS_FreeAtomRT(rt, me->local_name);
  }
  js_free_rt(rt, m->export_entries);

  js_free_rt(rt, m->star_export_entries);

  for (i = 0; i < m->import_entries_count; i++) {
    JSImportEntry* mi = &m->import_entries[i];
    JS_FreeAtomRT(rt, mi->import_name);
  }
  js_free_rt(rt, m->import_entries);
  js_free_rt(rt, m->async_parent_modules);

  JS_FreeValueRT(rt, m->module_ns);
  JS_FreeValueRT(rt, m->func_obj);
  JS_FreeValueRT(rt, m->eval_exception);
  JS_FreeValueRT(rt, m->meta_obj);
  JS_FreeValueRT(rt, m->promise);
  JS_FreeValueRT(rt, m->resolving_funcs[0]);
  JS_FreeValueRT(rt, m->resolving_funcs[1]);
  JS_FreeValueRT(rt, m->private_value);
  /* during the GC the finalizers are called in an arbitrary
     order so the module may no longer be referenced by the JSContext list */
  if (m->link.next) {
    list_del(&m->link);
  }
  remove_gc_object(&m->header);
  if (rt->gc_phase == JS_GC_PHASE_REMOVE_CYCLES && m->header.ref_count != 0) {
    list_add_tail(&m->header.link, &rt->gc_zero_ref_count_list);
  } else {
    js_free_rt(rt, m);
  }
}

int add_req_module_entry(JSContext* ctx, JSModuleDef* m, JSAtom module_name) {
  JSReqModuleEntry* rme;

  if (js_resize_array(
          ctx,
          (void**)&m->req_module_entries,
          sizeof(JSReqModuleEntry),
          &m->req_module_entries_size,
          m->req_module_entries_count + 1))
    return -1;
  rme = &m->req_module_entries[m->req_module_entries_count++];
  rme->module_name = JS_DupAtom(ctx, module_name);
  rme->module = NULL;
  rme->attributes = JS_UNDEFINED;
  return m->req_module_entries_count - 1;
}

JSExportEntry*
find_export_entry(JSContext* ctx, JSModuleDef* m, JSAtom export_name) {
  JSExportEntry* me;
  int i;
  for (i = 0; i < m->export_entries_count; i++) {
    me = &m->export_entries[i];
    if (me->export_name == export_name)
      return me;
  }
  return NULL;
}

/* create a C module */
JSModuleDef*
JS_NewCModule(JSContext* ctx, const char* name_str, JSModuleInitFunc* func) {
  JSModuleDef* m;
  JSAtom name;
  name = JS_NewAtom(ctx, name_str);
  if (name == JS_ATOM_NULL)
    return NULL;
  m = js_new_module_def(ctx, name);
  if (!m)
    return NULL;
  m->init_func = func;
  return m;
}

int JS_AddModuleExport(
    JSContext* ctx,
    JSModuleDef* m,
    const char* export_name) {
  JSExportEntry* me;
  JSAtom name;
  name = JS_NewAtom(ctx, export_name);
  if (name == JS_ATOM_NULL)
    return -1;
  me =
      add_export_entry2(ctx, NULL, m, JS_ATOM_NULL, name, JS_EXPORT_TYPE_LOCAL);
  JS_FreeAtom(ctx, name);
  if (!me)
    return -1;
  else
    return 0;
}

int JS_AddModuleExportList(
    JSContext* ctx,
    JSModuleDef* m,
    const JSCFunctionListEntry* tab,
    int len) {
  int i;
  for (i = 0; i < len; i++) {
    if (JS_AddModuleExport(ctx, m, tab[i].name))
      return -1;
  }
  return 0;
}

int JS_SetModuleExport(
    JSContext* ctx,
    JSModuleDef* m,
    const char* export_name,
    JSValue val) {
  JSExportEntry* me;
  JSAtom name;
  name = JS_NewAtom(ctx, export_name);
  if (name == JS_ATOM_NULL)
    goto fail;
  me = find_export_entry(ctx, m, name);
  JS_FreeAtom(ctx, name);
  if (!me)
    goto fail;
  set_value(ctx, me->u.local.var_ref->pvalue, val);
  return 0;
fail:
  JS_FreeValue(ctx, val);
  return -1;
}

int JS_SetModuleExportList(
    JSContext* ctx,
    JSModuleDef* m,
    const JSCFunctionListEntry* tab,
    int len) {
  int i;
  JSValue val;

  for (i = 0; i < len; i++) {
    const JSCFunctionListEntry* e = &tab[i];
    switch (e->def_type) {
      case JS_DEF_CFUNC:
        val = JS_NewCFunction2(
            ctx,
            e->u.func.cfunc.generic,
            e->name,
            e->u.func.length,
            e->u.func.cproto,
            e->magic);
        break;
      case JS_DEF_PROP_STRING:
        val = JS_NewString(ctx, e->u.str);
        break;
      case JS_DEF_PROP_INT32:
        val = JS_NewInt32(ctx, e->u.i32);
        break;
      case JS_DEF_PROP_INT64:
        val = JS_NewInt64(ctx, e->u.i64);
        break;
      case JS_DEF_PROP_DOUBLE:
        val = __JS_NewFloat64(ctx, e->u.f64);
        break;
      case JS_DEF_OBJECT:
        val = JS_NewObject(ctx);
        JS_SetPropertyFunctionList(
            ctx, val, e->u.prop_list.tab, e->u.prop_list.len);
        break;
      default:
        abort();
    }
    if (JS_SetModuleExport(ctx, m, e->name, val))
      return -1;
  }
  return 0;
}

int JS_SetModulePrivateValue(JSContext* ctx, JSModuleDef* m, JSValue val) {
  set_value(ctx, &m->private_value, val);
  return 0;
}

JSValue JS_GetModulePrivateValue(JSContext* ctx, JSModuleDef* m) {
  return JS_DupValue(ctx, m->private_value);
}

void JS_SetModuleLoaderFunc(
    JSRuntime* rt,
    JSModuleNormalizeFunc* module_normalize,
    JSModuleLoaderFunc* module_loader,
    void* opaque) {
  rt->module_normalize_func = module_normalize;
  rt->module_loader_has_attr = FALSE;
  rt->u.module_loader_func = module_loader;
  rt->module_check_attrs = NULL;
  rt->module_loader_opaque = opaque;
}

void JS_SetModuleLoaderFunc2(
    JSRuntime* rt,
    JSModuleNormalizeFunc* module_normalize,
    JSModuleLoaderFunc2* module_loader,
    JSModuleCheckSupportedImportAttributes* module_check_attrs,
    void* opaque) {
  rt->module_normalize_func = module_normalize;
  rt->module_loader_has_attr = TRUE;
  rt->u.module_loader_func2 = module_loader;
  rt->module_check_attrs = module_check_attrs;
  rt->module_loader_opaque = opaque;
}

/* default module filename normalizer */
char* js_default_module_normalize_name(
    JSContext* ctx,
    const char* base_name,
    const char* name) {
  char *filename, *p;
  const char* r;
  int cap;
  int len;

  if (name[0] != '.') {
    /* if no initial dot, the module name is not modified */
    return js_strdup(ctx, name);
  }

  p = strrchr(base_name, '/');
  if (p)
    len = p - base_name;
  else
    len = 0;

  cap = len + strlen(name) + 1 + 1;
  filename = js_malloc(ctx, cap);
  if (!filename)
    return NULL;
  memcpy(filename, base_name, len);
  filename[len] = '\0';

  /* we only normalize the leading '..' or '.' */
  r = name;
  for (;;) {
    if (r[0] == '.' && r[1] == '/') {
      r += 2;
    } else if (r[0] == '.' && r[1] == '.' && r[2] == '/') {
      /* remove the last path element of filename, except if "."
         or ".." */
      if (filename[0] == '\0')
        break;
      p = strrchr(filename, '/');
      if (!p)
        p = filename;
      else
        p++;
      if (!strcmp(p, ".") || !strcmp(p, ".."))
        break;
      if (p > filename)
        p--;
      *p = '\0';
      r += 3;
    } else {
      break;
    }
  }
  if (filename[0] != '\0')
    pstrcat(filename, cap, "/");
  pstrcat(filename, cap, r);
  //    printf("normalize: %s %s -> %s\n", base_name, name, filename);
  return filename;
}

JSModuleDef* js_find_loaded_module(JSContext* ctx, JSAtom name) {
  struct list_head* el;
  JSModuleDef* m;

  /* first look at the loaded modules */
  list_for_each(el, &ctx->loaded_modules) {
    m = list_entry(el, JSModuleDef, link);
    if (m->module_name == name)
      return m;
  }
  return NULL;
}

/* return NULL in case of exception (e.g. module could not be loaded) */
JSModuleDef* js_host_resolve_imported_module(
    JSContext* ctx,
    const char* base_cname,
    const char* cname1,
    JSValueConst attributes) {
  JSRuntime* rt = ctx->rt;
  JSModuleDef* m;
  char* cname;
  JSAtom module_name;

  if (!rt->module_normalize_func) {
    cname = js_default_module_normalize_name(ctx, base_cname, cname1);
  } else {
    cname = rt->module_normalize_func(
        ctx, base_cname, cname1, rt->module_loader_opaque);
  }
  if (!cname)
    return NULL;

  module_name = JS_NewAtom(ctx, cname);
  if (module_name == JS_ATOM_NULL) {
    js_free(ctx, cname);
    return NULL;
  }

  /* first look at the loaded modules */
  m = js_find_loaded_module(ctx, module_name);
  if (m) {
    js_free(ctx, cname);
    JS_FreeAtom(ctx, module_name);
    return m;
  }

  JS_FreeAtom(ctx, module_name);

  /* load the module */
  if (!rt->u.module_loader_func) {
    /* XXX: use a syntax error ? */
    JS_ThrowReferenceError(ctx, "could not load module '%s'", cname);
    js_free(ctx, cname);
    return NULL;
  }
  if (rt->module_loader_has_attr) {
    m = rt->u.module_loader_func2(
        ctx, cname, rt->module_loader_opaque, attributes);
  } else {
    m = rt->u.module_loader_func(ctx, cname, rt->module_loader_opaque);
  }
  js_free(ctx, cname);
  return m;
}

JSModuleDef* js_host_resolve_imported_module_atom(
    JSContext* ctx,
    JSAtom base_module_name,
    JSAtom module_name1,
    JSValueConst attributes) {
  const char *base_cname, *cname;
  JSModuleDef* m;

  base_cname = JS_AtomToCString(ctx, base_module_name);
  if (!base_cname)
    return NULL;
  cname = JS_AtomToCString(ctx, module_name1);
  if (!cname) {
    JS_FreeCString(ctx, base_cname);
    return NULL;
  }
  m = js_host_resolve_imported_module(ctx, base_cname, cname, attributes);
  JS_FreeCString(ctx, base_cname);
  JS_FreeCString(ctx, cname);
  return m;
}

static int find_resolve_entry(JSResolveState* s, JSModuleDef* m, JSAtom name) {
  int i;
  for (i = 0; i < s->count; i++) {
    JSResolveEntry* re = &s->array[i];
    if (re->module == m && re->name == name)
      return i;
  }
  return -1;
}

static int add_resolve_entry(
    JSContext* ctx,
    JSResolveState* s,
    JSModuleDef* m,
    JSAtom name) {
  JSResolveEntry* re;

  if (js_resize_array(
          ctx,
          (void**)&s->array,
          sizeof(JSResolveEntry),
          &s->size,
          s->count + 1))
    return -1;
  re = &s->array[s->count++];
  re->module = m;
  re->name = JS_DupAtom(ctx, name);
  return 0;
}

typedef enum JSResolveResultEnum {
  JS_RESOLVE_RES_EXCEPTION = -1, /* memory alloc error */
  JS_RESOLVE_RES_FOUND = 0,
  JS_RESOLVE_RES_NOT_FOUND,
  JS_RESOLVE_RES_CIRCULAR,
  JS_RESOLVE_RES_AMBIGUOUS,
} JSResolveResultEnum;

static JSResolveResultEnum js_resolve_export1(
    JSContext* ctx,
    JSModuleDef** pmodule,
    JSExportEntry** pme,
    JSModuleDef* m,
    JSAtom export_name,
    JSResolveState* s) {
  JSExportEntry* me;

  *pmodule = NULL;
  *pme = NULL;
  if (find_resolve_entry(s, m, export_name) >= 0)
    return JS_RESOLVE_RES_CIRCULAR;
  if (add_resolve_entry(ctx, s, m, export_name) < 0)
    return JS_RESOLVE_RES_EXCEPTION;
  me = find_export_entry(ctx, m, export_name);
  if (me) {
    if (me->export_type == JS_EXPORT_TYPE_LOCAL) {
      /* local export */
      *pmodule = m;
      *pme = me;
      return JS_RESOLVE_RES_FOUND;
    } else {
      /* indirect export */
      JSModuleDef* m1;
      m1 = m->req_module_entries[me->u.req_module_idx].module;
      if (me->local_name == JS_ATOM__star_) {
        /* export ns from */
        *pmodule = m;
        *pme = me;
        return JS_RESOLVE_RES_FOUND;
      } else {
        return js_resolve_export1(ctx, pmodule, pme, m1, me->local_name, s);
      }
    }
  } else {
    if (export_name != JS_ATOM_default) {
      /* not found in direct or indirect exports: try star exports */
      int i;

      for (i = 0; i < m->star_export_entries_count; i++) {
        JSStarExportEntry* se = &m->star_export_entries[i];
        JSModuleDef *m1, *res_m;
        JSExportEntry* res_me;
        JSResolveResultEnum ret;

        m1 = m->req_module_entries[se->req_module_idx].module;
        ret = js_resolve_export1(ctx, &res_m, &res_me, m1, export_name, s);
        if (ret == JS_RESOLVE_RES_AMBIGUOUS ||
            ret == JS_RESOLVE_RES_EXCEPTION) {
          return ret;
        } else if (ret == JS_RESOLVE_RES_FOUND) {
          if (*pme != NULL) {
            if (*pmodule != res_m || res_me->local_name != (*pme)->local_name) {
              *pmodule = NULL;
              *pme = NULL;
              return JS_RESOLVE_RES_AMBIGUOUS;
            }
          } else {
            *pmodule = res_m;
            *pme = res_me;
          }
        }
      }
      if (*pme != NULL)
        return JS_RESOLVE_RES_FOUND;
    }
    return JS_RESOLVE_RES_NOT_FOUND;
  }
}

/* If the return value is JS_RESOLVE_RES_FOUND, return the module
  (*pmodule) and the corresponding local export entry
  (*pme). Otherwise return (NULL, NULL) */
static JSResolveResultEnum js_resolve_export(
    JSContext* ctx,
    JSModuleDef** pmodule,
    JSExportEntry** pme,
    JSModuleDef* m,
    JSAtom export_name) {
  JSResolveState ss, *s = &ss;
  int i;
  JSResolveResultEnum ret;

  s->array = NULL;
  s->size = 0;
  s->count = 0;

  ret = js_resolve_export1(ctx, pmodule, pme, m, export_name, s);

  for (i = 0; i < s->count; i++)
    JS_FreeAtom(ctx, s->array[i].name);
  js_free(ctx, s->array);

  return ret;
}

static void js_resolve_export_throw_error(
    JSContext* ctx,
    JSResolveResultEnum res,
    JSModuleDef* m,
    JSAtom export_name) {
  char buf1[ATOM_GET_STR_BUF_SIZE];
  char buf2[ATOM_GET_STR_BUF_SIZE];
  switch (res) {
    case JS_RESOLVE_RES_EXCEPTION:
      break;
    default:
    case JS_RESOLVE_RES_NOT_FOUND:
      JS_ThrowSyntaxError(
          ctx,
          "Could not find export '%s' in module '%s'",
          JS_AtomGetStr(ctx, buf1, sizeof(buf1), export_name),
          JS_AtomGetStr(ctx, buf2, sizeof(buf2), m->module_name));
      break;
    case JS_RESOLVE_RES_CIRCULAR:
      JS_ThrowSyntaxError(
          ctx,
          "circular reference when looking for export '%s' in module '%s'",
          JS_AtomGetStr(ctx, buf1, sizeof(buf1), export_name),
          JS_AtomGetStr(ctx, buf2, sizeof(buf2), m->module_name));
      break;
    case JS_RESOLVE_RES_AMBIGUOUS:
      JS_ThrowSyntaxError(
          ctx,
          "export '%s' in module '%s' is ambiguous",
          JS_AtomGetStr(ctx, buf1, sizeof(buf1), export_name),
          JS_AtomGetStr(ctx, buf2, sizeof(buf2), m->module_name));
      break;
  }
}

typedef enum {
  EXPORTED_NAME_AMBIGUOUS,
  EXPORTED_NAME_NORMAL,
  EXPORTED_NAME_DELAYED,
} ExportedNameEntryEnum;

typedef struct ExportedNameEntry {
  JSAtom export_name;
  ExportedNameEntryEnum export_type;
  union {
    JSExportEntry* me; /* using when the list is built */
    JSVarRef* var_ref; /* EXPORTED_NAME_NORMAL */
  } u;
} ExportedNameEntry;

typedef struct GetExportNamesState {
  JSModuleDef** modules;
  int modules_size;
  int modules_count;

  ExportedNameEntry* exported_names;
  int exported_names_size;
  int exported_names_count;
} GetExportNamesState;

static int find_exported_name(GetExportNamesState* s, JSAtom name) {
  int i;
  for (i = 0; i < s->exported_names_count; i++) {
    if (s->exported_names[i].export_name == name)
      return i;
  }
  return -1;
}

static __exception int get_exported_names(
    JSContext* ctx,
    GetExportNamesState* s,
    JSModuleDef* m,
    BOOL from_star) {
  ExportedNameEntry* en;
  int i, j;

  /* check circular reference */
  for (i = 0; i < s->modules_count; i++) {
    if (s->modules[i] == m)
      return 0;
  }
  if (js_resize_array(
          ctx,
          (void**)&s->modules,
          sizeof(s->modules[0]),
          &s->modules_size,
          s->modules_count + 1))
    return -1;
  s->modules[s->modules_count++] = m;

  for (i = 0; i < m->export_entries_count; i++) {
    JSExportEntry* me = &m->export_entries[i];
    if (from_star && me->export_name == JS_ATOM_default)
      continue;
    j = find_exported_name(s, me->export_name);
    if (j < 0) {
      if (js_resize_array(
              ctx,
              (void**)&s->exported_names,
              sizeof(s->exported_names[0]),
              &s->exported_names_size,
              s->exported_names_count + 1))
        return -1;
      en = &s->exported_names[s->exported_names_count++];
      en->export_name = me->export_name;
      /* avoid a second lookup for simple module exports */
      if (from_star || me->export_type != JS_EXPORT_TYPE_LOCAL)
        en->u.me = NULL;
      else
        en->u.me = me;
    } else {
      en = &s->exported_names[j];
      en->u.me = NULL;
    }
  }
  for (i = 0; i < m->star_export_entries_count; i++) {
    JSStarExportEntry* se = &m->star_export_entries[i];
    JSModuleDef* m1;
    m1 = m->req_module_entries[se->req_module_idx].module;
    if (get_exported_names(ctx, s, m1, TRUE))
      return -1;
  }
  return 0;
}

static int exported_names_cmp(const void* p1, const void* p2, void* opaque) {
  JSContext* ctx = opaque;
  const ExportedNameEntry* me1 = p1;
  const ExportedNameEntry* me2 = p2;
  JSValue str1, str2;
  int ret;

  /* XXX: should avoid allocation memory in atom comparison */
  str1 = JS_AtomToString(ctx, me1->export_name);
  str2 = JS_AtomToString(ctx, me2->export_name);
  if (JS_IsException(str1) || JS_IsException(str2)) {
    /* XXX: raise an error ? */
    ret = 0;
  } else {
    ret = js_string_compare(
        ctx, JS_VALUE_GET_STRING(str1), JS_VALUE_GET_STRING(str2));
  }
  JS_FreeValue(ctx, str1);
  JS_FreeValue(ctx, str2);
  return ret;
}

JSValue
js_module_ns_autoinit(JSContext* ctx, JSObject* p, JSAtom atom, void* opaque) {
  JSModuleDef* m = opaque;
  JSResolveResultEnum res;
  JSExportEntry* res_me;
  JSModuleDef* res_m;
  JSVarRef* var_ref;

  res = js_resolve_export(ctx, &res_m, &res_me, m, atom);
  if (res != JS_RESOLVE_RES_FOUND) {
    /* fail safe: normally no error should happen here except for memory */
    js_resolve_export_throw_error(ctx, res, m, atom);
    return JS_EXCEPTION;
  }
  if (res_me->local_name == JS_ATOM__star_) {
    return JS_GetModuleNamespace(
        ctx, res_m->req_module_entries[res_me->u.req_module_idx].module);
  } else {
    if (res_me->u.local.var_ref) {
      var_ref = res_me->u.local.var_ref;
    } else {
      JSObject* p1 = JS_VALUE_GET_OBJ(res_m->func_obj);
      var_ref = p1->u.func.var_refs[res_me->u.local.var_idx];
    }
    /* WARNING: a varref is returned as a string ! */
    return JS_MKPTR(JS_TAG_STRING, var_ref);
  }
}

static JSValue js_build_module_ns(JSContext* ctx, JSModuleDef* m) {
  JSValue obj;
  JSObject* p;
  GetExportNamesState s_s, *s = &s_s;
  int i, ret;
  JSProperty* pr;

  obj = JS_NewObjectClass(ctx, JS_CLASS_MODULE_NS);
  if (JS_IsException(obj))
    return obj;
  p = JS_VALUE_GET_OBJ(obj);

  memset(s, 0, sizeof(*s));
  ret = get_exported_names(ctx, s, m, FALSE);
  js_free(ctx, s->modules);
  if (ret)
    goto fail;

  /* Resolve the exported names. The ambiguous exports are removed */
  for (i = 0; i < s->exported_names_count; i++) {
    ExportedNameEntry* en = &s->exported_names[i];
    JSResolveResultEnum res;
    JSExportEntry* res_me;
    JSModuleDef* res_m;

    if (en->u.me) {
      res_me = en->u.me; /* fast case: no resolution needed */
      res_m = m;
      res = JS_RESOLVE_RES_FOUND;
    } else {
      res = js_resolve_export(ctx, &res_m, &res_me, m, en->export_name);
    }
    if (res != JS_RESOLVE_RES_FOUND) {
      if (res != JS_RESOLVE_RES_AMBIGUOUS) {
        js_resolve_export_throw_error(ctx, res, m, en->export_name);
        goto fail;
      }
      en->export_type = EXPORTED_NAME_AMBIGUOUS;
    } else {
      if (res_me->local_name == JS_ATOM__star_) {
        en->export_type = EXPORTED_NAME_DELAYED;
      } else {
        if (res_me->u.local.var_ref) {
          en->u.var_ref = res_me->u.local.var_ref;
        } else {
          JSObject* p1 = JS_VALUE_GET_OBJ(res_m->func_obj);
          en->u.var_ref = p1->u.func.var_refs[res_me->u.local.var_idx];
        }
        if (en->u.var_ref == NULL)
          en->export_type = EXPORTED_NAME_DELAYED;
        else
          en->export_type = EXPORTED_NAME_NORMAL;
      }
    }
  }

  /* sort the exported names */
  rqsort(
      s->exported_names,
      s->exported_names_count,
      sizeof(s->exported_names[0]),
      exported_names_cmp,
      ctx);

  for (i = 0; i < s->exported_names_count; i++) {
    ExportedNameEntry* en = &s->exported_names[i];
    switch (en->export_type) {
      case EXPORTED_NAME_NORMAL: {
        JSVarRef* var_ref = en->u.var_ref;
        pr = add_property(
            ctx,
            p,
            en->export_name,
            JS_PROP_ENUMERABLE | JS_PROP_WRITABLE | JS_PROP_VARREF);
        if (!pr)
          goto fail;
        var_ref->header.ref_count++;
        pr->u.var_ref = var_ref;
      } break;
      case EXPORTED_NAME_DELAYED:
        /* the exported namespace or reference may depend on
           circular references, so we resolve it lazily */
        if (JS_DefineAutoInitProperty(
                ctx,
                obj,
                en->export_name,
                JS_AUTOINIT_ID_MODULE_NS,
                m,
                JS_PROP_ENUMERABLE | JS_PROP_WRITABLE) < 0)
          break;
      default:
        break;
    }
  }

  js_free(ctx, s->exported_names);

  JS_DefinePropertyValue(
      ctx,
      obj,
      JS_ATOM_Symbol_toStringTag,
      JS_AtomToString(ctx, JS_ATOM_Module),
      0);

  p->extensible = FALSE;
  return obj;
fail:
  js_free(ctx, s->exported_names);
  JS_FreeValue(ctx, obj);
  return JS_EXCEPTION;
}

/* Load all the required modules for module 'm' */
int js_resolve_module(JSContext* ctx, JSModuleDef* m) {
  int i;
  JSModuleDef* m1;

  if (m->resolved)
    return 0;
#ifdef DUMP_MODULE_RESOLVE
  {
    char buf1[ATOM_GET_STR_BUF_SIZE];
    printf(
        "resolving module '%s':\n",
        JS_AtomGetStr(ctx, buf1, sizeof(buf1), m->module_name));
  }
#endif
  m->resolved = TRUE;
  /* resolve each requested module */
  for (i = 0; i < m->req_module_entries_count; i++) {
    JSReqModuleEntry* rme = &m->req_module_entries[i];
    m1 = js_host_resolve_imported_module_atom(
        ctx, m->module_name, rme->module_name, rme->attributes);
    if (!m1)
      return -1;
    rme->module = m1;
    /* already done in js_host_resolve_imported_module() except if
       the module was loaded with JS_EvalBinary() */
    if (js_resolve_module(ctx, m1) < 0)
      return -1;
  }
  return 0;
}

static JSVarRef* js_create_module_var(JSContext* ctx, BOOL is_lexical) {
  JSVarRef* var_ref;
  var_ref = js_malloc(ctx, sizeof(JSVarRef));
  if (!var_ref)
    return NULL;
  var_ref->header.ref_count = 1;
  if (is_lexical)
    var_ref->value = JS_UNINITIALIZED;
  else
    var_ref->value = JS_UNDEFINED;
  var_ref->pvalue = &var_ref->value;
  var_ref->is_detached = TRUE;
  add_gc_object(ctx->rt, &var_ref->header, JS_GC_OBJ_TYPE_VAR_REF);
  return var_ref;
}

/* Create the <eval> function associated with the module */
static int js_create_module_bytecode_function(JSContext* ctx, JSModuleDef* m) {
  JSFunctionBytecode* b;
  int i;
  JSVarRef** var_refs;
  JSValue func_obj, bfunc;
  JSObject* p;

  bfunc = m->func_obj;
  func_obj = JS_NewObjectProtoClass(
      ctx, ctx->function_proto, JS_CLASS_BYTECODE_FUNCTION);

  if (JS_IsException(func_obj))
    return -1;
  b = JS_VALUE_GET_PTR(bfunc);

  p = JS_VALUE_GET_OBJ(func_obj);
  p->u.func.function_bytecode = b;
  b->header.ref_count++;
  p->u.func.home_object = NULL;
  p->u.func.var_refs = NULL;
  if (b->closure_var_count) {
    var_refs = js_mallocz(ctx, sizeof(var_refs[0]) * b->closure_var_count);
    if (!var_refs)
      goto fail;
    p->u.func.var_refs = var_refs;

    /* create the global variables. The other variables are
       imported from other modules */
    for (i = 0; i < b->closure_var_count; i++) {
      JSClosureVar* cv = &b->closure_var[i];
      JSVarRef* var_ref;
      if (cv->is_local) {
        var_ref = js_create_module_var(ctx, cv->is_lexical);
        if (!var_ref)
          goto fail;
#ifdef DUMP_MODULE_RESOLVE
        printf("local %d: %p\n", i, var_ref);
#endif
        var_refs[i] = var_ref;
      }
    }
  }
  m->func_obj = func_obj;
  JS_FreeValue(ctx, bfunc);
  return 0;
fail:
  JS_FreeValue(ctx, func_obj);
  return -1;
}

/* must be done before js_link_module() because of cyclic references */
int js_create_module_function(JSContext* ctx, JSModuleDef* m) {
  BOOL is_c_module;
  int i;
  JSVarRef* var_ref;

  if (m->func_created)
    return 0;

  is_c_module = (m->init_func != NULL) || (m->init_data_func != NULL);

  if (is_c_module) {
    /* initialize the exported variables */
    for (i = 0; i < m->export_entries_count; i++) {
      JSExportEntry* me = &m->export_entries[i];
      if (me->export_type == JS_EXPORT_TYPE_LOCAL) {
        var_ref = js_create_module_var(ctx, FALSE);
        if (!var_ref)
          return -1;
        me->u.local.var_ref = var_ref;
      }
    }
  } else {
    if (js_create_module_bytecode_function(ctx, m))
      return -1;
  }
  m->func_created = TRUE;

  /* do it on the dependencies */

  for (i = 0; i < m->req_module_entries_count; i++) {
    JSReqModuleEntry* rme = &m->req_module_entries[i];
    if (js_create_module_function(ctx, rme->module) < 0)
      return -1;
  }

  return 0;
}

/* Prepare a module to be executed by resolving all the imported
   variables. */
int js_inner_module_linking(
    JSContext* ctx,
    JSModuleDef* m,
    JSModuleDef** pstack_top,
    int index) {
  int i;
  JSImportEntry* mi;
  JSModuleDef* m1;
  JSVarRef **var_refs, *var_ref;
  JSObject* p;
  BOOL is_c_module;
  JSValue ret_val;

  if (js_check_stack_overflow(ctx->rt, 0)) {
    JS_ThrowStackOverflow(ctx);
    return -1;
  }

#ifdef DUMP_MODULE_RESOLVE
  {
    char buf1[ATOM_GET_STR_BUF_SIZE];
    printf(
        "js_inner_module_linking '%s':\n",
        JS_AtomGetStr(ctx, buf1, sizeof(buf1), m->module_name));
  }
#endif

  if (m->status == JS_MODULE_STATUS_LINKING ||
      m->status == JS_MODULE_STATUS_LINKED ||
      m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
      m->status == JS_MODULE_STATUS_EVALUATED)
    return index;

  JS_ASSERT_CONTEXT(ctx, m->status == JS_MODULE_STATUS_UNLINKED);
  m->status = JS_MODULE_STATUS_LINKING;
  m->dfs_index = index;
  m->dfs_ancestor_index = index;
  index++;
  /* push 'm' on stack */
  m->stack_prev = *pstack_top;
  *pstack_top = m;

  for (i = 0; i < m->req_module_entries_count; i++) {
    JSReqModuleEntry* rme = &m->req_module_entries[i];
    m1 = rme->module;
    index = js_inner_module_linking(ctx, m1, pstack_top, index);
    if (index < 0)
      goto fail;
    JS_ASSERT_CONTEXT(
        ctx,
        m1->status == JS_MODULE_STATUS_LINKING ||
            m1->status == JS_MODULE_STATUS_LINKED ||
            m1->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
            m1->status == JS_MODULE_STATUS_EVALUATED);
    if (m1->status == JS_MODULE_STATUS_LINKING) {
      m->dfs_ancestor_index =
          min_int(m->dfs_ancestor_index, m1->dfs_ancestor_index);
    }
  }

#ifdef DUMP_MODULE_RESOLVE
  {
    char buf1[ATOM_GET_STR_BUF_SIZE];
    printf(
        "instantiating module '%s':\n",
        JS_AtomGetStr(ctx, buf1, sizeof(buf1), m->module_name));
  }
#endif
  /* check the indirect exports */
  for (i = 0; i < m->export_entries_count; i++) {
    JSExportEntry* me = &m->export_entries[i];
    if (me->export_type == JS_EXPORT_TYPE_INDIRECT &&
        me->local_name != JS_ATOM__star_) {
      JSResolveResultEnum ret;
      JSExportEntry* res_me;
      JSModuleDef *res_m, *m1;
      m1 = m->req_module_entries[me->u.req_module_idx].module;
      ret = js_resolve_export(ctx, &res_m, &res_me, m1, me->local_name);
      if (ret != JS_RESOLVE_RES_FOUND) {
        js_resolve_export_throw_error(ctx, ret, m, me->export_name);
        goto fail;
      }
    }
  }

#ifdef DUMP_MODULE_RESOLVE
  {
    printf("exported bindings:\n");
    for (i = 0; i < m->export_entries_count; i++) {
      JSExportEntry* me = &m->export_entries[i];
      printf(" name=");
      print_atom(ctx, me->export_name);
      printf(" local=");
      print_atom(ctx, me->local_name);
      printf(" type=%d idx=%d\n", me->export_type, me->u.local.var_idx);
    }
  }
#endif

  is_c_module = (m->init_func != NULL) || (m->init_data_func != NULL);

  if (!is_c_module) {
    p = JS_VALUE_GET_OBJ(m->func_obj);
    var_refs = p->u.func.var_refs;

    for (i = 0; i < m->import_entries_count; i++) {
      mi = &m->import_entries[i];
#ifdef DUMP_MODULE_RESOLVE
      printf("import var_idx=%d name=", mi->var_idx);
      print_atom(ctx, mi->import_name);
      printf(": ");
#endif
      m1 = m->req_module_entries[mi->req_module_idx].module;
      if (mi->is_star) {
        JSValue val;
        /* name space import */
        val = JS_GetModuleNamespace(ctx, m1);
        if (JS_IsException(val))
          goto fail;
        set_value(ctx, &var_refs[mi->var_idx]->value, val);
#ifdef DUMP_MODULE_RESOLVE
        printf("namespace\n");
#endif
      } else {
        JSResolveResultEnum ret;
        JSExportEntry* res_me;
        JSModuleDef* res_m;
        JSObject* p1;

        ret = js_resolve_export(ctx, &res_m, &res_me, m1, mi->import_name);
        if (ret != JS_RESOLVE_RES_FOUND) {
          js_resolve_export_throw_error(ctx, ret, m1, mi->import_name);
          goto fail;
        }
        if (res_me->local_name == JS_ATOM__star_) {
          JSValue val;
          JSModuleDef* m2;
          /* name space import from */
          m2 = res_m->req_module_entries[res_me->u.req_module_idx].module;
          val = JS_GetModuleNamespace(ctx, m2);
          if (JS_IsException(val))
            goto fail;
          var_ref = js_create_module_var(ctx, TRUE);
          if (!var_ref) {
            JS_FreeValue(ctx, val);
            goto fail;
          }
          set_value(ctx, &var_ref->value, val);
          var_refs[mi->var_idx] = var_ref;
#ifdef DUMP_MODULE_RESOLVE
          printf("namespace from\n");
#endif
        } else {
          var_ref = res_me->u.local.var_ref;
          if (!var_ref) {
            p1 = JS_VALUE_GET_OBJ(res_m->func_obj);
            var_ref = p1->u.func.var_refs[res_me->u.local.var_idx];
          }

          var_ref->header.ref_count++;
          var_refs[mi->var_idx] = var_ref;
#ifdef DUMP_MODULE_RESOLVE
          printf("local export (var_ref=%p)\n", var_ref);
#endif
        }
      }
    }

    /* keep the exported variables in the module export entries (they
       are used when the eval function is deleted and cannot be
       initialized before in case imports are exported) */
    for (i = 0; i < m->export_entries_count; i++) {
      JSExportEntry* me = &m->export_entries[i];
      if (me->export_type == JS_EXPORT_TYPE_LOCAL) {
        var_ref = var_refs[me->u.local.var_idx];
        var_ref->header.ref_count++;
        me->u.local.var_ref = var_ref;
      }
    }

    /* initialize the global variables */
    ret_val = JS_Call(ctx, m->func_obj, JS_TRUE, 0, NULL);
    if (JS_IsException(ret_val))
      goto fail;
    JS_FreeValue(ctx, ret_val);
  }

  JS_ASSERT_CONTEXT(ctx, m->dfs_ancestor_index <= m->dfs_index);
  if (m->dfs_index == m->dfs_ancestor_index) {
    for (;;) {
      /* pop m1 from stack */
      m1 = *pstack_top;
      *pstack_top = m1->stack_prev;
      m1->status = JS_MODULE_STATUS_LINKED;
      if (m1 == m)
        break;
    }
  }

#ifdef DUMP_MODULE_RESOLVE
  printf("js_inner_module_linking done\n");
#endif
  return index;
fail:
  return -1;
}

/* Prepare a module to be executed by resolving all the imported
   variables. */
int js_link_module(JSContext* ctx, JSModuleDef* m) {
  JSModuleDef *stack_top, *m1;

#ifdef DUMP_MODULE_RESOLVE
  {
    char buf1[ATOM_GET_STR_BUF_SIZE];
    printf(
        "js_link_module '%s':\n",
        JS_AtomGetStr(ctx, buf1, sizeof(buf1), m->module_name));
  }
#endif
  JS_ASSERT_CONTEXT(
      ctx,
      m->status == JS_MODULE_STATUS_UNLINKED ||
          m->status == JS_MODULE_STATUS_LINKED ||
          m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
          m->status == JS_MODULE_STATUS_EVALUATED);
  stack_top = NULL;
  if (js_inner_module_linking(ctx, m, &stack_top, 0) < 0) {
    while (stack_top != NULL) {
      m1 = stack_top;
      JS_ASSERT_CONTEXT(ctx, m1->status == JS_MODULE_STATUS_LINKING);
      m1->status = JS_MODULE_STATUS_UNLINKED;
      stack_top = m1->stack_prev;
    }
    return -1;
  }
  JS_ASSERT_CONTEXT(ctx, stack_top == NULL);
  JS_ASSERT_CONTEXT(
      ctx,
      m->status == JS_MODULE_STATUS_LINKED ||
          m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
          m->status == JS_MODULE_STATUS_EVALUATED);
  return 0;
}

/* return JS_ATOM_NULL if the name cannot be found. Only works with
   not striped bytecode functions. */
JSAtom JS_GetScriptOrModuleName(JSContext* ctx, int n_stack_levels) {
  JSStackFrame* sf;
  JSFunctionBytecode* b;
  JSObject* p;
  /* XXX: currently we just use the filename of the englobing
     function from the debug info. May need to add a ScriptOrModule
     info in JSFunctionBytecode. */
  sf = ctx->rt->current_stack_frame;
  if (!sf)
    return JS_ATOM_NULL;
  while (n_stack_levels-- > 0) {
    sf = sf->prev_frame;
    if (!sf)
      return JS_ATOM_NULL;
  }
  for (;;) {
    if (JS_VALUE_GET_TAG(sf->cur_func) != JS_TAG_OBJECT)
      return JS_ATOM_NULL;
    p = JS_VALUE_GET_OBJ(sf->cur_func);
    if (!js_class_has_bytecode(p->class_id))
      return JS_ATOM_NULL;
    b = p->u.func.function_bytecode;
    if (!b->is_direct_or_indirect_eval) {
      if (!b->has_debug)
        return JS_ATOM_NULL;
      return JS_DupAtom(ctx, b->debug.filename);
    } else {
      sf = sf->prev_frame;
      if (!sf)
        return JS_ATOM_NULL;
    }
  }
}

JSAtom JS_GetModuleName(JSContext* ctx, JSModuleDef* m) {
  return JS_DupAtom(ctx, m->module_name);
}

JSValue JS_GetModuleNamespace(JSContext* ctx, JSModuleDef* m) {
  if (JS_IsUndefined(m->module_ns)) {
    JSValue val;
    val = js_build_module_ns(ctx, m);
    if (JS_IsException(val))
      return JS_EXCEPTION;
    m->module_ns = val;
  }
  return JS_DupValue(ctx, m->module_ns);
}

JSValue JS_GetImportMeta(JSContext* ctx, JSModuleDef* m) {
  JSValue obj;
  /* allocate meta_obj only if requested to save memory */
  obj = m->meta_obj;
  if (JS_IsUndefined(obj)) {
    obj = JS_NewObjectProto(ctx, JS_NULL);
    if (JS_IsException(obj))
      return JS_EXCEPTION;
    m->meta_obj = obj;
  }
  return JS_DupValue(ctx, obj);
}

JSValue js_import_meta(JSContext* ctx) {
  JSAtom filename;
  JSModuleDef* m;

  filename = JS_GetScriptOrModuleName(ctx, 0);
  if (filename == JS_ATOM_NULL)
    goto fail;

  /* XXX: inefficient, need to add a module or script pointer in
     JSFunctionBytecode */
  m = js_find_loaded_module(ctx, filename);
  JS_FreeAtom(ctx, filename);
  if (!m) {
  fail:
    JS_ThrowTypeError(ctx, "import.meta not supported in this context");
    return JS_EXCEPTION;
  }
  return JS_GetImportMeta(ctx, m);
}

JSValue js_load_module_rejected(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv,
    int magic,
    JSValue* func_data) {
  JSValueConst* resolving_funcs = (JSValueConst*)func_data;
  JSValueConst error;
  JSValue ret;

  /* XXX: check if the test is necessary */
  if (argc >= 1)
    error = argv[0];
  else
    error = JS_UNDEFINED;
  ret = JS_Call(ctx, resolving_funcs[1], JS_UNDEFINED, 1, &error);
  JS_FreeValue(ctx, ret);
  return JS_UNDEFINED;
}

static JSValue js_load_module_fulfilled(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv,
    int magic,
    JSValue* func_data) {
  JSValueConst* resolving_funcs = (JSValueConst*)func_data;
  JSModuleDef* m = JS_VALUE_GET_PTR(func_data[2]);
  JSValue ret, ns;

  /* return the module namespace */
  ns = JS_GetModuleNamespace(ctx, m);
  if (JS_IsException(ns)) {
    JSValue err = JS_GetException(ctx);
    js_load_module_rejected(
        ctx, JS_UNDEFINED, 1, (JSValueConst*)&err, 0, func_data);
    return JS_UNDEFINED;
  }
  ret = JS_Call(ctx, resolving_funcs[0], JS_UNDEFINED, 1, (JSValueConst*)&ns);
  JS_FreeValue(ctx, ret);
  JS_FreeValue(ctx, ns);
  return JS_UNDEFINED;
}

static void JS_LoadModuleInternal(
    JSContext* ctx,
    const char* basename,
    const char* filename,
    JSValueConst* resolving_funcs,
    JSValueConst attributes) {
  JSValue evaluate_promise;
  JSModuleDef* m;
  JSValue ret, err, func_obj, evaluate_resolving_funcs[2];
  JSValueConst func_data[3];

  m = js_host_resolve_imported_module(ctx, basename, filename, attributes);
  if (!m)
    goto fail;

  if (js_resolve_module(ctx, m) < 0) {
    js_free_modules(ctx, JS_FREE_MODULE_NOT_RESOLVED);
    goto fail;
  }

  /* Evaluate the module code */
  func_obj = JS_NewModuleValue(ctx, m);
  evaluate_promise = JS_EvalFunction(ctx, func_obj);
  if (JS_IsException(evaluate_promise)) {
  fail:
    err = JS_GetException(ctx);
    ret =
        JS_Call(ctx, resolving_funcs[1], JS_UNDEFINED, 1, (JSValueConst*)&err);
    JS_FreeValue(ctx, ret); /* XXX: what to do if exception ? */
    JS_FreeValue(ctx, err);
    return;
  }

  func_obj = JS_NewModuleValue(ctx, m);
  func_data[0] = resolving_funcs[0];
  func_data[1] = resolving_funcs[1];
  func_data[2] = func_obj;
  evaluate_resolving_funcs[0] =
      JS_NewCFunctionData(ctx, js_load_module_fulfilled, 0, 0, 3, func_data);
  evaluate_resolving_funcs[1] =
      JS_NewCFunctionData(ctx, js_load_module_rejected, 0, 0, 3, func_data);
  JS_FreeValue(ctx, func_obj);
  ret = js_promise_then(
      ctx, evaluate_promise, 2, (JSValueConst*)evaluate_resolving_funcs);
  JS_FreeValue(ctx, ret);
  JS_FreeValue(ctx, evaluate_resolving_funcs[0]);
  JS_FreeValue(ctx, evaluate_resolving_funcs[1]);
  JS_FreeValue(ctx, evaluate_promise);
}

/* Return a promise or an exception in case of memory error. Used by
   os.Worker() */
JSValue
JS_LoadModule(JSContext* ctx, const char* basename, const char* filename) {
  JSValue promise, resolving_funcs[2];

  promise = JS_NewPromiseCapability(ctx, resolving_funcs);
  if (JS_IsException(promise))
    return JS_EXCEPTION;
  JS_LoadModuleInternal(
      ctx, basename, filename, (JSValueConst*)resolving_funcs, JS_UNDEFINED);
  JS_FreeValue(ctx, resolving_funcs[0]);
  JS_FreeValue(ctx, resolving_funcs[1]);
  return promise;
}

static JSValue
js_dynamic_import_job(JSContext* ctx, int argc, JSValueConst* argv) {
  JSValueConst* resolving_funcs = argv;
  JSValueConst basename_val = argv[2];
  JSValueConst specifier = argv[3];
  JSValueConst attributes = argv[4];
  const char *basename = NULL, *filename;
  JSValue ret, err;

  if (!JS_IsString(basename_val)) {
    JS_ThrowTypeError(ctx, "no function filename for import()");
    goto exception;
  }
  basename = JS_ToCString(ctx, basename_val);
  if (!basename)
    goto exception;

  filename = JS_ToCString(ctx, specifier);
  if (!filename)
    goto exception;

  JS_LoadModuleInternal(ctx, basename, filename, resolving_funcs, attributes);
  JS_FreeCString(ctx, filename);
  JS_FreeCString(ctx, basename);
  return JS_UNDEFINED;
exception:
  err = JS_GetException(ctx);
  ret = JS_Call(ctx, resolving_funcs[1], JS_UNDEFINED, 1, (JSValueConst*)&err);
  JS_FreeValue(ctx, ret); /* XXX: what to do if exception ? */
  JS_FreeValue(ctx, err);
  JS_FreeCString(ctx, basename);
  return JS_UNDEFINED;
}

JSValue js_dynamic_import(
    JSContext* ctx,
    JSValueConst specifier,
    JSValueConst options) {
  JSAtom basename;
  JSValue promise, resolving_funcs[2], basename_val, err, ret;
  JSValue specifier_str = JS_UNDEFINED, attributes = JS_UNDEFINED,
          attributes_obj = JS_UNDEFINED;
  JSValueConst args[5];

  basename = JS_GetScriptOrModuleName(ctx, 0);
  if (basename == JS_ATOM_NULL)
    basename_val = JS_NULL;
  else
    basename_val = JS_AtomToValue(ctx, basename);
  JS_FreeAtom(ctx, basename);
  if (JS_IsException(basename_val))
    return basename_val;

  promise = JS_NewPromiseCapability(ctx, resolving_funcs);
  if (JS_IsException(promise)) {
    JS_FreeValue(ctx, basename_val);
    return promise;
  }

  /* the string conversion must occur here */
  specifier_str = JS_ToString(ctx, specifier);
  if (JS_IsException(specifier_str))
    goto exception;

  if (!JS_IsUndefined(options)) {
    if (!JS_IsObject(options)) {
      JS_ThrowTypeError(ctx, "options must be an object");
      goto exception;
    }
    attributes_obj = JS_GetProperty(ctx, options, JS_ATOM_with);
    if (JS_IsException(attributes_obj))
      goto exception;
    if (!JS_IsUndefined(attributes_obj)) {
      JSPropertyEnum* atoms;
      uint32_t atoms_len, i;
      JSValue val;

      if (!JS_IsObject(attributes_obj)) {
        JS_ThrowTypeError(ctx, "options.with must be an object");
        goto exception;
      }
      attributes = JS_NewObjectProto(ctx, JS_NULL);
      if (JS_GetOwnPropertyNamesInternal(
              ctx,
              &atoms,
              &atoms_len,
              JS_VALUE_GET_OBJ(attributes_obj),
              JS_GPN_STRING_MASK | JS_GPN_ENUM_ONLY)) {
        goto exception;
      }
      for (i = 0; i < atoms_len; i++) {
        val = JS_GetProperty(ctx, attributes_obj, atoms[i].atom);
        if (JS_IsException(val))
          goto exception1;
        if (!JS_IsString(val)) {
          JS_FreeValue(ctx, val);
          JS_ThrowTypeError(ctx, "module attribute values must be strings");
          goto exception1;
        }
        if (JS_DefinePropertyValue(
                ctx, attributes, atoms[i].atom, val, JS_PROP_C_W_E) < 0) {
        exception1:
          JS_FreePropertyEnum(ctx, atoms, atoms_len);
          goto exception;
        }
      }
      JS_FreePropertyEnum(ctx, atoms, atoms_len);
      if (ctx->rt->module_check_attrs &&
          ctx->rt->module_check_attrs(
              ctx, ctx->rt->module_loader_opaque, attributes) < 0) {
        goto exception;
      }
      JS_FreeValue(ctx, attributes_obj);
    }
  }

  args[0] = resolving_funcs[0];
  args[1] = resolving_funcs[1];
  args[2] = basename_val;
  args[3] = specifier_str;
  args[4] = attributes;

  /* cannot run JS_LoadModuleInternal synchronously because it would
     cause an unexpected recursion in js_evaluate_module() */
  JS_EnqueueJob(ctx, js_dynamic_import_job, 5, args);
done:
  JS_FreeValue(ctx, basename_val);
  JS_FreeValue(ctx, resolving_funcs[0]);
  JS_FreeValue(ctx, resolving_funcs[1]);
  JS_FreeValue(ctx, specifier_str);
  JS_FreeValue(ctx, attributes);
  return promise;
exception:
  JS_FreeValue(ctx, attributes_obj);
  err = JS_GetException(ctx);
  ret = JS_Call(ctx, resolving_funcs[1], JS_UNDEFINED, 1, (JSValueConst*)&err);
  JS_FreeValue(ctx, ret);
  JS_FreeValue(ctx, err);
  goto done;
}

void js_set_module_evaluated(JSContext* ctx, JSModuleDef* m) {
  m->status = JS_MODULE_STATUS_EVALUATED;
  if (!JS_IsUndefined(m->promise)) {
    JSValue value, ret_val;
    JS_ASSERT_CONTEXT(ctx, m->cycle_root == m);
    value = JS_UNDEFINED;
    ret_val = JS_Call(
        ctx, m->resolving_funcs[0], JS_UNDEFINED, 1, (JSValueConst*)&value);
    JS_FreeValue(ctx, ret_val);
  }
}

typedef struct {
  JSModuleDef** tab;
  int count;
  int size;
} ExecModuleList;

/* XXX: slow. Could use a linked list instead of ExecModuleList */
BOOL find_in_exec_module_list(ExecModuleList* exec_list, JSModuleDef* m) {
  int i;
  for (i = 0; i < exec_list->count; i++) {
    if (exec_list->tab[i] == m)
      return TRUE;
  }
  return FALSE;
}

int gather_available_ancestors(
    JSContext* ctx,
    JSModuleDef* module,
    ExecModuleList* exec_list) {
  int i;

  if (js_check_stack_overflow(ctx->rt, 0)) {
    JS_ThrowStackOverflow(ctx);
    return -1;
  }
  for (i = 0; i < module->async_parent_modules_count; i++) {
    JSModuleDef* m = module->async_parent_modules[i];
    if (!find_in_exec_module_list(exec_list, m) &&
        !m->cycle_root->eval_has_exception) {
      JS_ASSERT_CONTEXT(ctx, m->status == JS_MODULE_STATUS_EVALUATING_ASYNC);
      JS_ASSERT_CONTEXT(ctx, !m->eval_has_exception);
      JS_ASSERT_CONTEXT(ctx, m->async_evaluation);
      JS_ASSERT_CONTEXT(ctx, m->pending_async_dependencies > 0);
      m->pending_async_dependencies--;
      if (m->pending_async_dependencies == 0) {
        if (js_resize_array(
                ctx,
                (void**)&exec_list->tab,
                sizeof(exec_list->tab[0]),
                &exec_list->size,
                exec_list->count + 1)) {
          return -1;
        }
        exec_list->tab[exec_list->count++] = m;
        if (!m->has_tla) {
          if (gather_available_ancestors(ctx, m, exec_list))
            return -1;
        }
      }
    }
  }
  return 0;
}

int exec_module_list_cmp(const void* p1, const void* p2, void* opaque) {
  JSModuleDef* m1 = *(JSModuleDef**)p1;
  JSModuleDef* m2 = *(JSModuleDef**)p2;
  return (m1->async_evaluation_timestamp > m2->async_evaluation_timestamp) -
      (m1->async_evaluation_timestamp < m2->async_evaluation_timestamp);
}

static int js_execute_async_module(JSContext* ctx, JSModuleDef* m);
static int
js_execute_sync_module(JSContext* ctx, JSModuleDef* m, JSValue* pvalue);
#ifdef DUMP_MODULE_EXEC
static void js_dump_module(JSContext* ctx, const char* str, JSModuleDef* m) {
  char buf1[ATOM_GET_STR_BUF_SIZE];
  static const char* module_status_str[] = {
      "unlinked",
      "linking",
      "linked",
      "evaluating",
      "evaluating_async",
      "evaluated"};
  printf(
      "%s: %s status=%s\n",
      str,
      JS_AtomGetStr(ctx, buf1, sizeof(buf1), m->module_name),
      module_status_str[m->status]);
}
#endif

JSValue js_async_module_execution_rejected(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv,
    int magic,
    JSValue* func_data) {
  JSModuleDef* module = JS_VALUE_GET_PTR(func_data[0]);
  JSValueConst error = argv[0];
  int i;

#ifdef DUMP_MODULE_EXEC
  js_dump_module(ctx, __func__, module);
#endif

  if (js_check_stack_overflow(ctx->rt, 0))
    return JS_ThrowStackOverflow(ctx);

  if (module->status == JS_MODULE_STATUS_EVALUATED) {
    JS_ASSERT_CONTEXT(ctx, module->eval_has_exception);
    return JS_UNDEFINED;
  }

  JS_ASSERT_CONTEXT(ctx, module->status == JS_MODULE_STATUS_EVALUATING_ASYNC);
  JS_ASSERT_CONTEXT(ctx, !module->eval_has_exception);
  JS_ASSERT_CONTEXT(ctx, module->async_evaluation);

  module->eval_has_exception = TRUE;
  module->eval_exception = JS_DupValue(ctx, error);
  module->status = JS_MODULE_STATUS_EVALUATED;
  module->async_evaluation = FALSE;

  for (i = 0; i < module->async_parent_modules_count; i++) {
    JSModuleDef* m = module->async_parent_modules[i];
    JSValue m_obj = JS_NewModuleValue(ctx, m);
    js_async_module_execution_rejected(ctx, JS_UNDEFINED, 1, &error, 0, &m_obj);
    JS_FreeValue(ctx, m_obj);
  }

  if (!JS_IsUndefined(module->promise)) {
    JSValue ret_val;
    JS_ASSERT_CONTEXT(ctx, module->cycle_root == module);
    ret_val = JS_Call(ctx, module->resolving_funcs[1], JS_UNDEFINED, 1, &error);
    JS_FreeValue(ctx, ret_val);
  }
  return JS_UNDEFINED;
}

JSValue js_async_module_execution_fulfilled(
    JSContext* ctx,
    JSValueConst this_val,
    int argc,
    JSValueConst* argv,
    int magic,
    JSValue* func_data) {
  JSModuleDef* module = JS_VALUE_GET_PTR(func_data[0]);
  ExecModuleList exec_list_s, *exec_list = &exec_list_s;
  int i;

#ifdef DUMP_MODULE_EXEC
  js_dump_module(ctx, __func__, module);
#endif
  if (module->status == JS_MODULE_STATUS_EVALUATED) {
    JS_ASSERT_CONTEXT(ctx, module->eval_has_exception);
    return JS_UNDEFINED;
  }
  JS_ASSERT_CONTEXT(ctx, module->status == JS_MODULE_STATUS_EVALUATING_ASYNC);
  JS_ASSERT_CONTEXT(ctx, !module->eval_has_exception);
  JS_ASSERT_CONTEXT(ctx, module->async_evaluation);
  module->async_evaluation = FALSE;
  js_set_module_evaluated(ctx, module);

  exec_list->tab = NULL;
  exec_list->count = 0;
  exec_list->size = 0;

  if (gather_available_ancestors(ctx, module, exec_list) < 0) {
    js_free(ctx, exec_list->tab);
    return JS_EXCEPTION;
  }

  /* sort by increasing async_evaluation timestamp */
  rqsort(
      exec_list->tab,
      exec_list->count,
      sizeof(exec_list->tab[0]),
      exec_module_list_cmp,
      NULL);

  for (i = 0; i < exec_list->count; i++) {
    JSModuleDef* m = exec_list->tab[i];
#ifdef DUMP_MODULE_EXEC
      printf("  %d/%d", i, exec_list->count); js_dump_module(ctx, "", m);
#endif
    if (m->status == JS_MODULE_STATUS_EVALUATED) {
      JS_ASSERT_CONTEXT(ctx, m->eval_has_exception);
    } else if (m->has_tla) {
      js_execute_async_module(ctx, m);
    } else {
      JSValue error;
      if (js_execute_sync_module(ctx, m, &error) < 0) {
        JSValue m_obj = JS_NewModuleValue(ctx, m);
        js_async_module_execution_rejected(
            ctx, JS_UNDEFINED, 1, (JSValueConst*)&error, 0, &m_obj);
        JS_FreeValue(ctx, m_obj);
        JS_FreeValue(ctx, error);
      } else {
        m->async_evaluation = FALSE;
        js_set_module_evaluated(ctx, m);
      }
    }
  }
  js_free(ctx, exec_list->tab);
  return JS_UNDEFINED;
}

static int js_execute_async_module(JSContext* ctx, JSModuleDef* m) {
  JSValue promise, m_obj;
  JSValue resolve_funcs[2], ret_val;
#ifdef DUMP_MODULE_EXEC
    js_dump_module(ctx, __func__, m);
#endif
  promise = js_async_function_call(ctx, m->func_obj, JS_UNDEFINED, 0, NULL, 0);
  if (JS_IsException(promise))
    return -1;
  m_obj = JS_NewModuleValue(ctx, m);
  resolve_funcs[0] = JS_NewCFunctionData(
      ctx, js_async_module_execution_fulfilled, 0, 0, 1, (JSValueConst*)&m_obj);
  resolve_funcs[1] = JS_NewCFunctionData(
      ctx, js_async_module_execution_rejected, 0, 0, 1, (JSValueConst*)&m_obj);
  ret_val = js_promise_then(ctx, promise, 2, (JSValueConst*)resolve_funcs);
  JS_FreeValue(ctx, ret_val);
  JS_FreeValue(ctx, m_obj);
  JS_FreeValue(ctx, resolve_funcs[0]);
  JS_FreeValue(ctx, resolve_funcs[1]);
  JS_FreeValue(ctx, promise);
  return 0;
}

/* return < 0 in case of exception. *pvalue contains the exception. */
static int
js_execute_sync_module(JSContext* ctx, JSModuleDef* m, JSValue* pvalue) {
#ifdef DUMP_MODULE_EXEC
  js_dump_module(ctx, __func__, m);
#endif
  if (m->init_func) {
    /* C module init : no asynchronous execution */
    if (m->init_func(ctx, m) < 0)
      goto fail;
  } else if (m->init_data_func) {
    if (m->init_data_func(ctx, m, m->init_data_opaque) < 0)
      goto fail;
  } else {
    JSValue promise;
    JSPromiseStateEnum state;

    promise =
        js_async_function_call(ctx, m->func_obj, JS_UNDEFINED, 0, NULL, 0);
    if (JS_IsException(promise))
      goto fail;
    state = JS_PromiseState(ctx, promise);
    if (state == JS_PROMISE_FULFILLED) {
      JS_FreeValue(ctx, promise);
    } else if (state == JS_PROMISE_REJECTED) {
      *pvalue = JS_PromiseResult(ctx, promise);
      JS_FreeValue(ctx, promise);
      return -1;
    } else {
      JS_FreeValue(ctx, promise);
      JS_ThrowTypeError(ctx, "promise is pending");
    fail:
      *pvalue = JS_GetException(ctx);
      return -1;
    }
  }
  *pvalue = JS_UNDEFINED;
  return 0;
}

/* spec: InnerModuleEvaluation. Return (index, JS_UNDEFINED) or (-1,
   exception) */
int js_inner_module_evaluation(
    JSContext* ctx,
    JSModuleDef* m,
    int index,
    JSModuleDef** pstack_top,
    JSValue* pvalue) {
  JSModuleDef* m1;
  int i;

#ifdef DUMP_MODULE_EXEC
  js_dump_module(ctx, __func__, m);
#endif

  if (js_check_stack_overflow(ctx->rt, 0)) {
    JS_ThrowStackOverflow(ctx);
    *pvalue = JS_GetException(ctx);
    return -1;
  }

  if (m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
      m->status == JS_MODULE_STATUS_EVALUATED) {
    if (m->eval_has_exception) {
      *pvalue = JS_DupValue(ctx, m->eval_exception);
      return -1;
    } else {
      *pvalue = JS_UNDEFINED;
      return index;
    }
  }
  if (m->status == JS_MODULE_STATUS_EVALUATING) {
    *pvalue = JS_UNDEFINED;
    return index;
  }
  JS_ASSERT_CONTEXT(ctx, m->status == JS_MODULE_STATUS_LINKED);

  m->status = JS_MODULE_STATUS_EVALUATING;
  m->dfs_index = index;
  m->dfs_ancestor_index = index;
  m->pending_async_dependencies = 0;
  index++;
  /* push 'm' on stack */
  m->stack_prev = *pstack_top;
  *pstack_top = m;

  for (i = 0; i < m->req_module_entries_count; i++) {
    JSReqModuleEntry* rme = &m->req_module_entries[i];
    m1 = rme->module;
    index = js_inner_module_evaluation(ctx, m1, index, pstack_top, pvalue);
    if (index < 0)
      return -1;
    JS_ASSERT_CONTEXT(
        ctx,
        m1->status == JS_MODULE_STATUS_EVALUATING ||
            m1->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
            m1->status == JS_MODULE_STATUS_EVALUATED);
    if (m1->status == JS_MODULE_STATUS_EVALUATING) {
      m->dfs_ancestor_index =
          min_int(m->dfs_ancestor_index, m1->dfs_ancestor_index);
    } else {
      m1 = m1->cycle_root;
      JS_ASSERT_CONTEXT(
          ctx,
          m1->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
              m1->status == JS_MODULE_STATUS_EVALUATED);
      if (m1->eval_has_exception) {
        *pvalue = JS_DupValue(ctx, m1->eval_exception);
        return -1;
      }
    }
    if (m1->async_evaluation) {
      m->pending_async_dependencies++;
      if (js_resize_array(
              ctx,
              (void**)&m1->async_parent_modules,
              sizeof(m1->async_parent_modules[0]),
              &m1->async_parent_modules_size,
              m1->async_parent_modules_count + 1)) {
        *pvalue = JS_GetException(ctx);
        return -1;
      }
      m1->async_parent_modules[m1->async_parent_modules_count++] = m;
    }
  }

  if (m->pending_async_dependencies > 0) {
    JS_ASSERT_CONTEXT(ctx, !m->async_evaluation);
    m->async_evaluation = TRUE;
    m->async_evaluation_timestamp =
        ctx->rt->module_async_evaluation_next_timestamp++;
  } else if (m->has_tla) {
    JS_ASSERT_CONTEXT(ctx, !m->async_evaluation);
    m->async_evaluation = TRUE;
    m->async_evaluation_timestamp =
        ctx->rt->module_async_evaluation_next_timestamp++;
    js_execute_async_module(ctx, m);
  } else {
    if (js_execute_sync_module(ctx, m, pvalue) < 0)
      return -1;
  }

  JS_ASSERT_CONTEXT(ctx, m->dfs_ancestor_index <= m->dfs_index);
  if (m->dfs_index == m->dfs_ancestor_index) {
    for (;;) {
      /* pop m1 from stack */
      m1 = *pstack_top;
      *pstack_top = m1->stack_prev;
      if (!m1->async_evaluation) {
        m1->status = JS_MODULE_STATUS_EVALUATED;
      } else {
        m1->status = JS_MODULE_STATUS_EVALUATING_ASYNC;
      }
      /* spec bug: cycle_root must be assigned before the test */
      m1->cycle_root = m;
      if (m1 == m)
        break;
    }
  }
  *pvalue = JS_UNDEFINED;
  return index;
}

/* Run the <eval> function of the module and of all its requested
   modules. Return a promise or an exception. */
JSValue js_evaluate_module(JSContext* ctx, JSModuleDef* m) {
  JSModuleDef *m1, *stack_top;
  JSValue ret_val, result;

#ifdef DUMP_MODULE_EXEC
  js_dump_module(ctx, __func__, m);
#endif
  JS_ASSERT_CONTEXT(
      ctx,
      m->status == JS_MODULE_STATUS_LINKED ||
          m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
          m->status == JS_MODULE_STATUS_EVALUATED);
  if (m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
      m->status == JS_MODULE_STATUS_EVALUATED) {
    m = m->cycle_root;
  }
  /* a promise may be created only on the cycle_root of a cycle */
  if (!JS_IsUndefined(m->promise))
    return JS_DupValue(ctx, m->promise);
  m->promise = JS_NewPromiseCapability(ctx, m->resolving_funcs);
  if (JS_IsException(m->promise))
    return JS_EXCEPTION;

  stack_top = NULL;
  if (js_inner_module_evaluation(ctx, m, 0, &stack_top, &result) < 0) {
    while (stack_top != NULL) {
      m1 = stack_top;
      JS_ASSERT_CONTEXT(ctx, m1->status == JS_MODULE_STATUS_EVALUATING);
      m1->status = JS_MODULE_STATUS_EVALUATED;
      m1->eval_has_exception = TRUE;
      m1->eval_exception = JS_DupValue(ctx, result);
      m1->cycle_root = m; /* spec bug: should be present */
      stack_top = m1->stack_prev;
    }
    JS_FreeValue(ctx, result);
    JS_ASSERT_CONTEXT(ctx, m->status == JS_MODULE_STATUS_EVALUATED);
    JS_ASSERT_CONTEXT(ctx, m->eval_has_exception);
    ret_val = JS_Call(
        ctx,
        m->resolving_funcs[1],
        JS_UNDEFINED,
        1,
        (JSValueConst*)&m->eval_exception);
    JS_FreeValue(ctx, ret_val);
  } else {
#ifdef DUMP_MODULE_EXEC
    js_dump_module(ctx, "  done", m);
#endif
    JS_ASSERT_CONTEXT(
        ctx,
        m->status == JS_MODULE_STATUS_EVALUATING_ASYNC ||
            m->status == JS_MODULE_STATUS_EVALUATED);
    JS_ASSERT_CONTEXT(ctx, !m->eval_has_exception);
    if (!m->async_evaluation) {
      JSValue value;
      JS_ASSERT_CONTEXT(ctx, m->status == JS_MODULE_STATUS_EVALUATED);
      value = JS_UNDEFINED;
      ret_val = JS_Call(
          ctx, m->resolving_funcs[0], JS_UNDEFINED, 1, (JSValueConst*)&value);
      JS_FreeValue(ctx, ret_val);
    }
    JS_ASSERT_CONTEXT(ctx, stack_top == NULL);
  }
  return JS_DupValue(ctx, m->promise);
}

int JS_ResolveModule(JSContext* ctx, JSValueConst obj) {
  if (JS_VALUE_GET_TAG(obj) == JS_TAG_MODULE) {
    JSModuleDef* m = JS_VALUE_GET_PTR(obj);
    if (js_resolve_module(ctx, m) < 0) {
      js_free_modules(ctx, JS_FREE_MODULE_NOT_RESOLVED);
      return -1;
    }
  }
  return 0;
}

JSValue JS_NewModuleValue(JSContext* ctx, JSModuleDef* m) {
  return JS_DupValue(ctx, JS_MKPTR(JS_TAG_MODULE, m));
}
