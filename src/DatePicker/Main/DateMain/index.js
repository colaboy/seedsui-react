import React, { forwardRef } from 'react'
import getList from './getList'
import formatValue from './formatValue'

// 内库使用
import Picker from './../../../Picker'

// 日期选择
function Main(
  {
    type = 'date', // year | quarter | month | date | time | datetime
    value
  },
  ref
) {
  function handleChange(newValue) {
    debugger
  }

  console.log(getList(value, type))
  return (
    <Picker.Main
      ref={ref}
      value={formatValue(value, type)}
      list={getList(value, type)}
      onChange={handleChange}
    />
  )
}

export default forwardRef(Main)
