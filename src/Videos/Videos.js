import React, { forwardRef, Fragment } from 'react'
import Photos from './../Photos'

// 视频栅格
const Videos = forwardRef(
  (
    {
      playVisible = false,
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      ...props
    },
    ref
  ) => {
    // 修改数据源
    if (Array.isArray(props.list) && props.list.length) {
      for (let item of props.list) {
        item.previewType = 'video'
        if (playVisible) {
          item.children = (
            <div className="photos-item-video">
              <div className="photos-item-video-icon"></div>
            </div>
          )
        }
      }
    }
    return (
      <Fragment>
        <Photos ref={ref} {...props} preview={preview} isBrowser={true} type="video" />
      </Fragment>
    )
  }
)

export default Videos
