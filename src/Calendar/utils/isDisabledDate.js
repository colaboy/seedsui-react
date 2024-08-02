// 是否为禁用日期
function isDisabledDate(date, { min, max }) {
  if (min && date.setHours(0, 0, 0, 0) < min.setHours(0, 0, 0, 0)) {
    return min
  }
  if (max && date.setHours(0, 0, 0, 0) > max.setHours(0, 0, 0, 0)) {
    return max
  }
  return false
}
export default isDisabledDate
