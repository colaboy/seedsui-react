import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  return (
    <>
      <DatePicker.Combo
        placeholder="Please select"
        type="datetime"
        value={value}
        multiple={true}
        onChange={setValue}
      />
    </>
  )
}