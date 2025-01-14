import React, { forwardRef } from 'react'
import locale from './../../../utils/locale'
import BaseModal from './../BaseModal'
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
        caption: locale('确定', 'SeedsUI_ok')
      },
      cancelProps: cancelProps,
      ...props
    }
    return (
      <BaseModal ref={ref} className="modal-alert" maskClosable={maskClosable} {...props}>
        {getChildren(newProps)}
      </BaseModal>
    )
  }
)

export default Alert
