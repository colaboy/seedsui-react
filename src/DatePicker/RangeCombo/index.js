import React, { forwardRef, useRef } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import RangeModal from './../RangeModal'
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
      onBeforeChange,

      value,
      type,
      min,
      max,
      disabledStart,
      disabledEnd,
      allowClear,
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
        allowClear={allowClear}
        onChange={(newValue, { rangeId: newRangeId, ranges } = {}) => {
          // 清空时需要记录空选中项
          if (!rangeId) {
            rangeIdRef.current = newRangeId
          }
          onChange && onChange(newValue, { rangeId: newRangeId, ranges })
        }}
        ModalComponent={RangeModal}
        ModalProps={{
          ...ModalProps,
          defaultPickerValue: defaultPickerValue,
          type: type,
          diff: diff,
          onError: onError,
          onBeforeChange: onBeforeChange,
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
          allowClear: allowClear,
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
