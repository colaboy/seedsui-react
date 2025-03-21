import React from 'react'
import Combo from './../../../Combo'

// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
import Input from './../../../../Input'

// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Input } from 'seedsui-react'
测试使用-end */

// 自定义日期选择弹窗: 两框选择
export default function CustomDates({
  portal,
  type,
  value,
  min,
  max,
  hourStep,
  minuteStep,
  disabledStart,
  disabledEnd,
  allowClear,
  onChange,

  datePickerModalProps
}) {
  // 开始和结束日期
  let startDate = Array.isArray(value) && value[0] instanceof Date ? value[0] : null
  let endDate = Array.isArray(value) && value[1] instanceof Date ? value[1] : null

  return (
    <div className={`datepicker-rangemain-custom`}>
      <Combo
        modalProps={{ ...(datePickerModalProps || {}), portal: portal }}
        type={type}
        value={startDate}
        disabled={disabledStart}
        min={type === 'week' ? min : undefined}
        max={type === 'week' ? max : undefined}
        hourStep={hourStep}
        minuteStep={minuteStep}
        onChange={(argStartDate) => {
          let newStartDate = argStartDate || null
          if (onChange) onChange(newStartDate || endDate ? [newStartDate, endDate] : null)
        }}
        placeholder={LocaleUtil.locale('请选择', 'SeedsUI_placeholder_select')}
        allowClear={allowClear}
        clear={({ clearable, triggerClear }) => {
          return clearable ? <Input.IconClear onClick={triggerClear} /> : <Input.IconRightArrow />
        }}
      />
      —
      <Combo
        modalProps={{ ...(datePickerModalProps || {}), portal: portal }}
        type={type}
        value={endDate}
        min={type === 'week' ? min : undefined}
        max={type === 'week' ? max : undefined}
        hourStep={hourStep}
        minuteStep={minuteStep}
        disabled={disabledEnd}
        onChange={(argEndDate) => {
          let newEndDate = argEndDate || null
          if (onChange) onChange(startDate || newEndDate ? [startDate, newEndDate] : null)
        }}
        placeholder={LocaleUtil.locale('请选择', 'SeedsUI_placeholder_select')}
        allowClear={allowClear}
        clear={({ clearable, triggerClear }) => {
          return clearable ? <Input.IconClear onClick={triggerClear} /> : <Input.IconRightArrow />
        }}
      />
    </div>
  )
}
