import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用
import Combo from './../../../components/Modal/SelectCombo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.SelectCombo

// Picker
const PickerCombo = forwardRef(
  (
    {
      // Modal
      modalProps,

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
        modal={props?.modal || Modal}
        modalProps={{
          ...modalProps,
          defaultPickerValue: defaultPickerValue,
          list: list
        }}
      />
    )
  }
)

export default PickerCombo
