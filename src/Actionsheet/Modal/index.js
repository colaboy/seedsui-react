import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'

const Modal = forwardRef(
  (
    {
      // 通用属性
      portal,
      getComboDOM,
      value,
      list,
      onBeforeChange,
      onChange,

      visible = false,
      maskClosable = true,
      onVisibleChange,

      // 定制属性
      maskProps = {},
      cancelProps = {
        visible: true
      },
      groupProps = {},
      optionProps = {},
      animation = 'slideUp', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    list = list.filter((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    const rootRef = useRef(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

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

    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    const otherMaskProps = filterProps(maskProps)
    const otherGroupProps = filterProps(groupProps)
    const otherOptionProps = filterProps(optionProps)

    const {
      onClick: cancelOnClick,
      visible: cancelVisible,
      caption: cancelCaption,
      ...otherCancelProps
    } = cancelProps

    // 点击容器
    async function handleClick(e) {
      var target = e.target
      // 点击选项
      if (target.classList.contains('actionsheet-option')) {
        let item = null
        let index = null
        index = target.getAttribute('data-index')
        index = Number(index)
        item = list[index] || null
        // 触发点击事件
        if (optionProps?.onClick) optionProps.onClick(e)
        // 修改提示
        if (typeof onBeforeChange === 'function') {
          let goOn = await onBeforeChange([item])
          if (!goOn) return
        }
        // 触发onChange事件
        if (onChange) onChange([item])
        if (onVisibleChange) onVisibleChange(false)
      }
      // 点击取消
      else if (target.classList.contains('actionsheet-cancel')) {
        // 触发点击事件
        if (cancelProps?.onClick) cancelProps.onClick(e)
        if (onVisibleChange) onVisibleChange(false)
      }
      // 点击遮罩
      else if (target.classList.contains('actionsheet-mask')) {
        if (maskProps.onClick) maskProps.onClick(e)
        if (maskClosable && onVisibleChange) onVisibleChange(false)
        return
      }

      // 区分点击事件
      e.stopPropagation()
    }

    // 判断是否选中
    function getIsActive(item) {
      if (Array.isArray(value) && value.length) {
        return value[0]?.id === item.id
      }
      return false
    }

    // 获取项的className
    function getOptionClassName(item) {
      let className = ['actionsheet-option']
      if (otherOptionProps.className) {
        className.push(otherOptionProps.className)
      }
      if (getIsActive(item)) {
        className.push('active')
      }
      return className.join(' ')
    }

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }

    return createPortal(
      <div
        ref={rootRef}
        {...otherMaskProps}
        className={`mask actionsheet-mask${
          otherMaskProps.className ? ' ' + otherMaskProps.className : ''
        }${visible ? ' active' : ''}`}
        style={Object.assign({}, otherMaskProps.style || {})}
        onClick={handleClick}
      >
        <div
          data-animation={animation}
          {...props}
          className={`actionsheet${animationClassName ? ' ' + animationClassName : ''}${
            props.className ? ' ' + props.className : ''
          }${visible ? ' active' : ''}`}
          style={Object.assign({}, props.style || {})}
        >
          <div
            {...otherGroupProps}
            className={`actionsheet-group${
              otherGroupProps.className ? ' ' + otherGroupProps.className : ''
            }`}
          >
            {list &&
              list.map((item, index) => {
                return (
                  <div
                    {...otherOptionProps}
                    className={getOptionClassName(item)}
                    key={index}
                    data-index={index}
                  >
                    {item.name}
                  </div>
                )
              })}
          </div>
          {cancelVisible && (
            <div
              {...otherCancelProps}
              className={`actionsheet-cancel${
                otherCancelProps.className ? ' ' + otherCancelProps.className : ''
              }`}
            >
              {cancelCaption || locale('取消', 'cancel')}
            </div>
          )}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(Modal, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
