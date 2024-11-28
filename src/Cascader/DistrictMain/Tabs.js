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
  getType
}) {
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
                  testEditableOptions(tab, index, {
                    tabs,
                    editableOptions,
                    list,
                    isCountry,
                    isProvince,
                    isMunicipality,
                    isCity,
                    isDistrict,
                    isStreet,
                    getType
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
