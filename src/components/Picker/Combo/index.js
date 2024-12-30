import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用
import Combo from './../../../components/Modal/Combo'

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
        {...props}
        // Modal
        ModalComponent={props?.ModalComponent || Modal}
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
