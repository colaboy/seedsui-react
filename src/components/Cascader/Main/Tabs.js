import React from 'react'

function TabBar({ tabs, activeTab, onActiveTab }) {
  return (
    <div className="cascader-tabs">
      {Array.isArray(tabs) && tabs.length
        ? tabs.map((tab, index) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onActiveTab && onActiveTab(tab)
                }}
                className={`cascader-tab${tab?.id === activeTab?.id ? ' active' : ''}`}
                key={index}
              >
                {tab.name}
              </div>
            )
          })
        : null}
    </div>
  )
}

export default TabBar
