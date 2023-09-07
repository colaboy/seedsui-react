import React from 'react'
import locale from './../../locale'

import Combo from './../Combo'

// 日期快捷选择
export default function CustomCombo({
  portal,
  dateProps,
  customProps,
  allowClear = 'exclusion-ricon',
  value,
  onChange
}) {
  // 开始和结束日期
  let startDate = Array.isArray(value) && value[0] instanceof Date ? value[0] : ''
  let endDate = Array.isArray(value) && value[1] instanceof Date ? value[1] : ''

  // 修改开始日期
  function handleStartDateChange(startDate) {
    if (onChange) onChange([startDate, value?.[1] || null])
  }
  // 修改结束日期
  function handleEndDateChange(endDate) {
    if (onChange) onChange([value?.[0] || null, endDate])
  }

  return (
    <div
      {...customProps}
      className={`datepicker-rangemain-custom${
        customProps?.className ? ' ' + customProps.className : ''
      }`}
    >
      <Combo
        portal={portal}
        value={startDate}
        max={Array.isArray(value) && value.length === 2 ? value[1] : undefined}
        onChange={handleStartDateChange}
        placeholder={locale('请选择', 'ZKGJ001848')}
        allowClear={allowClear}
        ricon={<i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />}
        {...dateProps}
      />
      —
      <Combo
        portal={portal}
        value={endDate}
        min={Array.isArray(value) && value.length === 2 ? value[0] : undefined}
        onChange={handleEndDateChange}
        placeholder={locale('请选择', 'ZKGJ001848')}
        allowClear={allowClear}
        ricon={<i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />}
        {...dateProps}
      />
    </div>
  )
}
