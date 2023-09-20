import React, { forwardRef } from 'react'
import getCancelVisible from './getCancelVisible'
import getSubmitVisible from './getSubmitVisible'

import Cancel from './Cancel'
import Submit from './Submit'
import Caption from './Caption'

const Head = forwardRef(
  ({ captionProps, submitProps, cancelProps, onSubmitClick, onCancelClick }, ref) => {
    // 是否隐藏取消
    let cancelVisible = getCancelVisible(cancelProps, onCancelClick)
    // 是否隐藏确认, 隐藏确认按钮时, 取消按钮要在右侧显示
    let submitVisible = getSubmitVisible(submitProps, onSubmitClick)

    // 只显示标题
    if (!cancelVisible && !submitVisible) {
      return (
        <div className="picker-header" ref={ref}>
          {/* 标题 */}
          <Caption captionProps={captionProps} />
        </div>
      )
    }

    // 带按钮
    return (
      <div className="picker-header" ref={ref}>
        <div className="picker-header-button left">
          {/* 确认显示时，取消在左侧 */}
          {submitVisible && cancelVisible ? (
            <Cancel cancelProps={cancelProps} onCancelClick={onCancelClick} />
          ) : null}
        </div>
        {/* 标题 */}
        <Caption captionProps={captionProps} />
        <div className="picker-header-button right">
          {/* 确认隐藏时，取消在右侧 */}
          {!submitVisible && cancelVisible ? (
            <Cancel cancelProps={cancelProps} onCancelClick={onCancelClick} />
          ) : null}
          {/* 确认 */}
          {submitVisible && <Submit submitProps={submitProps} onSubmitClick={onSubmitClick} />}
        </div>
      </div>
    )
  }
)

export default Head
