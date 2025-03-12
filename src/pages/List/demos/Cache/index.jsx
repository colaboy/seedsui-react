import React, { useState, useRef } from 'react'
import { queryData } from './api'
import { LocaleUtil, Storage, Layout, ToolBar, List, Button } from 'seedsui-react'
import './index.less'
const locale = LocaleUtil.locale

// 分页列表
const PaginationList = () => {
  // Cache config
  const cache = { name: 'cache_pageName_list', persist: true }

  // Forward history clear cache
  // const history = useHistory()
  // if (Storage.getCache(`${cache.name}:list`) && history.action !== 'POP') {
  //   Storage.clearCache(cache.name)
  // }

  const [keyword, setKeyword] = useState(Storage.getCache(`${cache.name}:keyword`) || '')

  // Expose
  const mainRef = useRef(null)

  return (
    <Layout className="full">
      <Layout.Header>
        <ToolBar className="search">
          <ToolBar.Search
            placeholder={locale('按名称/拼音/拼音首字母查询')}
            value={keyword}
            onChange={setKeyword}
            onSearch={() => {
              Storage.setCache(keyword, { name: `${cache.name}:keyword`, persist: cache.persist })
              mainRef.current.reload()
            }}
          />
        </ToolBar>
      </Layout.Header>

      <List.Main
        ref={mainRef}
        cache={cache}
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

      <Layout.Footer>
        <Button
          className="flex primary radius-l"
          onClick={() => {
            Storage.clearCache(cache.name)
            alert('Clear success!')
          }}
        >
          Clear cache
        </Button>
      </Layout.Footer>
    </Layout>
  )
}

export default PaginationList
