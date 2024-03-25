import React, { forwardRef } from 'react'
import SelectorMain from './SelectorMain'
import defaultRanges from './SelectorMain/defaultRanges'
import PickerMain from './PickerMain'

// 日期快捷选择
function RangeMain(
  {
    portal,
    // components props
    SelectorProps,
    customDatePickerProps,
    allowClear,

    // Main: common
    value,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    titles,
    min,
    max,
    rangeLimit,
    type = 'date', // year | quarter | month | date | time | datetime
    onError,
    ranges = defaultRanges,

    // Custom option config
    customModal = 'dates', // dates | picker
    ...props
  },
  ref
) {
  // 判断有没有快捷选择
  let hasSelector = false
  // 限制天数
  let dateRangeLimit = null
  if (ranges) {
    for (let key in ranges) {
      if (Array.isArray(ranges[key])) {
        hasSelector = true
      } else if (typeof ranges[key] === 'number') {
        dateRangeLimit = ranges[key]
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
          rangeLimit={rangeLimit}
          allowClear={allowClear}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onError={onError}
          SelectorProps={SelectorProps}
          customDatePickerProps={customDatePickerProps}
          titles={titles}
          ranges={ranges}
          customModal={customModal}
        />
      )}
      {!hasSelector && (
        <PickerMain
          ref={ref}
          portal={portal}
          type={type}
          min={min}
          max={max}
          rangeLimit={rangeLimit}
          dateRangeLimit={dateRangeLimit}
          allowClear={allowClear}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onError={onError}
          {...props}
        />
      )}
    </>
  )
}

export default forwardRef(RangeMain)
