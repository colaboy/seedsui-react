import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('Auto ReSize')
  return (
    <>
      <Input.AutoFit placeholder="AutoFit" value={value} onChange={setValue} allowClear={true} />
    </>
  )
}
