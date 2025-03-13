import React, { useState, useRef } from 'react'
// 第三方库导入
import { IndexBar, Layout, List } from 'seedsui-react'

// 项目内部模块导入
import { queryData } from './api'
import QueryBar from './QueryBar'

// 样式图片等资源文件导入
import './index.less'

// IndexBar列表示例
const IndexBarList = () => {
  let [queryParams, setQueryParams] = useState(null)
  const [anchors, setAnchors] = useState(null)
  const [indexBarVisible, setIndexBarVisible] = useState(undefined)

  // Expose
  const mainRef = useRef(null)

  return (
    <Layout className="full">
      {/* 搜索栏 */}
      <QueryBar
        queryParams={queryParams}
        onChange={(newQueryParams) => {
          queryParams = newQueryParams
          setQueryParams(newQueryParams)
          mainRef.current.reload()
        }}
      />

      {/* 列表 */}
      <List.Main
        ref={mainRef}
        virtual={{
          getItemHeight: (item) => {
            if (item?.virtualData?.type === 'group') {
              return 33
            }
            return 71
          }
        }}
        className="list-pageName"
        loadList={({ page, action }) => {
          console.log('action:', action)
          return queryData(
            { page: page, ...queryParams },
            {
              success: () => {
                setIndexBarVisible(true)
              }
              // success:
              //   typeof indexBarVisible === 'boolean'
              //     ? undefined
              //     : ({ list, rows }) => {
              //         if (list.length < rows) {
              //           setIndexBarVisible(true)
              //         } else {
              //           setIndexBarVisible(false)
              //         }
              //       }
            }
          )
        }}
        // value={value}
        onChange={() => {
          console.log('onChange:', arguments)
        }}
        onLoad={() => {
          console.log('更新IndexBar数据...')
          // 虚拟滚动获取anchors
          let newAnchors = mainRef?.current?.getAnchors?.()
          setAnchors(newAnchors)
        }}
        pagination={true}
      />
      {indexBarVisible && (
        <IndexBar
          // 虚拟滚动
          anchors={anchors}
          onTouchAnchor={mainRef?.current?.scrollToAnchor}
          // 实体滚动
          scrollerDOM={mainRef?.current?.rootDOM}
        ></IndexBar>
      )}
    </Layout>
  )
}

export default IndexBarList
