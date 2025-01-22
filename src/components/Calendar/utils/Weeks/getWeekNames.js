// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
// import { locale } from 'seedsui-react'
测试使用-end */

function getWeekNames(start) {
  if (start === 'Monday') {
    return [
      LocaleUtil.text('一', 'SeedsUI_calendar_week_monday'),
      LocaleUtil.text('二', 'SeedsUI_calendar_week_tuesday'),
      LocaleUtil.text('三', 'SeedsUI_calendar_week_wednesday'),
      LocaleUtil.text('四', 'SeedsUI_calendar_week_thursday'),
      LocaleUtil.text('五', 'SeedsUI_calendar_week_friday'),
      LocaleUtil.text('六', 'SeedsUI_calendar_week_saturday'),
      LocaleUtil.text('日', 'SeedsUI_unit_date')
    ]
  }
  return [
    LocaleUtil.text('日', 'SeedsUI_unit_date'),
    LocaleUtil.text('一', 'SeedsUI_calendar_week_monday'),
    LocaleUtil.text('二', 'SeedsUI_calendar_week_tuesday'),
    LocaleUtil.text('三', 'SeedsUI_calendar_week_wednesday'),
    LocaleUtil.text('四', 'SeedsUI_calendar_week_thursday'),
    LocaleUtil.text('五', 'SeedsUI_calendar_week_friday'),
    LocaleUtil.text('六', 'SeedsUI_calendar_week_saturday')
  ]
}

export default getWeekNames
