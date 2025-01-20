const _ = require('lodash')
const chalk = require('chalk')
const writeFileSync = require('./../../utils/writeFileSync')
const translateBase = require('./translateBase')

// 翻译并生成json文件
module.exports = async function translate(baseData, localeOptions = [], events) {
  if (!baseData || _.isEmpty(baseData)) {
    console.log('translate: 无法生成Json数据, 未传baseData')
    return null
  }

  // 翻译baseData
  let translateBaseData = baseData

  // baseData注入json中的值
  for (let localeOption of localeOptions) {
    // 注入完成后翻译baseData
    console.log(chalk.green(`\n翻译: ${localeOption.jsonPath}\n`))
    translateBaseData = await translateBase(translateBaseData, {
      from: localeOption.from,
      to: localeOption.to
    })

    // 生成json文件
    let newJsonData = {}
    for (let n in translateBaseData) {
      newJsonData[translateBaseData[n].key] = translateBaseData[n][localeOption.to] || ''
    }

    // 回调
    if (events && events.onJsonSuccess) {
      newJsonData = await events.onJsonSuccess(newJsonData, localeOption.to)
    }

    // 写入json
    await writeFileSync(localeOption.jsonPath, JSON.stringify(newJsonData, null, 2))
  }

  return translateBaseData
}
