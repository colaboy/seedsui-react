import React, { useRef } from 'react'
// 第三方库导入
import { Layout, List } from 'seedsui-react'

// 项目内部模块导入
import { cacheConfig, queryData } from './api'
import QueryBar from './QueryBar'

// 样式图片等资源文件导入
import './index.less'

// 普通列表
const Common = () => {
  const queryParamsRef = useRef(null)

  // Expose
  const mainRef = useRef(null)

  return (
    <Layout className="full">
      {/* 搜索栏 */}
      <QueryBar
        queryParams={queryParams}
        onChange={(newQueryParams) => {
          queryParamsRef.current = newQueryParams
          mainRef.current.reload()
        }}
      />

      {/* 列表 */}
      <List.Main
        ref={mainRef}
        cache={cacheConfig}
        className="list-pageName"
        loadList={({ page, action }) => {
          console.log('action:', action)
          return queryData({ page: page, ...queryParams })
        }}
        // value={value}
        onChange={() => {
          console.log('onChange:', arguments)
        }}
      />
    </Layout>
  )
}

export default Common
