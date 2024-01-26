import React, { useEffect, useState } from 'react'
import locale from '../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

import MultipleModal from './../MultipleModal'
import { getRangeDates } from './../utils'

// 日期区间弹窗
const DateRangeModal = function ({
  value,
  defaultPickerValue,
  type,
  onBeforeChange,
  onChange,
  ...props
}) {
  const [multipleDate, setMultipleDate] = useState(null)
  useEffect(() => {
    const { startDate, endDate } = getRangeDates(value)
    const { startDate: defaultStartDate, endDate: defaultEndDate } =
      getRangeDates(defaultPickerValue)
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

  async function handleBeforeChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]
    if (typeof onBeforeChange === 'function') {
      return onBeforeChange(newValue)
    }
    return true
  }

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

  return (
    <MultipleModal
      value={multipleDate}
      onBeforeChange={handleBeforeChange}
      onChange={handleChange}
      {...props}
    />
  )
}

export default DateRangeModal
