import React, { forwardRef } from 'react'

import BaseModal from './../../Select/Modal'
import Main from './../Main'

const Modal = forwardRef(({ titles, ...props }, ref) => {
  // 扩展非标准属性
  if (titles) {
    if (!props.MainProps) {
      props.MainProps = {}
    }
    props.MainProps.titles = titles
  }

  return <BaseModal ref={ref} {...props} MainComponent={Main} />
})

export default Modal
