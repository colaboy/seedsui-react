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
        onChange={setValue}
        // TabsProps={{ className: 'hide' }}
        contentProps={{ className: 'flex flex-right' }}
      />
    </>
  )
}
