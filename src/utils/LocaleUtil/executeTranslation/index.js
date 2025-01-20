const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')
const _ = require('lodash')
const dayjs = require('dayjs')
const params = require('./../../../../package.json')
const writeFileSync = require('./../utils/writeFileSync')
const getLocale = require('./getLocale/index')
const translate = require('./translate/index')
const fs = require('fs')
const updateBase = require('./updateBase')
const getLibraryLocale = require('./getLibraryLocale')
// 系统支持的语言
let locales = require('./../utils/translate/SYS_LANGUAGE')

async function init(srcFolder, config) {
  let srcFolderPath = path.resolve(__dirname, srcFolder)

  // 构建base.json: {中文: {key: '', value: ''}}
  let basePath = path.resolve(__dirname, `${srcFolder}/assets/locale/base.json`)
  let newBaseData = await getLocale(srcFolderPath, config?.ignore)
  let oldBaseData = null
  if (fs.existsSync(basePath)) {
    oldBaseData = require(basePath)
  }
  let { baseData, diffData } = updateBase(newBaseData, oldBaseData)

  // 翻译并生成json文件
  let translateBaseData = await translate(
    baseData,
    locales.map((locale) => {
      return {
        jsonPath: path.resolve(__dirname, `${srcFolder}/assets/locale/${locale}.json`),
        from: 'zh_CN',
        to: locale
      }
    }),
    {
      onJsonSuccess: config?.onJsonSuccess
    }
  )

  // 写入base.json
  await writeFileSync(basePath, JSON.stringify(translateBaseData, null, 2))

  // 写入diff.json
  if (!_.isEmpty(diffData)) {
    for (let n in diffData) {
      diffData[n] = translateBaseData[n]
    }
    writeFileSync(
      path.resolve(
        __dirname,
        `${srcFolder}/assets/locale/base.diff.${dayjs().format('YYYY-MM-DD hh:mm')}.json`
      ),
      JSON.stringify(diffData, null, 2)
    )
  }

  console.log(chalk.yellow(`\n+++++ \u{1F44C} 翻译结束：${params.name} +++++\n`))
}

console.log(chalk.yellow(`+++++ \u{1F44D} 开始翻译：${params.name} +++++\n`))

// library库
if (params.name === 'qince-h5-library') {
  init('./../../../../src/library').then(() => {
    // copy整个locale文件夹到外层assets
    fse.copySync(
      path.resolve(__dirname, './../../../../src/library/assets/locale'),
      path.resolve(__dirname, './../../../../src/assets/locale'),
      {
        overwrite: true
      }
    )

    // 删除外层的base.Json
    fse.removeSync(path.resolve(__dirname, './../../../../src/assets/locale/base.json'))
  })
}
// library-apaas公共库
else if (params.name === 'qince-h5-library-apaas') {
  init('./../../../../src/library-apaas')
}
// library-apaas定制插件库
else if (params.name === 'qince-h5-library-custom') {
  init('./../../../../src/library-custom')
}
// 项目
else {
  init('./../../../../src', {
    ignore: ['**/library**/**'],
    onJsonSuccess: async (json, language) => {
      console.log(`合并公共库的国际化json文件`)
      let libraryJson = await getLibraryLocale(language)
      return {
        ...(json || {}),
        ...(libraryJson || {})
      }
    }
  })
}
