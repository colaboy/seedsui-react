import _ from 'lodash'

// 内库使用-start
import LocaleUtil from '../../../../utils/LocaleUtil'
import Request from './../../../../utils/Request'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Request } from 'seedsui-react'
测试使用-end */

function loadCountries() {
  return new Promise((resolve) => {
    const language = window.seedsLocaleLanguage || 'zh_CN'

    // 测试，后台完成后删除此段
    // window.countryData = require('library/components/Cascader/utils/data/countriesData')

    // 优先读取缓存
    window.countryData =
      window.countryData || JSON.parse(window.sessionStorage.getItem('countryData') || '[]')
    if (!_.isEmpty(window.countryData)) {
      resolve(window.countryData)
      return
    }

    // 加载语言对应的文件
    Request.get(`https://res.waiqin365.com/p/platform/district/${language}/country.json`)
      // ApiAxios.get(`http://waiqin365-test.oss-cn-hangzhou.aliyuncs.com/p/platform/district/${language}/country.json`)
      .then(function (json) {
        window.countryData = json || []
        window.sessionStorage.setItem('countryData', JSON.stringify(window.countryData))
        resolve(window.countryData)
      })
      .catch(() => {
        resolve(LocaleUtil.locale('获取国家数据失败', 'SeedsUI_cascader_countries_error'))
      })
  })
}

export default loadCountries
