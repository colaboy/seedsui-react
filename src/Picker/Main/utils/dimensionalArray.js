// 判断是几维数组
function dimensionalArray(arr) {
  if (!Array.isArray(arr)) {
    0
  }
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      return 2
    }
  }
  return 1
}

export default dimensionalArray
