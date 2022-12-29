import React, { forwardRef } from 'react'
import locale from './../../locale'

const Head = forwardRef(
  ({ multiple, captionProps, submitProps, cancelProps, onSubmitClick, onCancelClick }, ref) => {
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
        {cancelVisible !== false && (
          <div
            {...otherCancelProps}
            className={`picker-cancel${
              otherCancelProps.className ? ' ' + otherCancelProps.className : ''
            }${cancelDisabled === true ? ' disabled' : ''}`}
            onClick={handleCancelClick}
          >
            {cancelCaption || locale('取消', 'cancel')}
          </div>
        )}
        <div
          {...captionProps}
          className={`picker-header-title${
            captionProps?.className ? ' ' + captionProps?.className : ''
          }`}
        >
          {captionProps?.caption}
        </div>
        {submitVisible !== false && (
          <div
            {...otherSubmitProps}
            className={`picker-submit${
              otherSubmitProps.className ? ' ' + otherSubmitProps.className : ''
            }${submitDisabled === true ? ' disabled' : ''}`}
            onClick={handleSubmitClick}
          >
            {submitCaption || locale('完成', 'finish')}
          </div>
        )}
      </div>
    )
  }
)

export default Head
