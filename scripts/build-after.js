const fs = require('fs')

// foo目录
const fooCatalog = `./dist`
// out目录
const outCatalog = `./lib`

// 删除目录
if (fs.existsSync(outCatalog)) {
  try {
    fs.rmSync(outCatalog, { recursive: true })
    console.log('successfully deleted' + outCatalog)
  } catch (error) {
    console.error('delete was an error:', error.message)
  }
}

// 创建目录
try {
  fs.mkdirSync(outCatalog)
  console.log('successfully create' + outCatalog)
} catch (error) {
  console.error('create was an error:', error.message)
}

// 复制目录
fs.cp(fooCatalog, outCatalog, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
    return
  }

  // 删除src/index中加载less的代码
  function deleteIndexLess(indexFileName) {
    fs.readFile(`${outCatalog}/${indexFileName}`, 'utf8', function (err, data) {
      if (typeof data === 'string') {
        let newContent = data.replace(`import "./assets/index.less";\n`, '')
        fs.writeFile(`${outCatalog}/${indexFileName}`, newContent, 'utf8', (err) => {
          if (err) throw err
          console.log(
            `successfully delete 'src/lib/${indexFileName} code 'import "./assets/style/index.less"'`
          )
        })
      }
    })
  }
  deleteIndexLess('index.js')
})
