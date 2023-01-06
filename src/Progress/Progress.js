import React, { forwardRef, useRef, useImperativeHandle } from 'react'

export default forwardRef(
  (
    {
      // 进度条内部显示
      barContentRender,

      // 百分比(优先使用)
      percent,

      // 计算百分比
      max = 100,
      min = 0,
      value = 0,

      children,
      barProps,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    // 计算实际的百分比
    let barPercent = 0
    if (!isNaN(percent)) {
      barPercent = percent
    } else if (!isNaN(max) && !isNaN(value)) {
      barPercent = ((value - min) / (max - min)) * 100
      console.log('barPercent:', barPercent)
    }
    if (barPercent > 100) {
      barPercent = 100
    } else if (barPercent < 0) {
      barPercent = 0
    }
    return (
      <div
        ref={rootRef}
        {...others}
        className={`progress${others.className ? ' ' + others.className : ''}`}
      >
        <span
          {...barProps}
          className={`progress-bar${barProps?.className ? ' ' + barProps.className : ''}`}
          style={Object.assign({}, barProps?.style || {}, { width: barPercent + '%' })}
        >
          {typeof barContentRender === 'function' && barContentRender({ percent: barPercent })}
          {/* 渲染计数器progress-caption */}
          {/* <Counter
            className={`progress-caption`}
            duration={1000}
            to={barPercent}
            from={0}
            suffix={'%'}
          /> */}
        </span>
        {children}
      </div>
    )
  }
)
