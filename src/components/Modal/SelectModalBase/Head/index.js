import React, { forwardRef } from 'react'
import getButtonVisible from './getButtonVisible'
import Cancel from './Cancel'
import Ok from './Ok'
import Title from './Title'

const Head = forwardRef(
  ({ title, titleProps, ok, onOk, okProps, cancel, onCancel, cancelProps }, ref) => {
    // 只显示标题
    if (cancel === null && ok === null) {
      return (
        <div className="modal-selectmodal-header" ref={ref}>
          {/* 标题 */}
          <Title title={title} {...titleProps} />
        </div>
      )
    }

    console.log('ok:', ok, 'cancel:', cancel)
    // 带按钮
    return (
      <div className="modal-selectmodal-header" ref={ref}>
        <div className="modal-selectmodal-header-button left">
          {/* 确认显示时，取消在左侧 */}
          {getButtonVisible(ok) && getButtonVisible(cancel) ? (
            <Cancel text={cancel} onClick={onCancel} {...cancelProps} />
          ) : null}
        </div>
        {/* 标题 */}
        <Title title={title} {...titleProps} />
        <div className="modal-selectmodal-header-button right">
          {/* 只有取消按钮时，取消在右侧 */}
          {!getButtonVisible(ok) && getButtonVisible(cancel) ? (
            <Cancel text={cancel} onClick={onCancel} {...cancelProps} />
          ) : null}
          {/* 确认 */}
          {getButtonVisible(ok) && <Ok {...okProps} text={ok} onClick={onOk} />}
        </div>
      </div>
    )
  }
)

export default Head
