// 截取此id前面的array
function sliceArray(arr, id) {
  const index = arr.findIndex((item) => item.id === id)
  if (index === -1) return [] // 如果没有找到，返回空数组
  return arr.slice(0, index + 1)
}

export default sliceArray
