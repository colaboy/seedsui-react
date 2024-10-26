import React from 'react'

import PickerModal from './../PickerModal'

// 自定义日期选择弹窗: 单框选择
export default function CustomPicker({
  portal,
  visible,
  onVisibleChange,
  value,
  type,
  min,
  max,
  disabledStart,
  disabledEnd,
  onChange,
  DatePickerModalProps
}) {
  console.log('value:', value)
  return (
    <div className={`datepicker-rangemain-custom`}>
      <PickerModal
        portal={portal}
        type={type}
        value={value}
        min={min}
        max={max}
        disabledStart={disabledStart}
        disabledEnd={disabledEnd}
        onChange={onChange}
        {...DatePickerModalProps}
        visible={visible}
        onVisibleChange={(newVisible) => {
          onVisibleChange && onVisibleChange(newVisible, { modal: 'picker' })
        }}
      />
    </div>
  )
}
