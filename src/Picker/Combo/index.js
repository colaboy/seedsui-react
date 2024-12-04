import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用
import Combo from './../../Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

// Picker
const PickerCombo = forwardRef(
  (
    {
      // Modal
      ModalProps,

      defaultPickerValue,
      list,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        ModalComponent={Modal}
        {...props}
        // Modal
        ModalProps={{
          ...ModalProps,
          defaultPickerValue: defaultPickerValue,
          list: list
        }}
      />
    )
  }
)

export default PickerCombo
