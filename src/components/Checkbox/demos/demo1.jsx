import React, { useState } from 'react'
import { Checkbox } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <Checkbox checked={value} onChange={setValue}>
        普通
      </Checkbox>
      <Checkbox checked={true}>选中</Checkbox>
      <Checkbox checked={false} disabled>
        普通-禁用
      </Checkbox>
      <Checkbox checked={true} disabled>
        选中-禁用
      </Checkbox>
    </>
  )
}
