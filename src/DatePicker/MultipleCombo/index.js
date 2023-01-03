import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Picker/Combo'
import MultipleModal from './../MultipleModal'

import locale from './../../locale'
import Utils from './Utils'

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
    if (!value) {
      value = [
        {
          type: 'date',
          id: 'start',
          name: locale('开始时间', 'start_time'),
          value: new Date()
        },
        {
          type: 'date',
          id: 'end',
          name: locale('结束时间', 'end_time'),
          value: new Date()
        }
      ]
    }

    // 显示文本
    let displayValue = Utils.getDisplayValue({ type, format, value, separator })

    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        modalDOM: rootRef?.current?.modalDOM,
        getRootDOM: rootRef?.current?.getRootDOM,
        getModalDOM: rootRef?.current?.getModalDOM,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return Utils.getDisplayValue({ type, format, value: newValue || value, separator })
        }
      }
    })

    return (
      <Combo
        ref={rootRef}
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
      />
    )
  }
)
