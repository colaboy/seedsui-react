import dayjs from 'dayjs'

function diffQuarter(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'quarter')
}

export default diffQuarter
