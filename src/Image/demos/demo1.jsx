import React, { useEffect, useState } from 'react'
import { Bridge, Image } from 'seedsui-react'

export default () => {
  const [list, setList] = useState([
    {
      id: '1',
      thumb: 'https://mobile.qince.com/p/mpage/5009d19ecd17c19962ed6608fa49a488.png',
      src: 'https://mobile.qince.com/p/mpage/5009d19ecd17c19962ed6608fa49a488.png'
      // status: 'fail'
    },
    {
      id: '2',
      thumb:
        'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
      src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png'
      // status: 'uploading'
    },
    {
      id: '3',
      thumb:
        'https://image-test.waiqin365.com/6069734652819592543/blog/201912/819415708498937580.png?x-oss-process=style/zk320',
      src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/819415708498937580.png'
    }
  ])

  useEffect(() => {
    Bridge.ready(() => {
      console.log('加载桥接')
    })
  }, [])

  function handlePreview(...params) {
    console.log('预览')
    console.log(...params)
  }
  function handleReUpload(item, index, otherOptions) {
    console.log('重新上传')
    otherOptions.itemDOM.classList.remove('fail')
    otherOptions.itemDOM.classList.add('uploading')
  }
  function handleChoose(...params) {
    alert('选择')
    console.log(...params)
  }
  function handleDelete(item, index) {
    console.log('删除', item)
    let successList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    setList(successList)
  }
  return (
    <>
      <Image
        list={list}
        onBeforeChoose={() => {
          return new Promise((resolve) => {
            resolve(true)
          })
        }}
        onReUpload={handleReUpload}
        onChoose={handleChoose}
        onDelete={handleDelete}
        onPreview={handlePreview}
      />
    </>
  )
}
