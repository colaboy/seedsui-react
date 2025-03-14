import React, { useEffect, useState } from 'react'
import { Layout, Bridge, Button } from 'seedsui-react'
import Image from './ImageUploader/Browser'

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

  // 异步上传
  async function handleAsyncUpload() {
    let isOK = validate(list)
    if (isOK !== true) {
      Toast.show({ content: isOK })
      return
    }

    let result = await imageUploaderRef.current.uploadList()
    alert(JSON.stringify(result))
  }

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
    <Layout className="full">
      <Layout.Main>
        <Image
          async
          type="browser"
          // beta
          uploadPosition="start"
          ref={imageUploaderRef}
          // type="browser"
          // timeout={2000}
          uploadDir={`businessName`}
          sizeType={['compressed']}
          // width={100}
          isFake
          sourceType={['camera', 'album']}
          list={list}
          count={4}
          watermarkConfig={{ showLogo: '0', showTime: 1, type: 2 }}
          // 离北京天安门差不多2.4公里
          // watermark={['0924-定位拍照', '$name $datetime', '$address $distance:116.37,39.91']}
          onChange={handlePhotoChange}
          onDelete={handlePhotoChange}
          // onLoad={() => {
          //   imageUploaderRef.current.chooseImage()
          // }}
        />
      </Layout.Main>
      <Layout.Footer>
        <Button className="flex primary" onClick={handleAsyncUpload}>
          Sync Upload
        </Button>
      </Layout.Footer>
    </Layout>
  )
}
