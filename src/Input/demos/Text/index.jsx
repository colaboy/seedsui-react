import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputTextRef = useRef(null)
  const [value, setValue] = useState('123123')
  useEffect(() => {
    let inputText = inputTextRef.current.rootDOM
    setTimeout(() => {
      // inputText.querySelector('.input-clear').classList.remove('hide')
    }, 1000)
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Input.Text
        ref={inputTextRef}
        // inputProps={{
        //   visible: false
        // }}
        // readOnly
        value={value}
        // allowClear
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
