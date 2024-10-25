// 内库使用
import DateUtil from './../../DateUtil'

// Format value
function formatValue(value) {
  if (!Array.isArray(value) || !value.length) {
    return null
  }
  return value.map((tab) => {
    let date = tab.value instanceof Date ? tab.value : new Date()
    return {
      ...tab,
      value: date,
      sndcaption: DateUtil.format(date, tab.type || 'date')
    }
  })
}

export default formatValue
