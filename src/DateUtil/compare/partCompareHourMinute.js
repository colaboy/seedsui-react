// 比较时分,格式:hh:mm,大于返回1,等于返回0,小于返回-1
function compareTime(d1, d2) {
  let date1 = new Date(d1)
  date1.setYear(0)
  date1.setMonth(0, 0)
  date1.setSeconds(0, 0)
  let date2 = new Date(d2)
  if (date instanceof Date) {
    date2 = date
  } else if (/^[0-9]{2}:[0-9]{2}$/.test(date)) {
    date2.setHours(date.split(':')[0], date.split(':')[1], 0, 0)
  } else {
    console.log('请传入hh:mm的字符串,或者一个Date对象')
    return false
  }
  date2.setYear(0)
  date2.setMonth(0, 0)
  date2.setSeconds(0, 0)
  let t1 = date1.getTime()
  let t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}

export default compareTime
