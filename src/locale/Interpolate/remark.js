import React, { Fragment } from 'react'
import htmlParser from 'html-react-parser'

/**
 * remark替换, 主要为了支持reactDOM和html
 * @param {String|Node} remark 格式: <>内容<span>标签</span>内容</>或者'内容<span>标签</span>内容'
 * @param {boolean} dangerouslyHTML 是否需要html转换成reactDOM, 格式: true | false
 * @return {Object} 内容<span>标签</span>内容
 */
// eslint-disable-next-line
export default function (remark, dangerouslyHTML) {
  if (!remark || !dangerouslyHTML) {
    return remark
  }

  let child = remark
  // 如果需要转换html, 则把变量html字符串转换字符为reactDOM
  if (dangerouslyHTML && typeof remark === 'string') {
    child = htmlParser(remark)
  }
  // reactDOM渲染
  let childrenArrary = React.Children.map([child], (child) => {
    return child
  })
  return React.createElement(Fragment, null, childrenArrary)
}
