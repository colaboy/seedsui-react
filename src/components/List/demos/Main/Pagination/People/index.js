import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { queryData } from './api'
import { LocaleUtil, Layout } from 'seedsui-react'
import { IndexBar, ToolBar, List } from 'seedsui-react'

// 选人员
const People = forwardRef(
  (
    {
      // 值
      value,
      onChange,

      // 显示
      footerBar,

      multiple,
      checkable = true

      // ...props
    },
    ref
  ) => {
    const [keyword, setKeyword] = useState('')

    const [indexBarVisible, setIndexBarVisible] = useState(undefined)
    const indexBarRef = useRef(null)

    // Expose
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return { ...mainRef.current }
    })

    return (
      <>
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
          multiple={multiple}
          checkbox={checkable}
          className="employee-people-main"
          loadList={({ page, action }) => {
            console.log('action:', action)
            return queryData(
              null,
              { page: page, keyword: keyword },
              {
                success:
                  typeof indexBarVisible === 'boolean'
                    ? undefined
                    : ({ list, rows }) => {
                        if (list.length < rows) {
                          setIndexBarVisible(true)
                        } else {
                          setIndexBarVisible(false)
                        }
                      }
              }
            )
          }}
          value={value}
          onChange={onChange}
          onLoad={() => {
            console.log('更新IndexBar数据...')
            indexBarRef?.current?.update()
          }}
          pagination={true}
        />
        {indexBarVisible && (
          <IndexBar scrollerDOM={mainRef?.current?.rootDOM} ref={indexBarRef}></IndexBar>
        )}
      </>
    )
  }
)

export default People
