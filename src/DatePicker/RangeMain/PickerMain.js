import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react'
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
    disabledStart,
    disabledEnd,
    dateRangeLimit,
    allowClear,
    value,
    onBeforeChange,
    onChange,
    onError,
    ...props
  },
  ref
) {
  const mainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: mainRef.current,
      getRootDOM: () => mainRef.current,
      getValue: () => {
        let multipleValue = mainRef?.current?.getValue?.()
        if (!multipleValue) {
          return null
        }
        let newValue = [multipleValue?.[0].value, multipleValue?.[1].value]
        return newValue
      }
    }
  })

  const [multipleDate, setMultipleDate] = useState(null)
  useEffect(() => {
    const { startDate, endDate } = getRangeDates(value)

    setMultipleDate([
      {
        type: type,
        id: 'start',
        name: locale('开始时间', 'SeedsUI_start_time'),
        value: startDate
      },
      {
        type: type,
        id: 'end',
        name: locale('结束时间', 'SeedsUI_end_time'),
        value: endDate
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
      dateRangeLimit: typeof dateRangeLimit === 'number' ? dateRangeLimit : null,
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
      ref={mainRef}
      portal={portal}
      type={type}
      value={multipleDate.map((item) => {
        if (item.id === 'start' && disabledStart) {
          item.disabled = true
        } else if (item.id === 'end' && disabledEnd) {
          item.disabled = true
        }
        return item
      })}
      onChange={handleChange}
      {...props}
    />
  )
}

export default forwardRef(PickerMain)
