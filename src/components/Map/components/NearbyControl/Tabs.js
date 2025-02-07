import React from 'react'
import getTabs from './utils/getTabs'

// 选项卡
function Tabs({ tab, onChange }) {
  let tabs = getTabs()
  return (
    <div className="map-nearbyControl-tabs">
      {tabs.map((item) => {
        return (
          <div
            key={item.name}
            className={`map-nearbyControl-tab${tab.name === item.name ? ' active' : ''}`}
            onClick={() => {
              onChange && onChange(item)
            }}
          >
            {item.name}
          </div>
        )
      })}
    </div>
  )
}
export default Tabs
