import isEqualById from './isEqualById'

function isEqual(array1, array2) {
  // 数组长度
  if (array1.length !== array2.length) {
    return false
  }
  // id不同
  if (isEqualById(array1, array2) === false) {
    return false
  }
  // 相同
  return true
}

export default isEqual
