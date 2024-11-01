import dayjs from 'dayjs'

// 比较周数,大于返回1,等于返回0,小于返回-1
function compareWeek(d1, d2) {
  let year1 = d1.getFullYear()
  let year2 = d2.getFullYear()
  let week1 = dayjs(d1).week()
  let week2 = dayjs(d2).week()

  if (year1 !== year2) {
    return year1 > year2 ? 1 : -1
  } else {
    if (week1 === week2) return 0
    return week1 > week2 ? 1 : -1
  }
}

export default compareWeek
