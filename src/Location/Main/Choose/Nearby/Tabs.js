import React from 'react'

const tabs = [
  {
    name: '全部'
  },
  {
    name: '吃喝'
  },
  {
    name: '生活'
  },
  {
    name: '娱乐'
  },
  {
    name: '景点'
  },
  {
    name: '出行'
  },
  {
    name: '购物'
  },
  {
    name: '住宿'
  }
]

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
