import React, { useRef, useState, useEffect } from 'react'
import { Videos, Bridge } from 'seedsui-react'

export default () => {
  useEffect(() => {
    Bridge.ready(() => {
      // alert('加载桥接')
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

  function handleReUpload(e, item, index, list) {
    // 上传中
    item.status = 'uploading'
    // let newList = [...list]
    list[index] = item
    // setList(newList)
    videosRef?.current?.updateStatus?.()

    // 上传完成
    setTimeout(() => {
      item.status = ''
      videosRef?.current?.updateStatus?.()
    }, 1000)
  }
  function handleClick(...params) {
    console.log('点击')
    console.log(...params)
  }
  function handleChoose(...params) {
    console.log('选择')
    console.log(...params)
  }
  function handleDelete(e, value, selected, index) {
    let successList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    setList(successList)
  }

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Videos
        ref={videosRef}
        // playVisible
        // preview={false}
        isBrowser={true}
        list={list}
        onChoose={handleChoose}
        onDelete={handleDelete}
        onClick={handleClick}
        onReUpload={handleReUpload}
      />
    </div>
  )
}
