import React from 'react'
import activeItemTarget from './activeItemTarget'

// 测试使用
// import { Checkbox, Notice, locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Checkbox from './../../../Checkbox'
import Notice from './../../../Notice'

// 附近结果
function Main({ list, onChange }) {
  return (
    <div className="map-nearbyControl-main">
      {Array.isArray(list) ? (
        list.map((item, index) => {
          return (
            <div
              className={`mappage-info-item`}
              key={index}
              data-nearby-item-id={`${item.longitude},${item.latitude}`}
              onClick={(e) => {
                activeItemTarget(e.currentTarget)
                onChange && onChange(item)
              }}
            >
              <div className="mappage-info-item-content">
                <p className="mappage-info-item-content-title">{item.title}</p>
                <p className="mappage-info-item-content-description">{item.address || ''}</p>
              </div>
              <Checkbox checked />
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
