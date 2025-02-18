import React, { useRef, useEffect } from 'react'
import DateRange from './DateRange'

// 日期区间
function DateRangeBar({ title, value, onChange, ...props }) {
  const dateRangeRef = useRef(null)

  // 将所有dropdown合并到一个数组里, 用于全量关闭
  useEffect(() => {
    if (!window.dropdownRefs) window.dropdownRefs = []
    window.dropdownRefs.push(dateRangeRef)
    // eslint-disable-next-line
  }, [])

  function handleChange(newValue) {
    onChange && onChange(newValue)
  }

  return (
    <DateRange ref={dateRangeRef} title={title} value={value} onChange={handleChange} {...props} />
  )
}
export default DateRangeBar
