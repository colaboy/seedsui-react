import React, { forwardRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import Context from './../../Context/instance.js'

const Actionsheet = forwardRef(
  (
    {
      portal,
      show = false,
      animation = 'slideUp', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      duration,

      list, // [{name: string, onClick: func}]

      maskAttribute = {},
      groupAttribute = {},
      optionAttribute = {},

      cancelCaption = '',
      cancelAttribute = {},

      onChange,
      ...others
    },
    ref
  ) => {
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    function handleClick(e) {
      var target = e.target
      // 获取值
      var item = null
      var index = null
      if (target.classList.contains('actionsheet-option')) {
        index = target.getAttribute('data-index')
        index = Number(index)
        item = list[index] || null
      }
      if (item && item.onClick) {
        list[index].onClick(e, item.name, [item])
        return
      }
      // 区分点击事件
      e.stopPropagation()
      if (target.classList.contains('actionsheet-option')) {
        if (optionAttribute.onClick) {
          optionAttribute.onClick(e, item.name, [item])
          return
        }
      }
      if (target.classList.contains('actionsheet-group') && groupAttribute.onClick) {
        groupAttribute.onClick(e)
        return
      }
      if (target.classList.contains('actionsheet-mask') && maskAttribute.onClick) {
        maskAttribute.onClick(e)
        return
      }
      if (target.classList.contains('actionsheet-cancel') && cancelAttribute.onClick) {
        cancelAttribute.onClick(e)
        return
      }
      if (target.classList.contains('actionsheet-option')) {
        if (onChange) onChange(e, item.name, [item], index)
      }
    }

    // 构建动画
    let animationClassName = ''
    switch (animation) {
      case 'slideLeft':
        animationClassName = 'popup-animation right-middle'
        break
      case 'slideRight':
        animationClassName = 'popup-animation left-middle'
        break
      case 'slideUp':
        animationClassName = 'popup-animation bottom-center'
        break
      case 'slideDown':
        animationClassName = 'popup-animation top-center'
        break
      case 'zoom':
        animationClassName = 'popup-animation middle'
        break
      case 'fade':
        animationClassName = 'popup-animation middle'
        break
      case 'none':
        animationClassName = ''
        break
      default:
        animationClassName = 'popup-animation middle'
    }

    // 动画时长
    let durationStyle = {}
    if (typeof duration === 'number') {
      durationStyle = {
        WebkitTransitionDuration: duration + 'ms'
      }
    }

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }

    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    const otherMaskAttribute = filterProps(maskAttribute)
    const otherGroupAttribute = filterProps(groupAttribute)
    const otherOptionAttribute = filterProps(optionAttribute)
    const otherCancelAttribute = filterProps(cancelAttribute)

    return createPortal(
      <div
        ref={ref}
        {...otherMaskAttribute}
        className={`mask actionsheet-mask${
          otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''
        }${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, otherMaskAttribute.style || {})}
        onClick={handleClick}
      >
        <div
          data-animation={animation}
          {...others}
          className={`actionsheet${animationClassName ? ' ' + animationClassName : ''}${
            others.className ? ' ' + others.className : ''
          }${show ? ' active' : ''}`}
          style={Object.assign({}, durationStyle, others.style || {})}
        >
          <div
            {...otherGroupAttribute}
            className={`actionsheet-group${
              otherGroupAttribute.className ? ' ' + otherGroupAttribute.className : ''
            }`}
          >
            {list &&
              list.map((item, index) => {
                return (
                  <div
                    {...otherOptionAttribute}
                    className={`actionsheet-option${
                      otherOptionAttribute.className
                        ? ' ' + otherOptionAttribute.className
                        : ' border-b'
                    }`}
                    key={index}
                    data-index={index}
                  >
                    {item.name}
                  </div>
                )
              })}
          </div>
          {cancelAttribute.onClick && (
            <div
              {...otherCancelAttribute}
              className={`actionsheet-cancel${
                otherCancelAttribute.className ? ' ' + otherCancelAttribute.className : ''
              }`}
            >
              {cancelCaption || locale('取消', 'cancel')}
            </div>
          )}
        </div>
      </div>,
      portal || context.portal || document.getElementById('root') || document.body
    )
  }
)

export default Actionsheet
