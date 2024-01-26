import React from 'react'
import CustomDates from './CustomDates'

// 自定义日期选择弹窗
function CustomModal({ customModal, ...props }) {
  if (customModal === 'dates') {
    return <CustomDates {...props} />
  }
}

export default CustomModal
