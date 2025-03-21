const chalk = require('chalk')
const _ = require('lodash')
const getBaseData = require('./getBaseData/index')
const diffBaseData = require('./diffBaseData/index')
const translateBaseData = require('./translateBaseData/index')

async function translateFolder({
  // 过滤规则
  ignore,
  // 需要翻译的文件夹, LocaleUtil.locale()和locale()
  folderPath,
  // 国际化的方法名
  localeFunctionName = 'LocaleUtil.locale',
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

  console.log(chalk.yellow(`+++++ \u{1F44D} Start translating +++++\n`))
  console.log(`Read directory: ${folderPath}`)

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

  // baseData转为files: {zh_CN : {key: value}, en_US: {key: value}}
  let files = {}
  for (let remark in baseData) {
    let item = baseData[remark]
    // 排除key, 其它的key为国际化文件名称
    for (let filaName in item) {
      if (filaName === 'key') {
        continue
      }
      if (!files[filaName]) files[filaName] = {}
      files[filaName][item.key] = item[filaName]
    }
  }

  console.log(chalk.yellow(`\n+++++ \u{1F44C}  Translation Finish +++++\n`))

  return { baseData: baseData, diffData: diffData, files: files }
}

module.exports = translateFolder
