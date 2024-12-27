import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Input.AutoFit
        placeholder="AutoFit"
        inputProps={{
          style: {
            maxHeight: '500px'
          }
        }}
        style={{ backgroundColor: '#f8f8f8' }}
        value={value}
        onChange={setValue}
        allowClear={true}
      />
    </>
  )
}
