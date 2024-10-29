import React, { forwardRef, useRef } from 'react'
import defaultRanges from './../RangeMain/SelectorMain/defaultRanges'
import Modal from './../RangeModal'
import getDisplayValue from './getDisplayValue'

// 内库使用
import Combo from './../../Select/Combo'

// 测试使用
// import { Select } from 'seedsui-react'
// const Combo = Select.Combo

// 日期区间
const RangeCombo = forwardRef(
  (
    {
      value,
      type,
      format,
      separator,
      titles,
      disabledStart,
      disabledEnd,
      onChange,

      rangeId,
      ranges = defaultRanges,
      ...props
    },
    ref
  ) => {
    const rangeIdRef = useRef(rangeId)

    // 扩展非标准属性
    if (!props.ModalProps) {
      props.ModalProps = {}
    }

    if (titles) {
      props.ModalProps.titles = titles
    }
    if (disabledStart) {
      props.ModalProps.disabledStart = disabledStart
    }
    if (disabledEnd) {
      props.ModalProps.disabledEnd = disabledEnd
    }
    props.ModalProps.rangeId = rangeId || rangeIdRef.current

    return (
      <Combo
        ref={ref}
        ModalComponent={Modal}
        value={value}
        type={type}
        ranges={ranges}
        displayValueFormatter={() => {
          return getDisplayValue({
            value,
            type: format || type,
            rangeId: rangeId || rangeIdRef.current,
            ranges,
            separator
          })
        }}
        onChange={(newValue, { rangeId: newRangeId, ranges }) => {
          // 记录选中项
          if (!rangeId) {
            rangeIdRef.current = newRangeId
          }
          onChange && onChange(newValue, { rangeId: newRangeId, ranges })
        }}
        {...props}
      />
    )
  }
)

export default RangeCombo
