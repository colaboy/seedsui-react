import React from 'react'

// 标题
const Caption = ({ captionProps }) => {
  const { caption: headerCaption, ...otherCaptionProps } = captionProps || {}

  return (
    <div
      {...otherCaptionProps}
      className={`picker-header-title${
        otherCaptionProps?.className ? ' ' + otherCaptionProps?.className : ''
      }`}
    >
      {headerCaption}
    </div>
  )
}

export default Caption
