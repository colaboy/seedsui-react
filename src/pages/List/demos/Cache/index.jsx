import React, { useState, useRef } from 'react'
import { queryData } from './api'
import { LocaleUtil, Layout } from 'seedsui-react'
import { ToolBar, List } from 'seedsui-react'
import './index.less'

// 分页列表
const PaginationList = () => {
  const [keyword, setKeyword] = useState('')

  // Expose
  const mainRef = useRef(null)

  return (
    <Layout className="full">
      <Layout.Header>
        <ToolBar className="search">
          <ToolBar.Search
            placeholder={LocaleUtil.locale('按名称/拼音/拼音首字母查询')}
            value={keyword}
            onChange={setKeyword}
            onSearch={() => {
              mainRef.current.reload()
            }}
          />
        </ToolBar>
      </Layout.Header>

      <List.Main
        ref={mainRef}
        cache={{ name: 'cache_pageName_list', persist: true }}
        className="employee-people-main"
        loadList={({ page, action }) => {
          console.log('action:', action)
          return queryData({ page: page, keyword: keyword })
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

export default PaginationList
