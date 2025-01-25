import React, { useState } from 'react'
import { Checkbox } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <Checkbox checked={value} onChange={setValue}>
        Common
      </Checkbox>
      <br />
      <Checkbox checked={value} onChange={setValue} iconPosition="right">
        Common iconPosition=right
      </Checkbox>
      <br />
      <Checkbox checked={true}>选中</Checkbox>
      <br />
      <Checkbox checked={false} disabled>
        普通-禁用
      </Checkbox>
      <br />
      <Checkbox checked={true} disabled>
        选中-禁用
      </Checkbox>
    </>
  )
}
