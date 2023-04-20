import React, { useRef, useState } from 'react'
import locale from './../../../../locale'
import { search, bdToGcjCoord } from './../utils'

import HighlightKeyword from './../../../../HighlightKeyword'
import Header from './../../../../Header'
import Input from './../../../../Input'
import Notice from './../../../../Notice'

// 搜索
function Search({ map, onChange }) {
  const inputRef = useRef(null)
  const [errMsg, setErrMsg] = useState(null)
  let [searchList, setSearchList] = useState(null)

  // 返回
  function handleBack() {
    if (inputRef?.current?.inputDOM) {
      // 清空搜索关键字
      inputRef.current.inputDOM.value = ''

      // 更新清空按钮状态
      inputRef.current.updateClear()
    }
    // 清空列表
    setSearchList(null)

    // 清空报错
    setErrMsg('')
  }

  // 搜索
  async function handleSearch() {
    let inputText = inputRef.current.inputDOM
    let list = await search(inputText.value, { map: map })

    if (typeof list === 'string') {
      setErrMsg(list)
      setSearchList([])
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
    let point = bdToGcjCoord(bdPoint)
    let newValue = {
      address: item.address,
      value: item.address,
      longitude: point[0],
      latitude: point[1]
    }
    if (onChange) onChange(newValue)

    // 回到地图页面
    handleBack()
  }

  return (
    <>
      <Header className="map-search-header">
        {Array.isArray(searchList) || errMsg ? (
          <i className="shape-arrow-left sm" onClick={handleBack}></i>
        ) : null}
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
            ref={inputRef}
            placeholder={locale('搜索地点', 'search_place')}
            licon={<i className="icon icon-search color-sub size14" style={{ margin: '8px' }}></i>}
            inputProps={{ style: { padding: '2px 0' } }}
            allowClear
            style={{ marginRight: '8px' }}
          />
        </form>
        {/* <span
          className="map-search-header-button-search"
          onClick={(e) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          {locale('搜索')}
        </span> */}
      </Header>
      {Array.isArray(searchList) ? (
        <div className="map-search-body">
          {searchList.map((item) => {
            return (
              <div className="map-search-item" key={item.id} onClick={() => handleMarker(item)}>
                <div className="map-search-item-prefix">
                  <i className="icon icon-position"></i>
                </div>
                <div className="map-search-item-content">
                  <div className="map-search-item-title">
                    <HighlightKeyword
                      text={item.title}
                      keyword={inputRef?.current?.inputDOM?.value || ''}
                    />
                  </div>
                  <div className="map-search-item-description">{item.address}</div>
                </div>
              </div>
            )
          })}
          {errMsg && <Notice caption={errMsg} />}
        </div>
      ) : null}
    </>
  )
}
export default Search
