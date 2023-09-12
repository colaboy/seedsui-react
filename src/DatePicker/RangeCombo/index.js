import React, { forwardRef } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import getRangeDisplayValue from './getRangeDisplayValue'

import Combo from './../../Select/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'
import Modal from './../RangeModal'

// 日期区间
const RangeCombo = forwardRef(({ format, titles, ranges = defaultRanges, ...props }, ref) => {
  // 扩展非标准属性
  if (titles) {
    if (!props.ModalProps) {
      props.ModalProps = {}
    }
    props.ModalProps.titles = titles
  }

  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      ranges={ranges}
      displayValueFormatter={(params) => {
        return getRangeDisplayValue({ format, ...params })
      }}
      {...props}
    />
  )
})

export default RangeCombo
