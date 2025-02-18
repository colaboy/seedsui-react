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
const CascaderModal = forwardRef(
  (
    {
      // Main
      mainProps,

      list,
      loadData,
      ...props
    },
    ref
  ) => {
    return (
      <SelectModal
        ref={ref}
        ok={null}
        main={props?.main || Main}
        mainProps={{
          ...mainProps,
          list,
          loadData
        }}
        changeClosable={(newValue, newArguments, { triggerOk }) => {
          let lastTab =
            Array.isArray(newValue) && newValue.length ? newValue[newValue.length - 1] : null
          if (lastTab?.isLeaf) {
            triggerOk(newValue)
          }
        }}
        className={`cascader-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default CascaderModal
