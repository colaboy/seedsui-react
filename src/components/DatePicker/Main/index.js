import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import WeekMain from './../WeekMain'
import DateMain from './DateMain'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil, LocaleUtil } from 'seedsui-react'
测试使用-end */

// 日期选择
function Main(
  {
    visible = true,

    value,
    type = 'date', // year | quarter | month | date | time | datetime | week
    allowClear,
    min,
    max,
    hourStep,
    minuteStep,
    onChange,
    ...props
  },
  ref
) {
  // Expose tools
  const pickerMainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      ...pickerMainRef.current,
      // 获取标题
      getTitle: () => {
        let title = LocaleUtil.locale('选择日期', 'SeedsUI_date_modal_title')
        if (value instanceof Date) {
          if (type === 'date') {
            title = DateUtil.format(value, 'YYYY-MM-DD ddd')
          } else {
            title = DateUtil.format(value, type)
          }
        }
        return title
      },
      getValue: () => {
        return value instanceof Date ? value : new Date()
      }
    }
  })

  if (type === 'week') {
    return (
      <WeekMain
        ref={pickerMainRef}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        {...props}
      />
    )
  }

  return (
    <DateMain
      ref={pickerMainRef}
      value={value}
      type={type}
      hourStep={hourStep}
      minuteStep={minuteStep}
      onChange={onChange}
      {...props}
    />
  )
}

export default forwardRef(Main)
