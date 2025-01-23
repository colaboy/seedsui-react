// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
// import { locale } from 'seedsui-react'
测试使用-end */

function getWeekNames(start) {
  if (start === 'Monday') {
    return [
      LocaleUtil.locale('一', 'SeedsUI_calendar_week_monday'),
      LocaleUtil.locale('二', 'SeedsUI_calendar_week_tuesday'),
      LocaleUtil.locale('三', 'SeedsUI_calendar_week_wednesday'),
      LocaleUtil.locale('四', 'SeedsUI_calendar_week_thursday'),
      LocaleUtil.locale('五', 'SeedsUI_calendar_week_friday'),
      LocaleUtil.locale('六', 'SeedsUI_calendar_week_saturday'),
      LocaleUtil.locale('日', 'SeedsUI_unit_date')
    ]
  }
  return [
    LocaleUtil.locale('日', 'SeedsUI_unit_date'),
    LocaleUtil.locale('一', 'SeedsUI_calendar_week_monday'),
    LocaleUtil.locale('二', 'SeedsUI_calendar_week_tuesday'),
    LocaleUtil.locale('三', 'SeedsUI_calendar_week_wednesday'),
    LocaleUtil.locale('四', 'SeedsUI_calendar_week_thursday'),
    LocaleUtil.locale('五', 'SeedsUI_calendar_week_friday'),
    LocaleUtil.locale('六', 'SeedsUI_calendar_week_saturday')
  ]
}

export default getWeekNames
