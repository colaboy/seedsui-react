import React, { useState } from 'react'
import { Radio } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <Radio checked={value} onChange={setValue}>
        选项1
      </Radio>
    </>
  )
}
