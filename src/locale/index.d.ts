import locale from './locale.js'
import en_US from './locales/en_US'
import zh_HK from './locales/zh_HK'
import zh_CN from './locales/zh_CN'

// Open for external use: Get locale data
locale.localeData = function (language) {
  if (language === 'en_US') {
    return en_US
  }
  if (language === 'zh_HK') {
    return zh_HK
  }
  return zh_CN
}

export default locale
