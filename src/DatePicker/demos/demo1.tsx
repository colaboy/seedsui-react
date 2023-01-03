import React, { useState, useRef } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  const [rangeValue, setRangeValue] = useState(null)
  const [mulValue, setMulValue] = useState(null)

  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        type="datetime"
        value={value}
        multiple={true}
        onChange={setValue}
      />
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        value={mulValue}
        multiple={true}
        onChange={setMulValue}
      />
      <DatePicker.RangeCombo
        className="border-b"
        placeholder="Please select RangeCombo"
        type="datetime"
        min={new Date()}
        // max={new Date()}
        maskClosable={false}
        onChange={setRangeValue}
        onError={(err) => console.log(err)}
        value={rangeValue}
      />
      <DatePicker.RangeCombo
        // 自定义渲染
        render={(val, { displayValue }) => {
          if (!displayValue) {
            return '自定义区间'
          }
          return displayValue
        }}
        // maskClosable={false}
        value={rangeValue}
        onChange={setRangeValue}
      />
      <DatePicker.Types
        value={{
          type: 'date',
          id: 'date',
          name: '日',
          value: new Date()
        }}
        onChange={(...params) => console.log(...params)}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-right' }}
      />
    </>
  )
}
