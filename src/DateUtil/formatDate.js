// 格式化文档参考: https://momentjs.cn/docs/#/displaying/

import dayjs from 'dayjs'

// 入口: 格式化日期
function formatDate(date, type) {
  if (date instanceof Date === false) {
    return ''
  }
  if (!type || typeof type !== 'string') {
    return dayjs(date).format('YYYY-MM-DD')
  }

  if (type === 'year') {
    return dayjs(date).format('YYYY')
  } else if (type === 'quarter') {
    return dayjs(date).format('YYYY-Q')
  } else if (type === 'month') {
    return dayjs(date).format('YYYY-MM')
  } else if (type === 'date') {
    return dayjs(date).format('YYYY-MM-DD')
  } else if (type === 'datetime') {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
  } else if (type === 'time') {
    return dayjs(date).format('HH:mm')
  }

  return dayjs(date).format(type)
}

export default formatDate
