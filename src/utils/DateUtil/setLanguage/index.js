import dayjs from 'dayjs'
import LocaleUtil from './../../LocaleUtil'

// List of supported locales: https://github.com/iamkun/dayjs/tree/dev/src/locale
// Needs import 'dayjs/locale/{languagae}', before setLanguage
function setLanguage(language) {
  let languageMap = LocaleUtil.languageMap
  let dayjsLanguage = languageMap?.[language]?.dayjs
  if (dayjsLanguage) {
    dayjs.locale(dayjsLanguage)
  }
}

export default setLanguage
