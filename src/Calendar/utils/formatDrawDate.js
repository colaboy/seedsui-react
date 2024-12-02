import isDisabledDate from './isDisabledDate'

// 获取当前绘制日期
function formatDrawDate(newValue, { min, max }) {
  let newDrawDate = newValue
  if (Array.isArray(newValue) && newValue.length === 2) {
    newDrawDate = newValue[0]
  }
  if (newDrawDate instanceof Date === false) {
    newDrawDate = new Date()
  }

  // 访问禁止日期
  let error = isDisabledDate(newDrawDate, { min, max })
  if (error) {
    console.log(error?.errMsg)
    return error.date
  }

  return newDrawDate
}

export default formatDrawDate
