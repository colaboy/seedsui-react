import React from 'react'

const injectChildrenProps = (children, props) => {
  return React.Children.map(children, (child) => {
    // 检查是否是一个 React 组件（函数组件或类组件），而不是原生元素
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      // 克隆该组件并注入新的属性
      return React.cloneElement(child, props)
    }
    // 如果是原生元素，直接返回
    return child
  })
}

export default injectChildrenProps
