import React, { forwardRef } from 'react'

import Main from './../Main'

// 内库使用
import BaseModal from './../../Select/Modal'

// 测试使用
// import { Select } from 'seedsui-react'
// const BaseModal = Select.Modal

const Modal = forwardRef(({ ...props }, ref) => {
  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      multiple={false}
      MainComponent={Main}
    />
  )
})

export default Modal
