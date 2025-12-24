const obj: any = {
  tag(strings: TemplateStringsArray, ...values: any[]) {
    return [strings, values]
  },
}

const x = 2
const r = obj['tag']`a${x}b`
void r
