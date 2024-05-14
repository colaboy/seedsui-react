import React, { forwardRef } from 'react'
import { activeItemTarget, centerToPoint } from './../utils'
import Navigation from './Navigation'

// 测试使用
// import { locale, Checkbox } from 'seedsui-react'
// 内库使用
import Checkbox from './../../../Checkbox'
import locale from './../../../locale'

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
          <div className="flex-1">
            {current?.title || locale('当前位置', 'SeedsUI_current_location')}
          </div>
          <Navigation
            longitude={current?.longitude}
            latitude={current?.latitude}
            address={current?.value}
          />
        </div>
        <div className="mappage-info-item-content-description">
          <div className="flex-1">{current?.value || ''}</div>
          <div className="mappage-info-item-checkbox">
            {/* active时显示checkbox */}
            {!readOnly && <Checkbox checked />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default forwardRef(Current)
