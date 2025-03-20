import React, { useEffect, useState } from 'react'
import { Bridge, Image } from 'seedsui-react'

export default () => {
  const [list, setList] = useState([
    {
      id: '1',
      thumb: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png',
      src: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png'
      // status: 'fail'
    },
    {
      id: '2',
      thumb: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png',
      src: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png'
      // status: 'uploading'
    },
    {
      id: '3',
      thumb: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png',
      src: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png'
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
