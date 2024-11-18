import React, { forwardRef, useRef } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import Modal from './../RangeModal'
import getDisplayValue from './getDisplayValue'

// 内库使用
import Combo from './../../Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

// 日期区间
const RangeCombo = forwardRef(
  (
    {
      // Combo properties
      format,
      separator,

      // Modal
      ModalProps,

      // Modal properties
      diff,
      defaultPickerValue,
      onError,

      value,
      type,
      min,
      max,
      disabledStart,
      disabledEnd,
      onChange,

      rangeId,
      ranges = defaultRanges,
      titles,
      SelectorProps,
      DatePickerModalProps,
      ...props
    },
    ref
  ) => {
    const rangeIdRef = useRef(rangeId)

    return (
      <Combo
        ref={ref}
        // Combo
        displayValueFormatter={() => {
          return getDisplayValue({
            value,
            type: format || type,
            rangeId: rangeId || rangeIdRef.current,
            ranges,
            separator
          })
        }}
        {...props}
        // Modal
        value={value}
        onChange={(newValue, { rangeId: newRangeId, ranges } = {}) => {
          // 清空时需要记录空选中项
          if (!rangeId) {
            rangeIdRef.current = newRangeId
          }
          onChange && onChange(newValue, { rangeId: newRangeId, ranges })
        }}
        ModalComponent={Modal}
        ModalProps={{
          ...ModalProps,
          defaultPickerValue: defaultPickerValue,
          type: type,
          diff: diff,
          onError: onError,
          // 记录选中项
          onRangeIdChange: (newRangeId) => {
            if (!rangeId) {
              rangeIdRef.current = newRangeId
            }
          },
          min: min,
          max: max,
          disabledStart: disabledStart,
          disabledEnd: disabledEnd,
          rangeId: rangeId || rangeIdRef.current,
          ranges: ranges,
          titles: titles,
          SelectorProps: SelectorProps,
          DatePickerModalProps: DatePickerModalProps
        }}
      />
    )
  }
)

export default RangeCombo
