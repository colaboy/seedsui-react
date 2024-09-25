import DateUtil from './../../DateUtil'
import locale from './../../locale'

// 显示名称
function getWeekDisplayValue({ value }) {
  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  let start = value[0]
  let end = value[1]
  if (start instanceof Date === false || end instanceof Date === false) {
    return ''
  }

  return DateUtil.format(start, `YYYY-W${locale('周', 'SeedsUI_unit_week')}`)
}

export default getWeekDisplayValue
