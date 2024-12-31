import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('2.10')
  return (
    <>
      <Input.NumberBox
        // disabled
        // defaultValue={value}
        value={value}
        precision={3}
        // trim={true}
        style={{ width: '200px' }}
        min={0.1}
        max={0.5}
        allowClear
        // liconProps={{ className: 'icon icon-rdo-emoji' }}
        // licon={<i className="icon icon-rdo-emoji"></i>}
        // ricon={<i className="icon icon-rdo-emoji"></i>}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      >
        {/* 1234 */}
      </Input.NumberBox>
    </>
  )
}
