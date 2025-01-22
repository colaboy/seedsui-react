const glob = require('glob')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
const generateKey = require('./generateKey')
const chalk = require('chalk')
const formatFileSync = require('./../../formatFileSync')

module.exports = async function getBaseData({
  localeFunctionName,
  folderPath,
  ignore,
  onGenerateKey
}) {
  if (!folderPath) {
    console.log(chalk.red(`+++++ getBaseData: No folderPath +++++\n`))
    return null
  }
  if (!localeFunctionName) {
    console.log(chalk.red(`+++++ getBaseData: No localeFunctionName +++++\n`))
    return null
  }

  return new Promise((resolve) => {
    // 用于存储所有提取的国际化{中文: {key: '', value: ''}}
    const baseData = {}

    // 递归遍历指定目录下的所有 JavaScript 文件
    glob(
      '**/*.{js,ts,jsx,tsx}',
      {
        cwd: folderPath,
        ignore: [
          '**/scripts/**',
          '**/demos/**',
          '**/locale/**', // 忽略 locale 目录
          '**/locales/**', // 忽略 locales 目录
          '**/*.d.ts',
          ...(ignore || [])
        ],
        dot: true // 包括以 . 开头的文件
      },
      (err, files) => {
        if (err) {
          console.error('Error:', err)
          return
        }
        files.forEach((file) => {
          const filePath = `${folderPath}/${file}`

          // 读取文件内容
          let content = fs.readFileSync(filePath, 'utf8')

          // 解析文件内容为AST
          const ast = parser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'] // 如果你的代码中包含JSX
          })

          let modified = false

          // 遍历AST，寻找所有locale调用
          traverse(ast, {
            TaggedTemplateExpression(path) {
              console.log('模板字符串:', path)

              if (path.node.tag.name === localeFunctionName) {
                let text = path.node.quasi.quasis[0].value.cooked
                let searchKey = baseData[text]?.key
                if (!searchKey) {
                  searchKey = generateKey({
                    onGenerateKey: onGenerateKey,
                    filePath: filePath,
                    value: text
                  })
                  baseData[text] = {
                    key: searchKey
                  }
                }
                path.replaceWith(
                  t.callExpression(t.identifier('locale'), [
                    t.templateLiteral([t.templateElement({ raw: text, cooked: text }, true)], []),
                    t.stringLiteral(searchKey)
                  ])
                )
                modified = true
              }
            },
            CallExpression(path) {
              let nodeName = ''
              let subNodeName = ''
              // 带.组件
              if (path.node.callee.type === 'MemberExpression') {
                nodeName = path.node.callee.object.name
                subNodeName = path.node.callee.property.name
              }
              // 不带.组件 type ==== 'Identifier'
              else {
                nodeName = path.node.callee.name
              }

              let isMatch = false
              // 匹配带.组件
              if (localeFunctionName.indexOf('.') !== -1) {
                if (
                  nodeName === localeFunctionName.split('.')[0] &&
                  subNodeName === localeFunctionName.split('.')[1]
                ) {
                  isMatch = true
                }
              }
              // 匹配不带.组件
              else {
                if (nodeName === localeFunctionName) {
                  isMatch = true
                }
              }

              if (isMatch) {
                const args = path.node.arguments
                let key = args.length > 1 && args[1].type === 'StringLiteral' ? args[1].value : null
                let text = ''
                let variables = []
                if (args[0]?.type === 'TemplateLiteral') {
                  const parts = args[0].quasis.map((part) => part.value.cooked)
                  const expressions = args[0].expressions.map((_, i) => `{${i}}`)
                  text = parts[0]
                  for (let i = 0; i < expressions.length; i++) {
                    text += expressions[i] + parts[i + 1]
                  }
                  variables = args[0].expressions
                } else if (args[0]?.type === 'StringLiteral') {
                  text = args[0].value
                }
                if (text) {
                  // 将key、中文存到数组中
                  let searchKey = baseData[text]?.key
                  if (!searchKey) {
                    searchKey = generateKey({
                      // filePath: filePath,
                      value: text
                    })
                    baseData[text] = {
                      key: searchKey
                    }
                  }
                  // key存在
                  if (key) {
                    // key不正确才替换
                    if (key !== searchKey) {
                      args[1] = t.stringLiteral(searchKey) // 替换不匹配的key
                      modified = true
                    }
                  } else {
                    // key为空字符串，替换为空字符串
                    if (key === '') {
                      args[1] = t.stringLiteral(searchKey)
                    } else {
                      // key不存在，添加到args中
                      args.push(t.stringLiteral(searchKey))
                    }
                    modified = true
                  }

                  if (variables.length > 0 && args.length < 3) {
                    args.push(t.arrayExpression(variables)) // 添加变量作为第三个参数
                    modified = true
                  }
                }
              }
            }
          })

          // 保存替换后的文件内容(等测试通过后再放开)
          if (modified) {
            const { code } = generate(ast, { retainLines: true, comments: true }, content)
            formatFileSync(filePath, code)
            /*
            .then(() => {
              // ${filePath}文件替换完成
            })
            */
          }
        })

        resolve(baseData)
      }
    )
  })
}
