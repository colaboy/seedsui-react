import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputTextRef = useRef(null)
  const [value, setValue] = useState('中华人民共和中华人民中华人民共和中华人民')
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
        inputProps={{
          // visible: false,
          style: {
            padding: '12px'
          }
        }}
        style={{ backgroundColor: '#f8f8f8' }}
        // readOnly
        value={value}
        maxLength={10}
        allowClear={'exclusion-ricon'}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
        onClearVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        clearProps={{
          onClick: (e) => {
            console.log(e)
          }
        }}
        // riconProps={{ className: 'icon shape-arrow-right sm' }}
        ricon={<i className="ricon icon shape-arrow-right sm" />}
      />
    </>
  )
}
