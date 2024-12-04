import React, { forwardRef } from 'react'
import CascaderModal from './../Modal'

// 内库使用
import Combo from './../../Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

// Cascader
const CascaderCombo = forwardRef(
  (
    {
      // Modal
      ModalProps,

      list,
      loadData,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        {...props}
        // Modal
        ModalComponent={props?.ModalComponent || CascaderModal}
        ModalProps={{
          ...ModalProps,
          list: list,
          loadData: loadData
        }}
      />
    )
  }
)

export default CascaderCombo
