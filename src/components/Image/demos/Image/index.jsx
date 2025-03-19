import React, { useEffect, useState, useRef } from 'react'
import { Toast, Layout, Divider, Bridge, Button, Image } from 'seedsui-react'
import uploadItem from './browser/uploadItem'

export default () => {
  const imageUploaderRef = useRef(null)
  const watermarkRef = useRef(null)

  const [list, setList] = useState([
    {
      id: '1',
      thumb: 'https://mobile.qince.com/p/mpage/5009d19ecd17c19962ed6608fa49a488.png',
      src: 'https://mobile.qince.com/p/mpage/5009d19ecd17c19962ed6608fa49a488.png',
      status: 'fail'
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

  const [customList, setCustomList] = useState([])

  useEffect(() => {
    Bridge.ready(() => {
      console.log('加载桥接')
    })
  }, [])

  // 异步上传
  async function handleAsyncUpload() {
    let isOK = Image.validateListStatus(list)
    if (isOK !== true) {
      Toast.show({ content: isOK })
      let result = await imageUploaderRef.current.uploadList()
      console.log('上传结果：', result)
      return
    }
  }

  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>Default Image</Divider>
        <Image
          ref={imageUploaderRef}
          // async
          // reUpload={false}
          visibleCount={2}
          allowClear
          allowChoose
          uploadPosition="start"
          sizeType={['compressed']}
          sourceType={['camera', 'album']}
          list={list}
          count={9}
          onBeforeChoose={() => {
            watermarkRef.current = null
            return new Promise((resolve) => {
              setTimeout(() => {
                watermarkRef.current = ['watermark line1']
                resolve(true)
              }, 2000)
            })
          }}
          onFileChange={({ fileURL, fileData }) => {
            // 待传文件
            return [
              {
                status: 'choose',
                localId: fileURL,
                fileData: fileData,
                thumb: fileURL,
                src: fileURL,
                watermark: watermarkRef.current,
                path: ``
              }
            ]
          }}
          onChange={(newList) => {
            console.log('修改:', newList)
            setList(newList)
          }}
          onUpload={uploadItem}
        />
        <Divider>Custom Image</Divider>
        <Image
          className="custom-image"
          // async
          // reUpload={false}
          visibleCount={2}
          allowClear
          allowChoose
          uploadPosition="start"
          sizeType={['compressed']}
          sourceType={['camera', 'album']}
          list={customList}
          count={9}
          onFileChange={({ fileURL, fileData }) => {
            // 待传文件
            return [
              {
                status: 'choose',
                localId: fileURL,
                fileData: fileData,
                thumb: fileURL,
                src: fileURL,
                path: ``
              }
            ]
          }}
          onChange={(newList) => {
            console.log('修改:', newList)
            setCustomList(newList)
          }}
          onUpload={uploadItem}
        >
          {Array.isArray(customList) && customList.length ? (
            <Image.List
              visibleCount={1}
              list={customList}
              onPreview={() => {
                console.log('preview')
                return false
              }}
            />
          ) : (
            'Custom Image Render'
          )}
        </Image>
      </Layout.Main>
      <Layout.Footer>
        <Button className="flex primary" onClick={handleAsyncUpload}>
          Sync Upload
        </Button>
      </Layout.Footer>
    </Layout>
  )
}
