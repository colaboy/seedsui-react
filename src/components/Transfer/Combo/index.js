import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用
import Combo from './../../Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

// Transfer
const TransferCombo = forwardRef(
  (
    {
      // Modal
      ModalProps,

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
          list: list
        }}
      />
    )
  }
)

export default TransferCombo
