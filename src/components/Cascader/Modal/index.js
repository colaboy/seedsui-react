import React, { forwardRef } from 'react'
import Main from './../Main'

// 内库使用-start
import ModalPicker from './../../../Modal/MainPicker'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.MainPicker
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
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (list) props.MainProps.list = list
    if (loadData) props.MainProps.loadData = loadData

    return (
      <ModalPicker
        ref={ref}
        submitProps={{
          visible: false
        }}
        {...props}
        MainComponent={props?.MainComponent || Main}
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
