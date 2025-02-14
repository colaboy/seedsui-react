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

      list,
      loadList,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (list) props.mainProps.list = list
    if (loadList) props.mainProps.loadList = loadList

    return (
      <ModalPicker
        ref={ref}
        ok={null}
        {...props}
        main={props?.main || Main}
        changeClosable={(newValue, newArguments, { triggerOk }) => {
          let lastTab =
            Array.isArray(newValue) && newValue.length ? newValue[newValue.length - 1] : null
          if (lastTab?.isLeaf) {
            triggerOk(newValue)
          }
        }}
        value={value}
        className={`listpicker-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default CascaderModal
