import React, { useImperativeHandle, useRef, forwardRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

// 内库使用-start
import Tooltip from './../Tooltip'
// 内库使用-end

/* 测试使用-start
import { Tooltip } from 'seedsui-react'
测试使用-end */

const Modal = forwardRef(
  (
    {
      portal,
      animation = 'zoom', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      // 自动调整位置
      sourceDOM = null,
      offset = null,

      visible,
      maskClosable = true,
      onVisibleChange,

      maskProps = {},

      children,
      ...props
    },
    ref
  ) => {
    // 增加保护
    // eslint-disable-next-line
    if (!maskProps) maskProps = {}

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
        Tooltip.updateContainerPosition({
          source: sourceDOM,
          target: maskDOM,
          animation: animation,
          offset: offset
        })
      }
    }

    // 构建动画
    let position = Tooltip.getAnimationPosition(animation)

    // 点击遮罩
    function handleMaskClick(e) {
      if (maskProps?.onClick) maskProps.onClick(e)
      if (maskClosable && onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 点击模态框
    function handleModalClick(e) {
      e.stopPropagation()
    }

    // 获取激活状态样式
    function getActiveClass() {
      return visible ? ' active' : ''
    }

    let ModalNode = (
      <div
        {...maskProps}
        className={`mask modal-mask${
          maskProps?.className ? ' ' + maskProps.className : ''
        }${getActiveClass()}`}
        onClick={handleMaskClick}
        ref={rootRef}
      >
        <div
          {...props}
          className={`popup-animation modal${position ? ' ' + position : ''}${
            props.className ? ' ' + props.className : ''
          }${getActiveClass()}`}
          data-animation={animation}
          onClick={handleModalClick}
        >
          {children}
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
