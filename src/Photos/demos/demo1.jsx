import React, { useEffect, useState } from 'react'
import { Bridge, Photos } from 'seedsui-react'

export default () => {
  const [list, setList] = useState([
    {
      id: '2',
      thumb: 'https://mobile.qince.com/p/mpage/5009d19ecd17c19962ed6608fa49a488.png',
      src: 'https://mobile.qince.com/p/mpage/5009d19ecd17c19962ed6608fa49a488.png'
      // status: 'fail'
    },
    {
      id: '1',
      thumb:
        'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
      src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png'
      // status: 'uploading'
    }
  ])

  useEffect(() => {
    Bridge.ready(() => {
      console.log('加载桥接')
    })
  }, [])

  function handleClick(...params) {
    console.log('点击')
    console.log(...params)
  }
  function handleChoose(...params) {
    alert('选择')
    console.log(...params)
  }
  function handleDelete(e, value, selected, index) {
    console.log('删除')
    let successList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    setList(successList)
  }
  return (
    <>
      <Photos
        // isBrowser
        onBeforeChoose={() => {
          return new Promise((resolve) => {
            resolve(true)
          })
        }}
        list={list}
        onChoose={handleChoose}
        onDelete={handleDelete}
        onClick={handleClick}
        uploading
      />
    </>
  )
}
