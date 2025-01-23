import React, { forwardRef } from 'react'
import LocaleUtil from './../../../utils/LocaleUtil'
import Alert from './../Alert/index'

// Confirm
const Confirm = forwardRef(({ cancelProps, submitProps, ...props }, ref) => {
  // 默认补充确定按钮
  let newProps = {
    submitProps: submitProps || {
      caption: LocaleUtil.locale('确定', 'SeedsUI_ok')
    },
    cancelProps: cancelProps || {
      caption: LocaleUtil.locale('取消', 'SeedsUI_cancel')
    },
    ...props
  }
  return <Alert ref={ref} className="modal-alert" {...newProps} />
})

export default Confirm
