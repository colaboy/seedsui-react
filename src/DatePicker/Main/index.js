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
    type = 'date', // year | quarter | month | date | time | datetime
    value,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    min,
    max
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
          title = DateUtil.format(value, type)
        }
        return title
      }
    }
  })

  async function handleChange(selectDate) {
    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(selectDate)
      if (goOn === false) return
    }

    onChange && onChange(selectDate)
  }

  if (type === 'week') {
    return <WeekMain ref={pickerMainRef} value={value} onChange={handleChange} />
  }

  return <DateMain ref={pickerMainRef} value={value} type={type} onChange={handleChange} />
}

export default forwardRef(Main)
