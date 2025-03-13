import React, { useRef } from 'react'
// 第三方库导入
import { LocaleUtil, Storage, Layout, List } from 'seedsui-react'

// 项目内部模块导入
import { cacheConfig, queryData } from './api'
import QueryBar from './QueryBar'
import Footer from './Footer'

// 样式图片等资源文件导入
import './index.less'

const locale = LocaleUtil.locale

// 缓存列表
const Cache = () => {
  // 前进需要清除缓存
  // const history = useHistory()
  // if (Storage.getCache(`${cache.name}:list`) && history.action !== 'POP') {
  //   Storage.clearCache(cache.name, { match: 'prefix' })
  // }

  let [queryParams, setQueryPrams] = Storage.useCacheState('', {
    name: `${cacheConfig.name}:queryParams`,
    persist: cacheConfig.persist
  })

  // Expose
  const mainRef = useRef(null)

  return (
    <Layout className="full">
      {/* 搜索栏 */}
      <QueryBar
        queryParams={queryParams}
        onChange={(newQueryParams) => {
          queryParams = newQueryParams
          setQueryPrams(queryParams)
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

      {/* 底部 */}
      <Footer
        ok={locale('Clear cache')}
        onOk={() => {
          Storage.clearCache(cacheConfig.name, { match: 'prefix' })
          alert('Clear success!')
        }}
      />
    </Layout>
  )
}

export default Cache
