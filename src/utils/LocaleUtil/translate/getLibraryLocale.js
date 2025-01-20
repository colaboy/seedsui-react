const _ = require('lodash')
const path = require('path')
const readFileSync = require('./../utils/readFileSync')

// 获取所有公共库的json文件
module.exports = async function getLibraryLocale(language) {
  let srcFolder = './../../../../src'

  let libraryJson = await readFileSync(
    path.resolve(__dirname, `${srcFolder}/library/assets/locale/${language}.json`)
  )
  let seedsuiJson = await readFileSync(
    path.resolve(__dirname, `${srcFolder}/library/assets/seedsui/locale/${language}.json`)
  )
  let libraryCustomJson = await readFileSync(
    path.resolve(__dirname, `${srcFolder}/library-custom/assets/locale/${language}.json`)
  )
  let libraryApaasJson = await readFileSync(
    path.resolve(__dirname, `${srcFolder}/library-apaas/assets/locale/${language}.json`)
  )

  let json = {
    ...(libraryJson || {}),
    ...(seedsuiJson || {}),
    ...(libraryCustomJson || {}),
    ...(libraryApaasJson || {})
  }

  if (_.isEmpty(json)) {
    return null
  }

  return json
}
