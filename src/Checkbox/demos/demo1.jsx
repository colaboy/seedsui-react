import React, { useState } from 'react'
import { Checkbox } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <Checkbox checked={value} onChange={setValue}>
        选项1
      </Checkbox>
    </>
  )
}
