import React from 'react'
import locale from './../../../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

import Combo from './../../../Combo'

// 自定义日期选择弹窗: 两框选择
export default function CustomDates({
  portal,
  type,
  disabledStart,
  disabledEnd,
  allowClear,
  value,
  onBeforeChange,
  onChange,
  onError,
  DatePickerModalProps
}) {
  // 开始和结束日期
  let startDate = Array.isArray(value) && value[0] instanceof Date ? value[0] : null
  let endDate = Array.isArray(value) && value[1] instanceof Date ? value[1] : null

  return (
    <div className={`datepicker-rangemain-custom`}>
      <Combo
        portal={portal}
        ModalProps={DatePickerModalProps}
        type={type}
        value={startDate}
        disabled={disabledStart}
        // max={Array.isArray(value) && value.length === 2 ? value[1] : undefined}
        // onError={onError}
        onBeforeChange={(argStartDate) => {
          let newStartDate = argStartDate || null
          if (onBeforeChange) {
            return onBeforeChange(newStartDate || endDate ? [newStartDate, endDate] : null)
          }
        }}
        onChange={(argStartDate) => {
          let newStartDate = argStartDate || null
          if (onChange) onChange(newStartDate || endDate ? [newStartDate, endDate] : null)
        }}
        placeholder={locale('请选择', 'SeedsUI_placeholder_select')}
        allowClear={allowClear}
        ricon={<i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />}
      />
      —
      <Combo
        portal={portal}
        ModalProps={DatePickerModalProps}
        type={type}
        value={endDate}
        disabled={disabledEnd}
        // min={Array.isArray(value) && value.length === 2 ? value[0] : undefined}
        // onError={onError}
        onBeforeChange={(argEndDate) => {
          let newEndDate = argEndDate || null
          if (onBeforeChange) {
            return onBeforeChange(startDate || newEndDate ? [startDate, newEndDate] : null)
          }
        }}
        onChange={(argEndDate) => {
          let newEndDate = argEndDate || null
          if (onChange) onChange(startDate || newEndDate ? [startDate, newEndDate] : null)
        }}
        placeholder={locale('请选择', 'SeedsUI_placeholder_select')}
        allowClear={allowClear}
        ricon={<i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />}
      />
    </div>
  )
}
