import React, { useState, useRef } from 'react'
import { cacheConfig, queryData } from './api'
import { LocaleUtil, Storage, Layout, ToolBar, List, Button } from 'seedsui-react'
import './index.less'
const locale = LocaleUtil.locale

// 分页列表
const Cache = () => {
  // Forward history clear cache
  // const history = useHistory()
  // if (Storage.getCache(`${cache.name}:list`) && history.action !== 'POP') {
  //   Storage.clearCache(cache.name, { match: 'prefix' })
  // }

  const [keyword, setKeyword] = useState(Storage.getCache(`${cacheConfig.name}:keyword`) || '')

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
              Storage.setCache(`${cacheConfig.name}:keyword`, keyword, {
                persist: cacheConfig.persist
              })
              mainRef.current.reload()
            }}
          />
        </ToolBar>
      </Layout.Header>

      <List.Main
        ref={mainRef}
        cache={cacheConfig}
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
            Storage.clearCache(cacheConfig.name, { match: 'prefix' })
            alert('Clear success!')
          }}
        >
          Clear cache
        </Button>
      </Layout.Footer>
    </Layout>
  )
}

export default Cache
