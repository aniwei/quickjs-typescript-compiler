let i = 0;
while (i < 10) {
  i = i + 1;
  if (i < 5) {
    continue;
  }
  console.log(i);
  if (i > 7) {
    break;
  }
}
