import React, { useState } from 'react'
// 第三方库导入
import { LocaleUtil, Layout, ToolBar } from 'seedsui-react'
// 项目内部模块导入

// 样式图片等资源文件导入

const locale = LocaleUtil.locale

// 缓存列表
const Header = ({ queryParams, onChange }) => {
  let [keyword, setKeyword] = useState(queryParams?.keyword || '')

  return (
    <Layout.Header>
      <ToolBar className="search">
        <ToolBar.Search
          placeholder={locale('按名称/拼音/拼音首字母查询')}
          value={keyword}
          onChange={setKeyword}
          onSearch={() => {
            onChange && onChange({ ...queryParams, keyword: keyword })
          }}
        />
      </ToolBar>
    </Layout.Header>
  )
}

export default Header
