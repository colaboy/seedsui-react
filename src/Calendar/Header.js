import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 日历头部
const Header = forwardRef(({ onPreviousMonth, onNextMonth, children, ...props }, ref) => {
  // 容器
  const rootRef = useRef(null)

  // 暴露方法
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      ref={rootRef}
      {...props}
      className={`calendar-header${props?.className ? ' ' + props.className : ''}`}
    >
      <div className="calendar-prev" onClick={onPreviousMonth}>
        &lt;
      </div>
      <div className="calendar-title">{children}</div>
      <div className="calendar-next" onClick={onNextMonth}>
        &gt;
      </div>
    </div>
  )
})

export default Header
