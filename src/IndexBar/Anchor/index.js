import React from 'react'

// 序列控件的锚点
const Anchor = ({ name, children }) => {
  // 为子元素增加data-indexbar-anchor属性
  let newChildren = React.Children.toArray(children)
  if (newChildren.length === 1) {
    newChildren = React.cloneElement(children, {
      // eslint-disable-next-line
      ['data-indexbar-anchor']: name
    })
  } else {
    newChildren = children
  }

  return <>{newChildren}</>
}

export default Anchor
