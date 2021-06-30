import React, { Fragment } from 'react'
import htmlParser from 'html-react-parser'

/**
 * 变量替换, 主要为了支持reactDOM变量
 * @param {String} value 格式: '内容{0}内容{1}内容'
 * @param {Object} variableMap 格式: {'0': <div>我是变量dom</div>, '1': '我是变量2'}
 * @param {boolean} dangerouslyHTML 是否需要html转换成reactDOM, 格式: true | false
 * @return {Object} 内容<div>我是变量dom</div>内容我是变量2内容
 */
export default function (value, variableMap, dangerouslyHTML) {
  // 如果value不是string直接返回value
  if (typeof value !== 'string') {
    return value
  }

  // 如果变量为空直接返回value
  if (
    Object.prototype.toString.call(variableMap) !== '[object Object]' ||
    !Object.keys(variableMap).length
  ) {
    return value
  }

  // 构建分割后的数组['内容', <div>我是变量dom</div>, '内容', '我是变量2', '内容']
  const REGEXP = /\{(\d+)\}/
  let children = []
  value.split(REGEXP).reduce(function (memo, match, index) {
    let child
    if (index % 2 === 0) {
      // 单数不用替换
      if (match.length === 0) {
        return memo
      }
      child = match
    } else {
      // 双数为变量
      child = variableMap[match]
      if (
        typeof child === 'number' ||
        typeof child === 'string' ||
        // 非html字符串, reactDOM判断
        (!dangerouslyHTML && typeof child === 'object' && child.$$typeof)
      ) {
        // 如果需要转换html, 则把变量html字符串转换字符为reactDOM
        if (dangerouslyHTML && typeof child === 'string') {
          child = htmlParser(child)
        }
      } else {
        child = '{Parse error}'
      }
    }
    memo.push(child)

    return memo
  }, children)

  // reactDOM渲染
  let childrenArrary = React.Children.map(children, (child) => {
    return child
  })
  return React.createElement(Fragment, null, childrenArrary)
}
