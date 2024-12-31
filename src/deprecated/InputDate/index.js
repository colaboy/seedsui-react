import React from 'react'
import InputDate from './InputDate.js'
import InputDateRange from './InputDateRange.js'
import InputDateRangePopover from './InputDateRangePopover.js'

// 日期控件, 支持通过类型使用不同的控件
/**
 * @deprecated since version 5.2.8
 * 请使用DatePicker.Combo
 */
// eslint-disable-next-line
export default (props) => {
  let { type = 'date', ...others } = props

  // 类型判断
  if (
    ![
      'year',
      'quarter',
      'month',
      'datetime',
      'date',
      'time',
      'year-range',
      'quarter-range',
      'month-range',
      'datetime-range',
      'date-range',
      'time-range',
      'date-range-popover'
    ].includes(type)
  ) {
    type = 'date'
  }

  // 日期类型
  let Component = InputDate
  // 弹框区间类型
  if (type === 'date-range-popover') {
    Component = InputDateRangePopover
  }
  // 日期区间类型
  else if (type.indexOf('-range') !== -1) {
    Component = InputDateRange
  }
  return <Component type={type} {...others}></Component>
}
