const chalk = require('chalk')
const _ = require('lodash')
const getLocale = require('./getLocale/index')
const translateData = require('./translateData/index')
const updateBase = require('./updateBase')

async function translateLocale({
  // 需要翻译的文件夹, LocaleUtil.text()和locale()
  folderPath,
  // 读取上次数据用于做合并与统计差量, {'remark': {key: '', value: ''}}
  lastBaseData,
  // 翻译配置, [{from: '', to: ''}, {from: '', to: ''}]
  translateOptions,
  // 过滤规则
  ignore,
  // 生成key的规则
  onGenerateKey
}) {
  if (!Array.isArray(translateOptions) || translateOptions.length === 0) {
    console.log(chalk.red(`\n+++++ No translateOptions +++++\n`))
    return null
  }

  // 构建全量数据baseData, 差量数据diffData
  let newBaseData = await getLocale({ folderPath, ignore, onGenerateKey: onGenerateKey })
  let { baseData, diffData } = updateBase(newBaseData, lastBaseData)

  // 翻译并生成json文件
  let translateBaseData = await translateData(
    baseData,
    translateOptions.map((translateOption) => {
      return {
        from: translateOption.from,
        to: translateOption.to
      }
    })
  )

  // 写入diff.json
  if (!_.isEmpty(diffData)) {
    for (let n in diffData) {
      diffData[n] = translateBaseData[n]
    }
  }

  console.log(chalk.yellow(`\n+++++ \u{1F44C} 翻译结束 +++++\n`))

  return { baseData: translateBaseData, diffData: diffData }
}

module.exports = translateLocale
