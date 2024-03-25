import React, { forwardRef, useEffect, useState } from 'react'
import locale from '../../locale'
import { validateRange } from './../utils'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

import MultipleMain from './../MultipleMain'
import { getRangeDates } from './../utils'

// 日期区间弹窗
const PickerMain = function (
  {
    portal,
    type,
    min,
    max,
    rangeLimit,
    dateRangeLimit,
    allowClear,
    value,
    defaultPickerValue,
    onBeforeChange,
    onChange,
    onError,
    ...props
  },
  ref
) {
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

  async function handleChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]

    // 校验
    let goOn = await validateRange(newValue, {
      type,
      min,
      max,
      dateRangeLimit: typeof dateRangeLimit === 'number' ? dateRangeLimit : rangeLimit?.date,
      onError,
      onBeforeChange,
      activeKey: null,
      ranges: null
    })
    if (goOn === false) {
      setMultipleDate(Object.clone(multipleDate))
      return
    }

    if (onChange) {
      return onChange(newValue)
    }
  }

  // 未构建完成Tabs不渲染
  if (!multipleDate) {
    return null
  }

  return (
    <MultipleMain
      ref={ref}
      portal={portal}
      type={type}
      value={multipleDate}
      onChange={handleChange}
      {...props}
    />
  )
}

export default forwardRef(PickerMain)
