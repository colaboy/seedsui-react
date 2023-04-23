import React, { useImperativeHandle, useRef, forwardRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import TooltipUtils from './../Tooltip/Utils'
import locale from './../locale'

const Modal = forwardRef(
  (
    {
      portal,
      animation = 'zoom', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      // 自动调整位置
      sourceDOM = null,

      visible,
      maskClosable = true,
      onVisibleChange,

      maskProps = {},
      captionProps = {},
      submitProps = {},
      cancelProps = {},

      children,
      ...props
    },
    ref
  ) => {
    // 增加保护
    /* eslint-disable */
    if (!maskProps) maskProps = {}
    if (!captionProps) captionProps = {}
    if (!submitProps) submitProps = {}
    if (!cancelProps) cancelProps = {}
    /* eslint-enable */

    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => {
          return rootRef.current
        }
      }
    })

    useEffect(() => {
      // 更新模态框位置对齐目标元素
      updateModalPosition()
      // eslint-disable-next-line
    }, [visible])

    // 受控显隐时, 需要更新容器位置
    function updateModalPosition() {
      let maskDOM = rootRef?.current
      // eslint-disable-next-line
      if (typeof sourceDOM === 'function') sourceDOM = sourceDOM()
      if (!sourceDOM || !maskDOM) return
      if (visible && sourceDOM && maskDOM && !maskProps?.style?.top && !maskProps?.style?.bottom) {
        TooltipUtils.updateContainerPosition({
          source: sourceDOM,
          target: maskDOM,
          animation: animation
        })
      }
    }

    // 构建动画
    let position = TooltipUtils.getAnimationPosition(animation)

    // 判断是否是要生成Alert框
    function getIsAlert() {
      const { caption: titleText } = captionProps
      const { caption: cancelText, onClick: cancelClick } = cancelProps
      const { caption: submitText, onClick: submitClick } = submitProps
      if (titleText || cancelText || cancelClick || submitText || submitClick) return true
      return false
    }

    // 获取内容
    function getChildren() {
      // 标题
      let caption = null
      const { caption: titleText, ...otherCaptionProps } = captionProps
      if (titleText) {
        caption = (
          <div
            {...otherCaptionProps}
            className={`modal-caption${
              otherCaptionProps.className ? ' ' + otherCaptionProps.className : ''
            }`}
          >
            {titleText}
          </div>
        )
      }

      // 底部
      let footer = []

      // 取消
      const { caption: cancelText, onClick: cancelClick, ...otherCancelProps } = cancelProps
      if (cancelText || cancelClick) {
        footer.push(
          <div
            key="footer-cancel"
            onClick={handleCancel}
            {...otherCancelProps}
            className={`modal-cancel button${
              otherCancelProps.className ? ' ' + otherCancelProps.className : ''
            }`}
          >
            {cancelText || locale('取消', 'cancel')}
          </div>
        )
      }

      // 确定
      const { caption: submitText, onClick: submitClick, ...otherSubmitProps } = submitProps
      if (submitText || submitClick) {
        footer.push(
          <div
            key="footer-ok"
            onClick={handleSubmit}
            {...otherSubmitProps}
            className={`modal-ok button${
              otherSubmitProps.className ? ' ' + otherSubmitProps.className : ''
            }`}
          >
            {submitText || locale('确定', 'ok')}
          </div>
        )
      }

      if (footer.length) {
        footer = <div className="modal-footer">{footer}</div>
      } else {
        footer = null
      }

      // 有标题或者有底部时
      if (caption || footer) {
        return (
          <>
            <div className="modal-body">
              {caption}
              <div className="modal-content">{children}</div>
            </div>
            {footer}
          </>
        )
      }
      return children
    }

    // 点击遮罩
    function handleMaskClick(e) {
      if (maskProps.onClick) maskProps.onClick(e)
      if (maskClosable && onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 点击模态框
    function handleModalClick(e) {
      e.stopPropagation()
    }

    // 点击确定或者取消按钮
    function handleButton(e, buttonProps) {
      if (typeof buttonProps?.onClick === 'function') {
        let close = buttonProps.onClick() ?? true
        if (close) {
          if (onVisibleChange) onVisibleChange(false)
        }
      } else {
        if (onVisibleChange) onVisibleChange(false)
      }
      e.stopPropagation()
    }
    // 点击确定
    function handleSubmit(e) {
      handleButton(e, submitProps)
    }
    // 点击取消
    function handleCancel(e) {
      handleButton(e, cancelProps)
    }

    // 获取激活状态样式
    function getActiveClass() {
      return visible ? ' active' : ''
    }

    let ModalNode = (
      <div
        {...maskProps}
        className={`mask modal-mask${
          maskProps.className ? ' ' + maskProps.className : ''
        }${getActiveClass()}`}
        onClick={handleMaskClick}
        ref={rootRef}
      >
        <div
          {...props}
          className={`popup-animation modal${getIsAlert() ? ' modal-alert' : ''}${
            position ? ' ' + position : ''
          }${props.className ? ' ' + props.className : ''}${getActiveClass()}`}
          data-animation={animation}
          onClick={handleModalClick}
        >
          {getChildren()}
        </div>
      </div>
    )

    if (portal === null || portal === false) {
      return ModalNode
    }
    return createPortal(ModalNode, portal || document.getElementById('root') || document.body)
  }
)

export default Modal
