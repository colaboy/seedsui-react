import React, { Fragment } from 'react'
import htmlParser from 'html-react-parser'

/**
 * 变量替换, 主要为了支持reactDOM变量
 * @param {String} value 格式: '内容{0}内容{1}内容'
 * @param {Object} variableMap 格式: {'0': <div>我是变量dom</div>, '1': '我是变量2'}
 * @param {boolean} dangerouslyHTML 是否需要html转换成reactDOM, 格式: true | false
 * @return {Object} 内容<div>我是变量dom</div>内容我是变量2内容
 */
// eslint-disable-next-line
export default function (value, variableMap, dangerouslyHTML) {
  // 如果value不是string直接返回value
  if (typeof value !== 'string' || !value) {
    return value
  }

  // 如果变量为空直接返回value
  if (
    Object.prototype.toString.call(variableMap) !== '[object Object]' ||
    !Object.keys(variableMap).length
  ) {
    return value
  }

  // '内容{0}内容{1}内容'分割成['内容', '0', 内容, '1', 内容], 返回构建分割后的数组['内容', <div>我是变量dom</div>, '内容', '我是变量2', '内容']
  const REGEXP = /\{(\d+)\}/ // 匹配数字{0}等
  let children = []
  value.split(REGEXP).reduce(function (memo, item, index) {
    let child
    // 单数为内容, 不用替换
    if (index % 2 === 0) {
      if (item.length === 0) {
        return memo
      }
      child = item
    }
    // 双数为变量, 需要替换
    else {
      child = variableMap[item]
      // 如果需要转换html, 并且变量child为数字或者string类型, 则把变量html字符串转换字符为reactDOM
      if (dangerouslyHTML && (typeof child === 'number' || typeof child === 'string')) {
        try {
          child = htmlParser(child)
        } catch (error) {
          child = '{Parse error}'
        }
      }
    }
    memo.push(child)

    return memo
  }, children)

  // 如果数组里都是字符串或者数组, 直接返回文本
  let isText = children.every((child) => {
    return typeof child === 'number' || typeof child === 'string'
  })
  if (isText) {
    return children.join('')
  }

  // reactDOM判断: typeof child === 'object' && child.$$typeof
  // reactDOM渲染
  let childrenArrary = React.Children.map(children, (child) => {
    return child
  })
  // 返回reactDOM
  return React.createElement(Fragment, null, childrenArrary)
}
