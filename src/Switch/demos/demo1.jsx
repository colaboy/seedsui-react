import React, { useState } from 'react'
import { Switch } from 'seedsui-react'

export default () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Switch
        checked={checked}
        checkedProps={{ text: '开' }}
        uncheckedProps={{ text: '关' }}
        onChange={setChecked}
      />
    </>
  )
}
