const path = require('path')
const fs = require('fs')
const glob = require('glob')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
const formatFileSync = require('./utils/formatFileSync')
// 配置参数
const sourceDir = path.resolve(__dirname, './../src')
const excludePatterns = [
  '**/deprecated/**',
  '**/scripts/**',
  '**/demos/**',
  '**/locale/**',
  '**/locales/**',
  '**/*.d.ts'
]

// 中文正则检测（包含全角符号）
const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/

// 检查是否在控制台语句中
function isInsideConsoleCall(path) {
  let parent = path.parentPath
  while (parent) {
    if (
      t.isCallExpression(parent.node) &&
      t.isMemberExpression(parent.node.callee) &&
      t.isIdentifier(parent.node.callee.object, { name: 'console' }) &&
      ['log', 'error', 'warn'].includes(parent.node.callee.property.name)
    ) {
      return true
    }
    parent = parent.parentPath
  }
  return false
}

// 处理单个文件
function processFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8')

  // 解析AST
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
    tokens: true
  })

  let modified = false

  // 遍历AST节点
  traverse(ast, {
    StringLiteral(path) {
      if (
        chineseRegex.test(path.node.value) &&
        !isWrappedByLocaleUtil(path) &&
        !isInsideConsoleCall(path)
      ) {
        replaceWithLocaleUtil(path, path.node.value)
        modified = true
      }
    },

    JSXText(path) {
      const trimmed = path.node.value.trim()
      if (
        chineseRegex.test(trimmed) &&
        !isInsideConsoleCall(path) &&
        !isWrappedInJsxExpression(path)
      ) {
        replaceJSXTextWithLocale(path, trimmed)
        modified = true
      }
    }
  })

  // 生成新代码并格式化
  if (modified) {
    let newCode = generator(ast, {
      retainLines: true,
      comments: true
    }).code

    // 调用格式化方法
    try {
      newCode = formatFileSync(filePath, newCode)
    } catch (e) {
      console.error(`格式化失败 ${filePath}:`, e)
    }

    fs.writeFileSync(filePath, newCode)
    console.log(`已处理: ${filePath}`)
  }
}

// 检查是否已被LocaleUtil包裹
function isWrappedByLocaleUtil(path) {
  let parent = path.parentPath
  return (
    t.isCallExpression(parent?.node) &&
    t.isMemberExpression(parent.node.callee) &&
    parent.node.callee.object.name === 'LocaleUtil' &&
    parent.node.callee.property.name === 'locale'
  )
}

// 检查JSX文本是否已经在表达式中
function isWrappedInJsxExpression(path) {
  return t.isJSXExpressionContainer(path.parent)
}

// 替换逻辑保持不变...
// （保持之前的 replaceWithLocaleUtil 和 replaceJSXTextWithLocale 函数）

// 主函数
async function main() {
  const pattern = `${sourceDir}/**/*.{js,jsx,ts,tsx}`

  glob(pattern, { ignore: excludePatterns }, (err, files) => {
    if (err) throw err

    console.log(`开始处理 ${files.length} 个文件...`)

    files.forEach((file, index) => {
      try {
        console.log(`[${index + 1}/${files.length}] 正在处理: ${file}`)
        processFile(file)
      } catch (e) {
        console.error(`处理失败 ${file}:`, e.message)
      }
    })

    console.log('所有文件处理完成')
  })
}

main()
