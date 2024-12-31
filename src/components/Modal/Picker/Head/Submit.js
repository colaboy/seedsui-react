import React from 'react'

// 内库使用
import locale from './../../../../utils/locale'

// 测试使用
// import { locale } from 'seedsui-react'

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
      {submitCaption || locale('确定', 'SeedsUI_ok')}
      {typeof total === 'number' && `(${total})`}
    </div>
  )
}

export default Submit
