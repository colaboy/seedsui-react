import React from 'react'
import getCaption from './getCaption'
import getFooter from './getFooter'

// 获取子内容
function getChildren({
  captionProps,
  contentProps,
  footerProps,
  cancelProps,
  submitProps,
  onVisibleChange,
  children
}) {
  let caption = getCaption({ captionProps })
  let footer = getFooter({ cancelProps, submitProps, footerProps, onVisibleChange })

  // 有标题或者有底部时
  if (caption || footer) {
    return (
      <>
        <div className="modal-body">
          {caption}
          <div
            {...contentProps}
            className={`modal-content${
              contentProps?.className ? ' ' + contentProps.className : ''
            }`}
          >
            {children}
          </div>
        </div>
        {footer}
      </>
    )
  }
  return children
}

export default getChildren
