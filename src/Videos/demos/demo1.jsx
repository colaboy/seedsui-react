import React from 'react'
import { Videos } from 'seedsui-react'

export default () => {
  const list = [
    {
      id: '1',
      thumb:
        'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
      src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
    },
    {
      id: '2',
      thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
      src: 'https://res.waiqin365.com/video/202001201.mp4'
    }
  ]
  function handleClick(...params) {
    console.log('点击')
    console.log(...params)
  }
  function handleChoose(...params) {
    console.log('选择')
    console.log(...params)
  }
  function handleDelete(...params) {
    console.log('删除')
    console.log(...params)
  }

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Videos list={list} onChoose={handleChoose} onDelete={handleDelete} onClick={handleClick} />
    </div>
  )
}
