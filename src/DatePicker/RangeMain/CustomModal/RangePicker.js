import React from 'react'

import RangeModal from './../../RangeModal'

// 自定义日期选择弹窗: 两框选择
export default function RangePicker({
  portal,
  visible,
  onVisibleChange,
  value,
  onBeforeChange,
  onChange,
  onError
}) {
  return (
    <div className={`datepicker-rangemain-custom`}>
      <RangeModal
        visible={visible}
        onVisibleChange={onVisibleChange}
        ranges={null}
        portal={portal}
        value={value}
        onError={onError}
        onBeforeChange={onBeforeChange}
        onChange={onChange}
      />
    </div>
  )
}
