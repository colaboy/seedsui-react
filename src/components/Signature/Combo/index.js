import React, { forwardRef } from 'react'
import Edit from './Edit'
import Add from './Add'

// Combo
const Combo = (
  {
    value,
    onBeforeChange,
    onChange,
    modalProps,
    // 绘画配置
    color,
    backgroundColor,
    ...props
  },
  ref
) => {
  // 已签显示图片
  if (value && typeof value === 'string') {
    return <Edit ref={ref} value={value} onDelete={onChange} />
  }

  // 未签显示添加按钮
  return (
    <Add
      ref={ref}
      value={value}
      onBeforeChange={onBeforeChange}
      onChange={onChange}
      modalProps={modalProps}
      // 绘画配置
      color={color}
      backgroundColor={backgroundColor}
      {...props}
    />
  )
}

export default forwardRef(Combo)
