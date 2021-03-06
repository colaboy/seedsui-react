// require (PrototypeArray.js), 使用了equals方法
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

const Marquee = forwardRef(
  (
    {
      list = [], // [{id: 'xx', name: ''}]
      optionAttribute = {},
      step = 50,
      duration = 300,
      autoPlay = 2000, // 是否自动播放, 播放间隔毫秒数
      direction = 'top', // top | bottom | left | right
      loop = true,
      onClick,

      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    const instance = useRef(null)
    useEffect(() => {
      if (instance.current || list.length === 0) return
      initInstance()
    }, [])

    useEffect(() => {
      console.log('更新')
      update()
    }, [list])

    function update() {
      if (!instance.current) return
      instance.current.updateParams({
        start: 0,
        end: step * (list.length - 1)
      })
      if (autoPlay) {
        instance.current.play()
      }
    }
    function initInstance() {
      instance.current = new Instance(rootRef.current, {
        start: 0,
        end: step * (list.length - 1),
        step,
        duration,
        delay: autoPlay,
        direction,
        loop
      })
      if (autoPlay) {
        instance.current.play()
      }
      rootRef.current.instance = instance
    }
    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }

    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    const otherOptionAttribute = filterProps(optionAttribute)

    return (
      <ul
        ref={rootRef}
        {...others}
        className={`marquee${others.className ? ' ' + others.className : ''}`}
      >
        {list &&
          list.map((item, index) => {
            return (
              <li
                key={index}
                {...otherOptionAttribute}
                className={`marquee-li${
                  otherOptionAttribute.className ? ' ' + otherOptionAttribute.className : ''
                }`}
                style={Object.assign({ height: step + 'px' }, otherOptionAttribute.style || {})}
                onClick={(e) => {
                  if (onClick) onClick(e, item.name, [item], index)
                }}
              >
                {item.name}
              </li>
            )
          })}
      </ul>
    )
  }
)

export default Marquee
