import React from 'react'
import { VideoPlayer } from 'seedsui-react'

export default () => {
  return (
    <>
      <VideoPlayer
        poster={
          'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
        }
        src={'https://player.alicdn.com/video/aliyunmedia.mp4'}
        autoPlay={false}
        bar={
          <div
            className="videoplayer-close"
            onClick={() => {
              alert('close')
            }}
          ></div>
        }
      />
    </>
  )
}
