// 第三方库导入
import React, { useState } from 'react'
import { LocaleUtil, Layout, ToolBar } from 'seedsui-react'
// 项目内部模块导入
import Filter from './Filter'
// 样式图片等资源文件导入

const locale = LocaleUtil.locale

// 筛选栏
const QueryBar = ({ queryParams, onChange }) => {
  let [query, setQuery] = useState(queryParams)

  return (
    <Layout.Header>
      <ToolBar className="search">
        {/* 搜索 */}
        <ToolBar.Search
          placeholder={locale('按名称/拼音/拼音首字母查询')}
          value={query.keyword}
          onChange={(value) => {
            setQuery({
              ...query,
              keyword: value
            })
          }}
          onSearch={() => {
            onChange && onChange({ ...query })
          }}
        />
        {/* 筛选弹窗 */}
        <Filter queryParams={queryParams} onChange={onChange} />
      </ToolBar>
    </Layout.Header>
  )
}

export default QueryBar
