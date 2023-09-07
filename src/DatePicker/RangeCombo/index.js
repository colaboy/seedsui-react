import React, { forwardRef } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import getRangeDisplayValue from './getRangeDisplayValue'

import Combo from './../../Select/Combo'
import Modal from './../RangeModal'

// 日期区间
const RangeCombo = forwardRef(
  (
    {
      // 定制属性
      titles,
      ranges = defaultRanges,
      ...props
    },
    ref
  ) => {
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
        displayValueFormatter={getRangeDisplayValue}
        {...props}
      />
    )
  }
)

export default RangeCombo
