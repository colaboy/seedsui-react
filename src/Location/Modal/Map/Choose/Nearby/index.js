import React from 'react'
import locale from './../../../../../locale'

// 附近推荐
function Nearby({ map, onChange }) {
  return (
    <div className="map-nearby">
      <div className="map-nearby-toggle">
        <span className="modal-dropdown-title-text">{locale('附近推荐')}</span>
        <i className="modal-dropdown-title-arrow"></i>
      </div>
    </div>
  )
}
export default Nearby
