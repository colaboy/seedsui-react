import React, { useState, useEffect } from 'react'
import Alert from './../Alert'
import InputDate from './../InputDate'
import locale from './../../utils/locale'

// 自定义时间
function DateRange({
  // 标题
  caption,
  type, // datetime|date|time
  // 开始日期: YYYY-MM-DD
  start,
  // 结束日期: YYYY-MM-DD
  end,

  // 开始和结束控件配置
  startInputDateProps = {},
  endInputDateProps = {},

  visible,
  onVisibleChange,
  // 提交前校验
  onSubmitBefore,
  // 隐藏和修改事件
  onChange
}) {
  // 自定义日期数据
  const [customStart, setCustomStart] = useState(start)
  const [customEnd, setCustomEnd] = useState(end)

  useEffect(() => {
    setCustomStart(start)
    setCustomEnd(end)
  }, [start, end])

  // 点击自定义取消
  function handleCustomCancel() {
    if (onVisibleChange) onVisibleChange(false)
    setCustomStart(start)
    setCustomEnd(end)
  }
  // 点击自定义确定
  function handleCustomSubmit(e) {
    if (typeof onSubmitBefore === 'function') {
      if (!onSubmitBefore(e, [customStart, customEnd])) {
        return
      }
    }
    if (onChange) {
      onChange(e, [customStart, customEnd])
    }
    if (onVisibleChange) onVisibleChange(false)
  }

  // 修改自定义开始时间
  function handleCustomStartDate(e, value) {
    setCustomStart(value)
  }

  // 修改自定义结束时间
  function handleCustomEndDate(e, value) {
    setCustomEnd(value)
  }

  return (
    <Alert
      caption={caption || ''}
      show={visible}
      submitAttribute={{ onClick: handleCustomSubmit }}
      cancelAttribute={{ onClick: handleCustomCancel }}
    >
      <InputDate
        type={type || 'date'}
        max={customEnd}
        value={customStart || start || ''}
        onChange={handleCustomStartDate}
        placeholder={locale('请选择', 'SeedsUI_placeholder_select')}
        className="datepopover-dialog-inputbox"
        pickerProps={{ maskAttribute: { style: { zIndex: '11' } } }}
        {...(startInputDateProps || {})}
      />
      <InputDate
        type={type || 'date'}
        min={customStart}
        value={customEnd || end || ''}
        onChange={handleCustomEndDate}
        placeholder={locale('请选择', 'SeedsUI_placeholder_select')}
        className="datepopover-dialog-inputbox"
        pickerProps={{ maskAttribute: { style: { zIndex: '11' } } }}
        {...(endInputDateProps || {})}
      />
    </Alert>
  )
}

export default DateRange
