import React, { useRef, useEffect } from 'react'
import closeAllDropdown from './../utils/closeAllDropdown'

import DateRange from './DateRange'

// 日期区间
function DateRangeBar({ value, onChange, ...props }) {
  const dateRangeRef = useRef(null)

  // 将所有dropdown合并到一个数组里, 用于全量关闭
  useEffect(() => {
    if (!window.dropdownRefs) window.dropdownRefs = []
    window.dropdownRefs.push(dateRangeRef)
    // eslint-disable-next-line
  }, [])

  // 伸展时, 若已经展开了dropdown, 则隐藏
  function handleBeforeOpen() {
    if (document.querySelector('.dropdown-mask.active')) {
      closeAllDropdown()
      return false
    }
    return true
  }

  function handleChange(newValue) {
    onChange && onChange(newValue)
  }

  return (
    <DateRange
      ref={dateRangeRef}
      value={value}
      onBeforeOpen={handleBeforeOpen}
      onChange={handleChange}
      {...props}
    />
  )
}
export default DateRangeBar
