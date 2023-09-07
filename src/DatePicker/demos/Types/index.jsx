import React, { useState } from 'react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState({
    type: 'date',
    id: 'date',
    name: '日',
    value: new Date()
  })

  return (
    <>
      <DatePicker.Types
        value={value}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-left' }}
      />
    </>
  )
}
