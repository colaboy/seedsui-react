import React, { useState, useRef } from 'react'
// 第三方库导入
import { Layout, List } from 'seedsui-react'

// 项目内部模块导入
import { queryData } from './api'
import QueryBar from './QueryBar'

// 样式图片等资源文件导入
import './index.less'

// 分页列表
const Pagination = () => {
  let [queryParams, setQueryParams] = useState(null)

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
        className="list-pageName"
        loadList={({ page, action }) => {
          console.log('action:', action)
          return queryData({ page: page, ...queryParams })
        }}
        // value={value}
        onChange={() => {
          console.log('onChange:', arguments)
        }}
        pagination={true}
      />
    </Layout>
  )
}

export default Pagination
