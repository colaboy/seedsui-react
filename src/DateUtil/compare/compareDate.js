// 比较年月日,大于返回1,等于返回0,小于返回-1
function compareDate(d1, d2) {
  const year1 = d1.getFullYear()
  const month1 = d1.getMonth() // 注意：月是从0开始的
  const day1 = d1.getDate()

  const year2 = d2.getFullYear()
  const month2 = d2.getMonth()
  const day2 = d2.getDate()

  if (year1 !== year2) {
    return year1 > year2 ? 1 : -1
  } else if (month1 !== month2) {
    return month1 > month2 ? 1 : -1
  } else {
    if (day1 === day2) return 0
    return day1 > day2 ? 1 : -1
  }
}

export default compareDate
