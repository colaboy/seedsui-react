// 判断是否选中
function getIsActive(item, value) {
  if (Array.isArray(value) && value.length) {
    return value[0]?.id === item.id
  }
  return false
}

export default getIsActive
