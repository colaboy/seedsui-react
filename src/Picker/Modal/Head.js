import React, { forwardRef } from 'react'
import locale from './../../locale'

const Head = forwardRef(
  ({ captionProps, submitProps, cancelProps, onSubmitClick, onCancelClick }, ref) => {
    // 确定和取消按钮
    const {
      visible: cancelVisible,
      caption: cancelCaption,
      disabled: cancelDisabled,
      ...otherCancelProps
    } = cancelProps || {}

    const {
      visible: submitVisible,
      caption: submitCaption,
      disabled: submitDisabled,
      ...otherSubmitProps
    } = submitProps || {}

    // 标题
    const { caption: headerCaption, ...otherCaptionProps } = captionProps || {}

    // 点击确定
    function handleSubmitClick(e) {
      e.stopPropagation()
      if (submitProps.onClick) submitProps.onClick(e)
      if (onSubmitClick) onSubmitClick(e)
    }

    // 点击取消
    function handleCancelClick(e) {
      e.stopPropagation()
      if (cancelProps.onClick) cancelProps.onClick(e)
      if (onCancelClick) onCancelClick(e)
    }

    return (
      <div className="picker-header" ref={ref}>
        <div
          {...otherCancelProps}
          className={`picker-close${
            otherCancelProps.className ? ' ' + otherCancelProps.className : ''
          }${cancelDisabled === true ? ' disabled' : ''}${
            cancelVisible !== false ? '' : ' hidden'
          }`}
          onClick={handleCancelClick}
        >
          {cancelCaption || <div className="picker-icon-close"></div>}
        </div>
        <div
          {...otherCaptionProps}
          className={`picker-header-title${
            otherCaptionProps?.className ? ' ' + otherCaptionProps?.className : ''
          }`}
        >
          {headerCaption}
        </div>
        <div
          {...otherSubmitProps}
          className={`picker-submit${
            otherSubmitProps.className ? ' ' + otherSubmitProps.className : ''
          }${submitDisabled === true ? ' disabled' : ''}${
            submitVisible !== false ? '' : ' hidden'
          }`}
          onClick={handleSubmitClick}
        >
          {submitCaption || locale('完成', 'finish')}
        </div>
      </div>
    )
  }
)

export default Head
