import dayjs from 'dayjs'

function diffHour(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'hour')
}

export default diffHour
