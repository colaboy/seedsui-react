import React, { useImperativeHandle, useRef, forwardRef, useState, useEffect } from 'react'

// 内库使用-start
import Modal from './../../../Modal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
测试使用-end */

const Combo = forwardRef(
  (
    {
      // Modal
      offset,
      maskProps,
      // Title
      title = '',
      onBeforeOpen,
      onVisibleChange,
      children,
      ...props
    },
    ref
  ) => {
    const comboRef = useRef(null)
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        comboDOM: comboRef.current,
        getComboDOM: () => comboRef.current,
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

    async function handleClick(e) {
      if (!visible && typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (goOn === false) return
      }

      setVisible(!visible)
    }

    return (
      <>
        <div
          ref={comboRef}
          {...props}
          className={`toolbar-dropdown${visible ? ' active' : ''}${
            props?.className ? ' ' + props.className : ''
          }`}
          onClick={handleClick}
        >
          {title && <span className={`toolbar-dropdown-title`}>{title || ''}</span>}
          <i className="toolbar-dropdown-arrow"></i>
        </div>
        <Modal
          ref={modalRef}
          referenceDOM={comboRef.current}
          {...maskProps}
          offset={offset}
          visible={visible}
          animation="slideDown"
          className="toolbar-dropdown-modal"
          onVisibleChange={setVisible}
        >
          {children}
        </Modal>
      </>
    )
  }
)

export default Combo
