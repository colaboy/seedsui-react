import React, { useEffect, useState } from 'react'
import { Button, Bridge } from 'seedsui-react'
import { Upload } from 'seedsui-react'
// import Upload from 'library/components/Upload'

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
      console.log(Upload.supportTypes('a.png', ['image']))
    })
  }, [])

  function handlePreview(...params) {
    console.log('预览', ...params)
    return false
  }
  function handleReUpload(item, index, otherOptions) {
    console.log('重新上传')
    otherOptions.itemDOM.classList.remove('fail')
    otherOptions.itemDOM.classList.add('uploading')
  }
  function handleChoose(...params) {
    console.log(...params)
  }
  function handleDelete(item, index, otherOptions) {
    console.log('删除', item, index, otherOptions)
    let successList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    setList(successList)
  }
  return (
    <>
      <Upload
        disabled={true}
        // uploadNode={
        //   <>
        //     <Button
        //       onClick={(e) => {
        //         alert(1)
        //         e.stopPropagation()
        //       }}
        //     >
        //       哈哈
        //     </Button>
        //     <Upload.Button />
        //   </>
        // }
        list={list}
        onBeforeChoose={() => {
          return new Promise((resolve) => {
            resolve(true)
          })
        }}
        onReUpload={handleReUpload}
        // onChoose={handleChoose}
        onDelete={handleDelete}
        onPreview={handlePreview}
        onFileChange={(...params) => {
          console.log('onFileChange', ...params)
        }}
        uploadPosition="end"
        fileProps={{
          capture: 'camera'
        }}
      />
    </>
  )
}
