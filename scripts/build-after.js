const fs = require('fs')

// foo目录
const fooCatalog = `./dist/esm`
// out目录
const outCatalog = `./lib`

// 复制目录
fs.cp(fooCatalog, outCatalog, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
  }
})
