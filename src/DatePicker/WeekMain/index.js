import React, { forwardRef } from 'react'
import Calendar from './../../Calendar'

// 日期快捷选择
function WeekMain(
  {
    // useless props
    visible,

    portal,

    // components props
    allowClear,

    // Main: common
    value,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    min,
    max,
    onError

    // ...props
  },
  ref
) {
  async function handleChange(newValue) {
    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue)
      if (goOn === false) return
    }

    // 设置一周的数据
    let weekDates = Calendar.getWeekDates(newValue[0], 'Monday')
    if (min instanceof Date && Calendar.isDisabledDate(weekDates[0], { min: min })) {
      console.log('禁止访问' + DateUtil.formatDate(weekDates[0], 'YYYY年MM月DD日') + '前的日期')
      return
    }
    if (max instanceof Date && Calendar.isDisabledDate(weekDates[6], { max: max })) {
      console.log('禁止访问' + DateUtil.formatDate(weekDates[6], 'YYYY年MM月DD日') + '后的日期')
      return
    }
    // eslint-disable-next-line
    newValue = [weekDates[0], weekDates[6]]

    onChange && onChange(newValue)
  }

  return (
    <Calendar
      ref={ref}
      min={min}
      max={max}
      draggable={['horizontal']}
      weekStart={'Monday'}
      selectionMode={'range'}
      value={value || defaultPickerValue}
      header={false}
      onChange={handleChange}
    />
  )
}

export default forwardRef(WeekMain)
