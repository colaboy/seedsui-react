import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import getIsActive from './getIsActive'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

const Modal = forwardRef(
  (
    {
      allowClear,
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
      cancel,
      maskProps = {},
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

    // 点击选项
    async function handleClickOption(e, item) {
      e.stopPropagation()

      // 触发点击事件
      if (optionProps?.onClick) optionProps.onClick(e)
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange([item])
        if (goOn === false) return
      }
      // 触发onChange事件
      if (onChange) onChange([item])
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

    // 获取取消按钮节点
    function getCancelNode() {
      if (typeof cancel === 'function') {
        return cancel()
      } else if (cancel !== undefined) {
        return cancel
      }
      return (
        <div
          className={`actionsheet-cancel`}
          onClick={() => {
            if (onVisibleChange) onVisibleChange(false)
          }}
        >
          {LocaleUtil.locale('取消', 'SeedsUI_cancel')}
        </div>
      )
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
          {getCancelNode()}
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
