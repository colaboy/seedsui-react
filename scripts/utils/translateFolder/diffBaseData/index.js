const chalk = require('chalk')

// 提取到locale中需要国际化的文字到根基文件
module.exports = function (newBaseData, oldBaseData) {
  // 数据为空
  if (!newBaseData && !oldBaseData) {
    console.log(chalk.red(`+++++ diffBaseData: Either newBaseData nor oldBaseData +++++\n`))
    return null
  }

  // 单个数据为空
  if (!newBaseData || !oldBaseData) {
    return {
      baseData: newBaseData || oldBaseData,
      diffData: null
    }
  }

  // 新旧差异数据
  let diffBaseData = {}

  // 获取旧数据，标识旧数据里未匹配到的项，方便后续做人工删除检验
  for (let n in newBaseData) {
    // 获取旧数据里没有的项
    if (!oldBaseData[n]) {
      diffBaseData[n] = newBaseData[n]
    }
    // 新数据使用旧翻译
    newBaseData[n] = {
      ...(oldBaseData[n] || {}),
      key: newBaseData[n].key
    }
  }

  return {
    baseData: newBaseData,
    diffData: diffBaseData
  }
}
