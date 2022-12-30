import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([{ id: '110101' }])
  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        value={value}
        multiple={true}
        onChange={setValue}
      />
    </>
  )
}
