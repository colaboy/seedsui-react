import React, { forwardRef } from 'react'
import locale from './../../locale'
import Modal from './../Modal'
import { getChildren } from './../utils'

// Alert
const Alert = forwardRef(
  (
    {
      maskClosable = false,
      captionProps,
      contentProps,
      footerProps,
      cancelProps,
      submitProps,
      ...props
    },
    ref
  ) => {
    // 默认补充确定按钮
    let newProps = {
      captionProps: captionProps,
      contentProps: contentProps,
      footerProps: footerProps,
      submitProps: submitProps || {
        caption: locale('确定', 'ok')
      },
      cancelProps: cancelProps,
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
