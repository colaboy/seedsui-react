import dayjs from 'dayjs'

function diffSecond(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'second')
}

export default diffSecond
