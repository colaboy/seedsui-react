import React, { useState } from 'react'
import { Picker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <>
      <Picker.Combo
        placeholder="Please select"
        value={value}
        list={[
          {
            id: '1',
            name: '1'
          },
          {
            id: '2',
            name: '2'
          }
        ]}
        onChange={setValue}
      />
    </>
  )
}
