import React from 'react'
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
