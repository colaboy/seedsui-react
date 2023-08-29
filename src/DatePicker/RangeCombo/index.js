import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Select/Combo'
import RangeModal from './../RangeModal'

import locale from './../../locale'
import { getRangeDisplayValue } from './../utils'

// 日期多选
const RangeCombo = forwardRef(
  (
    {
      // 定制属性
      ranges = {
        [locale('今天', 'datepicker-tooltip_today')]: [new Date(), new Date()],
        [locale('昨天', 'datepicker-tooltip_yesterday')]: [
          new Date().prevDate(),
          new Date().prevDate()
        ],
        [locale('本月', 'datepicker-tooltip_this_month')]: [
          new Date().firstMonthDate(),
          new Date()
        ],
        [locale('上月', 'datepicker-tooltip_last_month')]: [
          new Date().prevMonth().firstMonthDate(),
          new Date().prevMonth().lastMonthDate()
        ],
        [locale('最近7天', 'datepicker-tooltip_last_days', ['7'])]: [
          new Date().prevDate(6),
          new Date()
        ],
        [locale('最近30天', 'datepicker-tooltip_last_days', ['30'])]: [
          new Date().prevDate(29),
          new Date()
        ],
        [locale('自定义时间', 'datepicker-tooltip_custom_date')]: 0
      },
      // 快捷选择弹出方式
      rangesModal,
      separator,
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
    let displayValue = getRangeDisplayValue({ ranges, type, format, value, separator })

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
          return getRangeDisplayValue({
            ranges,
            type,
            format,
            value: newValue || value,
            separator
          })
        }
      }
    })

    return (
      <Combo
        value={displayValue}
        ModalComponent={RangeModal}
        ModalProps={{
          ranges: ranges,
          rangesModal: rangesModal,
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

export default RangeCombo
