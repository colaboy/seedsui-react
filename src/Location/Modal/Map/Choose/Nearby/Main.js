import React from 'react'
import locale from './../../../../../locale'
import Notice from './../../../../../Notice'

// 附近结果
function Main({ list, onChange }) {
  return (
    <div className="mappage-nearby-main">
      {Array.isArray(list) ? (
        list.map((item, index) => {
          return (
            <div
              className="mappage-list-item"
              key={index}
              onClick={() => {
                onChange && onChange(item)
              }}
            >
              <div className="mappage-list-item-prefix">
                <i className="icon icon-position"></i>
              </div>
              <div className="mappage-list-item-content border-b">
                <p className="mappage-list-item-content-title">{item.title}</p>
                <p className="mappage-list-item-description">{item.address || ''}</p>
              </div>
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
