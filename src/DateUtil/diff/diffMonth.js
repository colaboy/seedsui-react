import dayjs from 'dayjs'

function diffMonth(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'month')
}

export default diffMonth
