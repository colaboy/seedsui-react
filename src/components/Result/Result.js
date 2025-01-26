import React from 'react'

// 内库使用-start
import LocaleUtil from './../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

function Result({
  title,
  image,
  imageUrl = '//res.waiqin365.com/d/waiqin365_h5/components/empty.png',
  children,
  ...props
}) {
  // 渲染头像
  function getImageNode() {
    if (!image) return null

    if (typeof image === 'function') {
      return image()
    }
    if (typeof image === 'string') {
      return <img alt="" src={image} className="result-image" />
    }
    return image
  }

  return (
    <div {...props} className={`result${props?.className ? ' ' + props.className : ''}`}>
      {/* Image */}
      {getImageNode()}

      {/* Title */}
      {title === undefined || title ? (
        <div className="result-title">
          {title || LocaleUtil.locale('暂无数据', 'SeedsUI_no_data')}
        </div>
      ) : null}

      {children}
    </div>
  )
}

export default Result
