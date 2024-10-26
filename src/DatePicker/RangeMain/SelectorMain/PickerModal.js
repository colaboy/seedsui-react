import React, { useEffect, useState } from 'react'
import locale from '../../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

import MultipleModal from './../../MultipleModal'
import { getRangeDates } from './../../utils'

// 日期区间弹窗
const DateRangeModal = function ({ value, type, disabledStart, disabledEnd, onChange, ...props }) {
  const [multipleDate, setMultipleDate] = useState(null)
  useEffect(() => {
    const { startDate, endDate } = getRangeDates(value)

    setMultipleDate([
      {
        type: type,
        id: 'start',
        name: locale('开始时间', 'SeedsUI_start_time'),
        value: startDate,
        disabled: disabledStart
      },
      {
        type: type,
        id: 'end',
        name: locale('结束时间', 'SeedsUI_end_time'),
        value: endDate,
        disabled: disabledEnd
      }
    ])
  }, [value]) // eslint-disable-line

  function handleChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]

    if (onChange) {
      return onChange(newValue)
    }
  }

  // 未构建完成Tabs不渲染
  if (!multipleDate) {
    return null
  }

  return <MultipleModal value={multipleDate} onChange={handleChange} {...props} />
}

export default DateRangeModal
