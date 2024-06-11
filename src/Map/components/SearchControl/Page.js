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
function Page({ visible, onVisibleChange, map, onChange }) {
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

    // 返回
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
      map: map,
      keyword: inputText.value,
      latitude: center.lat,
      longitude: center.lng
    })
    Loading.hide()

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
    let newValue = {
      address: item.address,
      value: item.address,
      longitude: bdPoint.lng,
      latitude: bdPoint.lat
    }
    if (onChange) onChange(newValue)

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
        {Array.isArray(searchList)
          ? searchList.map((item) => {
              return (
                <div className="mappage-info-item" key={item.id} onClick={() => handleMarker(item)}>
                  <div className="mappage-info-item-content">
                    <div className="mappage-info-item-title">
                      <HighlightKeyword
                        text={item.name}
                        keyword={inputRef?.current?.inputDOM?.value || ''}
                      />
                    </div>
                    <div className="mappage-info-item-content-description">{item.address}</div>
                  </div>
                </div>
              )
            })
          : null}
        {errMsg && <Notice caption={errMsg} />}
      </div>
    </Layout>
  )
}
export default Page
