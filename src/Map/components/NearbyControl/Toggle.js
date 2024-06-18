import React from 'react'

// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 折叠控件
function Toggle() {
  return (
    <div
      className="mappage-nearby-toggle"
      onClick={(e) => {
        e.currentTarget?.closest('.mappage-info-card')?.classList?.toggle('active')
      }}
    >
      <span className="mappage-nearby-toggle-label">
        {locale('附近推荐', 'SeedsUI_nearby_recommendation')}
      </span>
      <i className="mappage-nearby-toggle-arrow"></i>
    </div>
  )
}
export default Toggle
