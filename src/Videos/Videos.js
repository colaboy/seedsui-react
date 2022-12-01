import React, { forwardRef, Fragment } from 'react'
import Photos from './../Photos'

// 视频栅格
const Videos = forwardRef(
  (
    {
      onClick,
      showPlay = false,
      // onChoose,
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      /*
      显示或隐藏预览 boolean|func, 默认true,
      func(e, value)
      e:{
        currentTarget: div.input-text-box
        target: div.input-text-box
        type: "choose|preview"
        visible: false|true
      }
      value: 同传入的value
      */
      // 显隐路由
      routePath = 'componentPage=1',
      // 属性
      videoFullProps = {},
      ...others
    },
    ref
  ) => {
    // 修改数据源
    if (Array.isArray(others.list) && others.list.length) {
      for (let item of others.list) {
        item.previewType = 'video'
      }
    }
    return (
      <Fragment>
        <Photos
          ref={ref}
          {...others}
          isBrowser={true}
          type="video"
          children={
            showPlay ? ( // 视频播放图标
              <div className="photos-item-video">
                <div className="photos-item-video-icon"></div>
              </div>
            ) : null
          }
        />
        {/* 录相 */}
        {/* {showRecord && <Camera
            onHide={() => setShowRecord(false)}
            onRecord={record}
          />} */}
      </Fragment>
    )
  }
)

export default Videos
