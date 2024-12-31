import React from 'react'

// 内库使用-start
import locale from './../../../../utils/locale'
import Checkbox from './../../../Checkbox'
import Result from './../../../Result'
// 内库使用-end

// 测试使用-start
// import { Checkbox, Result, locale } from 'seedsui-react'
// 测试使用-end

// 附近结果
function Main({ active, list, onChange }) {
  let errMsg = typeof list === 'string' ? list : null
  if (Array.isArray(list) && list.length === 0) {
    errMsg = locale('暂无数据', 'SeedsUI_no_data')
  }
  return (
    <div className="map-nearbyControl-main">
      {errMsg && <Result title={errMsg} />}
      {Array.isArray(list) &&
        list.length &&
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
                  active?.latitude &&
                  active?.latitude === item?.latitude &&
                  active?.longitude === item?.longitude
                }
              />
            </div>
          )
        })}
    </div>
  )
}
export default Main
