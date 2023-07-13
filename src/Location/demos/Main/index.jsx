import React, { useState, useRef } from 'react'
import { Bridge, Location } from 'seedsui-react'

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState({
    latitude: '39.909187',
    longitude: '116.397451',
    value: '北京'
  })
  return (
    <>
      <div>1</div>
      <Location.Main
        ref={comboRef}
        ak={'3pTjiH1BXLjASHeBmWUuSF83'}
        style={{ height: '400px' }}
        type="choose"
        value={value}
        onChange={(val) => {
          console.log('修改:', val)
          setValue(val)
        }}
      />
    </>
  )
}
