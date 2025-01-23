/**
 * Split value by variable: {0}{1}...
 * @param {String} value '共有{0}个商品, 共查到{1}页, 每页{0}个商品'
 * @return {String} ['共有', 'variable:0', '个商品, 共查到', 'variable:1', '页, 每页', 'variable:0', '个商品']
 */
function splitValue(value) {
  // 使用正则表达式匹配所有的 {字母数值}，并将其替换为 variable:字母数值
  const result = value.split(/{(\d+)}/).map((part, index) => {
    if (index % 2 === 1) {
      // 如果是占位符部分，格式化为 'variable:字母数值'
      return `variable:${part}`
    }
    // 如果是普通文本部分，保持原样
    return part
  })
  return result
}

export default splitValue
