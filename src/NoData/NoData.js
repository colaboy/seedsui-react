import React from 'react'
import locale from './../locale'

// 暂无数据
function NoData({ caption, imageProps, children, ...props }) {
  return (
    <div className="nodata" {...props}>
      <img
        alt=""
        src={'//res.waiqin365.com/d/waiqin365_h5/components/no-data.png'}
        className="nodata-image"
        {...imageProps}
      />
      {caption === undefined || caption ? (
        <div className="nodata-caption">{caption || locale('暂无数据', 'no_data')}</div>
      ) : null}
      {children}
    </div>
  )
}

export default NoData
