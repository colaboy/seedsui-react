import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { Counter as Instance } from './instance.js'

// 计数器
const Counter = forwardRef(
  (
    {
      duration = 5000,
      from,
      to,
      thousandth,
      suffix = '', // 后缀
      autoPlay = true, // 是否自动播放
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      if (instance.current) return
      if (!isNaN(from) && !isNaN(to)) {
        initInstance()
      }
    }, [from, to]) // eslint-disable-line

    function initInstance() {
      if (!rootRef?.current) return
      if (!instance.current) {
        instance.current = new Instance(rootRef.current)
      }
      if (autoPlay) {
        instance.current.play()
      }
    }
    return (
      <span
        ref={rootRef}
        {...others}
        className={`counter${others.className ? ' ' + others.className : ''}`}
        data-duration={duration}
        data-from={from || 0}
        data-to={to || 0}
        data-suffix={suffix}
      >
        {/* 千分位 */}
        {!isNaN(thousandth) && Math.Calc.toThousandth(thousandth || 0) + suffix}
      </span>
    )
  }
)

export default Counter
