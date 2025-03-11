import isEqualFields from './isEqualFields'

function isEqual(array1, array2, fieldNames = ['id']) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) return false

  // 数组长度
  if (array1.length !== array2.length) {
    return false
  }
  // id不同
  if (isEqualFields(array1, array2, fieldNames) === false) {
    return false
  }
  // 相同
  return true
}

export default isEqual
