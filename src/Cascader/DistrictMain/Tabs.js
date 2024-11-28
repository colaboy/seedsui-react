import React from 'react'
import { testEditableOptions } from './utils'

function Tabs({
  tabs,
  activeTab,
  onActiveTab,
  // 禁用判断
  editableOptions,
  list,
  isCountry,
  isProvince,
  isMunicipality,
  isCity,
  isDistrict,
  isStreet,
  setValueType
}) {
  // 没有type, 则先获取type
  if (tabs?.some?.((item) => !item.type)) {
    setValueType(tabs, {
      list,
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet
    })
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
                  testEditableOptions(tab, {
                    editableOptions
                  })
                    ? ''
                    : ' disabled'
                }`}
                key={index}
              >
                {tab.name || 'No name'}
              </div>
            )
          })
        : null}
    </div>
  )
}

export default Tabs
