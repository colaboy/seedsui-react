import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用
import Combo from './../../Select/Combo'

// 测试使用
// import { Select } from 'seedsui-react'
// const Combo = Select.Select

// 树选择
const TreePickerCombo = forwardRef(({ ...props }, ref) => {
  return <Combo ref={ref} {...props} ModalComponent={props?.ModalComponent || Modal} />
})

export default TreePickerCombo
