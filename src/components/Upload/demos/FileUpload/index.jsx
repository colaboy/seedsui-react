import React, { useEffect, useState, useRef } from 'react'
import { Toast, Layout, Divider, Bridge, Button, Upload } from 'seedsui-react'
import uploadItem from './browser/uploadItem'

export default () => {
  const uploadRef = useRef(null)
  const [list, setList] = useState([
    {
      name: '1',
      src: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png',
      status: 'fail'
    },
    {
      name: '2',
      src: 'https://colaboy.github.io/seedsui-react/assets/images/logo.png'
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
    let isOK = Upload.validateListStatus(list)
    if (isOK !== true) {
      Toast.show({ content: isOK })
      let result = await uploadRef.current.uploadList()
      console.log('上传结果：', result)
      return
    }
  }

  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>Default Upload</Divider>
        <Upload
          ref={uploadRef}
          reUpload={false}
          // async
          allowChoose
          allowClear
          uploadPosition="start"
          maxSize={300 * 1024 * 1024}
          list={list}
          count={9}
          onBeforeChoose={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true)
              }, 2000)
            })
          }}
          onFileChange={({ fileName, fileSize, fileURL, fileData }) => {
            // 待传文件
            return [
              {
                sourceType: 'local',
                status: 'choose',
                name: fileName,
                size: fileSize,
                uploadDir: 'uploadDir/202504',
                src: fileURL,
                path: '',
                fileData: fileData
              }
            ]
          }}
          onChange={(newList) => {
            console.log('修改:', newList)
            setList(newList)
          }}
          onUpload={uploadItem}
        />
        <Divider>Custom Upload</Divider>
        <Upload
          className="custom-upload"
          reUpload={false}
          // async
          allowChoose
          allowClear
          uploadPosition="start"
          maxSize={300 * 1024 * 1024}
          list={customList}
          count={9}
          onFileChange={({ fileName, fileSize, fileURL, fileData }) => {
            // 待传文件
            return [
              {
                sourceType: 'local',
                status: 'choose',
                name: fileName,
                size: fileSize,
                uploadDir: 'uploadDir/202504',
                src: fileURL,
                path: '',
                fileData: fileData
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
            <Upload.List
              list={customList}
              onPreview={() => {
                console.log('preview')
                return false
              }}
            />
          ) : (
            'Custom Upload Render'
          )}
        </Upload>
      </Layout.Main>
      <Layout.Footer>
        <Button className="flex primary" onClick={handleAsyncUpload}>
          Sync Upload
        </Button>
      </Layout.Footer>
    </Layout>
  )
}
