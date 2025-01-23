const path = require('path')
const fs = require('fs')
const translateFolder = require('./../src/node-utils/translateFolder')
const writeFileSync = require('./../src/node-utils/writeFileSync')

async function translateSrc() {
  const folderPath = path.resolve(__dirname, './../src')
  // 生成文件的目录
  let localesPath = path.resolve(folderPath, `utils/LocaleUtil/locales`)
  // 读取上次数据用于做合并与统计差量
  let oldBaseDataPath = path.resolve(folderPath, `utils/LocaleUtil/locales/base.json`)
  let oldBaseData = null
  if (fs.existsSync(oldBaseDataPath)) {
    oldBaseData = require(oldBaseDataPath)
  }

  let data = await translateFolder({
    ignore: [
      '**/deprecated/**',
      '**/scripts/**',
      '**/demos/**',
      '**/locale/**', // 忽略 locale 目录
      '**/locales/**', // 忽略 locales 目录
      '**/*.d.ts'
    ],
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

  let { baseData, diffData, files } = data

  // 生成base.json
  await writeFileSync(oldBaseDataPath, JSON.stringify(baseData, null, 2))

  // 生成files
  for (let fileName in files) {
    let localeFilePath = path.resolve(localesPath, `${fileName}.json`)
    writeFileSync(localeFilePath, JSON.stringify(files[fileName], null, 2))
  }
}
translateSrc()
