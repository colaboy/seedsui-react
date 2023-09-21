import React from 'react'
import locale from './../../../locale'

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
      {submitCaption || locale('确定', 'ok')}
      {typeof total === 'number' && `(${total})`}
    </div>
  )
}

export default Submit
