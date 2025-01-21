const _ = require('lodash')
const chalk = require('chalk')
const translateBase = require('./translateBase')

// 翻译并生成json文件
module.exports = async function translate(baseData, localeOptions = []) {
  if (!baseData || _.isEmpty(baseData)) {
    console.log('translate: 无法生成Json数据, 未传baseData')
    return null
  }

  // 翻译baseData
  let translateBaseData = baseData

  // baseData注入json中的值
  for (let localeOption of localeOptions) {
    // 注入完成后翻译baseData
    console.log(chalk.green(`\nTranslate: ${localeOption.from} to ${localeOption.to}\n`))
    translateBaseData = await translateBase(translateBaseData, {
      from: localeOption.from,
      to: localeOption.to
    })
  }

  return translateBaseData
}
