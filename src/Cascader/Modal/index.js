import React, { forwardRef } from 'react'

// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'
// 内库使用
import BaseModal from './../../Select/Modal'

import Main from './../Main'

const Modal = forwardRef(({ ...props }, ref) => {
  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`cascader${props.className ? ' ' + props.className : ''}`}
      multiple={false}
      MainComponent={Main}
    />
  )
})

export default Modal
