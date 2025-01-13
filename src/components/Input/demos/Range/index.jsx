import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Input.Range
        style={{ marginTop: '50px' }}
        value={value}
        disabled
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
