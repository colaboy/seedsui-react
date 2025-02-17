import languageMap from '../languageMap'
import DateUtil from './../../DateUtil'

// Set locale
function setLocale(language, data) {
  if (languageMap?.[language]) {
    // Set date language
    DateUtil.setLocale(language)

    // Set SeedsUI internal language
    window.seedsLocaleLanguage = language
    window.seedsLocaleData = data
  }
}

export default setLocale
