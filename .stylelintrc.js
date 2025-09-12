const { mergeConfig } = require('@jdtaro/stylelint-taro-dynamic/lib/config')

module.exports = mergeConfig(['dynamic'], {
  // 自定义样式规范: 支持sass的语言规范
  // customSyntax: "postcss-scss"
  // 自定义Stylelint配置
  rules: {},
})
