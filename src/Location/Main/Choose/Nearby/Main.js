import React from 'react'
import locale from './../../../../locale'
import { activeItemTarget } from './../../utils'
import Checkbox from './../../../../Checkbox'
import Notice from './../../../../Notice'

// 附近结果
function Main({ list, onChange }) {
  return (
    <div className="mappage-nearby-main">
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
        <Notice caption={locale('暂无数据')} />
      )}
    </div>
  )
}
export default Main
