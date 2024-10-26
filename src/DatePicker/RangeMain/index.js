import React, { forwardRef } from 'react'
import SelectorMain from './SelectorMain'
import defaultRanges from './SelectorMain/defaultRanges'
import PickerMain from './PickerMain'

// 日期快捷选择
function RangeMain(
  {
    visible,

    value,
    type = 'date', // year | quarter | month | date | time | datetime
    min,
    max,
    disabledStart,
    disabledEnd,
    ranges = defaultRanges,
    allowClear,
    onChange,

    // Combo|Main: DatePicker Control properties
    SelectorProps,
    DatePickerModalProps,
    titles,
    customModal = 'dates', // dates | picker
    ...props
  },
  ref
) {
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
          disabledStart={disabledStart}
          disabledEnd={disabledEnd}
          allowClear={allowClear}
          value={value}
          onChange={onChange}
          SelectorProps={SelectorProps}
          DatePickerModalProps={DatePickerModalProps}
          titles={titles}
          ranges={ranges}
          customModal={customModal}
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
