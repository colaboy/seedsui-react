import React, { forwardRef } from 'react'
import Main from './../Main'

// 内库使用-start
import ModalPicker from './../../Modal/Modal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.Modal
测试使用-end */

// Modal
const CascaderModal = forwardRef(
  (
    {
      // Main
      value,

      list,
      loadData,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (list) props.mainProps.list = list
    if (loadData) props.mainProps.loadData = loadData

    return (
      <ModalPicker
        ref={ref}
        submitProps={{
          visible: false
        }}
        {...props}
        main={props?.main || Main}
        changeClosable={(newValue, newArguments, { submit }) => {
          let lastTab =
            Array.isArray(newValue) && newValue.length ? newValue[newValue.length - 1] : null
          if (lastTab?.isLeaf) {
            submit(newValue)
          }
        }}
        value={value}
        className={`cascader-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default CascaderModal
