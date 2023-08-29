import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Select/Combo'
import MultipleModal from './../MultipleModal'

import { getMultipleDisplayValue } from './../utils'

// 日期多选
const MultipleCombo = forwardRef(
  (
    {
      // 定制属性
      separator,
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      // 值与配置
      // [{
      //   type: 'date',
      //   id: 'start',
      //   name: 'Start',
      //   value: new Date('2009-09-09'),
      //   defaultPickerValue: new Date('2022-08-22 00:00')
      // }]
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
      ],
      format,
      onError,
      ModalProps,
      // 其它标准属性
      ...props
    },
    ref
  ) => {
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

    if (!Array.isArray(value) || !value.length) {
      console.warn(
        "DatePicker.MultipleCombo: Wrong parameter with \"value\"! You need to correct to [{type: 'date', id: 'start', name: '开始时间', value: new Date()}]]",
        value
      )
      return null
    }
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

export default MultipleCombo
