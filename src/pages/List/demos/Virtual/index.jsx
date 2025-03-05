import React, { useState, useRef } from 'react'
import { queryData } from './api'
import { LocaleUtil, Layout } from 'seedsui-react'
import { IndexBar, ToolBar, List } from 'seedsui-react'
import './index.less'

// Virtual虚拟列表
const VirtualList = () => {
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
        virtual={{
          getItemHeight: (item) => {
            if (item?.virtualData?.type === 'group') {
              return 33
            }
            return 71
          }
        }}
        // multiple={false}
        // allowClear={false}
        // checkbox={false}
        className="employee-people-main"
        loadList={({ page, action }) => {
          console.log('action:', action)
          return queryData(null, { page: page, keyword: keyword })
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

export default VirtualList
