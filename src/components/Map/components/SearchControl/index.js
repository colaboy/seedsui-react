import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Page from './Page'

// 内库使用-start
import locale from './../../../../utils/locale'
// 内库使用-end

// 测试使用-start
// import { locale } from 'seedsui-react'
// 测试使用-end

// 搜索
function SearchControl({ map, onChange }, ref) {
  // 容器
  const rootRef = useRef(null)

  // 搜索结果页面显隐
  const [visible, setVisible] = useState(false)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <>
      <div
        ref={rootRef}
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
export default forwardRef(SearchControl)
