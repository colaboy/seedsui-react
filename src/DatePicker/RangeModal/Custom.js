import React, { useEffect, useState } from 'react'
import locale from '../../locale'

import MultipleCombo from './../MultipleCombo'
import { getDates, validateDays, validateTime } from './../utils'

const Custom = function ({
  captionProps,
  submitProps,
  cancelProps,

  maskClosable,
  value,
  defaultPickerValue,
  ranges,
  type,
  min,
  max,
  onError,
  onBeforeChange,
  onChange,
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
    let daysLimit = Object.values(ranges)[0]
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
    <div className="datepicker-rangemodal-modal-card">
      <p className="datepicker-rangemodal-modal-card-caption">
        {locale('自定义选择', 'custom_select')}
      </p>
      <div className="datepicker-rangemodal-modal-card-selector">
        {Object.keys(ranges).map((rangeKey) => {
          return (
            <MultipleCombo
              key={rangeKey}
              captionProps={captionProps}
              submitProps={submitProps}
              cancelProps={cancelProps}
              maskClosable={maskClosable}
              className="selector-item"
              value={multipleDate}
              type={type}
              min={min}
              max={max}
              onError={onError}
              onBeforeChange={handleBeforeChange}
              onChange={handleChange}
              onVisibleChange={(visible) => {
                // 显示弹窗, 需要隐藏父级弹窗
                if (visible) {
                  onVisibleChange(false)
                }
              }}
            >
              {rangeKey}
            </MultipleCombo>
          )
        })}
      </div>
    </div>
  )
}

export default Custom
