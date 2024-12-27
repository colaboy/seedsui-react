import React, { useState, useRef, useEffect } from 'react'
import { Bridge, Location } from 'seedsui-react'

export default () => {
  Bridge.debug = true
  const comboRef = useRef(null)
  const [value, setValue] = useState(null)

  useEffect(() => {
    // 延迟设置值
    setTimeout(() => {
      setValue({
        address: '江苏省南京市雨花台区玉兰路98号',
        value: '江苏省南京市雨花台区玉兰路98号',
        longitude: 118.7979252979065,
        latitude: 31.968667296242337
      })
    }, 5000)
  }, [])
  return (
    <>
      <div>1</div>
      <Location.Main
        ref={comboRef}
        ak={''}
        style={{ height: '400px' }}
        type="choose"
        autoLocation={false}
        value={value}
        onChange={(val) => {
          console.log('修改:', val)
          setValue(val)
        }}
      />
    </>
  )
}
