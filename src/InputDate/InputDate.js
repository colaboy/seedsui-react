// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useRef, useImperativeHandle, useState, Fragment } from 'react'
import InputText from './../InputText'
import PickerDate from './../PickerDate'
import helper from './helper'

/**
 * @deprecated since version 5.2.8
 * 请使用DatePicker.Combo
 */
const InputDate = forwardRef(
  (
    {
      // Input
      min, // YYYY-MM-DD
      max, // YYYY-MM-DD
      onClick,
      onChange,
      onError, // func(e, err)

      // Picker
      type = 'date', // datetime|date|time
      selected,
      pickerProps = {},
      // 子元素
      children,
      ...others
    },
    ref
  ) => {
    const inputTextRef = useRef(null)
    useImperativeHandle(ref, () => {
      return inputTextRef.current
    })
    const [show, setShow] = useState(false)

    // 点击文本框
    function handleClickInput(...parameter) {
      if (onClick) onClick(...parameter)
      if (others.readOnly) return
      setShow(true)
    }
    // 点击遮罩
    function handleClickMask(e) {
      if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
        pickerProps.maskAttribute.onClick(e)
        return
      }
      setShow(false)
    }
    // 点击确定按钮
    function handleClickSubmit(e, value, options) {
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      let val = helper.validateDate(value, {
        type: type,
        min: min,
        max: max,
        split: pickerProps.split || '-',
        timeSplit: pickerProps.timeSplit || ':',
        e: e,
        onError: onError
      })
      if (val === false) return
      // 确定按钮回调
      if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
        // 允许确定错误时中断隐藏
        if (pickerProps.submitAttribute.onClick(e, val, options) === false) return
      } else if (onChange) {
        onChange(e, val, options)
      }
      // 隐藏框
      setShow(false)
    }
    // 点击取消按钮
    function handleClickCancel(e) {
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
        pickerProps.cancelAttribute.onClick(e)
        return
      }
      setShow(false)
    }

    return (
      <Fragment>
        {children && (
          <div ref={inputTextRef} {...others} onClick={handleClickInput}>
            {children}
          </div>
        )}
        {!children && (
          <InputText
            ref={inputTextRef}
            {...others}
            type="text"
            readOnly
            onClick={handleClickInput}
          />
        )}
        <PickerDate
          {...pickerProps}
          maskAttribute={{
            ...pickerProps.maskAttribute,
            onClick: handleClickMask
          }}
          submitAttribute={{
            ...pickerProps.submitAttribute,
            onClick: handleClickSubmit
          }}
          cancelAttribute={{
            ...pickerProps.cancelAttribute,
            onClick: handleClickCancel
          }}
          selected={selected}
          type={type}
          value={others.value}
          show={pickerProps.show === undefined ? show : pickerProps.show}
        />
      </Fragment>
    )
  }
)

export default InputDate
