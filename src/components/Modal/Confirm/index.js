import React, { forwardRef } from 'react'
import locale from './../../../utils/locale'
import Alert from './../Alert/index'

// Confirm
const Confirm = forwardRef(({ cancelProps, submitProps, ...props }, ref) => {
  // 默认补充确定按钮
  let newProps = {
    submitProps: submitProps || {
      caption: locale('确定', 'SeedsUI_ok')
    },
    cancelProps: cancelProps || {
      caption: locale('取消', 'SeedsUI_cancel')
    },
    ...props
  }
  return <Alert ref={ref} className="modal-alert" {...newProps} />
})

export default Confirm
