import React from 'react'
import locale from './../../utils/locale'

function Result({ title, image, imageProps, children, ...props }) {
  return (
    <div className="result" {...props}>
      {/* Image */}
      {image ? (
        image
      ) : (
        <img
          alt=""
          src={'//res.waiqin365.com/d/waiqin365_h5/components/empty.png'}
          className="result-image"
          {...imageProps}
        />
      )}

      {/* Title */}
      {title === undefined || title ? (
        <div className="result-title">{title || locale('暂无数据', 'SeedsUI_no_data')}</div>
      ) : null}

      {children}
    </div>
  )
}

export default Result
