import React from 'react'
import { testEditableOptions } from './utils'

function Tabs({
  tabs,
  activeTab,
  onActiveTab,
  // 禁用判断
  editableOptions,
  listData,
  isCountry,
  isProvince,
  isMunicipality,
  isCity,
  isDistrict,
  isStreet
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
                    listData,
                    isCountry,
                    isProvince,
                    isMunicipality,
                    isCity,
                    isDistrict,
                    isStreet
                  })
                    ? ''
                    : ' disabled'
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
