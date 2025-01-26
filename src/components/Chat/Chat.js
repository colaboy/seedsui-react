import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Chat = forwardRef(
  (
    { avatar, title, titleProps = {}, contentProps = {}, bubbleProps = {}, children, ...props },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    return (
      <div
        {...props}
        className={`chat${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        {avatar}
        <div
          {...contentProps}
          className={`chat-content${contentProps.className ? ' ' + contentProps.className : ''}`}
        >
          {title && (
            <div
              {...titleProps}
              className={`chat-content-title${
                titleProps.className ? ' ' + titleProps.className : ''
              }`}
            >
              {title}
            </div>
          )}
          <div
            {...bubbleProps}
            className={`chat-content-bubble${
              bubbleProps.className ? ' ' + bubbleProps.className : ''
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)

export default Chat
