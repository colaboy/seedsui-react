import React from 'react'
import hasNode from './hasNode'
import splitValue from './splitValue'

// 根据['text', 'variable:0']和[<div>1000<div>], 生成text<div>1000</div>
function valuesToText(values, variables) {
  return values.map((item) => {
    // Replace variable
    if (item.startsWith('variable:')) {
      let variableName = item.replace('variable:', '')
      return variables?.[variableName] || ''
    }
    return item
  })
}

/**
 * 国际化函数
 * @param {String} remark '共有{0}个商品, 共查到{1}页'
 * @param {String} key resources中的key
 * @param {Array} variables {0: <div><div>}
 * @return {Node} 返回reactDOM
 */
function locale(remark, key, variables) {
  let localeData = window.seedsLocaleData || {}
  let value = localeData[key || ''] || remark

  // Split value('text{0}') to ['text', 'variable:0']
  let values = splitValue(value)

  // No node, return string
  if (!hasNode(variables)) {
    return valuesToText(values, variables).join('')
  }

  // Has node, return node
  return <>{valuesToText(values, variables)}</>
}

export default locale
