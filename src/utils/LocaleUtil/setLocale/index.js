import languageMap from '../languageMap'

// Set locale
function setLocale(language, data) {
  if (languageMap?.[language]) {
    window.seedsLocaleLanguage = language
    window.seedsLocaleData = data
  }
}

export default setLocale
