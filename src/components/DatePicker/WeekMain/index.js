import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DateUtil from './../../../utils/DateUtil'
import Calendar from './../../Calendar'
// 内库使用-end

/* 测试使用-start
import { locale, DateUtil, Calendar } from 'seedsui-react'
测试使用-end */

// 日期快捷选择
function WeekMain(
  {
    visible = true,

    value,
    min,
    max,
    weekStart = 'Monday', // Monday | Sunday
    allowClear,
    onChange,
    ...props
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
        let title = LocaleUtil.text('选择日期', 'SeedsUI_date_modal_title')
        if (value instanceof Date) {
          title = DateUtil.format(value, 'week')
        }
        return title
      },
      getValue: () => {
        return value instanceof Date ? value : null
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

    onChange && onChange(selectDate)
  }

  let weekDates = DateUtil.getWeekDates(value, weekStart)
  rangeValueRef.current =
    Array.isArray(weekDates) && weekDates.length ? [weekDates[0], weekDates[6]] : null

  return (
    <Calendar
      ref={weekMainRef}
      min={min}
      max={max}
      draggable={['horizontal']}
      weekStart={'Monday'}
      selectionMode={'range'}
      value={rangeValueRef.current}
      // header={false}
      onChange={handleChange}
      {...props}
      className={`datepicker-weekmain-calendar${props.className ? ' ' + props.className : ''}`}
    />
  )
}

export default forwardRef(WeekMain)
