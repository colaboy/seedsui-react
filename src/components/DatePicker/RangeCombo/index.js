import React, { forwardRef, useRef } from 'react'
import getDefaultRanges from './../RangeMain/getDefaultRanges'
import RangeModal from './../RangeModal'
import getDisplayValue from './getDisplayValue'

// 内库使用-start
import Combo from './../../Modal/SelectCombo'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const Combo = Modal.SelectCombo
测试使用-end */

// 日期区间
const RangeCombo = forwardRef(
  (
    {
      // Combo properties
      format,
      separator,

      // Modal
      modalProps,

      // Modal properties
      diff,
      defaultPickerValue,
      onError,

      value,
      type,
      min,
      max,
      hourStep,
      minuteStep,
      disabledStart,
      disabledEnd,
      onChange,

      rangeId,
      ranges,
      titles,
      ...props
    },
    ref
  ) => {
    if (ranges === undefined) {
      // eslint-disable-next-line
      ranges = getDefaultRanges()
    }
    const rangeIdRef = useRef(rangeId)

    return (
      <Combo
        ref={ref}
        // Combo
        displayValueFormatter={() => {
          return getDisplayValue({
            value,
            type: format || type,
            rangeId: rangeIdRef.current,
            ranges,
            separator
          })
        }}
        {...props}
        // Modal
        value={value}
        onChange={(newValue, { rangeId: newRangeId, ranges } = {}) => {
          // 清空时需要记录空选中项
          rangeIdRef.current = newRangeId
          onChange && onChange(newValue, { rangeId: newRangeId, ranges })
        }}
        modal={props?.modal || RangeModal}
        modalProps={{
          ...modalProps,
          defaultPickerValue: defaultPickerValue,
          type: type,
          diff: diff,
          onError: onError,
          // 记录选中项
          onRangeIdChange: (newRangeId) => {
            rangeIdRef.current = newRangeId
          },
          min: min,
          max: max,
          hourStep: hourStep,
          minuteStep: minuteStep,
          disabledStart: disabledStart,
          disabledEnd: disabledEnd,
          rangeId: rangeIdRef.current,
          ranges: ranges,
          titles: titles
        }}
      />
    )
  }
)

export default RangeCombo
