import React, { forwardRef } from 'react'

import BaseCombo from './../../Select/Combo'
import Modal from './../Modal'

const Combo = forwardRef(({ titles, ...props }, ref) => {
  // 扩展非标准属性
  if (titles) {
    if (!props.MainProps) {
      props.MainProps = {}
    }
    props.MainProps.titles = titles
  }

  return <BaseCombo ref={ref} ModalComponent={Modal} {...(props || {})} />
})

export default Combo
