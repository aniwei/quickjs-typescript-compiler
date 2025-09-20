| Tag | Self | QJSC |
|---|---|---|
| - | OP_array_from |  |
|   | OP_put_loc | OP_put_loc |
| - | OP_push_const |  |
| + |  | OP_call_method |
|   | OP_put_loc | OP_put_loc |
| + |  | OP_put_loc |
|   | OP_get_loc | OP_get_loc |
|   | OP_push_const | OP_push_const |
| + |  | OP_put_loc |
| + |  | OP_put_loc |
| + |  | OP_push_const |
|   | OP_lt | OP_lt |
|   | OP_if | OP_if |
| + |  | OP_get_loc |
|   | OP_push_const | OP_push_const |
|   | OP_put_loc | OP_put_loc |
| - | OP_get_var |  |
| - | OP_dup |  |
| - | OP_get_field2 |  |
| - | OP_get_loc |  |
| - | OP_get_loc |  |
| + |  | OP_put_loc |
| + |  | OP_put_field |
| + |  | OP_put_loc |
| + |  | OP_put_loc |
|   | OP_add | OP_add |
|   | OP_call_method | OP_call_method |
| - | OP_drop |  |
| + |  | OP_put_loc |
|   | OP_inc | OP_inc |
|   | OP_jump | OP_jump |
| + |  | OP_get_loc |


Note: Mnemonics shown are normalized (folded). Use --no-normalize to see raw sequences.
