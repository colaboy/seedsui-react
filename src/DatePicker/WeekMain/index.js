import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import locale from './../../locale'
import DateUtil from './../../DateUtil'
import Calendar from './../../Calendar'

// 日期快捷选择
function WeekMain(
  {
    visible = true,

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

    // Monday | Sunday
    weekStart = 'Monday'
  },
  ref
) {
  // Range value
  const rangeValueRef = useRef(null)

  // Expose tools
  const weekMainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      ...weekMainRef.current,
      // 获取标题
      getTitle: () => {
        let title = locale('选择日期', 'SeedsUI_placeholder_select')
        if (value instanceof Date) {
          title = DateUtil.format(value, `YYYY-W${locale('周', 'SeedsUI_unit_week')}`)
        }
        return title
      }
    }
  })

  async function handleChange(rangeValue, { selectDate }) {
    // 允许清空时, 相同周则清空
    if (allowClear && value instanceof Date) {
      if (DateUtil.format(value, 'YYYY-W') === DateUtil.format(selectDate, 'YYYY-W')) {
        // eslint-disable-next-line
        selectDate = null
      }
    }

    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(selectDate)
      if (goOn === false) return
    }

    onChange && onChange(selectDate)
  }

  let weekDates = DateUtil.getWeekDates(value || defaultPickerValue, weekStart)
  rangeValueRef.current =
    Array.isArray(weekDates) && weekDates.length ? [weekDates[0], weekDates[6]] : null

  return (
    <Calendar
      ref={weekMainRef}
      className="datepicker-weekmain-calendar"
      min={min}
      max={max}
      draggable={['horizontal']}
      weekStart={'Monday'}
      selectionMode={'range'}
      value={rangeValueRef.current}
      // header={false}
      onChange={handleChange}
    />
  )
}

export default forwardRef(WeekMain)
