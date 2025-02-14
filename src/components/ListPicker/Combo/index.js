import React, { forwardRef } from 'react'
import CascaderModal from './../Modal'

// 内库使用-start
import Combo from './../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const Combo = Modal.Combo
测试使用-end */

// ListPicker
const ListPickerCombo = forwardRef(
  (
    {
      // Modal
      modalProps,

      list,
      loadList,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        {...props}
        // Modal
        modal={props?.modal || CascaderModal}
        modalProps={{
          ...modalProps,
          list: list,
          loadList: loadList
        }}
      />
    )
  }
)

export default ListPickerCombo
