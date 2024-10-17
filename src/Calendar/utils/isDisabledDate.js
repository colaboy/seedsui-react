// 是否为禁用日期
function isDisabledDate(date, { min, max }) {
  if (date instanceof Date === false) {
    return new Date()
  }
  if (min instanceof Date && date.setHours(0, 0, 0, 0) < min.setHours(0, 0, 0, 0)) {
    return min
  }
  if (max instanceof Date && date.setHours(0, 0, 0, 0) > max.setHours(0, 0, 0, 0)) {
    return max
  }
  return false
}
export default isDisabledDate
