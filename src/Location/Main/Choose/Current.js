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
      className={`mappage-info-item`}
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
      <div className="mappage-info-item-content">
        <div className="mappage-info-item-content-title">
          <div className="flex-1">{locale('当前位置', 'current_location')}</div>
          <Navigation
            longitude={current?.longitude}
            latitude={current?.latitude}
            address={current?.value}
          />
        </div>
        <div className="mappage-info-item-description flex">
          <div className="flex-1">{current?.value || ''}</div>
          {/* active时显示checkbox */}
          {!readOnly && <Checkbox checked />}
        </div>
      </div>
    </div>
  )
}
export default forwardRef(Current)