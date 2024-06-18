import React from 'react'

// 测试使用
// import { Checkbox, Notice, locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Checkbox from './../../../Checkbox'
import Notice from './../../../Notice'

// 附近结果
function Main({ active, list, onChange }) {
  return (
    <div className="map-nearbyControl-main">
      {Array.isArray(list) ? (
        list.map((item, index) => {
          return (
            <div
              className={`map-nearbyControl-item`}
              key={index}
              data-nearby-item-id={`${item.longitude},${item.latitude}`}
              onClick={(e) => {
                onChange && onChange(item)
              }}
            >
              <div className="map-nearbyControl-item-content">
                <p className="map-nearbyControl-item-content-title">{item.name}</p>
                <p className="map-nearbyControl-item-content-description">{item.address || ''}</p>
              </div>
              <Checkbox
                checked={
                  active?.latitude === item?.latitude && active?.longitude === item?.longitude
                }
              />
            </div>
          )
        })
      ) : (
        <Notice caption={locale('暂无数据', 'SeedsUI_no_data')} />
      )}
    </div>
  )
}
export default Main
