import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('1')
  return (
    <>
      <Input.NumberBox
        // disabled
        defaultValue={value}
        style={{ width: '200px' }}
        min={0}
        max={5}
        // value={value}
        allowClear
        liconProps={{ className: 'icon icon-rdo-emoji' }}
        licon={<i className="icon icon-rdo-emoji"></i>}
        ricon={<i className="icon icon-rdo-emoji"></i>}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      >
        1234
      </Input.NumberBox>
    </>
  )
}
