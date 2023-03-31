import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Input.Text
        // inputProps={{
        //   visible: false
        // }}
        value={value}
        allowClear
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
