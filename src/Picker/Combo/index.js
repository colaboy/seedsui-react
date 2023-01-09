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

      checkStrictly,
      checkable,
      selectable,

      // Modal通用属性
      portal,
      maskClosable = true,
      multiple,
      value,
      list = [], // [{id: '', name: ''}]

      onBeforeChange,
      onChange,

      // Combo属性
      allowClear,
      readOnly,
      disabled,
      onBeforeOpen,
      render,
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

      setVisible(!visible)
      // 隐藏时触发onVisibleChange, 因为显示时Modal会触发onVisibleChange
      if (!visible === false) {
        if (ModalProps.onVisibleChange) ModalProps.onVisibleChange(!visible)
      }
    }

    // 默认使用Picker弹窗
    let ModalRender = Modal
    let PickerModalProps = ModalProps || {}

    // 伸缩属性
    if (maskProps !== undefined) {
      PickerModalProps.maskProps = maskProps
    }
    if (submitProps !== undefined) {
      PickerModalProps.submitProps = submitProps
    }
    if (cancelProps !== undefined) {
      PickerModalProps.cancelProps = cancelProps
    }
    if (slotProps !== undefined) {
      PickerModalProps.slotProps = slotProps
    }
    if (checkStrictly !== undefined) {
      PickerModalProps.checkStrictly = checkStrictly
    }
    if (checkable !== undefined) {
      PickerModalProps.checkable = checkable
    }
    if (selectable !== undefined) {
      PickerModalProps.selectable = selectable
    }

    // 自定义弹窗
    if (ModalComponent) {
      ModalRender = ModalComponent
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
        {typeof render === 'function' && (
          <div ref={rootRef} {...props} onClick={handleInputClick}>
            {render(value, { displayValue: Utils.getDisplayValue({ value }) })}
          </div>
        )}
        {children && (
          <div ref={rootRef} {...props} onClick={handleInputClick}>
            {children}
          </div>
        )}
        {!children && typeof render !== 'function' && (
          <Input.Text
            ref={rootRef}
            allowClear={allowClear}
            value={Utils.getDisplayValue({ value })}
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
          {...PickerModalProps}
          onVisibleChange={(newVisible) => {
            setVisible(newVisible)
            if (ModalProps.onVisibleChange) ModalProps.onVisibleChange(newVisible)
          }}
          visible={ModalProps.visible === undefined ? visible : ModalProps.visible}
        />
      </Fragment>
    )
  }
)

export default Combo
