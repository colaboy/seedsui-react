import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  const [mulValue, setMulValue] = useState(null)
  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        value={value}
        multiple={true}
        onChange={setValue}
      />
      <DatePicker.MultipleCombo
        placeholder="Please MultipleCombo"
        value={mulValue}
        multiple={true}
        onChange={setMulValue}
      />
      <DatePicker.RangeCombo
        className="border-b"
        maskClosable={false}
        placeholder="Please select"
        // type="date"
        // min={new Date()}
        // max={new Date()}
        onChange={(newValue, dateName) => {
          setValue(newValue)
          console.log(newValue, dateName)
        }}
        onError={(err) => console.log(err)}
        value={value}
      />
      {/* <DatePicker.Types
        value={{
          type: 'date',
          id: 'date',
          name: '日',
          value: new Date()
        }}
        onChange={(...params) => console.log(...params)}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-right' }}
      /> */}
    </>
  )
}
