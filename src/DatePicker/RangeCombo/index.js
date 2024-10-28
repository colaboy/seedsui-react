import React, { forwardRef } from 'react'
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
      customModal,
      titles,
      disabledStart,
      disabledEnd,
      rangeId,
      ranges = defaultRanges,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.ModalProps) {
      props.ModalProps = {}
    }

    if (titles) {
      props.ModalProps.titles = titles
    }
    if (customModal) {
      props.ModalProps.customModal = customModal
    }
    if (disabledStart) {
      props.ModalProps.disabledStart = disabledStart
    }
    if (disabledEnd) {
      props.ModalProps.disabledEnd = disabledEnd
    }

    return (
      <Combo
        ref={ref}
        ModalComponent={Modal}
        value={value}
        type={type}
        ranges={ranges}
        displayValueFormatter={() => {
          return getDisplayValue({ value, type: format || type, rangeId, ranges, separator })
        }}
        {...props}
      />
    )
  }
)

export default RangeCombo
