import React from 'react'
import getDisplayValue from './getDisplayValue'

// 表单文本
function DisplayValue({ value, maxCount, precision, onChange }) {
  let val = getDisplayValue(value, { maxCount, precision })
  return val
}

export default DisplayValue
