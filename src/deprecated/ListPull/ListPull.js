import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance'
import Button from './../../components/Button'

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const ListPull = forwardRef(
  (
    {
      list, // [{container: node, lButtons: [{caption: '按钮文字', className: 'warn', style: object}], rButtons: 同lButtons}]
      onClick,
      onShowedLeft,
      onShowedRight,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })
    const instance = useRef(null)
    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClick = handleClick
    }
    // useEffect(() => {
    //   instance.current.params.onClick = onClick;
    // }, [onClick]) // eslint-disable-line

    useEffect(() => {
      if (!rootRef || !rootRef.current) return
      instance.current = new Instance(rootRef.current, {
        onClick: handleClick,
        onShowedLeft: onShowedLeft,
        onShowedRight: onShowedRight
      })
    }, []) // eslint-disable-line

    function handleClick(s) {
      const e = s.event
      const index = s.target.closest('.list-pull-li').getAttribute('data-index')
      const option = list[index]
      let item = null
      const i = e.target.getAttribute('data-i')
      const direction = e.target.getAttribute('data-direction')
      if (i && direction) {
        if (direction === 'left') {
          item = option.lButtons[i]
        } else {
          item = option.rButtons[i]
        }
      } else {
        item = option.container
      }
      if (onClick) onClick(s, item, index, option)
    }

    return (
      <ul ref={rootRef} className={`list-pull${others.className ? ' ' + others.className : ''}`}>
        {list.map((item, index) => {
          return (
            <li key={`button${index}`} data-index={`${index}`} className="border-b list-pull-li">
              {item.lButtons && item.lButtons.length && (
                <div className="list-pull-left">
                  {item.lButtons.map((button, i) => {
                    return (
                      <Button
                        key={`button${i}`}
                        data-index={`${index}`}
                        data-i={`${i}`}
                        data-direction="left"
                        className={`list-pull-button${
                          button.className ? ' ' + button.className : ''
                        }`}
                        style={button.style}
                      >
                        {button.caption}
                      </Button>
                    )
                  })}
                </div>
              )}
              <div className="list-pull-handler" data-index={`${index}`}>
                {item.container}
              </div>
              {item.rButtons && item.rButtons.length && (
                <div className="list-pull-right">
                  {item.rButtons.map((button, i) => {
                    return (
                      <Button
                        key={`button${i}`}
                        data-index={`${index}`}
                        data-i={`${i}`}
                        data-direction="right"
                        className={`list-pull-button${
                          button.className ? ' ' + button.className : ''
                        }`}
                        style={button.style}
                      >
                        {button.caption}
                      </Button>
                    )
                  })}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }
)

export default ListPull
