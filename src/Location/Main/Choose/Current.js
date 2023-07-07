import React, { forwardRef } from 'react'
import { activeItemTarget, centerToPoint } from './../utils'
import Checkbox from './../../../Checkbox'
import locale from './../../../locale'
import Navigation from './Navigation'

// 当前位置
function Current({ readOnly, map, current, onChange }, ref) {
  // 定位到当前位置
  function centerToCurrent() {
    if (current && current.longitude && current.latitude) {
      centerToPoint([current.longitude, current.latitude], { map: map, type: 'gcj02' })
    }
  }

  return (
    <div
      className={`mappage-info-item border-b`}
      onClick={
        readOnly
          ? () => {
              centerToCurrent()
            }
          : (e) => {
              activeItemTarget(e.currentTarget)
              onChange(current, { type: 'gcj02', updateNearby: false })
            }
      }
      ref={ref}
    >
      <div className="mappage-info-item-prefix">
        <i className="icon mappage-icon-current"></i>
      </div>
      <div className="mappage-info-item-content">
        <p className="mappage-info-item-content-title">
          <span>{locale('当前位置', 'current_location')}</span>
          <Navigation
            longitude={current?.longitude}
            latitude={current?.latitude}
            address={current?.value}
          />
        </p>
        <p className="mappage-info-item-description">{current?.value || ''}</p>
      </div>
      {/* active时显示checkbox */}
      {!readOnly && <Checkbox checked />}
    </div>
  )
}
export default forwardRef(Current)
