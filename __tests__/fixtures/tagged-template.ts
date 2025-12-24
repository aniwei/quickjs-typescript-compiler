// ES2015+: tagged template

function tag(strings: TemplateStringsArray, ...values: any[]) {
  return [strings, values]
}

const obj = {
  tag(strings: TemplateStringsArray, ...values: any[]) {
    return [strings, values]
  },
}

const a = 1

const r1 = tag`x${a}y`
const r2 = obj.tag`m${a}n`
const r3 = (obj as any)['tag']`p${a}q`

void r1
void r2
void r3
