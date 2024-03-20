const fs = require('fs').promises
const path = require('path')

// 检测src下所有js，判断是否用到ReactNode, 却没有import React
async function traverseDir(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const filePath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        await traverseDir(filePath)
      } else if (filePath.endsWith('.js')) {
        const fileContent = await fs.readFile(filePath, 'utf-8')

        // 检查文件内容是否包含"</"
        if (fileContent.includes('</') && !fileContent.includes('import React')) {
          console.log(`File ${filePath} contains '</' but does not import React.`)
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
}

// 开始遍历src目录
traverseDir('./src')
