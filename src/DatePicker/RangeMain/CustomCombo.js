import React from 'react'
import locale from './../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

import Combo from './../Combo'

// 日期快捷选择
export default function CustomCombo({
  portal,
  DateProps,
  allowClear,
  value,
  onBeforeChange,
  onChange,
  onError
}) {
  // 开始和结束日期
  let startDate = Array.isArray(value) && value[0] instanceof Date ? value[0] : ''
  let endDate = Array.isArray(value) && value[1] instanceof Date ? value[1] : ''

  return (
    <div className={`datepicker-rangemain-custom`}>
      <Combo
        portal={portal}
        value={startDate}
        max={Array.isArray(value) && value.length === 2 ? value[1] : undefined}
        onError={onError}
        onBeforeChange={(newStartDate) => {
          if (onBeforeChange) {
            return onBeforeChange([newStartDate, value?.[1] || null])
          }
        }}
        onChange={(newStartDate) => {
          if (onChange) onChange([newStartDate, value?.[1] || null])
        }}
        placeholder={locale('请选择', 'ZKGJ001848')}
        allowClear={allowClear}
        ricon={<i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />}
        {...DateProps}
      />
      —
      <Combo
        portal={portal}
        value={endDate}
        min={Array.isArray(value) && value.length === 2 ? value[0] : undefined}
        onError={onError}
        onBeforeChange={(newEndDate) => {
          if (onBeforeChange) {
            return onBeforeChange([value?.[0] || null, newEndDate])
          }
        }}
        onChange={(newEndDate) => {
          if (onChange) onChange([value?.[0] || null, newEndDate])
        }}
        placeholder={locale('请选择', 'ZKGJ001848')}
        allowClear={allowClear}
        ricon={<i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />}
        {...DateProps}
      />
    </div>
  )
}
