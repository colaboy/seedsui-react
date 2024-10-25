import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import WeekMain from './../WeekMain'
import DateMain from './DateMain'

// 内库使用
import locale from './../../locale'
import DateUtil from './../../DateUtil'

// 日期选择
function Main(
  {
    visible = true,

    // components props
    allowClear,

    // Main: common
    value,
    type = 'date', // year | quarter | month | date | time | datetime | week
    min,
    max,
    onChange
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
        let title = locale('选择日期', 'SeedsUI_placeholder_select')
        if (value instanceof Date) {
          title = DateUtil.format(value, 'YYYY-MM-DD ddd')
        }
        return title
      },
      getValue: () => {
        return value instanceof Date ? value : new Date()
      }
    }
  })

  if (type === 'week') {
    return <WeekMain ref={pickerMainRef} value={value} min={min} max={max} onChange={onChange} />
  }

  return <DateMain ref={pickerMainRef} value={value} type={type} onChange={onChange} />
}

export default forwardRef(Main)
