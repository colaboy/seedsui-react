import React from 'react'

import PickerModal from './../../RangeModal/PickerModal'

// 自定义日期选择弹窗: 两框选择
export default function CustomPicker({
  portal,
  visible,
  onVisibleChange,
  type,
  value,
  onBeforeChange,
  onChange,
  onError,
  customDatePickerProps
}) {
  return (
    <div className={`datepicker-rangemain-custom`}>
      <PickerModal
        portal={portal}
        type={type}
        value={value}
        onError={onError}
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        {...customDatePickerProps}
        visible={visible}
        onVisibleChange={(newVisible) => {
          onVisibleChange && onVisibleChange(newVisible, { modal: 'picker' })
        }}
      />
    </div>
  )
}
