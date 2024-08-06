import React, { forwardRef } from 'react'
import SelectorMain from './SelectorMain'
import defaultRanges from './SelectorMain/defaultRanges'
import PickerMain from './PickerMain'

// 日期快捷选择
function RangeMain(
  {
    // useless props
    visible,

    portal,

    // components props
    SelectorProps,
    allowClear,

    // Main: common
    value,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    titles,
    disabledStart,
    disabledEnd,
    min,
    max,
    type = 'date', // year | quarter | month | date | time | datetime
    onError,
    ranges = defaultRanges,

    // Custom option config
    DatePickerModalProps,
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
          allowClear={allowClear}
          value={value}
          defaultPickerValue={defaultPickerValue}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onError={onError}
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
