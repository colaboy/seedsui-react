import React, { useEffect, useState } from 'react'
import locale from '../../locale'

import MultipleModal from './../MultipleModal'
import Utils from './Utils'

// 当不显示快捷选择时, 则直接显示弹窗
const Custom = function ({
  maskClosable,
  value,
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
    const { startDate, endDate } = Utils.getDates(value)
    setMultipleDate([
      {
        type: type,
        id: 'start',
        name: locale('开始时间', 'start_time'),
        value: startDate
      },
      {
        type: type,
        id: 'end',
        name: locale('结束时间', 'end_time'),
        value: endDate
      }
    ])
  }, [value]) // eslint-disable-line

  // 校验选择的区间是否合法
  function handleBeforeChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]
    let timeValid = Utils.validateTime(newValue, { type: type, onError: onError })
    let daysValid = true
    let daysLimit = Object.values(ranges)[0]
    if (typeof daysLimit === 'number') {
      daysValid = Utils.validateDays(newValue, { daysLimit: daysLimit, onError: onError })
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

  if (
    toString.call(ranges) !== '[object Object]' ||
    Object.isEmptyObject(ranges) ||
    Object.keys(ranges).length !== 1 ||
    // 未构建完成选中项也不渲染
    !multipleDate
  ) {
    return null
  }

  return (
    <MultipleModal
      maskClosable={maskClosable}
      className="datepicker-rangemodal-modal-card-button"
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

export default Custom