import React, { forwardRef } from 'react'
import getList from './getList'
import valueToList from './valueToList'
import listToValue from './listToValue'

// 内库使用
import Picker from './../../../Picker'

// 测试使用
// import { Picker } from 'seedsui-react'

// 日期选择
function Main(
  {
    type = 'date', // year | quarter | month | date | time | datetime
    hourStep,
    minuteStep,
    value,
    onChange,
    ...props
  },
  ref
) {
  function handleChange(list) {
    let newValue = listToValue(list, type)
    onChange && onChange(newValue)
  }

  return (
    <Picker.Main
      ref={ref}
      value={valueToList(value, type)}
      list={getList(value, type, { hourStep, minuteStep })}
      onChange={handleChange}
      {...props}
    />
  )
}

export default forwardRef(Main)