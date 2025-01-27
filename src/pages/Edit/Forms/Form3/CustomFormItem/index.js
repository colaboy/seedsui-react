import React from 'react'

// 自定义样式
function CustomFormItem({ value, onChange }) {
  return (
    <div
      onClick={() => {
        onChange && onChange(2)
      }}
    >
      自定义样式, 点击我将设置此项的值为2
    </div>
  )
}

export default CustomFormItem
