const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const translateFolder = require('./../src/node-utils/translateFolder')
const writeFileSync = require('./../src/node-utils/writeFileSync')

async function translateSrc() {
  const folderPath = path.resolve(__dirname, './../src')
  // 读取上次数据用于做合并与统计差量
  let oldBaseDataPath = path.resolve(__dirname, `./../src/utils/LocaleUtil/base.json`)
  let oldBaseData = null
  if (fs.existsSync(oldBaseDataPath)) {
    oldBaseData = require(oldBaseDataPath)
  }

  let data = await translateFolder({
    ignore: ['**/deprecated/**'],
    folderPath: folderPath,
    localeFunctionName: 'LocaleUtil.text',
    oldBaseData: oldBaseData,
    translateOptions: [
      { from: 'zh_CN', to: 'zh_CN' },
      { from: 'zh_CN', to: 'en_US' },
      { from: 'zh_CN', to: 'zh_HK' },
      { from: 'zh_CN', to: 'vi_VN' }
    ],
    onGenerateKey: ({ folders, value, oldKey, newKey }) => {
      if (oldKey) return oldKey
      return `noKey_${newKey}`
    }
  })

  if (!data) return

  let { baseData, diffData } = data

  // 写入base.json
  await writeFileSync(oldBaseDataPath, JSON.stringify(baseData, null, 2))

  // 释放base.json
  let files = {}
  for (let key in baseData) {
    let item = baseData[key]
    // 排除key, 其它的key为国际化文件名称
    for (let filaName in item) {
      if (filaName === 'key') {
        continue
      }
      if (!files[filaName]) files[filaName] = {}
      files[filaName][key] = item[filaName]
    }
  }
  console.log(files)

  // 写入diff.json
  // writeFileSync(
  //   path.resolve(
  //     __dirname,
  //     `${srcFolder}/assets/locale/base.diff.${dayjs().format('YYYY-MM-DD hh:mm')}.json`
  //   ),
  //   JSON.stringify(diffData, null, 2)
  // )
}
translateSrc()
