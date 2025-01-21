const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const translateFolder = require('./../src/node-utils/translateFolder')
const writeFileSync = require('./../src/node-utils/writeFileSync')

async function translateSrc() {
  // 读取上次数据用于做合并与统计差量
  let basePath = path.resolve(__dirname, `src/assets/locale/base.json`)
  let lastBaseData = null
  if (fs.existsSync(basePath)) {
    lastBaseData = require(basePath)
  }

  console.log(chalk.yellow(`+++++ \u{1F44D} 开始翻译 +++++\n`))
  let data = await translateFolder({
    ignore: ['**/deprecated/**'],
    folderPath: path.resolve(__dirname, 'src'),
    lastBaseData: lastBaseData,
    translateOptions: [{ from: 'zh_CN', to: 'en_US' }],
    onGenerateKey: (url) => {
      return (
        'SeedsUI_' +
        url
          .slice(0, 2)
          .filter((item) => !/\.\w+$/.test(item))
          .join('.')
      )
    }
  })

  if (!data) return

  let { baseData, diffData } = data

  // 写入base.json
  await writeFileSync(basePath, JSON.stringify(baseData, null, 2))

  // 写入diff.json
  writeFileSync(
    path.resolve(
      __dirname,
      `${srcFolder}/assets/locale/base.diff.${dayjs().format('YYYY-MM-DD hh:mm')}.json`
    ),
    JSON.stringify(diffData, null, 2)
  )
}
translateSrc()
