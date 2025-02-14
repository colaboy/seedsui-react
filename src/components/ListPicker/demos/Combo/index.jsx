import React, { useEffect, useState, useRef } from 'react'
import App from 'library/components/App'
import Actionsheet from 'library/deprecated/Actionsheet'

import vconsole from 'vconsole'
import DatePicker from 'library/deprecated/DatePicker'
import Layout from 'library/components/Layout'
import ListPicker from 'library/components/ListPicker'
import list from './../data'

new vconsole()
export default () => {
  const listPicerRef = useRef(null)
  const [value, setValue] = useState([
    {
      id: '86',
      letter: 'Z',
      name: '中国大陆'
    }
  ])

  function handleClick() {
    if (!listPicerRef.current) return
    listPicerRef.current.open()
  }

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth)

    console.log(document.documentElement.clientHeight, document.documentElement.clientWidth)
  })
  return (
    <App
      config={{
        auth: {
          type: '0',
          visibleError: false
        },
        loginUser: {
          load: false,
          visibleError: false
        },
        appParameters: {
          load: false,
          visibleError: false
        }
      }}
    >
      <Layout className="full">
        <Layout.Header className="text-center">ListPicker.Combo</Layout.Header>
        <Layout.Main className="bg-white">
          <div className="demo-title" onClick={handleClick}>
            不分页列表
          </div>
          <ListPicker.Combo
            ref={listPicerRef}
            // modal="page"
            // async={false}
            // pageProps={{
            //   style: {
            //     zIndex: 100
            //   }
            // }}
            // 选中: true | checkbox | tick | corner
            // checkable="tick right"
            className="border-b"
            placeholder="不分页选择"
            multiple={true}
            value={value}
            // url="/platform/combo/v1/getComboGrid.do?comboCode=cmAndSupplier"
            list={list}
            // disabled
            onChange={(value) => {
              console.log(value)
              setValue(value)
            }}
            onBeforeChange={(newValue) => {
              console.log('修改前')
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true)
                }, 1000)
              })
            }}
            ModalProps={{
              onVisibleChange: (visible) => {
                console.log('显隐:', visible)
              }
            }}
            onLoadSuccess={(result) => {
              console.log('加载:', result)
              // return result.rows || []
            }}
            onLoadAfter={(result) => {
              console.log('加载后:', result)
            }}
            footerBar={{
              selectAll: true,
              viewSelect: true,
              submit: true
            }}
            onSelect={(item) => {
              console.log('select:', item)
              return true
            }}
          />

          <div className="demo-title">分页列表</div>
          <ListPicker.Combo
            // modal="page"
            className="border-b"
            placeholder="分页选择"
            pagination
            multiple={false}
            value={value}
            list={list}
            onChange={(value) => {
              console.log(value)
              setValue(value)
            }}
            onBeforeChange={(newValue) => {
              console.log('修改前')
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true)
                }, 1000)
              })
            }}
            onSelect={(item) => console.log('select:', item)}
            onLoadSuccess={(result) => {
              console.log('加载:', result)
            }}
          />

          <div className="demo-title">搜索和标题设置</div>
          <ListPicker.Combo
            modal="page"
            className="border-b"
            placeholder="搜索和标题设置"
            multiple={true}
            list={list}
            value={value}
            onBeforeChange={(newValue) => {
              console.log('修改前')
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true)
                }, 1000)
              })
            }}
            onChange={(value) => {
              console.log(value)
              setValue(value)
            }}
            ModalProps={{
              captionProps: {
                caption: '自定义标题'
              }
            }}
            toolbar={[
              {
                type: 'search',
                field: 'name'
              }
            ]}
            onToolbarChange={(newToolbar, changeTool) =>
              console.log('toolbar changeTool:', newToolbar, changeTool)
            }
            onToolbarParams={(newToolbar) => console.log('toolbar:', newToolbar)}
            onSelect={(item) => console.log('select:', item)}
          />

          <div className="demo-title">日期选择</div>
          <DatePicker.Combo placeholder="日期选择" />
          <div className="demo-title">下拉选择</div>
          <Actionsheet.Combo
            list={[
              { id: '1', name: '1' },
              { id: '2', name: '2' },
              { id: '3', name: '3' },
              { id: '4', name: '4' },
              { id: '5', name: '5' },
              { id: '6', name: '6' },
              { id: '7', name: '7' },
              { id: '8', name: '8' },
              { id: '9', name: '9' },
              { id: '10', name: '10' }
            ]}
            placeholder="下拉选择"
          />

          <div style={{ backgroundColor: '#333', height: '500px' }}></div>
        </Layout.Main>
      </Layout>
    </App>
  )
}
