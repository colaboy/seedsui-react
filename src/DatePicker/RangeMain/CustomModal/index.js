import React from 'react'
import CustomDates from './CustomDates'
import CustomPicker from './CustomPicker'

// 自定义日期选择弹窗
function CustomModal({ visible, onVisibleChange, customModal, ...props }) {
  if (customModal === 'dates') {
    return <CustomDates {...props} />
  }
  return <CustomPicker visible={visible} onVisibleChange={onVisibleChange} {...props} />
}

export default CustomModal
