import React, { forwardRef } from 'react'

// 悬浮中心点, 拖动时显示, 停止时隐藏
const CenterMarker = forwardRef(({ ...props }, ref) => {
  return <span className={`mappage-marker-center hide`} {...props} ref={ref}></span>
})

export default CenterMarker
