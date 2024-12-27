import React, { useState, forwardRef, useRef, useImperativeHandle, Fragment } from 'react'
import InputText from './../InputText'
import PickerDistrict from './../PickerDistrict'

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
/**
 * @deprecated since version 5.2.8
 * 请使用Cascader.Combo或者Cascader.DistrictCombo
 */
const InputDistrict = forwardRef(
  (
    {
      // Input
      value,
      onClick,
      onChange,

      // Picker
      type = '', // country | province | city | district | street (其中province、city、district、street,只有中国时才生效, 因为只有中国有省市区)
      pickerProps = {}, // maskAttribute: {}, submitAttribute: {}

      children,
      ...others
    },
    ref
  ) => {
    const inputTextRef = useRef(null)
    useImperativeHandle(ref, () => {
      return inputTextRef.current
    })

    let [show, setShow] = useState(false)

    // 点击文本框
    function handleClickInput(...parameter) {
      if (onClick) onClick(...parameter)
      if (others.readOnly) return
      setShow(!show)
    }
    // 点击遮罩
    function onClickMask(e) {
      if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
        pickerProps.maskAttribute.onClick(e)
      }
      setShow(!show)
    }
    // 点击确定按钮
    function onClickSubmit(e, value, options) {
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
        // 允许确定错误时中断隐藏
        if (pickerProps.submitAttribute.onClick(e, value, options) === false) return
      } else if (onChange) {
        onChange(e, value, options)
      }
      // 隐藏框
      setShow(!show)
    }
    // 点击取消按钮
    function onClickCancel(e) {
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
        pickerProps.cancelAttribute.onClick(e)
      }
      setShow(!show)
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
            value={value}
            {...others}
            type="text"
            readOnly
            onClick={handleClickInput}
          />
        )}
        <PickerDistrict
          type={type}
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
          value={value}
          show={pickerProps.show === undefined ? show : pickerProps.show}
        />
      </Fragment>
    )
  }
)

export default InputDistrict
