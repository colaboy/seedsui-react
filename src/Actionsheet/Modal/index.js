import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'
import getIsActive from './getIsActive'

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
    // eslint-disable-next-line
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

    const { visible: cancelVisible, caption: cancelCaption, ...otherCancelProps } = cancelProps

    // 点击选项
    async function handleClickOption(e, item) {
      e.stopPropagation()

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
    async function handleClickCancel(e) {
      e.stopPropagation()
      if (cancelProps?.onClick) {
        let goOn = cancelProps.onClick(e)
        if (goOn === false) {
          return
        }
      }
      if (onVisibleChange) onVisibleChange(false)
    }

    // 点击遮罩
    async function handleClickMask(e) {
      e.stopPropagation()

      if (maskProps.onClick) {
        let goOn = maskProps.onClick(e)
        if (goOn === false) {
          return
        }
      }
      if (maskClosable && onVisibleChange) onVisibleChange(false)
    }

    return createPortal(
      <div
        {...maskProps}
        className={`mask actionsheet-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        style={Object.assign({}, maskProps.style || {})}
        onClick={handleClickMask}
        ref={rootRef}
      >
        <div
          data-animation={animation}
          {...props}
          className={`popup-animation actionsheet${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          <div
            {...groupProps}
            className={`actionsheet-group${groupProps.className ? ' ' + groupProps.className : ''}`}
          >
            {list &&
              list.map((item, index) => {
                return (
                  <div
                    {...optionProps}
                    className={`actionsheet-option${getIsActive(item, value) ? ' active' : ''}`}
                    key={index}
                    data-index={index}
                    onClick={(e) => handleClickOption(e, item, index)}
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
              onClick={handleClickCancel}
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
