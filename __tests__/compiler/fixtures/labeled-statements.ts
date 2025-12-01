loop1:
for (var l_i = 0; l_i < 3; l_i++) {
  loop2:
  for (var l_j = 0; l_j < 3; l_j++) {
    if (l_i === 1 && l_j === 1) {
      continue loop1;
    }
    console.log(l_i, l_j);
  }
}
