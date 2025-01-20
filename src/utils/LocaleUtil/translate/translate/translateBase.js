const _ = require('lodash')
const translate = require('./../../utils/translate/index')
const chalk = require('chalk')

// 翻译baseJson
module.exports = async function translateBase(baseData, config) {
  // 未传翻译配置，直无需翻译
  let from = config?.from
  let to = config?.to
  if (!from || !to) {
    console.log(`translateBase: 未传翻译配置from或to, 跳过翻译`)
    return baseData
  }

  if (from === to) {
    console.log(`translateBase: ${from}翻译${to}, 无需翻译`)
    for (let id in baseData) {
      baseData[id][from] = id
    }
    return baseData
  }

  // 逐项翻译(失败概率很高，此种方案废弃)
  /*
  for (let id in baseData) {
    if (!baseData[id].value) {
      console.log('开始翻译：', id.trim())
      baseData[id].value = await translate(id, config)
      console.log('翻译完成：', baseData[id].value)
    }
  }
  */

  // 分页翻译(失败概率很低)

  // 每次只能翻译5000个字符，所以需要提取所有原始值，然后分页翻译
  let unTranslated = {}
  for (let id in baseData) {
    let item = baseData[id]
    if (!item[to]) {
      unTranslated[id] = item
    }
  }

  // 分页, 5000个字符一页
  let chunks = []
  let chunk = []
  for (let id in unTranslated) {
    if ((chunk.join('\n###\n') + '\n###\n' + id).length > 5000) {
      chunks.push(chunk)
      chunk = []
    } else {
      chunk.push(id)
    }
  }

  // 剩余没有5000个字符的chunk合到chunks
  if (!_.isEmpty(chunk)) {
    chunks.push(chunk)
  }

  // 按分页翻译
  if (!chunks.length) {
    console.log(`translateBase: 已全部翻译完成, 无需翻译`)
    return baseData
  }

  console.log(
    chalk.green(
      `translateBase: 准备将${config?.from || ''}翻译成${config?.to || ''}, 共${chunks.length}页`
    )
  )
  for (let chunk of chunks) {
    if (_.isEmpty(chunk)) continue

    // 翻译结果, bing支持数组可直传chunk, google只支持字符串需要传
    let translatedValue = await translate(chunk, config)

    // 长度相同说明翻译成功
    if (translatedValue.length === chunk.length) {
      for (let [index, id] of chunk.entries()) {
        unTranslated[id][to] = translatedValue[index]
      }
    } else {
      console.log(
        chalk.red(
          `translateBase: ${config?.from || ''}翻译成${config?.to || ''}出错:\n`,
          translatedValue
        )
      )
    }
  }

  // Build base json
  if (_.isEmpty(unTranslated)) {
    console.log(`translateBase: 已全部翻译完成, 无需翻译`)
  }

  return { ...baseData, ...unTranslated }
}
