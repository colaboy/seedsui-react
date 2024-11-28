import _ from 'lodash'
import matchType from './matchType'
import getSiblingType from './getSiblingType'

// 校验只读
function testEditableOptions(
  item,
  index,
  {
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
  }
) {
  // 未配置是否可编辑，默认为可编辑
  if (!editableOptions || _.isEmpty(editableOptions)) {
    return true
  }

  if (!getType) {
    // eslint-disable-next-line
    getType = matchType
  }

  let type = null
  // 未知项(请选择)，判断当前项是否可选
  if (!item?.id && index) {
    let prevItem = tabs[index - 1]
    type = getSiblingType(prevItem.type, 1)
    if (type) type = [type]
  }
  // 已知项
  else {
    type = getType(tabs.slice(0, index + 1), {
      list,
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

export default testEditableOptions
