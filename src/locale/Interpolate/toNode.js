import React, { Fragment } from 'react'
import htmlParser from 'html-react-parser'

/**
 * text替换, 主要为了支持reactDOM和html
 * @param {String|Node} text 格式: <>内容<span>标签</span>内容</>或者'内容<span>标签</span>内容'
 * @param {boolean} dangerouslyHTML 是否需要html转换成reactDOM, 格式: true | false
 * @return {Object} 内容<span>标签</span>内容
 */
// eslint-disable-next-line
export default function toNode(text, dangerouslyHTML) {
  if (!text || !dangerouslyHTML) {
    return text
  }

  let child = text
  // 如果需要转换html, 则把变量html字符串转换字符为reactDOM
  if (dangerouslyHTML && typeof text === 'string') {
    try {
      child = htmlParser(text)
    } catch (error) {
      child = '{Parse error}'
    }
  }
  // reactDOM渲染
  let childrenArrary = React.Children.map([child], (child) => {
    return child
  })
  return React.createElement(Fragment, null, childrenArrary)
}
