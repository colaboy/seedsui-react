import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react'
import MultipleMain from './../MultipleMain'

// 内库使用
import locale from '../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 日期区间弹窗
const PickerMain = function (
  { portal, type, min, max, disabledStart, disabledEnd, allowClear, value, onChange, ...props },
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
    const [startDate, endDate] = value || [null, null]

    setMultipleDate([
      {
        id: 'start',
        name: locale('开始时间', 'SeedsUI_start_time'),
        value: startDate
      },
      {
        id: 'end',
        name: locale('结束时间', 'SeedsUI_end_time'),
        value: endDate
      }
    ])
  }, [value]) // eslint-disable-line

  function handleChange(newMultipleDate) {
    let newValue = [newMultipleDate[0].value, newMultipleDate[1].value]
    onChange && onChange(newValue)
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
