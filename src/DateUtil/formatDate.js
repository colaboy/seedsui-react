import dayjs from 'dayjs'
import locale from './../locale'

// 周国际化
function weekLocale(weekNumber) {
  if (typeof weekNumber !== 'number' || weekNumber < 1 || weekNumber > 7) return ''

  let days = [
    locale('周一', 'SeedsUI_picker_monday'),
    locale('周二', 'SeedsUI_picker_tuesday'),
    locale('周三', 'SeedsUI_picker_wednesday'),
    locale('周四', 'SeedsUI_picker_thursday'),
    locale('周五', 'SeedsUI_picker_friday'),
    locale('周六', 'SeedsUI_picker_saturday'),
    locale('周日', 'SeedsUI_picker_sunday')
  ]

  return days[weekNumber - 1]
}

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
    // eslint-disable-next-line
    type = 'YYYY-Q'
  } else if (type === 'month') {
    return dayjs(date).format('YYYY-MM')
  } else if (type === 'date') {
    return dayjs(date).format('YYYY-MM-DD')
  } else if (type === 'datetime') {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
  } else if (type === 'time') {
    return dayjs(date).format('HH:mm')
  }
  // [Custom format]
  // Quarter
  if (type.includes('Q')) {
    // eslint-disable-next-line
    type = type.replace(/Q/g, date.quarter())
  }
  // Week: need locale
  if (type.includes('d')) {
    let signType = type.replace(/d/g, '_@d')
    let signStr = dayjs(date).format(signType)
    // Replace sign to locale
    let result = signStr.replace(/_@(\d)/g, (match, p1) => {
      return weekLocale(Number(p1 || 0))
    })
    return result
  } else {
    return dayjs(date).format(type)
  }
}

export default formatDate
