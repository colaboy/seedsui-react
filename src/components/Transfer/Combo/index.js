import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用-start
import Combo from './../../Modal/SelectCombo'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const Combo = Modal.SelectCombo
测试使用-end */

// Transfer
const TransferCombo = forwardRef(
  (
    {
      // Modal
      modalProps,

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
          list: list
        }}
      />
    )
  }
)

export default TransferCombo
