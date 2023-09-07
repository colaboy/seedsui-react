import React, { forwardRef } from 'react'
import locale from './../../locale'
import getRangeDisplayValue from './getRangeDisplayValue'

import Combo from './../../Select/Combo'
import Modal from './../MultipleModal'

// 日期区间
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
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        ModalComponent={Modal}
        ranges={ranges}
        displayValueFormatter={getRangeDisplayValue}
        {...props}
      />
    )
  }
)

export default RangeCombo
