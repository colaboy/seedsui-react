import React, { forwardRef, useState } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import getRangeDisplayValue from './getRangeDisplayValue'

import Combo from './../../Select/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'
import Modal from './../RangeModal'

// 日期区间
const RangeCombo = forwardRef(({ format, titles, ranges = defaultRanges, ...props }, ref) => {
  // 选中的快捷标签
  let [activeKey, setActiveKey] = useState(null)

  // 扩展非标准属性
  if (!props.ModalProps) {
    props.ModalProps = {}
  }

  // 快捷选中项: 只要选中的是非自定义项, 则回显选中项的名称, 因为有时本周和最近7日重复, 无法精准显示用户点击的标签
  props.ModalProps.onActiveKey = (newActiveKey, _) => {
    // 点击自定义不处理, 否则会触发重新计算
    if (newActiveKey && _.ranges && Array.isArray(_.ranges[newActiveKey]) === false) return

    // 非自定义字段时记录选中项
    setActiveKey(newActiveKey)
  }

  // 标题透传
  if (titles) {
    props.ModalProps.titles = titles
  }

  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      ranges={ranges}
      displayValueFormatter={(params) => {
        // 根据日期区间计算显示标签，如果有重复选项，将优先取记录的选中项
        return getRangeDisplayValue({ format, currentActiveKey: activeKey, ...params })
      }}
      {...props}
    />
  )
})

export default RangeCombo
