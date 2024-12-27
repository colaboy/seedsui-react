import React, { forwardRef } from 'react'

// 自定义子内容
const ChildrenWrapper = forwardRef(({ id, style, className, onClick, children }, ref) => {
  return (
    <div id={id} style={style} className={className} onClick={onClick} ref={ref}>
      {children}
    </div>
  )
})

export default ChildrenWrapper
