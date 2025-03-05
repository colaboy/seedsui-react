import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Result from './../../../Result'
// 内库使用-end

// 测试使用-start
// import { Result, LocaleUtil } from 'seedsui-react'
// 测试使用-end

// 附近结果
function Main({
  // value,
  list,
  onChange
}) {
  // 错误信息
  let status = '500'
  let errMsg = typeof list === 'string' ? list : null
  if (Array.isArray(list) && list.length === 0) {
    status = 'empty'
    errMsg = LocaleUtil.locale('暂无数据', 'SeedsUI_no_data')
  }
  return (
    <div className="map-nearbyControl-main">
      {errMsg && <Result className="map-main-result" status={status} title={errMsg} />}
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
              {/* <Checkbox
                checked={
                  active?.latitude &&
                  active?.latitude === item?.latitude &&
                  active?.longitude === item?.longitude
                }
              /> */}
            </div>
          )
        })}
    </div>
  )
}
export default Main
