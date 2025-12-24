const obj = {
  tag(strings: TemplateStringsArray, ...values: any[]) {
    return [strings, values]
  },
}

const x = 1
const r = obj.tag`a${x}b`
void r
