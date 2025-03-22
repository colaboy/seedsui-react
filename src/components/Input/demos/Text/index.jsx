import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import { Input } from 'seedsui-react'

export default () => {
  const inputTextRef = useRef(null)
  const [value, setValue] = useState('中华人民共和中华人民中华人民共和中华人民')

  return (
    <>
      <Input.Text
        trim
        ref={inputTextRef}
        precision={2}
        inputProps={{
          // visible: false,
          style: {
            padding: '12px'
          }
        }}
        style={{ backgroundColor: '#f8f8f8' }}
        // readOnly
        value={value}
        // maxLength={10}
        rightIcon={({ value }) => {
          return value ? null : <Input.IconRightArrow />
        }}
        allowClear
        clear={({ triggerClear }) => {
          return !_.isEmpty(value) ? (
            <Input.IconClear onClick={triggerClear} />
          ) : (
            <Input.IconRightArrow />
          )
        }}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
