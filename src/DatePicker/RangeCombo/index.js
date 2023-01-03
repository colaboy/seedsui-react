import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Picker/Combo'
import RangeModal from './../RangeModal'

import locale from './../../locale'
import Utils from './Utils'

// 日期多选
export default forwardRef(
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
          new Date().prevDate(7),
          new Date()
        ],
        [locale('最近30天', 'datepicker-tooltip_last_days', ['30'])]: [
          new Date().prevDate(30),
          new Date()
        ],
        [locale('自定义时间', 'datepicker-tooltip_custom_date')]: 90
      },
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
    // 显示文本
    let displayValue = Utils.getDisplayValue({ ranges, type, format, value, separator })

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
          return Utils.getDisplayValue({
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
        ref={rootRef}
        value={displayValue}
        ModalComponent={RangeModal}
        ModalProps={{
          ranges: ranges,
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
