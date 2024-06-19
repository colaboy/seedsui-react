import React, { useRef, useState, useEffect } from 'react'
import Loading from './../../../Loading'
import queryNearby from './../../utils/queryNearby'

// 测试使用
// import { Input, Layout, Header, Notice, HighlightKeyword, locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import HighlightKeyword from './../../../HighlightKeyword'
import Layout from './../../../Layout'
import Header from './../../../Header'
import Input from './../../../Input'
import Notice from './../../../Notice'

// 搜索
function Page({ map, visible, onVisibleChange, onChange }) {
  const inputRef = useRef(null)
  const [errMsg, setErrMsg] = useState(null)
  let [searchList, setSearchList] = useState(null)

  useEffect(() => {
    if (visible && inputRef?.current?.inputDOM) {
      inputRef.current.inputDOM.focus()
    }
    // eslint-disable-next-line
  }, [visible])

  // 返回
  function handleBack() {
    // Clear keyword and update clear button
    if (inputRef?.current?.inputDOM) {
      inputRef.current.inputDOM.value = ''
      inputRef.current.updateClear()
    }

    // Reset list
    setSearchList(null)

    // Go back
    onVisibleChange && onVisibleChange(false)
  }

  // 搜索
  async function handleSearch() {
    let inputText = inputRef.current.inputDOM
    let center = map.getCenter()
    Loading.show({
      content: locale('搜索中')
    })
    let list = await queryNearby({
      map: map.currentMap,
      keyword: inputText.value,
      latitude: center.latitude,
      longitude: center.longitude
    })
    Loading.hide()

    setSearchList(list)
  }

  // 选中一项
  function handleClick(item) {
    if (onChange) onChange(item)

    // 回到地图页面
    handleBack()
  }

  if (!visible) {
    return null
  }

  return (
    <Layout className="map-searchControl-page">
      <Header className="map-searchControl-header">
        <form
          action="."
          className="map-searchControl-header-input"
          style={{ backgroundColor: 'white' }}
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          <Input.Text
            ref={inputRef}
            type="search"
            // placeholder={locale('搜索地点', 'SeedsUI_search_place')}
            licon={<i className="map-searchControl-header-input-icon"></i>}
            inputProps={{ style: { padding: '2px 0' } }}
            allowClear
            style={{ marginRight: '8px' }}
          />
        </form>
        <span className="map-searchControl-header-cancel" onClick={handleBack}>
          {locale('取消')}
        </span>
      </Header>
      <div className="map-searchControl-body">
        {Array.isArray(searchList) && searchList.length
          ? searchList.map((item, index) => {
              return (
                <div
                  className="map-searchControl-item"
                  key={index}
                  onClick={() => handleClick(item)}
                >
                  <div className="map-searchControl-item-content">
                    <div className="map-searchControl-item-title">
                      <HighlightKeyword
                        text={item.name}
                        keyword={inputRef?.current?.inputDOM?.value || ''}
                      />
                    </div>
                    <div className="map-searchControl-item-content-description">{item.address}</div>
                  </div>
                </div>
              )
            })
          : null}

        {/* Query error */}
        {typeof searchList === 'string' && <Notice caption={searchList} />}
        {/* List is empty */}
        {Array.isArray(searchList) && searchList.length === 0 ? (
          <Notice caption={locale('暂无数据', 'SeedsUI_no_data')} />
        ) : null}
      </div>
    </Layout>
  )
}
export default Page
