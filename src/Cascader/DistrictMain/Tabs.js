import React from 'react'
import { matchType, getSiblingType } from './utils'
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
  // 校验只读
  function validateEditableOptions(item, index) {
    let type = null
    // 未知项(请选择)，判断当前项是否可选
    if (!item?.id && index) {
      let prevItem = tabs[index - 1]
      type = getSiblingType(prevItem.type, 1)
      if (type) type = [type]
    }
    // 已知项
    else {
      type = matchType(tabs.slice(0, index + 1), {
        data: listData,
        isCountry,
        isProvince,
        isMunicipality,
        isCity,
        isDistrict,
        isStreet
      })
      item.type = type
    }

    // type是数组, example: 直辖市is both province and city
    if (Array.isArray(type) && type.length) {
      for (let item of type) {
        if (editableOptions?.[item]?.editable === false) {
          return false
        }
      }
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
                  validateEditableOptions(tab, index) ? '' : ' disabled'
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
