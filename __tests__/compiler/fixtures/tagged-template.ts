function myTag(strings: any, ...values: any[]) {
    return strings[0] + values[0] + strings[1];
}
const val = 42;
const result = myTag`Hello ${val} world`;
