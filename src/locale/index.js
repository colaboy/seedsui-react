import locale from './locale.js'
import en_US from './en_US'
import zh_CN from './zh_CN'

// Open for external use: Get locale data
locale.localeData = function (language) {
  if (language === 'en_US') {
    return en_US
  }
  return zh_CN
}

export default locale
