import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 日历头部
const Header = forwardRef(
  ({ onPreviousMonth, onNextMonth, onPreviousYear, onNextYear, children, ...props }, ref) => {
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
        <div className="calendar-previous-year" onClick={onPreviousYear}>
          &lt;&lt;
        </div>
        <div className="calendar-previous-month" onClick={onPreviousMonth}>
          &lt;
        </div>
        <div className="calendar-title">{children}</div>
        <div className="calendar-next-month" onClick={onNextMonth}>
          &gt;
        </div>
        <div className="calendar-next-year" onClick={onNextYear}>
          &gt;&gt;
        </div>
      </div>
    )
  }
)

export default Header
