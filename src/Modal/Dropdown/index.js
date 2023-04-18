import React, { useImperativeHandle, useRef, forwardRef, useState, useEffect } from 'react'
import Modal from './../Modal'

const Dropdown = forwardRef(
  (
    {
      // 自定义Modal组件
      ModalComponent,
      ModalProps = {},

      // nav属性
      arrow = true,
      title,
      onClick,
      onBeforeOpen,
      onBeforeClose,

      // Modal变量提升
      portal,
      maskClosable,
      onVisibleChange,
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      children,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current,
        modalDOM: modalRef?.current?.modalDOM,
        getModalDOM: modalRef?.current?.getRootDOM,
        close: () => {
          setVisible(false)
        },
        open: () => {
          setVisible(true)
        }
      }
    })

    // 控制Modal显隐
    const [visible, setVisible] = useState(null)

    useEffect(() => {
      if (visible === null) return
      typeof onVisibleChange === 'function' && onVisibleChange(visible)
      // eslint-disable-next-line
    }, [visible])

    // 点击nav
    async function handleClick(e) {
      if (visible === false && typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (!goOn) return
      }
      if (visible === true && typeof onBeforeClose === 'function') {
        let goOn = await onBeforeClose()
        if (!goOn) return
      }
      if (typeof onClick === 'function') {
        onClick(e)
      }

      setVisible(!visible)
    }

    let arrowDOM = null
    if (typeof arrow === 'boolean') {
      arrowDOM = arrow === true ? <i className="modal-dropdown-title-arrow"></i> : null
    } else {
      arrowDOM = arrow
    }

    // 自定义弹窗, 默认使用Picker弹窗
    let ModalNode = Modal
    if (ModalComponent) {
      ModalNode = ModalComponent
    }
    return (
      <>
        <div
          ref={rootRef}
          {...props}
          className={`modal-dropdown-nav${visible ? ' active' : ''}${
            props.className ? ' ' + props.className : ''
          }`}
          onClick={handleClick}
        >
          {title && <span className="modal-dropdown-title-text">{title}</span>}
          {arrowDOM}
        </div>
        <ModalNode
          ref={modalRef}
          sourceDOM={() => {
            return rootRef.current
          }}
          visible={visible}
          animation="slideDown"
          className="modal-dropdown-modal"
          // Modal变量提升
          portal={portal}
          maskClosable={maskClosable}
          onVisibleChange={setVisible}
          maskProps={maskProps}
          captionProps={captionProps}
          submitProps={submitProps}
          cancelProps={cancelProps}
          {...ModalProps}
        >
          {children}
        </ModalNode>
      </>
    )
  }
)

export default Dropdown
