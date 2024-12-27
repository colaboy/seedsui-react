import React, { forwardRef, useRef, useImperativeHandle, useState, Fragment } from 'react'
import InputText from './../InputText'
import PickerCity from './../PickerCity'

const InputCity = forwardRef(
  (
    {
      // Input
      onClick,
      onChange,

      // Picker
      type = 'district',
      selected,
      pickerProps = {},
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
    function onClickInput(...parameter) {
      if (onClick) onClick(...parameter)
      if (others.readOnly) return
      setShow(true)
    }
    // 点击遮罩
    function onClickMask(e) {
      if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
        pickerProps.maskAttribute.onClick(e)
        return
      }
      setShow(false)
    }
    // 点击确定按钮
    function onClickSubmit(e, value, options) {
      if (inputTextRef.current) e.target = inputTextRef.current
      // 确定按钮回调
      if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
        // 允许确定错误时中断隐藏
        if (pickerProps.submitAttribute.onClick(e, value, options) === false) return
      } else if (onChange) {
        onChange(e, value, options)
      }
      // 隐藏框
      setShow(false)
    }
    // 点击取消按钮
    function onClickCancel(e) {
      if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
        pickerProps.cancelAttribute.onClick(e)
        return
      }
      setShow(false)
    }

    return (
      <Fragment>
        <InputText ref={inputTextRef} {...others} type="text" readOnly onClick={onClickInput} />
        <PickerCity
          {...pickerProps}
          maskAttribute={{
            ...pickerProps.maskAttribute,
            onClick: onClickMask
          }}
          submitAttribute={{
            ...pickerProps.submitAttribute,
            onClick: onClickSubmit
          }}
          cancelAttribute={{
            ...pickerProps.cancelAttribute,
            onClick: onClickCancel
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

export default InputCity
