const fs = require('fs')
const mkdirSync = require('./mkdirSync')

module.exports = async function writeFileSync(filePath, content) {
  if (!filePath || !content || typeof content !== 'string') {
    // eslint-disable-next-line
    console.log('writeFileSync: 无法生成文件, 未传filePath或content')
    return
  }

  // Create dir if no exists dir
  mkdirSync(filePath)

  // 存到json中
  fs.writeFileSync(filePath, content, 'utf8')

  return content
}
