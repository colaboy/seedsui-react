import React, { forwardRef } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'

// 下拉选择
export default forwardRef(({ multiple, submitProps, ...props }, ref) => {
  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      multiple={multiple}
      submitProps={{
        // 必选单选不显示确定按钮
        visible: multiple !== undefined,
        ...submitProps
      }}
      {...props}
    />
  )
})
