__tests__/fixtures/quickjs-tests/test_builtin.js:1:0: function: <eval>
  mode: strict
  locals:
    0: var <ret>
    1: catch e [level:3 next:-1]
  stack_size: 3
  opcodes (715 bytes):
   0 check_define_var  atom=139 (status) flags=0
   6 check_define_var  atom=472 (throw_errors) flags=0
  12 check_define_var  atom=473 (throw_error) flags=64
  18 check_define_var  atom=474 (assert) flags=64
  24 check_define_var  atom=475 (assert_throws) flags=64
  30 check_define_var  atom=476 (my_func) flags=64
  36 check_define_var  atom=477 (test_function) flags=64
  42 check_define_var  atom=428 (test) flags=64
  48 check_define_var  atom=478 (test_enum) flags=64
  54 check_define_var  atom=479 (test_array) flags=64
  60 check_define_var  atom=480 (test_string) flags=64
  66 check_define_var  atom=481 (test_math) flags=64
  72 check_define_var  atom=482 (test_number) flags=64
  78 check_define_var  atom=483 (test_eval2) flags=64
  84 check_define_var  atom=484 (test_eval) flags=64
  90 check_define_var  atom=485 (test_typed_array) flags=64
  96 check_define_var  atom=486 (get_string_pos) flags=64
 102 check_define_var  atom=487 (check_error_pos) flags=64
 108 check_define_var  atom=488 (assert_json_error) flags=64
 114 check_define_var  atom=489 (test_json) flags=64
 120 check_define_var  atom=490 (test_date) flags=64
 126 check_define_var  atom=491 (test_regexp) flags=64
 132 check_define_var  atom=492 (test_symbol) flags=64
 138 check_define_var  atom=493 (test_map1) flags=64
 144 check_define_var  atom=494 (test_map) flags=64
 150 check_define_var  atom=495 (test_weak_map) flags=64
 156 check_define_var  atom=496 (test_weak_map_cycles) flags=64
 162 check_define_var  atom=497 (test_weak_ref) flags=64
 168 check_define_var  atom=498 (test_finalization_registry) flags=64
 174 check_define_var  atom=499 (test_generator) flags=64
 180 check_define_var  atom=500 (rope_concat) flags=64
 186 check_define_var  atom=501 (test_rope) flags=64
 192 check_define_var  atom=502 (eval_error) flags=64
 198 check_define_var  atom=503 (poisoned_number) flags=0
 204 check_define_var  atom=504 (test_line_column_numbers) flags=64
 210 define_var  atom=139 (status) flags=0
 216 define_var  atom=472 (throw_errors) flags=0
 222 fclosure8
 224 define_func  atom=473 (throw_error) flags=0
 230 fclosure8
 232 define_func  atom=474 (assert) flags=0
 238 fclosure8
 240 define_func  atom=475 (assert_throws) flags=0
 246 fclosure8
 248 define_func  atom=476 (my_func) flags=0
 254 fclosure8
 256 define_func  atom=477 (test_function) flags=0
 262 fclosure8
 264 define_func  atom=428 (test) flags=0
 270 fclosure8
 272 define_func  atom=478 (test_enum) flags=0
 278 fclosure8
 280 define_func  atom=479 (test_array) flags=0
 286 fclosure8
 288 define_func  atom=480 (test_string) flags=0
 294 fclosure8
 296 define_func  atom=481 (test_math) flags=0
 302 fclosure8
 304 define_func  atom=482 (test_number) flags=0
 310 fclosure8
 312 define_func  atom=483 (test_eval2) flags=0
 318 fclosure8
 320 define_func  atom=484 (test_eval) flags=0
 326 fclosure8
 328 define_func  atom=485 (test_typed_array) flags=0
 334 fclosure8
 336 define_func  atom=486 (get_string_pos) flags=0
 342 fclosure8
 344 define_func  atom=487 (check_error_pos) flags=0
 350 fclosure8
 352 define_func  atom=488 (assert_json_error) flags=0
 358 fclosure8
 360 define_func  atom=489 (test_json) flags=0
 366 fclosure8
 368 define_func  atom=490 (test_date) flags=0
 374 fclosure8
 376 define_func  atom=491 (test_regexp) flags=0
 382 fclosure8
 384 define_func  atom=492 (test_symbol) flags=0
 390 fclosure8
 392 define_func  atom=493 (test_map1) flags=0
 398 fclosure8
 400 define_func  atom=494 (test_map) flags=0
 406 fclosure8
 408 define_func  atom=495 (test_weak_map) flags=0
 414 fclosure8
 416 define_func  atom=496 (test_weak_map_cycles) flags=0
 422 fclosure8
 424 define_func  atom=497 (test_weak_ref) flags=0
 430 fclosure8
 432 define_func  atom=498 (test_finalization_registry) flags=0
 438 fclosure8
 440 define_func  atom=499 (test_generator) flags=0
 446 fclosure8
 448 define_func  atom=500 (rope_concat) flags=0
 454 fclosure8
 456 define_func  atom=501 (test_rope) flags=0
 462 fclosure8
 464 define_func  atom=502 (eval_error) flags=0
 470 define_var  atom=503 (poisoned_number) flags=0
 476 fclosure8
 478 define_func  atom=504 (test_line_column_numbers) flags=0
 484 push_atom_value  atom=505 (use strict)
 489 put_loc0
 490 check_var  atom=139 (status)
 495 push_0
 496 put_var_strict  atom=139 (status)
 501 check_var  atom=472 (throw_errors)
 506 push_true
 507 put_var_strict  atom=472 (throw_errors)
 512 undefined
 513 put_loc0
 514 catch  offset=19
 519 get_var  atom=506 (__loadScript)
 524 push_atom_value  atom=507 (test_assert.js)
 529 call1
 530 put_loc0
 531 drop
 532 goto8  offset=11
 534 put_loc1
 535 catch  offset=7
 540 drop
 541 goto8  offset=2
 543 throw
 544 check_var  atom=503 (poisoned_number)
 549 object
 550 fclosure8
 552 set_name  atom=59 (valueOf)
 557 define_field  atom=59 (valueOf)
 562 put_var_strict  atom=503 (poisoned_number)
 567 get_var  atom=428 (test)
 572 call0
 573 put_loc0
 574 get_var  atom=477 (test_function)
 579 call0
 580 put_loc0
 581 get_var  atom=478 (test_enum)
 586 call0
 587 put_loc0
 588 get_var  atom=479 (test_array)
 593 call0
 594 put_loc0
 595 get_var  atom=480 (test_string)
 600 call0
 601 put_loc0
 602 get_var  atom=481 (test_math)
 607 call0
 608 put_loc0
 609 get_var  atom=482 (test_number)
 614 call0
 615 put_loc0
 616 get_var  atom=484 (test_eval)
 621 call0
 622 put_loc0
 623 get_var  atom=485 (test_typed_array)
 628 call0
 629 put_loc0
 630 get_var  atom=489 (test_json)
 635 call0
 636 put_loc0
 637 get_var  atom=490 (test_date)
 642 call0
 643 put_loc0
 644 get_var  atom=491 (test_regexp)
 649 call0
 650 put_loc0
 651 get_var  atom=492 (test_symbol)
 656 call0
 657 put_loc0
 658 get_var  atom=494 (test_map)
 663 call0
 664 put_loc0
 665 get_var  atom=495 (test_weak_map)
 670 call0
 671 put_loc0
 672 get_var  atom=496 (test_weak_map_cycles)
 677 call0
 678 put_loc0
 679 get_var  atom=497 (test_weak_ref)
 684 call0
 685 put_loc0
 686 get_var  atom=498 (test_finalization_registry)
 691 call0
 692 put_loc0
 693 get_var  atom=499 (test_generator)
 698 call0
 699 put_loc0
 700 get_var  atom=501 (test_rope)
 705 call0
 706 put_loc0
 707 get_var  atom=504 (test_line_column_numbers)
 712 call0
 713 set_loc0
 714 return
TTT