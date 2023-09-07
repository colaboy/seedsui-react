import React, { useEffect, useState } from 'react'
import locale from '../../../locale'

import MultipleModal from './../../MultipleModal'
import getDates from './../../RangeModal/getDates'

// 日期区间弹窗
const DateRangeModal = function ({ value, defaultPickerValue, type, onChange, ...props }) {
  const [multipleDate, setMultipleDate] = useState(null)
  useEffect(() => {
    const { startDate, endDate } = getDates(value)
    const { startDate: defaultStartDate, endDate: defaultEndDate } = getDates(defaultPickerValue)
    setMultipleDate([
      {
        type: type,
        id: 'start',
        name: locale('开始时间', 'start_time'),
        value: startDate,
        defaultPickerValue: defaultStartDate
      },
      {
        type: type,
        id: 'end',
        name: locale('结束时间', 'end_time'),
        value: endDate,
        defaultPickerValue: defaultEndDate
      }
    ])
  }, [value]) // eslint-disable-line

  // 未构建完成Tabs不渲染
  if (!multipleDate) {
    return null
  }

  return <MultipleModal maskClosable value={multipleDate} onChange={onChange} {...props} />
}

export default DateRangeModal
