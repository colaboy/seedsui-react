import React, { forwardRef } from 'react'
import locale from './../../locale'
import Modal from './../Modal'
import { getChildren } from './../utils'

// Alert
const Alert = forwardRef(
  ({ maskClosable = false, captionProps, cancelProps, submitProps, ...props }, ref) => {
    // 默认补充确定按钮
    let newProps = {
      submitProps: submitProps || {
        caption: locale('确定')
      },
      cancelProps: cancelProps,
      captionProps: captionProps,
      ...props
    }
    return (
      <Modal ref={ref} className="modal-alert" maskClosable={maskClosable} {...props}>
        {getChildren(newProps)}
      </Modal>
    )
  }
)

export default Alert
