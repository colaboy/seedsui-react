const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const translateFolder = require('./../src/node-utils/translateFolder')
const writeFileSync = require('./../src/node-utils/writeFileSync')

async function translateSrc() {
  const folderPath = path.resolve(__dirname, './../src')
  // 读取上次数据用于做合并与统计差量
  let basePath = path.resolve(__dirname, `./../src/assets/locale/base.json`)
  let oldBaseData = null
  if (fs.existsSync(basePath)) {
    oldBaseData = require(basePath)
  }

  let data = await translateFolder({
    ignore: ['**/deprecated/**'],
    folderPath: folderPath,
    localeFunctionName: 'LocaleUtil.text',
    oldBaseData: oldBaseData,
    translateOptions: [{ from: 'zh_CN', to: 'en_US' }],
    onGenerateKey: ({ folders, value, oldKey, newKey }) => {
      if (oldKey) return oldKey
      return `noKey_${newKey}`
    }
  })

  if (!data) return

  let { baseData, diffData } = data

  // 写入base.json
  await writeFileSync(basePath, JSON.stringify(baseData, null, 2))

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
