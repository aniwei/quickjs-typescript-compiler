function tag(strings: TemplateStringsArray, ...values: any[]) {
  return [strings, values]
}

const x = 1
const y = 'z'

const r1 = tag`a${x}b${y}c`
const r2 = tag`no_subs`

void r1
void r2
