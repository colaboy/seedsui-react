import React from 'react'

// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../../locale'

// 折叠控件
function Toggle({ visible, onChange }) {
  return (
    <div className="mappage-nearby-toggle" onClick={() => onChange(!visible)}>
      <span className="mappage-nearby-toggle-label">{locale('附近推荐')}</span>
      <i className="mappage-nearby-toggle-arrow"></i>
    </div>
  )
}
export default Toggle
