import React from 'react'
import { matchType } from './utils'
function Tabs({
  tabs,
  activeTab,
  onActiveTab,
  // 禁用判断
  editableOptions,
  listData
}) {
  // 校验只读
  function validateEditableOptions(item) {
    if (!item?.id || !item?.name) return true

    let type = matchType(item, { data: listData })
    if (type && editableOptions?.[type]?.editable === false) {
      return false
    }
    return true
  }

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
                className={`cascader-tab${tab?.id === activeTab?.id ? ' active' : ''}${
                  validateEditableOptions(tab) ? '' : ' disabled'
                }`}
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

export default Tabs
