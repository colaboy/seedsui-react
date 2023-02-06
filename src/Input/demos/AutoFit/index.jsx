import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(10.12341234)
  return (
    <>
      <Input.AutoFit placeholder="AutoFit" value={value} onChange={setValue} allowClear={true} />
    </>
  )
}
