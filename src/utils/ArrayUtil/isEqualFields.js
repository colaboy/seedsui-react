// 比较列表中每一项的id是否相等
function isEqualFields(array1, array2, fieldNames = ['id']) {
  return array1.every((item, index) => {
    for (let fieldName of fieldNames) {
      if (item[fieldName] !== array2[index]?.[fieldName]) return false
    }
    return true
  })
}

export default isEqualFields
