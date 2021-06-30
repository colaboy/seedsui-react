import ApiAxios from 'seedsui-react/lib/ApiAxios'

// 应用中使用seedsui的国际化:加载国际化文件
export default function (cb) {
  // 国际化文件名称
  let language = 'zh_CN'
  // 客户端获取国际化类型
  const ua = navigator.userAgent
  if (ua.indexOf('Language/') !== -1) {
    let lang = ua.split('Language/')[1]
    language = lang.split(' ')[0]
  }
  // 加载国际化文件
  Object.loadScript(
    `//res.waiqin365.com/i18n/h5/i18n_version.js?v=${new Date().getTime()}`,
    function () {
      ApiAxios.get(`//res.waiqin365.com/i18n/h5/wq-lang-${language}.json?v=${window.wqLangVersion}`)
        .then((appLocale) => {
          if (typeof appLocale === 'object' && Object.keys(appLocale).length) {
            // seedsui国际化文件
            let seedsLocale = require(`seedsui-react/lib/locale/${language}.js`)
            if (seedsLocale && seedsLocale.default) seedsLocale = seedsLocale.default
            // 合并国际化文件
            let locale = Object.assign({}, seedsLocale, appLocale)
            // 设置语言
            locale.locale_language = language
            // 设置全局变量
            window.localeData = locale
          }
          if (cb) cb()
        })
        .catch((err) => {
          console.log('加载文件失败')
          if (cb) cb()
        })
    }
  )
}
