import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Input.Textarea
        value={value}
        allowClear
        inputProps={{
          style: {
            padding: '12px'
          }
        }}
        style={{ backgroundColor: '#f8f8f8' }}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
