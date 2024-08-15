import dayjs from 'dayjs'

// 比较年月日,大于返回1,等于返回0,小于返回-1,错误返回undefined
function compareDate(startDate, endDate) {
  if (startDate instanceof Date === false || endDate instanceof Date === false) {
    return undefined
  }

  const start = dayjs(startDate).startOf('day')
  const end = dayjs(endDate).startOf('day')

  if (end.isAfter(start)) {
    return 1
  } else if (end.isBefore(start)) {
    return -1
  } else {
    return 0
  }
}
export default compareDate
