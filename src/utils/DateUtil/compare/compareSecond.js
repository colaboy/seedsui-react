// 比较年月日时分秒，大于返回1,等于返回0,小于返回-1
function compareSecond(d1, d2) {
  let date1 = new Date(d1)
  let date2 = new Date(d2)
  date1.setMilliseconds(0)
  date2.setMilliseconds(0)
  let t1 = date1.getTime()
  let t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}

export default compareSecond
