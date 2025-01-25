import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用
import Combo from './../../../components/Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

const SelectCombo = forwardRef(
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

export default SelectCombo
