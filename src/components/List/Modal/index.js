import React, { forwardRef } from 'react'
import Main from './../Main'

// 内库使用-start
import SelectModal from './../../Modal/SelectModal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const SelectModal = Modal.SelectModal
测试使用-end */

// Modal
const ListModal = forwardRef(
  (
    {
      // Main
      mainProps,

      multiple,
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
      <SelectModal
        ref={ref}
        {...props}
        main={props?.main || Main}
        mainProps={{
          ...mainProps,
          multiple,
          loadList,
          pull,
          pagination,
          wrapper,
          layout,
          checkbox: checkbox ?? true,
          checkboxPosition
        }}
        className={`list-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default ListModal
