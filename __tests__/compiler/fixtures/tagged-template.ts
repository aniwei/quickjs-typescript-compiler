function myTag(strings: TemplateStringsArray, ...values: any[]) {
    return strings[0] + values[0] + strings[1];
}

const val = "world";
const result = myTag`Hello ${val} world`;
const raw = myTag`Line
Break`;
