import React, { useState } from 'react'
import Page from './Page'

// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 搜索
function SearchControl({ map, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className="map-searchControl-navigation"
        onClick={() => {
          setVisible(!visible)
        }}
      >
        <div className="map-searchControl-navigation-icon"></div>
        <div className="map-searchControl-navigation-label">{locale('搜索', 'SeedsUI_search')}</div>
      </div>
      <Page visible={visible} onVisibleChange={setVisible} map={map} onChange={onChange} />
    </>
  )
}
export default SearchControl
