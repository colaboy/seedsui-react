import React, { forwardRef } from 'react'

const Chat = forwardRef(
  (
    {
      icon,
      caption,
      captionAttribute = {},
      contentAttribute = {},
      textAttribute = {},
      children,
      ...others
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...others}
        className={`chat${others.className ? ' ' + others.className : ''}`}
      >
        {icon}
        <div
          {...contentAttribute}
          className={`chat-content${
            contentAttribute.className ? ' ' + contentAttribute.className : ''
          }`}
        >
          {caption && (
            <div
              {...captionAttribute}
              className={`chat-content-caption${
                captionAttribute.className ? ' ' + captionAttribute.className : ''
              }`}
            >
              {caption}
            </div>
          )}
          <div
            {...textAttribute}
            className={`chat-content-text${
              textAttribute.className ? ' ' + textAttribute.className : ''
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
