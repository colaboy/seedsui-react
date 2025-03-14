import React, { useRef, useState, useEffect } from 'react'
import { Bridge, Image } from 'seedsui-react'

export default () => {
  useEffect(() => {
    Bridge.ready(() => {
      console.log('加载桥接')
    })
  }, [])

  const videosRef = useRef(null)
  const [list, setList] = useState([
    {
      id: '1',
      thumb:
        'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
      src: 'https://player.alicdn.com/video/aliyunmedia.mp4',
      status: 'success'
    },
    {
      id: '2',
      thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
      src: 'https://res.waiqin365.com/video/202001201.mp4',
      status: 'fail'
    }
  ])

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Image ref={videosRef} type="video" list={list} />
    </div>
  )
}
