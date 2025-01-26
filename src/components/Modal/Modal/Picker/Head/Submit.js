import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

const Submit = ({ submitProps, onSubmitClick }) => {
  let {
    visible,
    caption: submitCaption,
    disabled: submitDisabled,
    total,
    ...otherSubmitProps
  } = submitProps || {}

  // 点击确定
  function handleSubmitClick(e) {
    e.stopPropagation()
    if (submitProps?.onClick) submitProps?.onClick(e)
    if (onSubmitClick) onSubmitClick(e)
  }

  return (
    <div
      {...otherSubmitProps}
      className={`picker-submit${
        otherSubmitProps.className ? ' ' + otherSubmitProps.className : ''
      }${submitDisabled === true ? ' disabled' : ''}`}
      onClick={handleSubmitClick}
    >
      {submitCaption || LocaleUtil.locale('确定', 'SeedsUI_ok')}
      {typeof total === 'number' && `(${total})`}
    </div>
  )
}

export default Submit
