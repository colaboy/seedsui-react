// 比较时分,格式:hh:mm,大于返回1,等于返回0,小于返回-1
function compareTime(d1, d2) {
  let hour1 = d1.getHours()
  let hour2 = d2.getHours()
  let minute1 = d1.getMinutes()
  let minute2 = d2.getMinutes()

  if (hour1 !== hour2) {
    return hour1 > hour2 ? 1 : -1
  } else {
    if (minute1 === minute2) return 0
    return minute1 > minute2 ? 1 : -1
  }
}

export default compareTime
