import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Chat = forwardRef(
  (
    { icon, caption, captionProps = {}, bubbleProps = {}, contentProps = {}, children, ...props },
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
        {icon}
        <div
          {...bubbleProps}
          className={`chat-bubble${bubbleProps.className ? ' ' + bubbleProps.className : ''}`}
        >
          {caption && (
            <div
              {...captionProps}
              className={`chat-bubble-caption${
                captionProps.className ? ' ' + captionProps.className : ''
              }`}
            >
              {caption}
            </div>
          )}
          <div
            {...contentProps}
            className={`chat-bubble-content${
              contentProps.className ? ' ' + contentProps.className : ''
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
