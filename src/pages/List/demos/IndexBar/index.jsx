import React, { useState, useRef } from 'react'
import { queryData } from './api'
import { LocaleUtil, Layout } from 'seedsui-react'
import { IndexBar, ToolBar, List } from 'seedsui-react'
import './index.less'
// IndexBar列表示例
const IndexBarList = () => {
  const [keyword, setKeyword] = useState('')

  const [anchors, setAnchors] = useState(null)
  const [indexBarVisible, setIndexBarVisible] = useState(undefined)

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
          return queryData(
            { page: page, keyword: keyword },
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
