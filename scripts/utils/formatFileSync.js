const fs = require('fs')
const prettier = require('prettier')

// 格式化并写入文件: const formatFileSync = require('./formatFileSync')
async function formatFileSync(filePath, code) {
  try {
    // 异步地获取prettier配置
    const options = await prettier.resolveConfig(filePath)
    // 使用获取到的配置格式化代码
    const formattedCode = await prettier.format(code, {
      ...options,
      parser: 'babel-ts'
    })
    // 写入文件
    fs.writeFileSync(filePath, formattedCode, 'utf8')
  } catch (error) {
    console.error('格式化或写入文件时出错:', error)
  }
}
module.exports = formatFileSync
