import React, { forwardRef } from 'react'

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
    // 标题
    let caption = children
    if (limit && children && (typeof children === 'string' || typeof children === 'number')) {
      // 数字大于99,则显示99+
      if (!isNaN(children)) {
        caption = children.length > limit ? '99999'.substring(0, limit) + ellipsis : children
      } else {
        caption = children.length > limit ? children.substring(0, limit) + ellipsis : children
      }
    }
    return (
      <span
        ref={ref}
        {...others}
        className={`badge${others.className ? ' ' + others.className : ''}`}
      >
        {caption}
      </span>
    )
  }
)

export default Badge
