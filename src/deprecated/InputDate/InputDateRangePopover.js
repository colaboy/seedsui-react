// require PrototypeDate.js和PrototypeString.js
import React, { useState, Fragment, forwardRef, useRef, useImperativeHandle } from 'react'
import InputText from './../InputText'
import DateRangePopover from './../DateRangePopover'
import helper from './../DateRangePopover/helper'

const InputDateRange = forwardRef(
  (
    {
      rangeProps = {
        // 标题
        caption: '',
        // 分割线
        separator: ''
      },
      value,
      type = 'date-range-popover', // date-range-popover
      startInputDateProps = {},
      endInputDateProps = {},
      onChange,
      onClick,
      children,
      // 弹出框属性
      dateRangePopoverProps = {},
      ...others
    },
    ref
  ) => {
    const [rangeVisible, setRangeVisible] = useState(false)

    const inputTextRef = useRef(null)
    useImperativeHandle(ref, () => {
      return inputTextRef.current
    })

    // 类型修改
    type = type.replace('-range-popover', '')

    // 开始和结束时间
    let start = null
    let end = null
    if (Array.isArray(value) && value.length === 2) {
      start = value[0]
      end = value[1]
    }
    let displayValue = ''
    // 允许仅选中开始或者结束
    if ((start || end) && (typeof start === 'string' || typeof end === 'string')) {
      displayValue = `${start || ''}${rangeProps.separator || '~'}${end || ''}`
    }

    if (start && end && typeof start === 'string' && typeof end === 'string') {
      displayValue = helper.getDateName(start, end)
    }

    // 点击文本框
    function handleClickInput(...parameter) {
      if (onClick) onClick(...parameter)
      if (others.readOnly) return
      setRangeVisible(true)
    }

    // 开始时间和结束时间
    function handleChange(e, value) {
      setRangeVisible(false)
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      if (onChange) {
        onChange(e, value)
      }
    }

    return (
      <Fragment>
        {children && (
          <div ref={inputTextRef} {...others} onClick={handleClickInput}>
            {children}
          </div>
        )}
        {!children && (
          <InputText
            ref={inputTextRef}
            {...others}
            value={displayValue}
            type="text"
            readOnly
            onClick={handleClickInput}
          />
        )}
        {/* 自定义时间 */}
        <DateRangePopover
          {...dateRangePopoverProps}
          caption={rangeProps.caption}
          show={rangeVisible}
          startInputDateProps={startInputDateProps}
          endInputDateProps={endInputDateProps}
          value={value}
          onChange={handleChange}
          onVisibleChange={setRangeVisible}
        />
      </Fragment>
    )
  }
)

export default InputDateRange
