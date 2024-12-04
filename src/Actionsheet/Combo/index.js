import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import Modal from './../Modal'

// 卡片选择
export default forwardRef((props, ref) => {
  return <Combo ref={ref} {...props} ModalComponent={props?.ModalComponent || Modal} />
})
