import React, { useEffect, useState } from 'react'
import { Bridge } from 'seedsui-react'
import Upload from 'library/components/Upload'

export default () => {
  const [list, setList] = useState([
    {
      name: '1',
      src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
    },
    {
      name: '2',
      src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.doc'
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
      <Upload
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
        onFileChange={(e) => {
          console.log('e', e)
        }}
        uploadPosition="end"
        fileProps={{
          capture: 'camera'
        }}
      />
    </>
  )
}
