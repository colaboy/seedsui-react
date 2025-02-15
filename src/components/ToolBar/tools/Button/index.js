import React from 'react'
import { Button } from 'seedsui-react'

// 按钮
function ButtonCommponet({ type, name, titleRender, noStyle, ...props }) {
  // 获取标题
  function getTitle() {
    if (typeof titleRender === 'function') {
      return titleRender({
        type,
        name: name
      })
    }
    if (name) {
      return name
    }
    return ''
  }

  if (noStyle) {
    return getTitle()
  }

  return <Button {...props}>{getTitle()}</Button>
}
export default ButtonCommponet
