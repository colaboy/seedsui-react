const chalk = require('chalk')
const translate = require('./bingTranslate')
const languageMap = require('./../../../../utils/LocaleUtil/languageMap')

// 翻译
module.exports = async function (text, options) {
  const from = options?.from
  const to = options?.to
  if (!from || !to || from === to) {
    return text
  }
  if (!languageMap[from] || !languageMap[to]) {
    console.log(chalk.red(`translate: 语言${from}或${to}不支持`))
    return text
  }

  return translate(text, { from, to })
}
