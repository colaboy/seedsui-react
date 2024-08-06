import React, { forwardRef } from 'react'
import defaultRanges from './../RangeMain/SelectorMain/defaultRanges'
import getRangeDisplayValue from './getRangeDisplayValue'

import Combo from './../../Select/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'
import Modal from './../RangeModal'

// 日期区间
const RangeCombo = forwardRef(
  (
    { format, customModal, titles, disabledStart, disabledEnd, ranges = defaultRanges, ...props },
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
        ranges={ranges}
        displayValueFormatter={(params) => {
          let activeKey = ref?.current?.getActiveKey?.()

          // 根据日期区间计算显示标签，如果有重复选项，将优先取记录的选中项
          let displayValue = getRangeDisplayValue({
            format,
            currentActiveKey: activeKey,
            ...params
          })

          return displayValue
        }}
        {...props}
      />
    )
  }
)

export default RangeCombo
