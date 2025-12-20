/*
 * QuickJS Parser Debug Patch
 * 
 * This file contains instructions for adding debug tracing to parser.c
 * to help verify the TypeScript transpilation matches QuickJS behavior.
 * 
 * USAGE:
 * 1. Include qts_trace.h at the top of parser.c
 * 2. Define QTS_TRACE_ENABLED=1 before including
 * 3. Apply the patches below to key functions
 * 4. Recompile WASM with tracing enabled
 * 5. Compare trace output between WASM and TypeScript
 */

/* ============================================================================
 * Step 1: Add include at top of parser.c (after existing includes)
 * ============================================================================
 * 
 * Add these lines after line ~45:
 * 
 * #define QTS_TRACE_ENABLED 1
 * #include "qts_trace.h"
 */

/* ============================================================================
 * Step 2: Patch emit_op() - parser.c:1788
 * ============================================================================
 * 
 * Original:
 *   static void emit_op(JSParseState* s, uint8_t val) {
 *     JSFunctionDef* fd = s->cur_func;
 *     DynBuf* bc = &fd->byte_code;
 *     fd->last_opcode_pos = bc->size;
 *     dbuf_putc(bc, val);
 *   }
 * 
 * Patched:
 */

#if 0  /* Example patch for emit_op */
static void emit_op(JSParseState* s, uint8_t val) {
  JSFunctionDef* fd = s->cur_func;
  DynBuf* bc = &fd->byte_code;

  QTS_TRACE_EMIT_OP(val, bc->size);

  fd->last_opcode_pos = bc->size;
  dbuf_putc(bc, val);
}
#endif

/* ============================================================================
 * Step 3: Patch emit_u16() - parser.c:1769
 * ============================================================================
 */

#if 0  /* Example patch for emit_u16 */
static void emit_u16(JSParseState* s, uint16_t val) {
  QTS_TRACE_EMIT_U16(val, s->cur_func->byte_code.size);
  dbuf_put_u16(&s->cur_func->byte_code, val);
}
#endif

/* ============================================================================
 * Step 4: Patch emit_u32() - parser.c:1773
 * ============================================================================
 */

#if 0  /* Example patch for emit_u32 */
static void emit_u32(JSParseState* s, uint32_t val) {
  QTS_TRACE_EMIT_U32(val, s->cur_func->byte_code.size);
  dbuf_put_u32(&s->cur_func->byte_code, val);
}
#endif

/* ============================================================================
 * Step 5: Patch new_label() - parser.c:1840
 * ============================================================================
 */

#if 0  /* Example patch for new_label */
static int new_label(JSParseState* s) {
  int label;
  label = new_label_fd(s->cur_func);
  if (unlikely(label < 0)) {
    dbuf_set_error(&s->cur_func->byte_code);
  }
  QTS_TRACE_LABEL_NEW(label);
  return label;
}
#endif

/* ============================================================================
 * Step 6: Patch emit_goto() - parser.c:1867
 * ============================================================================
 */

#if 0  /* Example patch for emit_goto */
static int emit_goto(JSParseState* s, int opcode, int label) {
  if (js_is_live_code(s)) {
    if (label < 0) {
      label = new_label(s);
      if (label < 0)
        return -1;
    }
    QTS_TRACE_LABEL_GOTO(opcode, label);
    emit_op(s, opcode);
    emit_u32(s, label);
    s->cur_func->label_slots[label].ref_count++;
    return label;
  }
  return -1;
}
#endif

/* ============================================================================
 * Step 7: Patch resolve_scope_var() - parser.c:9148
 * ============================================================================
 */

#if 0  /* Example patch for resolve_scope_var - add at function start */
static int resolve_scope_var(
    JSContext* ctx,
    JSFunctionDef* s,
    JSAtom var_name,
    int scope_level,
    int op,
    DynBuf* bc,
    uint8_t* bc_buf,
    LabelSlot* ls,
    int pos_next) {
  
  QTS_TRACE_VAR_RESOLVE(var_name, scope_level, op);
  
  int idx, var_idx, is_put;
  int label_done;
  JSFunctionDef* fd;
  JSVarDef* vd;
  BOOL is_pseudo_var, is_arg_scope;

  label_done = -1;
  /* ... rest of function ... */
  
  /* Add after finding var_idx: */
  if (var_idx >= 0) {
    QTS_TRACE_VAR_FOUND(var_idx, (var_idx & ARGUMENT_VAR_OFFSET) != 0);
    /* ... */
  }
  
  /* ... */
}
#endif

/* ============================================================================
 * Step 8: Patch resolve_variables() - parser.c:10456
 * ============================================================================
 */

