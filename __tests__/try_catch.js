"use strict";
let v = 0
try {
  throw new Error("boom")
} catch (e) {
  v = (e && e.message) ? 1 : -1
} finally {
  v = v + 1
}
