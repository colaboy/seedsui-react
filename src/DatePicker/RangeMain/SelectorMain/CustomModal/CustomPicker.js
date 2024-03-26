import React from 'react'

import PickerModal from './../PickerModal'

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
  ModalProps
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
        {...ModalProps}
        visible={visible}
        onVisibleChange={(newVisible) => {
          onVisibleChange && onVisibleChange(newVisible, { modal: 'picker' })
        }}
      />
    </div>
  )
}
