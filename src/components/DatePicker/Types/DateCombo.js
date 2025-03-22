import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import dayjs from 'dayjs'

import Combo from './../Combo'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
import Input from './../../Input'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Input } from 'seedsui-react'
测试使用-end */

// 日期类型选择控件: 年月日季
const DateCombo = forwardRef(
  (
    {
      type,
      min,
      max,
      value,
      onChange,

      // 其它属性
      className,
      ...props
    },
    ref
  ) => {
    // 显示文本
    let displayValue = DateUtil.format(value, type)

    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: () => {
          return displayValue
        }
      }
    })

    // 向前
    function handlePrev(e) {
      if (!value) return
      let newValue = updateValue(value, -1)
      onChange && onChange(newValue)
    }

    // 向后
    function handleNext(e) {
      if (!value) return
      let newValue = updateValue(value, 1)
      onChange && onChange(newValue)
    }

    /**
     * 切换日期
     * @param {Date} newValue 日期
     * @param {Number} go 前行后退, 0: 当前; -1: 后退; 1: 前进;
     */
    function updateValue(value, go = 0) {
      let newValue = value
      if (['year', 'quarter', 'month', 'date'].includes(type) === false) {
        return
      }
      if (newValue instanceof Date === false) {
        newValue = new Date()
      }
      if (type === 'date') {
        // eslint-disable-next-line
        type = 'day'
      }

      if (go === -1) {
        return dayjs(newValue).subtract(1, type).toDate()
      }

      if (go === 1) {
        return dayjs(newValue).add(1, type).toDate()
      }

      return newValue
    }

    return (
      <>
        <Input.IconLeftArrow className="datepicker-types-previous" onClick={handlePrev} />
        <Combo
          {...props}
          value={value}
          type={type}
          className={`datepicker-types-date${className ? ' ' + className : ''}`}
          onChange={onChange}
        >
          <p>{displayValue || ''}</p>
        </Combo>
        <Input.IconRightArrow className="datepicker-types-next" onClick={handleNext} />
      </>
    )
  }
)

export default DateCombo
