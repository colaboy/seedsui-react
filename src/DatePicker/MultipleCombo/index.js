import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Picker/Combo'
import MultipleModal from './../MultipleModal'

import { getMultipleDisplayValue } from './../utils'
import formatValue from './formatValue'

// 日期多选
export default forwardRef(
  (
    {
      // 定制属性
      separator,
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      value,
      format,
      onError,
      ModalProps,
      // 其它标准属性
      ...props
    },
    ref
  ) => {
    // value必传
    // eslint-disable-next-line
    value = formatValue({ value })

    // 显示文本
    let displayValue = getMultipleDisplayValue({ type, format, value, separator })

    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        modalDOM: rootRef?.current?.modalDOM,
        getRootDOM: rootRef?.current?.getRootDOM,
        getModalDOM: rootRef?.current?.getModalDOM,
        close: rootRef?.current?.close,
        open: rootRef?.current?.open,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return getMultipleDisplayValue({ type, format, value: newValue || value, separator })
        }
      }
    })

    return (
      <Combo
        value={displayValue}
        ModalComponent={MultipleModal}
        ModalProps={{
          value: value,
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
