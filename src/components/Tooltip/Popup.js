import React, { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import Utils from './Utils'

const Popup = forwardRef(
  (
    {
      portal,

      // 内容框
      content,
      animation,
      style,

      // 遮罩
      maskProps = {},

      // 显隐
      visible,
      maskClosable = true,
      onVisibleChange,
      children,
      ...props
    },
    ref
  ) => {
    // 构建动画
    let position = Utils.getAnimationPosition(animation)
    let dataAnimation = Utils.getDataAnimation(animation)

    // 点击遮罩
    function handleMaskClick(e) {
      if (maskProps.onClick) maskProps.onClick(e)
      if (maskClosable && onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 箭头颜色: 根据style中的backgroundColor和borderColor
    let arrowStyle = null
    let arrowOuterStyle = null
    let backgroundColor = style?.backgroundColor
    let borderColor = style?.borderColor
    // 从下往上弹
    if (position.indexOf('bottom') === 0) {
      arrowStyle = backgroundColor
        ? {
            borderTopColor: backgroundColor
          }
        : null
      arrowOuterStyle = borderColor
        ? {
            borderTopColor: borderColor
          }
        : null
    }
    // 从上往下弹
    else {
      arrowStyle = backgroundColor
        ? {
            borderBottomColor: backgroundColor
          }
        : null
      arrowOuterStyle = borderColor
        ? {
            borderBottomColor: borderColor
          }
        : null
    }

    return createPortal(
      <div
        {...maskProps}
        className={`mask tooltip-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
        ref={ref}
      >
        <div
          className={`popup-animation tooltip tooltip-bottom${position ? ' ' + position : ''}${
            props.className ? ' ' + props.className : ''
          }${visible ? ' active' : ''}`}
          style={style}
          data-animation={dataAnimation}
        >
          <div className="tooltip-content">{content}</div>
          <div className="tooltip-arrow-outer" style={arrowOuterStyle}></div>
          <div className="tooltip-arrow" style={arrowStyle}></div>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default Popup
