import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../WeekCombo'

// 内库使用
import DateUtil from '../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react

// 周选择
const Week = forwardRef(
  (
    {
      min,
      max,
      value,

      onError,
      onChange,

      // 其它属性
      className,
      ...props
    },
    ref
  ) => {
    let weekDates =
      value instanceof Date ? DateUtil.getWeekDates(value || new Date(), 'Monday') : null
    let weekValue = weekDates ? [weekDates[0], weekDates[6]] : null

    // 显示文本
    let displayValue = getWeekDisplayValue({
      value: weekValue
    })

    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return getWeekDisplayValue({
            value: newValue || value?.value
          })
        }
      }
    })

    // 向前
    function handlePrev(e) {
      if (value instanceof Date === false) return
      onChange && onChange(Calendar.previousWeek(value))
    }

    // 向后
    function handleNext(e) {
      if (value instanceof Date === false) return
      onChange && onChange(Calendar.nextWeek(value))
    }

    return (
      <>
        <i className="datepicker-types-prev icon shape-arrow-left sm" onClick={handlePrev} />
        <Combo
          {...props}
          value={weekValue}
          className={`datepicker-types-date${className ? ' ' + className : ''}`}
          onChange={(newValue) => {
            onChange && onChange(newValue[0])
          }}
        >
          <p>{displayValue || ''}</p>
        </Combo>
        <i className="datepicker-types-next icon shape-arrow-right sm" onClick={handleNext} />
      </>
    )
  }
)

export default Week
