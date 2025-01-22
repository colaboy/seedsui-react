const os = require('os')
const crypto = require('crypto')

/**
 * 生成页面地址和随机码的组合作为 key
 * @param {string} filePath 文件路径
 * @returns {string} key
 */
module.exports = function ({ filePath, oldKey, value, onGenerateKey }) {
  // 获取目录结构, 为了自定义场景时可能会根据目录生成key
  let folders = null
  if (filePath) {
    // 区分windows和mac的分割符
    if (os.type() === 'Windows_NT') {
      folders = filePath.replace(/\\/g, '/')
    }

    // 如果src目录下，则截取src后面的路径
    if (filePath.includes(`src/`)) {
      folders = filePath.split(`src/`)[1].split('/')
    }
  }

  // value的hash值
  const hash = crypto.createHash('md5').update(value).digest('hex')

  // 自定义key
  if (typeof onGenerateKey === 'function') {
    let key = onGenerateKey({ folders, oldKey, newKey: hash, value })
    if (typeof key === 'string') {
      return key
    }
  }

  return hash
}
