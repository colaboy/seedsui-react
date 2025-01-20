// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

function getTypeLocale(type) {
  const typeLocale = {
    year: LocaleUtil.text('年', 'SeedsUI_unit_year'),
    quarter: LocaleUtil.text('季', 'SeedsUI_unit_quarter'),
    month: LocaleUtil.text('月', 'SeedsUI_unit_month'),
    date: LocaleUtil.text('日', 'SeedsUI_unit_date'),
    time: LocaleUtil.text('分', 'SeedsUI_unit_minute'),
    datetime: LocaleUtil.text('分', 'SeedsUI_unit_minute'),
    week: LocaleUtil.text('周', 'SeedsUI_unit_week')
  }
  return typeLocale[type]
}

export default getTypeLocale
