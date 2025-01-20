import languageMap from '../languageMap'
import DateUtil from './../../DateUtil'

// Set locale
function setLanguage(language) {
  if (languageMap?.[language]) {
    // Set date language
    DateUtil.setLanguage(language)

    // Set SeedsUI internal language
    window.seedsLocaleLanguage = language
    try {
      window.seedsLocaleData = require(`../locales/${language}.json`)
    } catch (error) {
      console.error(`There is no such file in SeedsUI: locales/${language}.json`)
    }
  }
}

export default setLanguage
