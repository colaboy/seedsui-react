import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 数值标
const Badge = forwardRef(
  (
    {
      children = '0',
      limit = 2,
      ellipsis = '+', // 有limit属性时ellipsis才生效
      ...others
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
    let caption = children
    if (limit && children && (typeof children === 'string' || typeof children === 'number')) {
      caption = caption.toString()
      // 数字大于99,则显示99+
      if (!isNaN(caption)) {
        caption = caption.length > limit ? '99999'.substring(0, limit) + ellipsis : caption
      } else {
        caption = caption.length > limit ? caption.substring(0, limit) + ellipsis : caption
      }
    }
    return (
      <span
        ref={rootRef}
        {...others}
        className={`badge${others.className ? ' ' + others.className : ''}`}
      >
        {caption}
      </span>
    )
  }
)

export default Badge
