import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import getCustomRangeId from './getCustomRangeId'
import getDefaultRangeId from './getDefaultRangeId'

import Buttons from './Buttons'
import Dates from './Dates'

// 日期快捷选择
function RangeMain(
  {
    // Main properties
    value,
    type,
    min,
    max,
    hourStep,
    minuteStep,
    disabledStart,
    disabledEnd,
    allowClear,
    onChange,

    rangeId,
    ranges,
    titles,
    portal,
    selectorProps,
    datePickerModalProps,
    ...props
  },
  ref
) {
  // 自定义项id
  let customRangeId = getCustomRangeId(ranges)

  // 当前选中项id
  let defaultRangeId = getDefaultRangeId(value, ranges, type)
  let currentRangeId = rangeId ?? defaultRangeId

  const mainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      mainDOM: mainRef.current,
      getMainDOM: () => mainRef.current
    }
  })

  return (
    <div
      {...props}
      className={`datepicker-selector${props.className ? ' ' + props.className : ''}`}
      ref={mainRef}
    >
      {/* 快捷选择 */}
      <Buttons
        value={value}
        type={type}
        onChange={onChange}
        rangeId={currentRangeId}
        ranges={ranges}
        titles={titles}
        selectorProps={selectorProps}
        allowClear={allowClear}
      />

      {/* 自定义区间: 文本框选择 */}
      {customRangeId && currentRangeId === customRangeId && (
        <Dates
          datePickerModalProps={datePickerModalProps}
          portal={portal}
          type={type}
          allowClear={allowClear}
          value={value}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          disabledStart={disabledStart}
          disabledEnd={disabledEnd}
          onChange={(newValue) => {
            onChange &&
              onChange(newValue, {
                rangeId: customRangeId,
                ranges: ranges
              })
          }}
        />
      )}
    </div>
  )
}

export default forwardRef(RangeMain)
