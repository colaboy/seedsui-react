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
      // 标题
      captionProps,
      // deprecated: use captionProps instead
      titleProps,
      // deprecated: use captionProps.caption instead
      title,
      onClick,
      onBeforeOpen,
      onBeforeClose,

      visible: originVisible,
      onVisibleChange,
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

    // allow parameter control the visible
    useEffect(() => {
      if (originVisible !== visible) {
        setVisible(originVisible)
      }
      // eslint-disable-next-line
    }, [originVisible])

    // 点击nav
    async function handleClick(e) {
      if (!visible && typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (!goOn) return
      }
      if (visible && typeof onBeforeClose === 'function') {
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

    // 过滤属性，过滤无用的属性
    function filterProps(props) {
      let {
        portal,
        offset,
        maskClosable,
        maskProps,
        captionProps,
        submitProps,
        cancelProps,
        ...otherProps
      } = props
      return otherProps
    }

    // deprecated props
    let { caption, ...otherCaptionProps } = captionProps || {}
    // deprecated: use captionProps instead
    if (titleProps) {
      otherCaptionProps = titleProps
    }
    // deprecated: use captionProps.caption instead
    if (title) {
      caption = title
    }

    return (
      <>
        <div
          ref={rootRef}
          {...filterProps(props)}
          className={`modal-dropdown-nav${visible ? ' active' : ''}${
            props.className ? ' ' + props.className : ''
          }`}
          onClick={handleClick}
        >
          {caption && (
            <span
              {...otherCaptionProps}
              className={`modal-dropdown-title-text${
                otherCaptionProps?.className ? ' ' + otherCaptionProps.className : ''
              }`}
            >
              {caption || ''}
            </span>
          )}
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
          onVisibleChange={setVisible}
          {...ModalProps}
        >
          {children}
        </ModalNode>
      </>
    )
  }
)

export default Dropdown
