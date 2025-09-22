#include <emscripten.h>
#include <string>
#include <stdexcept>
#include "QuickJS/extension/taro_js_bytecode.h"
#include "QuickJSBinding.h"

namespace quickjs {
  std::string getException(JSContext *context, JSValue module) {
    JSValue exception = JS_GetException(context);
    JSValue message = JS_GetPropertyStr(context, exception, "message");
    JSValue stack = JS_GetPropertyStr(context, exception, "stack");

    const char* messageStr = JS_ToCString(context, message);
    const char* stackStr = JS_ToCString(context, stack);

    std::string ss = std::string(messageStr) + "\n" + std::string(stackStr);

    JS_FreeCString(context, messageStr);
    JS_FreeCString(context, stackStr);
    JS_FreeValue(context, message);
    JS_FreeValue(context, stack);
    JS_FreeValue(context, exception);

    return ss;
  }

  /// @brief
  QuickJSBinding::QuickJSBinding() {}

  JSModuleDef *QuickJSBinding::resolve(
    JSContext *jsContext,
    const char *moduleName,
    void *opaque
  ) {
    auto defaultExport = [](JSContext *jsContext, JSModuleDef *m) {
      return 0;
    };

    JSModuleDef *m = taro_js_new_c_module(jsContext, moduleName, defaultExport);
    return m;
  }

  JSContext *QuickJSBinding::prepare(std::vector<std::string> modules) {
    JSRuntime *runtime = JS_NewRuntime();
    JSContext *context = JS_NewContext(runtime);

    auto defaultExport = [](
      JSContext *context, 
      JSModuleDef *m) { 
        return 0; 
      };

    JS_SetModuleLoaderFunc(
      runtime, 
      nullptr, 
      QuickJSBinding::resolve, 
      nullptr);

    for (const auto &module : modules) {
      JSModuleDef *m = taro_js_new_c_module(
        context, 
        module.c_str(), 
        defaultExport);

      if (!m) {
        throw std::runtime_error("Failed to create module: " + module);
      }
    }

    return context;
  }

  /// @brief
  std::vector<uint8_t> QuickJSBinding::compile(
    std::string input, 
    std::string sourceURL,
    std::vector<std::string> modules
  ) {
    JSContext *context = prepare(modules);
    JSValue m = JS_Eval(
      context,
      input.c_str(),
      input.size(),
      sourceURL.c_str(),
      JS_EVAL_FLAG_COMPILE_ONLY | JS_EVAL_TYPE_MODULE
    );

    if (taro_is_exception(m)) {
      auto exception = getException(context, m);
      JS_FreeValue(context, m);
      throw std::runtime_error("Failed to compile module detail: " + exception);
    }

    size_t byteLength = 0;
    uint8_t *bytes = JS_WriteObject(
      context,
      &byteLength,
      m,
      JS_WRITE_OBJ_BYTECODE);

    JS_FreeValue(context, m);

    JSRuntime *rt = JS_GetRuntime(context);
    if (!bytes) {
      JS_FreeContext(context);
      JS_FreeRuntime(rt);
      throw std::runtime_error("Failed to write bytecode");
    }

    std::vector<uint8_t> out(bytes, bytes + byteLength);
    js_free(context, bytes);
    JS_FreeContext(context);
    JS_FreeRuntime(rt);

    return out;
  }

  std::string QuickJSBinding::dumpWithBinary(
    std::vector<uint8_t> bytes,
    std::vector<std::string> modules
  ) {
    std::string out;
    
#ifdef DUMP_BYTECODE
    out = taro_js_dump_function_bytecode_bin(bytes.data(), bytes.size());
#endif
    return out;
  }

  std::string QuickJSBinding::runWithBinary(
    std::vector<uint8_t> bytes, 
    std::vector<std::string> modules
  ) {
    JSContext* ctx = prepare(modules);
    JSRuntime* rt = JS_GetRuntime(ctx);

    JSValue obj = JS_ReadObject(
      ctx, 
      bytes.data(), 
      bytes.size(), 
      JS_READ_OBJ_BYTECODE);

    if (taro_is_exception(obj)) {
      std::string err = getException(ctx, obj);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);
      return std::string("ERROR: Failed to read bytecode: ") + err;
    }

