import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用-start
import Combo from './../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { BaseModal } from 'seedsui-react'
const Combo = BaseModal.Combo
测试使用-end */

// 卡片选择
export default forwardRef(
  (
    {
      // Modal
      modalProps,

      list,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        {...props}
        // Modal
        modal={Modal}
        modalProps={{
          ...modalProps,
          list: list
        }}
      />
    )
  }
)
