const chalk = require('chalk')
const _ = require('lodash')
const getBaseData = require('./getBaseData/index')
const diffBaseData = require('./diffBaseData/index')
const translateBaseData = require('./translateBaseData/index')

async function translateFolder({
  // 过滤规则
  ignore,
  // 需要翻译的文件夹, LocaleUtil.text()和locale()
  folderPath,
  // 国际化的方法名
  localeFunctionName = 'LocaleUtil.text',
  // 读取上次数据用于做合并与统计差量, {'remark': {key: '', value: ''}}
  oldBaseData,
  // 翻译配置, [{from: '', to: ''}, {from: '', to: ''}]
  translateOptions,
  // 生成key的规则
  onGenerateKey
}) {
  if (!Array.isArray(translateOptions) || translateOptions.length === 0) {
    console.log(chalk.red(`\n+++++\nNo translateOptions\n+++++\n`))
    return null
  }

  console.log(chalk.yellow(`+++++ \u{1F44D} Start translating, directory: ${folderPath} +++++\n`))

  // 构建全量数据baseData, 差量数据diffData
  let newBaseData = await getBaseData({
    folderPath,
    ignore,
    oldBaseData,
    localeFunctionName,
    onGenerateKey
  })
  if (_.isEmpty(newBaseData)) {
    console.log(
      chalk.red(`Not found function ${localeFunctionName}(..) in directory: ${folderPath} \n`)
    )
    return null
  }

  // 差量更新数据
  let { baseData, diffData } = diffBaseData(newBaseData, oldBaseData)

  // 翻译并生成json文件
  baseData = await translateBaseData(
    baseData,
    translateOptions.map((translateOption) => {
      return {
        from: translateOption.from,
        to: translateOption.to
      }
    })
  )

  // 更新diffData
  if (!_.isEmpty(diffData)) {
    for (let n in diffData) {
      diffData[n] = baseData[n]
    }
  }

  console.log(chalk.yellow(`\n+++++ \u{1F44C}  Translation Finish +++++\n`))

  return { baseData: baseData, diffData: diffData }
}

module.exports = translateFolder
