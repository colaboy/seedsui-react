import dayjs from 'dayjs'

// 转为日期格式
function toDate(date) {
  return dayjs(date).toDate()
}

export default toDate
