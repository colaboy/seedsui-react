import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const BiClock = forwardRef(
  (
    {
      lineWidth = 2, // 边框宽度
      size = 50, // 大小,px
      time, // hh:mm
      duration = 500, // 时长
      delay = 0, // 延时
      style,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const hourRef = useRef(null)
    const minuteRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })
    function getHourDeg(hour) {
      return hour * 30
    }
    function getMinuteDeg(minute) {
      return minute * 6
    }
    function aniRotate() {
      let hour = '00'
      let minute = '00'
      if (/\d{2}:\d{2}/.test(time)) {
        hour = time.split(':')[0]
        minute = time.split(':')[1]
      }
      setTimeout(() => {
        if (hourRef.current) {
          hourRef.current.style.WebkitTransitionDuration = `${duration}ms`
          hourRef.current.style.WebkitTransform = `rotate(${getHourDeg(hour)}deg)`
        }
        if (minuteRef.current) {
          minuteRef.current.style.WebkitTransitionDuration = `${duration}ms`
          minuteRef.current.style.WebkitTransform = `rotate(${getMinuteDeg(minute)}deg)`
        }
      }, delay)
    }
    // 动画旋转
    aniRotate()
    return (
      <div
        {...others}
        ref={rootRef}
        className={`bi-clock${others.className ? ' ' + others.className : ''}`}
        style={Object.assign(
          { width: `${size}px`, height: `${size}px`, borderWidth: `${lineWidth}px` },
          style || {}
        )}
      >
        <div ref={hourRef} className="bi-clock-hour" style={{ width: `${lineWidth}px` }}></div>
        <div ref={minuteRef} className="bi-clock-minute" style={{ width: `${lineWidth}px` }}></div>
        <div
          className="bi-clock-origin"
          style={{ width: `${lineWidth + 1}px`, height: `${lineWidth + 1}px` }}
        ></div>
      </div>
    )
  }
)

export default BiClock
