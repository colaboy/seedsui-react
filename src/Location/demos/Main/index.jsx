import React, { useState, useRef } from 'react'
import { Bridge, Location } from 'seedsui-react'

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState(null)
  return (
    <>
      <div>1</div>
      <Location.Main
        ref={comboRef}
        ak={'3pTjiH1BXLjASHeBmWUuSF83'}
        style={{ height: '400px' }}
        type="choose"
        autoLocation={true}
        value={value}
        onChange={(val) => {
          console.log('修改:', val)
          setValue(val)
        }}
      />
    </>
  )
}
