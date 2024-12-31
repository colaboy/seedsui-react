import React from 'react'
import { Input } from 'seedsui-react'

// Main
const CustomMain = ({ ...props }) => {
  return (
    <>
      <div {...props} className={`picker-main${props?.className ? ' ' + props.className : ''}`}>
        <Input.Textarea placeholder="请输入打回原因" />
      </div>
    </>
  )
}

export default CustomMain
