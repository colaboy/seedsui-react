import React, { forwardRef } from 'react'
import CascaderModal from './../Modal'

// 内库使用-start
import Combo from './../../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const Combo = Modal.Combo
测试使用-end */

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
