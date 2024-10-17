// 获取当前绘制日期
function formatDrawDate(newValue) {
  let newDrawDate = newValue
  if (Array.isArray(newValue) && newValue.length === 2) {
    newDrawDate = newValue[0]
  }
  if (newDrawDate instanceof Date) {
    return newDrawDate
  }
  return new Date()
}

export default formatDrawDate
