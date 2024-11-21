// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

function getTypeLocale(type) {
  const typeLocale = {
    year: locale('年', 'SeedsUI_unit_year'),
    quarter: locale('季', 'SeedsUI_unit_quarter'),
    month: locale('月', 'SeedsUI_unit_month'),
    date: locale('日', 'SeedsUI_unit_date'),
    time: locale('分', 'SeedsUI_unit_minute'),
    datetime: locale('分', 'SeedsUI_unit_minute'),
    week: locale('周', 'SeedsUI_unit_week')
  }
  return typeLocale[type]
}

export default getTypeLocale
