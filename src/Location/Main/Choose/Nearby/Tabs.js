import React from 'react'
import tabs from './keywords'

// 选项卡
function TabsComponent({ tab, onChange }) {
  return (
    <div className="mappage-nearby-tabs">
      {tabs.map((item) => {
        return (
          <div
            key={item.name}
            className={`mappage-nearby-tab${tab.name === item.name ? ' active' : ''}`}
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
export default TabsComponent
