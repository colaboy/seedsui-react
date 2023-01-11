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

      // Modal提升属性
      portal,
      maskProps,
      submitProps,
      cancelProps,
      slotProps,

      multiple,
      maskClosable = true,
      checkStrictly,
      checkable,
      selectable,
      value,
      list = [], // [{id: '', name: ''}]

      onBeforeChange,
      onChange,

      // Combo属性
      allowClear,
      readOnly,
      disabled,
      onBeforeOpen,
      comboRender,
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

    // 自定义弹窗, 默认使用Picker弹窗
    let ModalNode = Modal
    if (ModalComponent) {
      ModalNode = ModalComponent
    }

    // 伸缩属性(Modal提升属性)
    let PickerModalProps = ModalProps || {}
    // 伸缩属性-展示属性
    if (portal !== undefined) {
      PickerModalProps.portal = portal
    }
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
    // 伸缩属性-选择属性
    if (multiple !== undefined) {
      PickerModalProps.multiple = multiple
    }
    if (maskClosable !== undefined) {
      PickerModalProps.maskClosable = maskClosable
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
    // 伸缩属性-值属性
    if (ModalProps?.value === undefined && value !== undefined) {
      PickerModalProps.value = value
    }
    if (list !== undefined) {
      PickerModalProps.list = list
    }
    if (onBeforeChange !== undefined) {
      PickerModalProps.onBeforeChange = onBeforeChange
    }
    if (onChange !== undefined) {
      PickerModalProps.onChange = onChange
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
        {typeof comboRender === 'function' && (
          <div ref={rootRef} {...props} onClick={handleInputClick}>
            {comboRender(value, { displayValue: Utils.getDisplayValue({ value }) })}
          </div>
        )}
        {children && (
          <div ref={rootRef} {...props} onClick={handleInputClick}>
            {children}
          </div>
        )}
        {!children && typeof comboRender !== 'function' && (
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
        <ModalNode
          ref={modalRef}
          getComboDOM={() => {
            return rootRef.current
          }}
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
