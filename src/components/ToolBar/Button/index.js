import React, { useRef, forwardRef } from 'react'

// 内库使用-start
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { Button } from 'seedsui-react'
测试使用-end */

const ButtonBar = forwardRef(({ ...props }, ref) => {
  const rootRef = useRef(null)

  return (
    <Button
      {...props}
      className={'toolbar-button' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    />
  )
})

export default ButtonBar
