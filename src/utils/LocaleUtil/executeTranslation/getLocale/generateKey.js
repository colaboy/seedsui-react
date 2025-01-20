const os = require('os')
const crypto = require('crypto')
// 读取package.json文件
const params = require('./../../../../../package.json')

/**
 * 生成页面地址和随机码的组合作为 key
 * @param {string} filePath 文件路径
 * @returns {string} key
 */
module.exports = function ({ prefix, filePath, value }) {
  // 国际化前缀
  if (!prefix) {
    // eslint-disable-next-line
    prefix =
      params?.locale?.prefix ||
      params?.name?.replace?.('qince-h5-', '').replace?.('dinghuo-h5-', '') ||
      ''
  }

  // 有filePath时, 命令则根据filePath取三层目录
  let url = ''
  if (filePath) {
    url = filePath
    // 区分windows和mac的分割符
    if (os.type() === 'Windows_NT') {
      url = filePath.replace(/\\/g, '/')
    }

    // 如果src目录下，则截取src后面的路径
    if (url.includes(`src/`)) {
      url = url.split(`src/`)[1]
      // 按分割符分割路径
      url = url.split('/')
    }

    // 如果前缀与path
    if (prefix && prefix === url[0]) {
      // eslint-disable-next-line
      prefix = ''
    }

    // 过滤文件, 并生成: 第一层目录.第二层目录.第三层目录(没有prefix).
    url = url
      .slice(0, prefix ? 2 : 3)
      .filter((item) => !/\.\w+$/.test(item))
      .join('.')
  }

  // hash: 截取前8位
  const hash = crypto.createHash('md5').update(value).digest('hex')

  return `${prefix ? prefix + '.' : ''}${url ? url + '.' : ''}${hash}`
}
