import dayjs from 'dayjs'

function diffYear(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'year')
}

export default diffYear
