// require PrototypeDate.js和PrototypeString.js
import React, { useState, Fragment, forwardRef, useRef, useImperativeHandle } from 'react'
import InputText from './../InputText'
import DateRange from './../DateRangePopover/DateRange'

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
      type = 'date-range', // datetime-range|date-range|time-range
      startInputDateProps = {},
      endInputDateProps = {},
      onChange,
      onClick,
      children,
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
    type = type.replace('-range', '')

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

    // 点击文本框
    function handleClickInput(...parameter) {
      if (onClick) onClick(...parameter)
      if (others.readOnly) return
      setRangeVisible(true)
    }

    // 开始时间和结束时间
    function handleChange(e, values) {
      if (inputTextRef.current) e.currentTarget = inputTextRef.current
      if (onChange) {
        onChange(e, values)
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
        <DateRange
          caption={rangeProps.caption}
          visible={rangeVisible}
          type={type}
          startInputDateProps={startInputDateProps}
          endInputDateProps={endInputDateProps}
          start={start}
          end={end}
          onChange={handleChange}
          onVisibleChange={setRangeVisible}
        />
      </Fragment>
    )
  }
)

export default InputDateRange
