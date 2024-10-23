// 内库使用
import DateUtil from './../../../DateUtil'
import locale from './../../../locale'

// 测试使用
// import { DateUtil, locale } from 'seedsui-react'

function getDisplayValue(value) {
  return DateUtil.format(value, `YYYY-W${locale('周', 'SeedsUI_unit_week')}`)
}

export default getDisplayValue
