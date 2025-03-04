// 比较列表中每一项的id是否相等
function isEqualById(array1, array2) {
  return array1.every((item, index) => item.id === array2[index]?.id)
}

export default isEqualById
