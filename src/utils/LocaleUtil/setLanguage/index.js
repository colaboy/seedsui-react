import languageMap from '../languageMap'
import DateUtil from './../../DateUtil'

// Set locale
function setLanguage(language) {
  if (languageMap?.[language]) {
    // Set date language
    DateUtil.setLanguage(language)

    // Set SeedsUI internal language
    window.seedsLocaleLanguage = language
    // window.seedsLocaleData load as needed
  }
}

export default setLanguage
