import React, { useState } from 'react'
import locale from './../../../../locale'
import Page from './Page'

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
