// require PrototypeDate.js和PrototypeString.js
import React from 'react'
import locale from '../../locale'
import { getActiveKey } from './../utils'

const Quick = function ({ value, ranges, onBeforeChange, onChange, onVisibleChange }) {
  // 根据value获取选中项(选中项有可能有多个相同的日期,例如本月和最近30天)
  let activeKey = getActiveKey(value, ranges)

  // 点击
  async function handleClick(rangeKey) {
    window.activeRangeKey = rangeKey
    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(ranges[rangeKey])
      if (!goOn) return
    }
    if (onChange) onChange(ranges[rangeKey])
    if (onVisibleChange) onVisibleChange(false)
  }

  return (
    <div className="datepicker-rangemodal-modal-card">
      <p className="datepicker-rangemodal-modal-card-caption">
        {locale('快捷选择', 'quick_select')}
      </p>
      <div className="datepicker-rangemodal-modal-card-buttons">
        {Object.keys(ranges).map((rangeKey) => {
          return (
            <div
              key={rangeKey}
              className={`datepicker-rangemodal-modal-card-button${
                activeKey === rangeKey ? ' active' : ''
              }`}
              onClick={() => handleClick(rangeKey)}
            >
              {rangeKey}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Quick
