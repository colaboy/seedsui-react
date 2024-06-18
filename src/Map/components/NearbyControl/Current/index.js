import React, { forwardRef } from 'react'
import activeItemTarget from './../utils/activeItemTarget'
import Navigation from './Navigation'

// 测试使用
// import { locale, Checkbox } from 'seedsui-react'
// 内库使用
import Checkbox from './../../../../Checkbox'
import locale from './../../../../locale'

// 当前位置
function Current({ map, value, readOnly, onChange }, ref) {
  return (
    <div
      className={`map-nearbyControl-item`}
      onClick={(e) => {
        map.panTo({ longitude: value.longitude, latitude: value.latitude })
        if (!readOnly) {
          activeItemTarget(e.currentTarget)
          onChange && onChange(value)
        }
      }}
      ref={ref}
    >
      <div className="map-nearbyControl-item-content">
        <div className="map-nearbyControl-item-content-title">
          <div className="flex-1">
            {value?.name || locale('当前位置', 'SeedsUI_current_location')}
          </div>
          <Navigation
            longitude={value?.longitude}
            latitude={value?.latitude}
            address={value?.address}
          />
        </div>
        <div className="map-nearbyControl-item-content-description">
          <div className="flex-1">{value?.address || ''}</div>
          <div className="map-nearbyControl-item-checkbox">
            {/* active时显示checkbox */}
            {!readOnly && <Checkbox checked />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default forwardRef(Current)
