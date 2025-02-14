import React, { forwardRef } from 'react'
import Main from './../Main'

// 内库使用-start
import ModalPicker from './../../Modal/ModalPicker'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.ModalPicker
测试使用-end */

// Modal
const ListModal = forwardRef(
  (
    {
      // Main
      mainProps,

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
      <ModalPicker
        ref={ref}
        {...props}
        main={props?.main || Main}
        mainProps={{
          ...mainProps,
          multiple,
          list,
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
