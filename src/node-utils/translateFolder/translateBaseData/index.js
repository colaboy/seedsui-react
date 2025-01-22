const _ = require('lodash')
const chalk = require('chalk')
const translateBase = require('./translateBase')

// 翻译并生成json文件
module.exports = async function translate(baseData, localeOptions = []) {
  if (_.isEmpty(baseData)) {
    console.log(chalk.red('translate: No baseData, abort translation'))
    return null
  }

  // 翻译baseData
  let translateBaseData = baseData

  // baseData注入json中的值
  for (let localeOption of localeOptions) {
    // 注入完成后翻译baseData
    console.log(chalk.green(`\n[Translate] ${localeOption.from} to ${localeOption.to}\n`))
    translateBaseData = await translateBase(translateBaseData, {
      from: localeOption.from,
      to: localeOption.to
    })
  }

  return translateBaseData
}
