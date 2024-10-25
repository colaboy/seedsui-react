function diffTime(d1, d2) {
  let date1 = new Date(d1)
  date1.setYear(0)
  date1.setMonth(0, 0)
  date1.setSeconds(0, 0)

  let date2 = new Date(d2)
  date2.setYear(0)
  date2.setMonth(0, 0)
  date2.setSeconds(0, 0)

  return dayjs(date1).diff(dayjs(date2), 'minute')
}

export default diffTime
