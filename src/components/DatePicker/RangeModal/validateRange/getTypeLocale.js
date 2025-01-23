// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

function getTypeLocale(type) {
  const typeLocale = {
    year: LocaleUtil.locale('年', 'SeedsUI_unit_year'),
    quarter: LocaleUtil.locale('季', 'SeedsUI_unit_quarter'),
    month: LocaleUtil.locale('月', 'SeedsUI_unit_month'),
    date: LocaleUtil.locale('日', 'SeedsUI_unit_date'),
    time: LocaleUtil.locale('分', 'SeedsUI_unit_minute'),
    datetime: LocaleUtil.locale('分', 'SeedsUI_unit_minute'),
    week: LocaleUtil.locale('周', 'SeedsUI_unit_week')
  }
  return typeLocale[type]
}

export default getTypeLocale
