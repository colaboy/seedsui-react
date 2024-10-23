import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../WeekCombo'
import getDisplayValue from './getDisplayValue'

// 内库使用
import DateUtil from './../../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

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
    // 显示文本
    let displayValue = getDisplayValue(value)

    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return getDisplayValue({
            value: value
          })
        }
      }
    })

    // 向前
    function handlePrev(e) {
      if (value instanceof Date === false) return
      onChange && onChange(DateUtil.previousWeek(value))
    }

    // 向后
    function handleNext(e) {
      if (value instanceof Date === false) return
      onChange && onChange(DateUtil.nextWeek(value))
    }

    return (
      <>
        <i className="datepicker-types-prev icon shape-arrow-left sm" onClick={handlePrev} />
        <Combo
          {...props}
          value={value}
          className={`datepicker-types-date${className ? ' ' + className : ''}`}
          onChange={(newValue) => {
            onChange && onChange(newValue)
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
