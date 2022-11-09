import React, { forwardRef, useRef, useImperativeHandle, Fragment, useState } from 'react'
import InputText from './../InputText'
import Picker from './../Picker'

/**
 * @deprecated since version 5.2.8
 * 请使用<Picker.Combo />
 */
const InputPicker = forwardRef(
  (
    {
      // Input
      onClick,
      onChange,

      // Picker
      list = [], // [{id: '', name: ''}]
      selected,
      pickerProps = {},

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
    function onClickMask(e) {
      if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
        pickerProps.maskAttribute.onClick(e)
        return
      }
      setShow(false)
    }
    // 点击确定按钮
    function onClickSubmit(e, value, options) {
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
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
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
        pickerProps.cancelAttribute.onClick(e)
        return
      }
      setShow(false)
    }
    // 过滤非法数据
    list = list.filter((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    return (
      <Fragment>
        {children && (
          <div ref={inputTextRef} {...others} onClick={handleClickInput}>
            {children}
          </div>
        )}
        {!children && (
          <InputText ref={inputTextRef} {...others} readOnly onClick={handleClickInput} />
        )}
        <Picker
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
          list={list}
          selected={selected}
          value={others.value}
          show={pickerProps.show === undefined ? show : pickerProps.show}
        />
      </Fragment>
    )
  }
)

export default InputPicker
