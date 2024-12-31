import dayjs from 'dayjs'

function diffMinute(d1, d2) {
  return dayjs(d1).diff(dayjs(d2), 'minute')
}

export default diffMinute
