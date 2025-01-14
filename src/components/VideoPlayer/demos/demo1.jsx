import React, { useRef, useEffect } from 'react'
import { Layout, VideoPlayer, Button } from 'seedsui-react'

export default () => {
  const videoPlayerRef = useRef(null)
  return (
    <Layout className="full">
      <Layout.Main>
        <VideoPlayer
          ref={videoPlayerRef}
          poster={
            'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
          }
          src={'https://player.alicdn.com/video/aliyunmedia.mp4'}
          autoPlay={false}
          header={
            <div
              className="videoplayer-close"
              onClick={() => {
                alert('close')
              }}
            ></div>
          }
        />
      </Layout.Main>
      <Layout.Footer>
        <Button
          onClick={() => {
            videoPlayerRef.current.play()
          }}
        >
          Play
        </Button>
        <Button
          onClick={() => {
            videoPlayerRef.current.pause()
          }}
        >
          Pause
        </Button>
      </Layout.Footer>
    </Layout>
  )
}
