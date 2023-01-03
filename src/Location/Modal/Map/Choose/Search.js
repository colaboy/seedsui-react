import React, { useState } from 'react'
import HighlightKeyword from './../../../../HighlightKeyword'
import Header from './../../../../Header'
import Input from './../../../../Input'
import locale from './../../../../locale'

// 搜索
function Search({ instance, setErrMsg, onChange }) {
  let [keyword, setKeyword] = useState(null)
  let [searchList, setSearchList] = useState([])

  // 返回
  function handleBack() {
    setKeyword(null)
    setSearchList(null)
  }

  // 搜索
  async function handleSearch() {
    let list = await instance.current.search(keyword)
    if (typeof list === 'string') {
      setErrMsg(list)
    } else {
      setErrMsg(null)
      setSearchList(list)
    }
  }

  // 选中一项
  function handleMarker(item) {
    let bdPoint = item?.point
    if (!bdPoint) return

    // 赋新值
    let point = instance.current.toGcjPoint(bdPoint)
    let newValue = {
      address: item.address,
      value: item.address,
      longitude: point[0],
      latitude: point[1]
    }
    if (onChange) onChange(newValue)

    // 回到地图页面
    setKeyword(null)
    setSearchList(null)
  }

  return (
    <>
      <Header className="map-search-header">
        <i className="shape-arrow-left sm" onClick={handleBack}></i>
        <form
          action="."
          className="map-search-header-input"
          style={{ backgroundColor: 'white' }}
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          <Input.Text
            placeholder={locale('搜索地点', 'search_place')}
            value={keyword}
            onChange={setKeyword}
            licon={<i className="icon icon-search color-sub size14" style={{ margin: '8px' }}></i>}
            inputProps={{ style: { padding: '2px 0' } }}
            allowClear
            style={{ marginRight: '8px' }}
          />
        </form>
        <span
          className="map-search-header-button-search"
          onClick={(e) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          {locale('搜索')}
        </span>
      </Header>
      {Array.isArray(searchList) && searchList.length ? (
        <div className="map-search-body">
          {searchList.map((item) => {
            return (
              <div className="map-search-item" key={item.id} onClick={() => handleMarker(item)}>
                <div className="map-search-item-prefix">
                  <i className="icon icon-position"></i>
                </div>
                <div className="map-search-item-content">
                  <div className="map-search-item-title">
                    <HighlightKeyword text={item.title} keyword={keyword} />
                  </div>
                  <div className="map-search-item-description">{item.address}</div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </>
  )
}
export default Search
