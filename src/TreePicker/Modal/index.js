import React, { forwardRef } from 'react'
import Tree from './../Tree'

// 内库使用
import BaseModal from './../../Select/Modal'

// 测试使用
// import { Select } from 'seedsui-react'
// const BaseModal = Select.Modal

const Modal = forwardRef(({ ...props }, ref) => {
  return <BaseModal ref={ref} {...props} MainComponent={Tree} />
})

export default Modal