#if 0  /* Example patch for resolve_variables */
static __exception int resolve_variables(JSContext* ctx, JSFunctionDef* s) {
  QTS_TRACE_SECTION_BEGIN("resolve_variables");
  qts_trace_func_def("resolve_variables", 
                     s->var_count, s->arg_count, 
                     s->closure_var_count, s->scope_count,
                     s->byte_code.size);
  
  /* ... existing code ... */
  
  QTS_TRACE_SECTION_END("resolve_variables");
  return 0;
fail:
  QTS_TRACE("resolve_variables FAILED");
  return -1;
}
#endif

/* ============================================================================
 * Step 9: Patch resolve_labels() - parser.c:11088
 * ============================================================================
 */

#if 0  /* Example patch for resolve_labels */
static __exception int resolve_labels(JSContext* ctx, JSFunctionDef* s) {
  QTS_TRACE_SECTION_BEGIN("resolve_labels");
  qts_trace_func_def("resolve_labels", 
                     s->var_count, s->arg_count, 
                     s->closure_var_count, s->scope_count,
                     s->byte_code.size);
  
  /* ... existing code ... */
  
  QTS_TRACE_SECTION_END("resolve_labels");
  return 0;
fail:
  QTS_TRACE("resolve_labels FAILED");
  return -1;
}
#endif

/* ============================================================================
 * Step 10: Patch compute_stack_size() - parser.c:12196
 * ============================================================================
 */

#if 0  /* Example patch for compute_stack_size */
static int compute_stack_size(JSContext* ctx, JSFunctionDef* fd, int* pstack_size) {
  QTS_TRACE_SECTION_BEGIN("compute_stack_size");
  
  /* ... existing code ... */
  
  QTS_TRACE_STACK_RESULT(*pstack_size, fd->var_count);
  QTS_TRACE_SECTION_END("compute_stack_size");
  return 0;
}
#endif

/* ============================================================================
 * Step 11: Patch add_closure_var() - parser.c:8812
 * ============================================================================
 */

#if 0  /* Example patch for add_closure_var */
static int add_closure_var(JSContext* ctx, JSFunctionDef* s,
                           BOOL is_local, BOOL is_arg,
                           int var_idx, JSAtom var_name,
                           BOOL is_const, BOOL is_lexical,
                           JSVarKindEnum var_kind) {
  QTS_TRACE_CLOSURE_ADD(var_idx, is_local, is_arg, var_name);
  
  /* ... existing code ... */
}
#endif

/* ============================================================================
 * Step 12: Patch get_closure_var() - parser.c:8876
 * ============================================================================
 */

#if 0  /* Example patch for get_closure_var */
static int get_closure_var(JSContext* ctx, JSFunctionDef* s,
                           JSFunctionDef* fd, BOOL is_arg,
                           int var_idx, JSAtom var_name,
                           BOOL is_const, BOOL is_lexical,
                           JSVarKindEnum var_kind) {
  /* Calculate depth for tracing */
  int fd_depth = 0;
  JSFunctionDef* tmp = s;
  while (tmp && tmp != fd) {
    fd_depth++;
    tmp = tmp->parent;
  }
  
  QTS_TRACE_CLOSURE_GET(fd_depth, var_idx, is_arg);
  
  /* ... existing code ... */
}
#endif

/* ============================================================================
 * Step 13: Verify ARGUMENT_VAR_OFFSET usage
 * ============================================================================
 * 
 * Add this verification at the start of resolve_scope_var:
 */

#if 0
#include <assert.h>

/* Verify ARGUMENT_VAR_OFFSET is correct */
static void verify_constants(void) {
  assert(GLOBAL_VAR_OFFSET == 0x40000000);
  assert(ARGUMENT_VAR_OFFSET == 0x20000000);
  assert(ARG_SCOPE_INDEX == 1);
  assert(ARG_SCOPE_END == -2);
}
#endif

/* ============================================================================
 * CMake Configuration for Tracing
 * ============================================================================
 * 
 * Add to third_party/QuickJS/wasm/CMakeLists.txt:
 * 
 * option(ENABLE_QTS_TRACE "Enable QTS tracing" OFF)
 * 
 * if(ENABLE_QTS_TRACE)
 *   add_definitions(-DQTS_TRACE_ENABLED=1)
 *   message(STATUS "QTS Tracing enabled")
 * endif()
 * 
 * Build command:
 *   cmake -DENABLE_QTS_TRACE=ON ..
 *   make
 */

/* ============================================================================
 * Running with Tracing
 * ============================================================================
 * 
 * After building with tracing enabled:
 * 
 * 1. Run WASM compilation:
 *    pnpm exec tsx scripts/compareWithWasm.ts __tests__/compiler/fixtures/closure-vars.ts \
 *      --disasm --normalize-short --side-by-side --artifacts-dir artifacts 2>&1 | tee wasm_trace.log
 * 
 * 2. Filter trace output:
 *    grep "^\[QTS" wasm_trace.log > wasm_trace_only.log
 * 
 * 3. Add similar logging to TypeScript and compare:
 *    diff wasm_trace_only.log ts_trace_only.log
 */
