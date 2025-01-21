const fs = require('fs')

// Create path
module.exports = function mkdirSync(filePath) {
  try {
    // Dir path
    let dir = filePath

    // Create file if no exists file
    if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.json')) {
      dir = filePath.substring(0, filePath.lastIndexOf('/'))
      // No such dir, the os is probably windows
      if (!dir) {
        dir = filePath.substring(0, filePath.lastIndexOf('\\'))
      }

      // Create a dir before create a file
      fs.mkdirSync(dir, { recursive: true })

      // If no exists file
      if (!fs.existsSync(filePath)) {
        console.log(`mkdirSync: 创建文件${filePath}`)
        fs.writeFileSync(filePath, '{}')
      }
    }
    // Create dir if no exists dir
    else {
      console.log(`mkdirSync: 创建目录${dir}`)
      fs.mkdirSync(dir, { recursive: true })
    }
  } catch (error) {
    console.error(`mkdirSync: 创建失败${filePath}`)
  }
}
