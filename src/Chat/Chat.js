import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Chat = forwardRef(
  (
    { avatar, caption, captionProps = {}, contentProps = {}, bubbleProps = {}, children, ...props },
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
          {caption && (
            <div
              {...captionProps}
              className={`chat-content-caption${
                captionProps.className ? ' ' + captionProps.className : ''
              }`}
            >
              {caption}
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
