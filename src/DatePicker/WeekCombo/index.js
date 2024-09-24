import React, { forwardRef } from 'react'
import getRangeDisplayValue from './getRangeDisplayValue'

import Combo from './../../Select/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'
import Modal from './../WeekModal'

// 获取周
const WeekCombo = forwardRef(({ titleFormatter, ...props }, ref) => {
  // 扩展非标准属性
  if (!props.ModalProps) {
    props.ModalProps = {}
  }

  if (titleFormatter) {
    props.ModalProps.titleFormatter = titleFormatter
  }

  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      displayValueFormatter={(params) => {
        // 根据日期区间计算显示标签，如果有重复选项，将优先取记录的选中项
        let displayValue = getRangeDisplayValue({ value: params.value })

        return displayValue
      }}
      {...props}
    />
  )
})

export default WeekCombo
