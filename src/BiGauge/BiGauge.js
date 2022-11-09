import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const BiGauge = forwardRef(
  (
    {
      duration = 1000, // 时长
      rotate = 0, // 最大270
      delay = 100, // 延时

      captionAttribute,
      children,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const pointerRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })
    function getDuration() {
      return (duration / 270) * rotate
    }
    function getRotate() {
      return rotate > 270 ? 270 : rotate
    }
    function getBgLvl() {
      const lvl = Math.round(rotate / 27)
      return lvl > 10 ? 10 : 1
    }
    // 只有延迟100毫秒动画才会生效
    function aniRotate() {
      // 时长
      const duration = getDuration()
      // 旋转
      const rotate = getRotate()
      // 背景
      const bgLvl = 'bg' + getBgLvl()
      setTimeout(() => {
        if (rootRef.current) {
          rootRef.current.style.WebkitAnimationDuration = `${duration}ms`
          rootRef.current.classList.add(bgLvl)
        }
        if (pointerRef.current) {
          pointerRef.current.style.WebkitTransitionDuration = `${duration}ms`
          pointerRef.current.style.WebkitTransform = `rotate(${rotate}deg)`
        }
      }, delay)
    }
    // 动画旋转
    aniRotate()
    return (
      <div
        ref={rootRef}
        {...others}
        className={`bi-gauge-box${others.className ? ' ' + others.className : ''}`}
      >
        <div className="bi-gauge">
          <div ref={pointerRef} className="bi-gauge-pointer"></div>
          <div
            {...captionAttribute}
            className={`bi-gauge-caption${
              captionAttribute.className ? ' ' + captionAttribute.className : ''
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)

export default BiGauge
