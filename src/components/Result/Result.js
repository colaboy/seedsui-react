import React from 'react'

// 内库使用-start
import locale from './../../utils/locale'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

function Result({
  title,
  image,
  imageUrl = '//res.waiqin365.com/d/waiqin365_h5/components/empty.png',
  children,
  ...props
}) {
  return (
    <div {...props} className={`result${props?.className ? ' ' + props.className : ''}`}>
      {/* Image */}
      {image ? image : <img alt="" src={imageUrl} className="result-image" />}

      {/* Title */}
      {title === undefined || title ? (
        <div className="result-title">{title || locale('暂无数据', 'SeedsUI_no_data')}</div>
      ) : null}

      {children}
    </div>
  )
}

export default Result
