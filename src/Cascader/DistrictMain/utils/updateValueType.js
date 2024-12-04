import compareType from './compareType'

// 更新value的type和isLeaf
function updateValueType(
  tabs,
  list,
  {
    type,
    isCountry,
    isProvince,
    isMunicipality,
    isPrefecture,
    isCity,
    isDistrict,
    isStreet,
    setValueType
  }
) {
  // Array type parameter is invalid
  if (!Array.isArray(tabs) || !tabs.length) {
    return null
  }

  // 没有type, 则先获取type
  setValueType(tabs, {
    list: list,
    isCountry,
    isProvince,
    isMunicipality,
    isPrefecture,
    isCity,
    isDistrict,
    isStreet
  })

  // 比较类型, 若符合type要求, 则增加isLeaf
  if (type) {
    for (let tab of tabs) {
      let currentTypes = tab.type
      for (let currentType of currentTypes) {
        if (compareType(currentType, type) >= 0) {
          tab.isLeaf = true
          break
        }
      }
    }
  }

  // 只保留一项isLeaf, 多余的部分去掉
  let isLeafIndex = tabs.findIndex((tab) => tab.isLeaf)
  if (isLeafIndex !== -1) {
    return tabs.slice(0, isLeafIndex + 1)
  }
  return tabs
}

export default updateValueType
