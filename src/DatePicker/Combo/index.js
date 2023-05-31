import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'
import { getDateDisplayValue } from './../utils'

// 日期选择
const DatePickerCombo = forwardRef(
  (
    {
      // 定制属性
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      value,
      defaultPickerValue,
      format,
      onError,
      ModalProps,
      // 其它标准属性
      ...props
    },
    ref
  ) => {
    // 显示文本
    let displayValue = getDateDisplayValue({
      type: type,
      format: format,
      value: value
    })

    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        modalDOM: rootRef?.current?.modalDOM,
        instance: instance.current,
        getRootDOM: rootRef?.current?.getRootDOM,
        getModalDOM: rootRef?.current?.getModalDOM,
        getInstance: () => instance.current,
        close: rootRef?.current?.close,
        open: rootRef?.current?.open,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return getDateDisplayValue({
            type: type,
            format: format,
            value: newValue || value
          })
        }
      }
    })

    return (
      <Combo
        value={displayValue}
        ModalComponent={Modal}
        ModalProps={{
          value: value,
          defaultPickerValue: defaultPickerValue,
          min: min,
          max: max,
          type: type,
          onError: onError,
          ...ModalProps
        }}
        {...props}
        ref={rootRef}
      />
    )
  }
)

export default DatePickerCombo
