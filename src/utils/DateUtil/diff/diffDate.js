import dayjs from 'dayjs'

function diffDate(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'day')
}

export default diffDate
