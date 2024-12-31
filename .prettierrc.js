module.exports = {
  pluginSearchDirs: false,
  plugins: [
    // require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  proseWrap: 'never',
  singleQuote: true,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
  /*  prettier的配置 */
  // 句尾添加分号
  semi: false,
  // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  trailingComma: 'none',
  // 在对象，数组括号与文字之间加空格
  bracketSpacing: true,
  // 单行长度
  printWidth: 100,
}
