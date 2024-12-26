// 比较年月,大于返回1,等于返回0,小于返回-1
function compareMonth(d1, d2) {
  let year1 = d1.getFullYear()
  let year2 = d2.getFullYear()
  let month1 = d1.getMonth()
  let month2 = d2.getMonth()

  if (year1 !== year2) {
    return year1 > year2 ? 1 : -1
  } else {
    if (month1 === month2) return 0
    return month1 > month2 ? 1 : -1
  }
}

export default compareMonth
