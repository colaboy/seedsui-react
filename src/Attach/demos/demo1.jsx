import React from 'react'
import { Attach } from 'seedsui-react'

export default () => {
  const list = [
    {
      name: '1',
      src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
    },
    {
      name: '2',
      src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
    }
  ]

  function handleClick(e, src, selected, index) {
    console.log('点击')
    console.log(e, src, selected, index)
  }
  function handleChoose(e) {
    console.log('选择')
    console.log(e.target)
  }
  function handleDelete(e, src, selected, index) {
    console.log('删除')
    console.log(e, src, selected, index)
  }

  return (
    <>
      <Attach
        style={{ border: '1px solid #ddd' }}
        list={list}
        // uploading
        onChoose={handleChoose}
        onDelete={handleDelete}
        onClick={handleClick}
      />
    </>
  )
}
