import React, { forwardRef } from 'react'
import SelectorMain from './SelectorMain'
import getDefaultRanges from './getDefaultRanges'
import PickerMain from './PickerMain'

// 日期快捷选择
function RangeMain(
  {
    visible,

    // Main
    value,
    type = 'date', // year | quarter | month | date | time | datetime
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
  if (ranges === undefined) {
    // eslint-disable-next-line
    ranges = getDefaultRanges()
  }

  // 判断有没有快捷选择
  let hasSelector = false
  if (ranges) {
    for (let key in ranges) {
      if (Array.isArray(ranges[key])) {
        hasSelector = true
      }
    }
  }

  return (
    <>
      {hasSelector && (
        <SelectorMain
          ref={ref}
          portal={portal}
          type={type}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          disabledStart={disabledStart}
          disabledEnd={disabledEnd}
          allowClear={allowClear}
          value={value}
          onChange={onChange}
          selectorProps={selectorProps}
          datePickerModalProps={datePickerModalProps}
          titles={titles}
          rangeId={rangeId}
          ranges={ranges}
          {...props}
        />
      )}
      {!hasSelector && (
        <PickerMain
          ref={ref}
          portal={portal}
          type={type}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          disabledStart={disabledStart}
          disabledEnd={disabledEnd}
          allowClear={allowClear}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </>
  )
}

export default forwardRef(RangeMain)
