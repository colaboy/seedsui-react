import React, { forwardRef } from 'react'

import Cancel from './Cancel'
import Ok from './Ok'
import Title from './Title'

const Head = forwardRef(
  ({ title, titleProps, ok, onOk, okProps, cancel, onCancel, cancelProps }, ref) => {
    // 只显示标题
    if (cancel === null && ok === null) {
      return (
        <div className="modal-picker-header" ref={ref}>
          {/* 标题 */}
          <Title title={title} {...titleProps} />
        </div>
      )
    }

    // 带按钮
    return (
      <div className="modal-picker-header" ref={ref}>
        <div className="modal-picker-header-button left">
          {/* 确认显示时，取消在左侧 */}
          {ok !== null && cancel !== null ? (
            <Cancel text={cancel} onClick={onCancel} {...cancelProps} />
          ) : null}
        </div>
        {/* 标题 */}
        <Title title={title} {...titleProps} />
        <div className="modal-picker-header-button right">
          {/* 确认隐藏时，取消在右侧 */}
          {ok === null && cancel !== null ? (
            <Cancel text={cancel} onClick={onCancel} {...cancelProps} />
          ) : null}
          {/* 确认 */}
          {ok !== null && <Ok {...okProps} text={ok} onClick={onOk} />}
        </div>
      </div>
    )
  }
)

export default Head
