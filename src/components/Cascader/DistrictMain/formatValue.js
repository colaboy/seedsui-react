import _ from 'lodash'

// 格式化选中项, 补充parentid
function formatValue(value) {
  if (!Array.isArray(value) || !value.length) return null
  let newValue = _.cloneDeep(value)
  for (let [index, item] of newValue.entries()) {
    // id和parentid必须为string
    if (item.id && typeof item.id === 'number') {
      item.parentid = String(item.parentid)
    }
    if (item.parentid && typeof item.parentid === 'number') {
      item.parentid = String(item.parentid)
    }

    if (index !== 0 && !item.parentid) {
      item.parentid = value?.[index - 1]?.id || ''
    }
  }
  return newValue
}

export default formatValue
