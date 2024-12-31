import _ from 'lodash'

// 校验只读
function testEditableOptions(item, { editableOptions }) {
  // 未配置是否可编辑，默认为可编辑
  if (!editableOptions || _.isEmpty(editableOptions)) {
    return true
  }

  // 未知项(请选择)，判断当前项是否可选
  if (!item?.id) {
    return true
  }

  // 已知项
  let currentType = item.type

  // type是数组, example: 直辖市is both province and city
  if (Array.isArray(currentType) && currentType.length) {
    for (let item of currentType) {
      if (editableOptions?.[item]?.editable === false) {
        return false
      }
    }
  }
  return true
}

export default testEditableOptions
