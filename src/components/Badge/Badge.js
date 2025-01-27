import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 数值标
const Badge = forwardRef(
  (
    {
      children = '0',
      maxLength = 2,
      ellipsis = '+', // 有maxLength属性时ellipsis才生效
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    // 标题
    let text = children
    if (maxLength && children && (typeof children === 'string' || typeof children === 'number')) {
      text = text.toString()
      // 数字大于99,则显示99+
      if (!isNaN(text)) {
        text = text.length > maxLength ? '99999'.substring(0, maxLength) + ellipsis : text
      } else {
        text = text.length > maxLength ? text.substring(0, maxLength) + ellipsis : text
      }
    }
    return (
      <span
        {...props}
        className={`badge${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        {text}
      </span>
    )
  }
)

export default Badge
