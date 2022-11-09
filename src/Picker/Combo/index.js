import React, { forwardRef, useRef, useImperativeHandle, Fragment, useState } from 'react'
import Input from './../../Input'
import Modal from './../Modal'
import Utils from './Utils'

const Combo = forwardRef(
  (
    {
      // 自定义Modal组件
      ModalComponent,
      ModalProps = {},

      // 定制属性
      maskProps,
      submitProps,
      cancelProps,
      slotProps,

      // Modal通用属性
      portal,
      maskClosable = true,
      multiple,
      value,
      list = [], // [{id: '', name: ''}]

      onBeforeChange,
      onChange,

      // visible = false,
      // onVisibleChange,

      // Combo属性
      allowClear,
      readOnly,
      disabled,
      onBeforeOpen,
      children,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.getRootDOM ? rootRef.current.getRootDOM() : rootRef.current,
        modalDOM: modalRef?.current?.modalDOM,
        instance: modalRef?.current?.instance,
        getRootDOM: () => {
          // div
          let rootDOM = rootRef?.current
          // Input.Text
          if (rootRef?.current?.getRootDOM) {
            rootDOM = rootRef.current.getRootDOM()
          }
          return rootDOM
        },
        getModalDOM: modalRef?.current?.getRootDOM,
        getInstance: modalRef?.current?.getInstance
      }
    })

    // 控制Modal显隐
    const [visible, setVisible] = useState(false)

    // 点击文本框
    async function handleInputClick() {
      if (readOnly || disabled) return
      if (typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (!goOn) return
      }
      setVisible(true)
    }

    // 默认使用Picker弹窗
    let ModalRender = Modal
    let PickerModalProps = ModalProps

    // 自定义弹窗
    if (ModalComponent) {
      ModalRender = ModalComponent
    }
    // Picker弹窗: 需要传入定制属性
    else {
      PickerModalProps = {
        maskProps: maskProps,
        submitProps: submitProps,
        cancelProps: cancelProps,
        slotProps: slotProps,
        ...ModalProps
      }
    }

    // 允许清空
    if (allowClear) {
      if (readOnly || disabled) {
        allowClear = false
      } else {
        allowClear = 'readOnly'
      }
    }
    return (
      <Fragment>
        {/* Combo */}
        {children && (
          <div ref={rootRef} {...props} onClick={handleInputClick}>
            {children}
          </div>
        )}
        {!children && (
          <Input.Text
            ref={rootRef}
            allowClear={allowClear}
            value={Utils.getDisplayValue(value)}
            readOnly
            onClick={handleInputClick}
            onChange={onChange}
            {...props}
          />
        )}
        {/* Modal */}
        <ModalRender
          ref={modalRef}
          portal={portal}
          getComboDOM={() => {
            return rootRef.current
          }}
          maskClosable={maskClosable}
          multiple={multiple}
          value={value}
          list={list}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onVisibleChange={setVisible}
          {...PickerModalProps}
          visible={ModalProps.visible === undefined ? visible : ModalProps.visible}
        />
      </Fragment>
    )
  }
)

export default Combo
