import React from 'react'

// 内库使用-start
import Button from './../../../Button'
// 内库使用-end

/* 测试使用-start
import { Button } from 'seedsui-react'
测试使用-start */

// 底部按钮
export default function FooterButton({ type, id, name, primary, onChange }) {
  function handleClick() {
    onChange && onChange({ type, id, name, primary })
  }
  return (
    <Button
      className={`layout-footer-button${
        primary ? ' layout-footer-button-primary' : ' layout-footer-button-default'
      }`}
      onClick={handleClick}
    >
      {name}
    </Button>
  )
}
