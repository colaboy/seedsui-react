import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

// 测试使用-start
// import { locale } from 'seedsui-react'
// 测试使用-end

// 折叠控件
function Toggle() {
  return (
    <div
      className="map-nearbyControl-toggle"
      onClick={(e) => {
        e.currentTarget?.closest('.map-nearbyControl')?.classList?.toggle('active')
      }}
    >
      <span className="map-nearbyControl-toggle-label">
        {LocaleUtil.text('附近推荐', 'SeedsUI_nearby_recommendation')}
      </span>
      <i className="map-nearbyControl-toggle-arrow"></i>
    </div>
  )
}
export default Toggle
