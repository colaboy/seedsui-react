import React, { forwardRef } from 'react'

const Notice = forwardRef(
  (
    {
      wrapperAttribute = {},
      icon,
      caption = '暂无数据',
      captionAttribute = {},
      sndcaption,
      sndcaptionAttribute = {},
      content,
      contentHTML,
      children,
      ...others
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...others}
        className={`notice${others.className ? ' ' + others.className : ''}`}
      >
        <div
          {...wrapperAttribute}
          className={`notice-wrapper${
            wrapperAttribute.className ? ' ' + wrapperAttribute.className : ''
          }`}
        >
          {icon ? icon : <i className="icon notice-icon notice-icon-nodata"></i>}
          {caption && (
            <div
              {...captionAttribute}
              className={`notice-caption${
                captionAttribute.className ? ' ' + captionAttribute.className : ''
              }`}
            >
              {caption}
            </div>
          )}
          {sndcaption && (
            <div
              {...sndcaptionAttribute}
              className={`notice-sndcaption${
                sndcaptionAttribute.className ? ' ' + sndcaptionAttribute.className : ''
              }`}
            >
              {sndcaption}
            </div>
          )}
          {content}
          {contentHTML && <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>}
          {children}
        </div>
      </div>
    )
  }
)

export default Notice
