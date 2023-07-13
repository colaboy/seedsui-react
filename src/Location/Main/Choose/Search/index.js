import React, { useState } from 'react'
import Page from './Page'

// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../../locale'

// 搜索
function Search({ map, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className="mappage-search-navigation"
        onClick={() => {
          setVisible(!visible)
        }}
      >
        <div className="mappage-search-navigation-icon"></div>
        <div className="mappage-search-navigation-label">
          {locale('搜索', 'input_search_placeholder')}
        </div>
      </div>
      <Page visible={visible} onVisibleChange={setVisible} map={map} onChange={onChange} />
    </>
  )
}
export default Search
