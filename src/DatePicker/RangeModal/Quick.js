// require PrototypeDate.js和PrototypeString.js
import React from 'react'
import locale from '../../locale'
import Utils from './Utils'

const Quick = function ({ value, ranges, onBeforeChange, onChange, onVisibleChange }) {
  // 根据value获取选中项
  let activeKey = Utils.getActiveKey(value, ranges)

  // 点击
  async function handleClick(rangeKey) {
    // 修改提示
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue)
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
