import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import locale from './../../locale'
import DateUtil from './../../DateUtil'
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
    titleFormatter,
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
  // Expose tools
  const weekMainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      ...weekMainRef.current,
      // 获取标题
      getTitle: () => {
        let title = locale('选择日期', 'SeedsUI_placeholder_select')
        if (Array.isArray(value) && value.length === 2) {
          title = DateUtil.formatDate(value[0], `YYYY-W${locale('周', 'SeedsUI_unit_week')}`)
        }
        return title
      }
    }
  })

  useEffect(() => {
    if (visible) {
      weekMainRef?.current?.updateActiveDate?.()
    }
    // eslint-disable-next-line
  }, [visible])

  async function handleChange(newValue) {
    // 允许清空
    if (allowClear && Array.isArray(value) && value.length === 2) {
      if (DateUtil.formatDate(value[0], 'YYYY-W') === DateUtil.formatDate(newValue[0], 'YYYY-W')) {
        // eslint-disable-next-line
        newValue = null
      }
    }

    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue)
      if (goOn === false) return
    }

    // 不为空, 设置一周的数据
    if (Array.isArray(newValue) && newValue.length === 2) {
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
    }

    onChange && onChange(newValue)
  }

  return (
    <Calendar
      ref={weekMainRef}
      className="datepicker-weekmain-calendar"
      min={min}
      max={max}
      draggable={['horizontal']}
      weekStart={'Monday'}
      selectionMode={'range'}
      value={value || defaultPickerValue}
      // header={false}
      onChange={handleChange}
    />
  )
}

export default forwardRef(WeekMain)
