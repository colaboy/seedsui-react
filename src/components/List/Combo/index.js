import React, { forwardRef } from 'react'
import CascaderModal from './../Modal'

// 内库使用-start
import Combo from './../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const Combo = Modal.Combo
测试使用-end */

// List
const ListCombo = forwardRef(
  (
    {
      // Modal
      modalProps,

      multiple,
      list,
      loadList,
      pull,
      pagination,

      // List config
      wrapper,
      layout,
      checkbox,
      checkboxPosition,
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
          multiple,
          list,
          loadList,
          pull,
          pagination,
          wrapper,
          layout,
          checkbox,
          checkboxPosition
        }}
      />
    )
  }
)

export default ListCombo
