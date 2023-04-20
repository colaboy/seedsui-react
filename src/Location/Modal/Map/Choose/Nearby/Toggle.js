import React from 'react'
import locale from './../../../../../locale'

// 折叠控件
function Toggle({ visible, onChange }) {
  return (
    <div className="mappage-nearby-toggle" onClick={() => onChange(!visible)}>
      <span className="modal-dropdown-title-text">{locale('附近推荐')}</span>
      <i className="modal-dropdown-title-arrow"></i>
    </div>
  )
}
export default Toggle
