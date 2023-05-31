import React, { useEffect, useState } from 'react'
import locale from '../../locale'

import MultipleModal from './../MultipleModal'
import { getDates, validateTime, validateDays } from './../utils'

// 日期区间弹窗
const DateRangeModal = function ({
  captionProps,
  submitProps,
  cancelProps,

  maskClosable,
  maskProps,
  value,
  defaultPickerValue,
  ranges,
  type,
  min,
  max,
  onError,
  onBeforeChange,
  onChange,
  visible,
  onVisibleChange
}) {
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

  // 校验选择的区间是否合法
  function handleBeforeChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]
    let timeValid = validateTime(newValue, { type: type, onError: onError })
    let daysValid = true
    let daysLimit =
      toString.call(ranges) === '[object Object]' && !Object.isEmptyObject(ranges)
        ? Object.values(ranges)[0]
        : null
    if (typeof daysLimit === 'number') {
      daysValid = validateDays(newValue, { daysLimit: daysLimit, onError: onError })
    }
    return timeValid && daysValid
  }

  async function handleChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]
    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue)
      if (!goOn) return
    }
    if (onChange) onChange(newValue)
  }

  // 未构建完成Tabs不渲染
  if (!multipleDate) {
    return null
  }

  console.log('multipleDate:', multipleDate)
  return (
    <MultipleModal
      captionProps={captionProps}
      submitProps={submitProps}
      cancelProps={cancelProps}
      maskClosable={maskClosable}
      maskProps={maskProps}
      value={multipleDate}
      type={type}
      min={min}
      max={max}
      onError={onError}
      onBeforeChange={handleBeforeChange}
      onChange={handleChange}
      visible={visible}
      onVisibleChange={onVisibleChange}
    />
  )
}

export default DateRangeModal
