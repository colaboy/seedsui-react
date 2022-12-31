// require PrototypeDate.js和PrototypeString.js
import React from 'react'
import locale from '../../locale'

const Quick = function ({ ranges, onChange }) {
  function handleClick(rangeKey) {
    if (onChange) onChange(ranges[rangeKey])
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
              className="datepicker-rangemodal-modal-card-button"
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
