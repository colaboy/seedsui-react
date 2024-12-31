import React, { forwardRef } from 'react'

// 自定义子内容
const Multiple = forwardRef(({ style, className, onClick, children }, ref) => {
  return (
    <div style={style} className={className} onClick={onClick} ref={ref}>
      {children}
    </div>
  )
})

export default Multiple
