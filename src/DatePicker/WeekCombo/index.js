import React, { forwardRef } from 'react'

import Modal from './../WeekModal'

// 内库使用
import DateUtil from './../../DateUtil'
import Combo from './../../Select/Combo'
import locale from './../../locale'

// 测试使用
// import { DateUtil, Combo, locale } from 'seedsui-react'

// 获取周
const WeekCombo = forwardRef(({ ...props }, ref) => {
  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      displayValueFormatter={(params) => {
        // 根据日期区间计算显示标签，如果有重复选项，将优先取记录的选中项
        let displayValue = DateUtil.format(
          props?.value,
          `YYYY-W${locale('周', 'SeedsUI_unit_week')}`
        )

        return displayValue
      }}
      {...props}
    />
  )
})

export default WeekCombo
