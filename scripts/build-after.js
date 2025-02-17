const fs = require('fs')

// 删除目录
function deleteFolder(folder) {
  if (fs.existsSync(folder)) {
    try {
      fs.rmSync(folder, { recursive: true })
      console.log('successfully deleted' + folder)
    } catch (error) {
      console.error('delete was an error:', error.message)
    }
  }
}
// 创建目录
function createFolder(folder) {
  try {
    fs.mkdirSync(folder)
    console.log('successfully create' + folder)
  } catch (error) {
    console.error('create was an error:', error.message)
  }
}
// 复制目录
function copyFolder(current, target, cb) {
  fs.cp(current, target, { recursive: true }, (err) => {
    if (err) {
      console.error(err)
      return
    }

    cb && cb()
  })
}
// 删除文件中的指定代码
function deleteCode(filePath, code) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (typeof data === 'string') {
      let newContent = data.replace(code, '')
      fs.writeFile(filePath, newContent, 'utf8', (err) => {
        if (err) throw err
        console.log(`successfully delete '${filePath} code '${code}'`)
      })
    }
  })
}

// 复制代码: src/dist到src/lib
const currentSourceFolder = `./dist`
const targetSourceFolder = `./lib`
deleteFolder(targetSourceFolder)
createFolder(targetSourceFolder)
copyFolder(currentSourceFolder, targetSourceFolder, () => {
  // 删除src/index中加载less的代码
  deleteCode(`${targetSourceFolder}/index.js`, `import "./assets/index.less";\n`)
})

// 复制国际化文件: assets/locale目录到src/locale
const currentLocaleFolder = `./src/assets/locale`
const targetLocaleFolder = `./locale`
deleteFolder(targetLocaleFolder)
createFolder(targetLocaleFolder)
copyFolder(currentLocaleFolder, targetLocaleFolder)
