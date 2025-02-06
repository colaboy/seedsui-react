// 内库使用-start
import locale from './../../../../utils/locale'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

function getWeekNames(start) {
  if (start === 'Monday') {
    return [
      locale('一', 'SeedsUI_calendar_week_monday'),
      locale('二', 'SeedsUI_calendar_week_tuesday'),
      locale('三', 'SeedsUI_calendar_week_wednesday'),
      locale('四', 'SeedsUI_calendar_week_thursday'),
      locale('五', 'SeedsUI_calendar_week_friday'),
      locale('六', 'SeedsUI_calendar_week_saturday'),
      locale('日', 'SeedsUI_calendar_week_sunday')
    ]
  }
  return [
    locale('日', 'SeedsUI_calendar_week_sunday'),
    locale('一', 'SeedsUI_calendar_week_monday'),
    locale('二', 'SeedsUI_calendar_week_tuesday'),
    locale('三', 'SeedsUI_calendar_week_wednesday'),
    locale('四', 'SeedsUI_calendar_week_thursday'),
    locale('五', 'SeedsUI_calendar_week_friday'),
    locale('六', 'SeedsUI_calendar_week_saturday')
  ]
}

export default getWeekNames
