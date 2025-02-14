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
const CascaderModal = forwardRef(
  (
    {
      // Main
      value,

      multiple,
      list,
      loadList,
      pull,
      pagination,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (multiple) props.mainProps.multiple = multiple
    if (list) props.mainProps.list = list
    if (loadList) props.mainProps.loadList = loadList
    if (pull !== undefined) props.mainProps.pull = pull
    if (pagination !== undefined) props.mainProps.pagination = pagination

    return (
      <ModalPicker
        ref={ref}
        {...props}
        main={props?.main || Main}
        value={value}
        className={`list-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default CascaderModal
