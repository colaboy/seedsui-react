// 显示名称
function getDisplayValue(value) {
  if (typeof value !== 'object') {
    return value
  }

  if (Array.isArray(value)) {
    let displayValues = value.map((item) => item?.name || '')
    displayValues = displayValues.filter((item) => item)
    return displayValues.join(',')
  }

  return ''
}

export default getDisplayValue