    // Evaluate module or function
    if (JS_VALUE_GET_TAG(obj) == JS_TAG_MODULE) {
      // For modules, JS_EvalFunction loads the module and returns the evaluation result
      JSValue result = JS_EvalFunction(ctx, obj);
      if (taro_is_exception(result)) {
        std::string err = getException(ctx, result);
        JS_FreeValue(ctx, result);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);

        return std::string("ERROR: Failed to eval module: ") + err;
      }

      // Convert result to string (often undefined for modules)
      const char* s = JS_ToCString(ctx, result);
      std::string out = s ? std::string(s) : std::string();

      if (s) JS_FreeCString(ctx, s);
      JS_FreeValue(ctx, result);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);
      return out;
    }

    // If function bytecode, create function object and call it
    if (JS_VALUE_GET_TAG(obj) == JS_TAG_FUNCTION_BYTECODE) {
      JSValue func = JS_EvalFunction(ctx, obj);

      if (taro_is_exception(func)) {
        std::string err = getException(ctx, func);
        JS_FreeValue(ctx, func);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);
        return std::string("ERROR: Failed to create function from bytecode: ") + err;
      }

      JSValue thisVal = JS_UNDEFINED;
      JSValue ret = JS_Call(ctx, func, thisVal, 0, nullptr);

      if (taro_is_exception(ret)) {
        std::string err = getException(ctx, ret);
        JS_FreeValue(ctx, func);
        JS_FreeValue(ctx, ret);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);

        return std::string("ERROR: Runtime exception: ") + err;
      }

      const char* s = JS_ToCString(ctx, ret);
      std::string out = s ? std::string(s) : std::string();

      if (s) JS_FreeCString(ctx, s);

      JS_FreeValue(ctx, func);
      JS_FreeValue(ctx, ret);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);

      return out;
    }

    // Fallback: try to eval as general object
    JSValue result = JS_EvalFunction(ctx, obj);
    if (taro_is_exception(result)) {
      std::string err = getException(ctx, result);
      JS_FreeValue(ctx, result);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);

      return std::string("ERROR: Failed to eval object: ") + err;
    }
    const char* s = JS_ToCString(ctx, result);
    std::string out = s ? std::string(s) : std::string();
    
    if (s) JS_FreeCString(ctx, s);
    JS_FreeValue(ctx, result);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return out;
  }

  uint32_t QuickJSBinding::getBytecodeVersion() {
    return static_cast<uint32_t>(taro_bc_get_version());
  }

  std::map<std::string, bool> QuickJSBinding::getCompileOptions() {
    std::map<std::string, bool> options;
#ifdef DUMP_BYTECODE
    options["dump"] = true;
#else
    options["dump"] = false;
#endif

#ifdef CONFIG_BIGNUM
    options["bignum"] = true;
#else
    options["bignum"] = false;
#endif
    
    return options;
  }

  std::map<std::string, uint32_t> QuickJSBinding::getAtomMap() {
    std::map<std::string, uint32_t> atomIds;

    atomIds["null"] = static_cast<uint32_t>(JS_ATOM_null);
    atomIds["false"] = static_cast<uint32_t>(JS_ATOM_false);
    atomIds["true"] = static_cast<uint32_t>(JS_ATOM_true);
    atomIds["if"] = static_cast<uint32_t>(JS_ATOM_if);
    atomIds["else"] = static_cast<uint32_t>(JS_ATOM_else);
    atomIds["return"] = static_cast<uint32_t>(JS_ATOM_return);
    atomIds["var"] = static_cast<uint32_t>(JS_ATOM_var);
    atomIds["this"] = static_cast<uint32_t>(JS_ATOM_this);
    atomIds["delete"] = static_cast<uint32_t>(JS_ATOM_delete);
    atomIds["void"] = static_cast<uint32_t>(JS_ATOM_void);
    atomIds["typeof"] = static_cast<uint32_t>(JS_ATOM_typeof);
    atomIds["new"] = static_cast<uint32_t>(JS_ATOM_new);
    atomIds["in"] = static_cast<uint32_t>(JS_ATOM_in);
    atomIds["instanceof"] = static_cast<uint32_t>(JS_ATOM_instanceof);
    atomIds["do"] = static_cast<uint32_t>(JS_ATOM_do);
    atomIds["while"] = static_cast<uint32_t>(JS_ATOM_while);
    atomIds["for"] = static_cast<uint32_t>(JS_ATOM_for);
    atomIds["break"] = static_cast<uint32_t>(JS_ATOM_break);
    atomIds["continue"] = static_cast<uint32_t>(JS_ATOM_continue);
    atomIds["switch"] = static_cast<uint32_t>(JS_ATOM_switch);
    atomIds["case"] = static_cast<uint32_t>(JS_ATOM_case);
    atomIds["default"] = static_cast<uint32_t>(JS_ATOM_default);
    atomIds["throw"] = static_cast<uint32_t>(JS_ATOM_throw);
    atomIds["try"] = static_cast<uint32_t>(JS_ATOM_try);
    atomIds["catch"] = static_cast<uint32_t>(JS_ATOM_catch);
    atomIds["finally"] = static_cast<uint32_t>(JS_ATOM_finally);
    atomIds["function"] = static_cast<uint32_t>(JS_ATOM_function);
    atomIds["debugger"] = static_cast<uint32_t>(JS_ATOM_debugger);
    atomIds["with"] = static_cast<uint32_t>(JS_ATOM_with);
    /* FutureReservedWord */
    atomIds["class"] = static_cast<uint32_t>(JS_ATOM_class);
    atomIds["const"] = static_cast<uint32_t>(JS_ATOM_const);
    atomIds["enum"] = static_cast<uint32_t>(JS_ATOM_enum);
    atomIds["export"] = static_cast<uint32_t>(JS_ATOM_export);
    atomIds["extends"] = static_cast<uint32_t>(JS_ATOM_extends);
    atomIds["import"] = static_cast<uint32_t>(JS_ATOM_import);
    atomIds["super"] = static_cast<uint32_t>(JS_ATOM_super);
    /* FutureReservedWords when parsing strict mode code */
    atomIds["implements"] = static_cast<uint32_t>(JS_ATOM_implements);
    atomIds["interface"] = static_cast<uint32_t>(JS_ATOM_interface);
    atomIds["let"] = static_cast<uint32_t>(JS_ATOM_let);
    atomIds["package"] = static_cast<uint32_t>(JS_ATOM_package);
    atomIds["private"] = static_cast<uint32_t>(JS_ATOM_private);
    atomIds["protected"] = static_cast<uint32_t>(JS_ATOM_protected);
    atomIds["public"] = static_cast<uint32_t>(JS_ATOM_public);
    atomIds["static"] = static_cast<uint32_t>(JS_ATOM_static);
    atomIds["yield"] = static_cast<uint32_t>(JS_ATOM_yield);
    atomIds["await"] = static_cast<uint32_t>(JS_ATOM_await);

    /* empty string */
    atomIds["empty_string"] = static_cast<uint32_t>(JS_ATOM_empty_string);
    /* identifiers */
    atomIds["length"] = static_cast<uint32_t>(JS_ATOM_length);
    atomIds["fileName"] = static_cast<uint32_t>(JS_ATOM_fileName);
    atomIds["lineNumber"] = static_cast<uint32_t>(JS_ATOM_lineNumber);
    atomIds["columnNumber"] = static_cast<uint32_t>(JS_ATOM_columnNumber);
    atomIds["message"] = static_cast<uint32_t>(JS_ATOM_message);
    atomIds["cause"] = static_cast<uint32_t>(JS_ATOM_cause);
    atomIds["errors"] = static_cast<uint32_t>(JS_ATOM_errors);
    atomIds["stack"] = static_cast<uint32_t>(JS_ATOM_stack);
    atomIds["name"] = static_cast<uint32_t>(JS_ATOM_name);
    atomIds["toString"] = static_cast<uint32_t>(JS_ATOM_toString);
    atomIds["toLocaleString"] = static_cast<uint32_t>(JS_ATOM_toLocaleString);
    atomIds["valueOf"] = static_cast<uint32_t>(JS_ATOM_valueOf);
    atomIds["eval"] = static_cast<uint32_t>(JS_ATOM_eval);
    atomIds["prototype"] = static_cast<uint32_t>(JS_ATOM_prototype);
    atomIds["constructor"] = static_cast<uint32_t>(JS_ATOM_constructor);
    atomIds["configurable"] = static_cast<uint32_t>(JS_ATOM_configurable);
    atomIds["writable"] = static_cast<uint32_t>(JS_ATOM_writable);
    atomIds["enumerable"] = static_cast<uint32_t>(JS_ATOM_enumerable);
    atomIds["value"] = static_cast<uint32_t>(JS_ATOM_value);
    atomIds["get"] = static_cast<uint32_t>(JS_ATOM_get);
    atomIds["set"] = static_cast<uint32_t>(JS_ATOM_set);
    atomIds["of"] = static_cast<uint32_t>(JS_ATOM_of);
    atomIds["__proto__"] = static_cast<uint32_t>(JS_ATOM___proto__);
    atomIds["undefined"] = static_cast<uint32_t>(JS_ATOM_undefined);
    atomIds["number"] = static_cast<uint32_t>(JS_ATOM_number);
    atomIds["boolean"] = static_cast<uint32_t>(JS_ATOM_boolean);
    atomIds["string"] = static_cast<uint32_t>(JS_ATOM_string);
    atomIds["object"] = static_cast<uint32_t>(JS_ATOM_object);
    atomIds["symbol"] = static_cast<uint32_t>(JS_ATOM_symbol);
    atomIds["integer"] = static_cast<uint32_t>(JS_ATOM_integer);
    atomIds["unknown"] = static_cast<uint32_t>(JS_ATOM_unknown);
    atomIds["arguments"] = static_cast<uint32_t>(JS_ATOM_arguments);
    atomIds["callee"] = static_cast<uint32_t>(JS_ATOM_callee);
    atomIds["caller"] = static_cast<uint32_t>(JS_ATOM_caller);
    atomIds["<eval>"] = static_cast<uint32_t>(JS_ATOM__eval_);
    atomIds["<ret>"] = static_cast<uint32_t>(JS_ATOM__ret_);
    atomIds["<var>"] = static_cast<uint32_t>(JS_ATOM__var_);
    atomIds["<arg_var>"] = static_cast<uint32_t>(JS_ATOM__arg_var_);
    atomIds["<with>"] = static_cast<uint32_t>(JS_ATOM__with_);
    atomIds["lastIndex"] = static_cast<uint32_t>(JS_ATOM_lastIndex);
    atomIds["target"] = static_cast<uint32_t>(JS_ATOM_target);
    atomIds["index"] = static_cast<uint32_t>(JS_ATOM_index);
    atomIds["input"] = static_cast<uint32_t>(JS_ATOM_input);
    atomIds["defineProperties"] = static_cast<uint32_t>(JS_ATOM_defineProperties);
    atomIds["apply"] = static_cast<uint32_t>(JS_ATOM_apply);
    atomIds["join"] = static_cast<uint32_t>(JS_ATOM_join);
    atomIds["concat"] = static_cast<uint32_t>(JS_ATOM_concat);
    atomIds["split"] = static_cast<uint32_t>(JS_ATOM_split);
    atomIds["construct"] = static_cast<uint32_t>(JS_ATOM_construct);
    atomIds["getPrototypeOf"] = static_cast<uint32_t>(JS_ATOM_getPrototypeOf);
    atomIds["setPrototypeOf"] = static_cast<uint32_t>(JS_ATOM_setPrototypeOf);
    atomIds["isExtensible"] = static_cast<uint32_t>(JS_ATOM_isExtensible);
    atomIds["preventExtensions"] = static_cast<uint32_t>(JS_ATOM_preventExtensions);
    atomIds["has"] = static_cast<uint32_t>(JS_ATOM_has);
    atomIds["deleteProperty"] = static_cast<uint32_t>(JS_ATOM_deleteProperty);
    atomIds["defineProperty"] = static_cast<uint32_t>(JS_ATOM_defineProperty);
    atomIds["getOwnPropertyDescriptor"] = static_cast<uint32_t>(JS_ATOM_getOwnPropertyDescriptor);
    atomIds["ownKeys"] = static_cast<uint32_t>(JS_ATOM_ownKeys);
    atomIds["add"] = static_cast<uint32_t>(JS_ATOM_add);
    atomIds["done"] = static_cast<uint32_t>(JS_ATOM_done);
    atomIds["next"] = static_cast<uint32_t>(JS_ATOM_next);
    atomIds["values"] = static_cast<uint32_t>(JS_ATOM_values);
    atomIds["source"] = static_cast<uint32_t>(JS_ATOM_source);
    atomIds["flags"] = static_cast<uint32_t>(JS_ATOM_flags);
    atomIds["global"] = static_cast<uint32_t>(JS_ATOM_global);
    atomIds["unicode"] = static_cast<uint32_t>(JS_ATOM_unicode);
    atomIds["raw"] = static_cast<uint32_t>(JS_ATOM_raw);
    atomIds["new.target"] = static_cast<uint32_t>(JS_ATOM_new_target);
    atomIds["this.active_func"] = static_cast<uint32_t>(JS_ATOM_this_active_func);
    atomIds["<home_object>"] = static_cast<uint32_t>(JS_ATOM_home_object);
    atomIds["<computed_field>"] = static_cast<uint32_t>(JS_ATOM_computed_field);
    atomIds["<static_computed_field>"] = static_cast<uint32_t>(JS_ATOM_static_computed_field);
    atomIds["<class_fields_init>"] = static_cast<uint32_t>(JS_ATOM_class_fields_init);
    atomIds["<brand>"] = static_cast<uint32_t>(JS_ATOM_brand);
    atomIds["#constructor"] = static_cast<uint32_t>(JS_ATOM_hash_constructor);
    atomIds["as"] = static_cast<uint32_t>(JS_ATOM_as);
    atomIds["from"] = static_cast<uint32_t>(JS_ATOM_from);
    atomIds["meta"] = static_cast<uint32_t>(JS_ATOM_meta);
    atomIds["*default*"] = static_cast<uint32_t>(JS_ATOM__default_);
    atomIds["*"] = static_cast<uint32_t>(JS_ATOM__star_);
    atomIds["Module"] = static_cast<uint32_t>(JS_ATOM_Module);
    atomIds["then"] = static_cast<uint32_t>(JS_ATOM_then);
    atomIds["resolve"] = static_cast<uint32_t>(JS_ATOM_resolve);
    atomIds["reject"] = static_cast<uint32_t>(JS_ATOM_reject);
    atomIds["promise"] = static_cast<uint32_t>(JS_ATOM_promise);
    atomIds["proxy"] = static_cast<uint32_t>(JS_ATOM_proxy);
    atomIds["revoke"] = static_cast<uint32_t>(JS_ATOM_revoke);
    atomIds["async"] = static_cast<uint32_t>(JS_ATOM_async);
    atomIds["exec"] = static_cast<uint32_t>(JS_ATOM_exec);
    atomIds["groups"] = static_cast<uint32_t>(JS_ATOM_groups);
    atomIds["indices"] = static_cast<uint32_t>(JS_ATOM_indices);
    atomIds["status"] = static_cast<uint32_t>(JS_ATOM_status);
    atomIds["reason"] = static_cast<uint32_t>(JS_ATOM_reason);
    atomIds["globalThis"] = static_cast<uint32_t>(JS_ATOM_globalThis);
    atomIds["bigint"] = static_cast<uint32_t>(JS_ATOM_bigint);
    atomIds["-0"] = static_cast<uint32_t>(JS_ATOM_minus_zero);
    atomIds["Infinity"] = static_cast<uint32_t>(JS_ATOM_Infinity);
    atomIds["-Infinity"] = static_cast<uint32_t>(JS_ATOM_minus_Infinity);
    atomIds["NaN"] = static_cast<uint32_t>(JS_ATOM_NaN);
    atomIds["hasIndices"] = static_cast<uint32_t>(JS_ATOM_hasIndices);
    atomIds["ignoreCase"] = static_cast<uint32_t>(JS_ATOM_ignoreCase);
    atomIds["multiline"] = static_cast<uint32_t>(JS_ATOM_multiline);
    atomIds["dotAll"] = static_cast<uint32_t>(JS_ATOM_dotAll);
    atomIds["sticky"] = static_cast<uint32_t>(JS_ATOM_sticky);
    atomIds["unicodeSets"] = static_cast<uint32_t>(JS_ATOM_unicodeSets);
    /* the following 3 atoms are only used with CONFIG_ATOMICS */
    atomIds["not-equal"] = static_cast<uint32_t>(JS_ATOM_not_equal);
    atomIds["timed-out"] = static_cast<uint32_t>(JS_ATOM_timed_out);
    atomIds["ok"] = static_cast<uint32_t>(JS_ATOM_ok);
    /* */
    atomIds["toJSON"] = static_cast<uint32_t>(JS_ATOM_toJSON);
    /* class names */
    atomIds["Object"] = static_cast<uint32_t>(JS_ATOM_Object);
    atomIds["Array"] = static_cast<uint32_t>(JS_ATOM_Array);
    atomIds["Error"] = static_cast<uint32_t>(JS_ATOM_Error);
    atomIds["Number"] = static_cast<uint32_t>(JS_ATOM_Number);
    atomIds["String"] = static_cast<uint32_t>(JS_ATOM_String);
    atomIds["Boolean"] = static_cast<uint32_t>(JS_ATOM_Boolean);
    atomIds["Symbol"] = static_cast<uint32_t>(JS_ATOM_Symbol);
    atomIds["Arguments"] = static_cast<uint32_t>(JS_ATOM_Arguments);
    atomIds["Math"] = static_cast<uint32_t>(JS_ATOM_Math);
    atomIds["JSON"] = static_cast<uint32_t>(JS_ATOM_JSON);
    atomIds["Date"] = static_cast<uint32_t>(JS_ATOM_Date);
    atomIds["Function"] = static_cast<uint32_t>(JS_ATOM_Function);
    atomIds["GeneratorFunction"] = static_cast<uint32_t>(JS_ATOM_GeneratorFunction);
    atomIds["ForInIterator"] = static_cast<uint32_t>(JS_ATOM_ForInIterator);
    atomIds["RegExp"] = static_cast<uint32_t>(JS_ATOM_RegExp);
    atomIds["ArrayBuffer"] = static_cast<uint32_t>(JS_ATOM_ArrayBuffer);
    atomIds["SharedArrayBuffer"] = static_cast<uint32_t>(JS_ATOM_SharedArrayBuffer);
    /* must keep same order as class IDs for typed arrays */
    atomIds["Uint8ClampedArray"] = static_cast<uint32_t>(JS_ATOM_Uint8ClampedArray);
    atomIds["Int8Array"] = static_cast<uint32_t>(JS_ATOM_Int8Array);
    atomIds["Uint8Array"] = static_cast<uint32_t>(JS_ATOM_Uint8Array);
    atomIds["Int16Array"] = static_cast<uint32_t>(JS_ATOM_Int16Array);
    atomIds["Uint16Array"] = static_cast<uint32_t>(JS_ATOM_Uint16Array);
    atomIds["Int32Array"] = static_cast<uint32_t>(JS_ATOM_Int32Array);
    atomIds["Uint32Array"] = static_cast<uint32_t>(JS_ATOM_Uint32Array);

    #ifdef CONFIG_BIGNUM
    atomIds["BigInt64Array"] = static_cast<uint32_t>(JS_ATOM_BigInt64Array);
    atomIds["BigUint64Array"] = static_cast<uint32_t>(JS_ATOM_BigUint64Array);
    #endif

    atomIds["Float16Array"] = static_cast<uint32_t>(JS_ATOM_Float16Array);
    atomIds["Float32Array"] = static_cast<uint32_t>(JS_ATOM_Float32Array);
    atomIds["Float64Array"] = static_cast<uint32_t>(JS_ATOM_Float64Array);
    atomIds["DataView"] = static_cast<uint32_t>(JS_ATOM_DataView);
    atomIds["BigInt"] = static_cast<uint32_t>(JS_ATOM_BigInt);
    atomIds["WeakRef"] = static_cast<uint32_t>(JS_ATOM_WeakRef);
    atomIds["FinalizationRegistry"] = static_cast<uint32_t>(JS_ATOM_FinalizationRegistry);
    atomIds["Map"] = static_cast<uint32_t>(JS_ATOM_Map);
    atomIds["Set"] = static_cast<uint32_t>(JS_ATOM_Set); /* Map + 1 */
    atomIds["WeakMap"] = static_cast<uint32_t>(JS_ATOM_WeakMap); /* Map + 2 */
    atomIds["WeakSet"] = static_cast<uint32_t>(JS_ATOM_WeakSet); /* Map + 3 */
    atomIds["Map_Iterator"] = static_cast<uint32_t>(JS_ATOM_Map_Iterator);
    atomIds["Set_Iterator"] = static_cast<uint32_t>(JS_ATOM_Set_Iterator);
    atomIds["Array_Iterator"] = static_cast<uint32_t>(JS_ATOM_Array_Iterator);
    atomIds["String_Iterator"] = static_cast<uint32_t>(JS_ATOM_String_Iterator);
    atomIds["RegExp_String_Iterator"] = static_cast<uint32_t>(JS_ATOM_RegExp_String_Iterator);
    atomIds["Generator"] = static_cast<uint32_t>(JS_ATOM_Generator);
    atomIds["Proxy"] = static_cast<uint32_t>(JS_ATOM_Proxy);
    atomIds["Promise"] = static_cast<uint32_t>(JS_ATOM_Promise);
    atomIds["PromiseResolveFunction"] = static_cast<uint32_t>(JS_ATOM_PromiseResolveFunction);
    atomIds["PromiseRejectFunction"] = static_cast<uint32_t>(JS_ATOM_PromiseRejectFunction);
    atomIds["AsyncFunction"] = static_cast<uint32_t>(JS_ATOM_AsyncFunction);
    atomIds["AsyncFunctionResolve"] = static_cast<uint32_t>(JS_ATOM_AsyncFunctionResolve);
    atomIds["AsyncFunctionReject"] = static_cast<uint32_t>(JS_ATOM_AsyncFunctionReject);
    atomIds["AsyncGeneratorFunction"] = static_cast<uint32_t>(JS_ATOM_AsyncGeneratorFunction);
    atomIds["AsyncGenerator"] = static_cast<uint32_t>(JS_ATOM_AsyncGenerator);
    atomIds["EvalError"] = static_cast<uint32_t>(JS_ATOM_EvalError);
    atomIds["RangeError"] = static_cast<uint32_t>(JS_ATOM_RangeError);
    atomIds["ReferenceError"] = static_cast<uint32_t>(JS_ATOM_ReferenceError);
    atomIds["SyntaxError"] = static_cast<uint32_t>(JS_ATOM_SyntaxError);
    atomIds["TypeError"] = static_cast<uint32_t>(JS_ATOM_TypeError);
    atomIds["URIError"] = static_cast<uint32_t>(JS_ATOM_URIError);
    atomIds["InternalError"] = static_cast<uint32_t>(JS_ATOM_InternalError);
    /* private symbols */
    atomIds["<private_brand>"] = static_cast<uint32_t>(JS_ATOM_Private_brand);
    /* symbols */
    atomIds["Symbol.toPrimitive"] = static_cast<uint32_t>(JS_ATOM_Symbol_toPrimitive);
    atomIds["Symbol.iterator"] = static_cast<uint32_t>(JS_ATOM_Symbol_iterator);
    atomIds["Symbol.match"] = static_cast<uint32_t>(JS_ATOM_Symbol_match);
    atomIds["Symbol.matchAll"] = static_cast<uint32_t>(JS_ATOM_Symbol_matchAll);
    atomIds["Symbol.replace"] = static_cast<uint32_t>(JS_ATOM_Symbol_replace);
    atomIds["Symbol.search"] = static_cast<uint32_t>(JS_ATOM_Symbol_search);
    atomIds["Symbol.split"] = static_cast<uint32_t>(JS_ATOM_Symbol_split);
    atomIds["Symbol.toStringTag"] = static_cast<uint32_t>(JS_ATOM_Symbol_toStringTag);
    atomIds["Symbol.isConcatSpreadable"] = static_cast<uint32_t>(JS_ATOM_Symbol_isConcatSpreadable);
    atomIds["Symbol.hasInstance"] = static_cast<uint32_t>(JS_ATOM_Symbol_hasInstance);
    atomIds["Symbol.species"] = static_cast<uint32_t>(JS_ATOM_Symbol_species);
    atomIds["Symbol.unscopables"] = static_cast<uint32_t>(JS_ATOM_Symbol_unscopables);
    atomIds["Symbol.asyncIterator"] = static_cast<uint32_t>(JS_ATOM_Symbol_asyncIterator);
    
    return atomIds;
  }

  uint32_t QuickJSBinding::getFirstAtomId() {
    // QuickJS 写对象时，允许字节码情况下 first_atom = JS_ATOM_END
    // 这里返回编译期的值供前端校验
    return static_cast<uint32_t>(JS_ATOM_END);
  }

  std::map<std::string, uint32_t> QuickJSBinding::getOpcodeMap() {
    std::map<std::string, uint32_t> opcodeIds;

    // TODO

    return opcodeIds;
  }
}
