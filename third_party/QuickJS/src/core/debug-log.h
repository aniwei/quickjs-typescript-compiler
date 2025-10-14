#pragma once

#include <stdarg.h>
#include <stdio.h>

#ifndef QJS_TRACE_ENABLED
#define QJS_TRACE_ENABLED 1
#endif

static inline void qjs_trace(
    const char* category,
    const char* fmt,
    ...) {
#if QJS_TRACE_ENABLED
  va_list ap;
  va_start(ap, fmt);
  fprintf(stdout, "[QJS][%s] ", category);
  vfprintf(stdout, fmt, ap);
  fprintf(stdout, "\n");
  fflush(stdout);
  va_end(ap);
#else
  (void)category;
  (void)fmt;
#endif
}
