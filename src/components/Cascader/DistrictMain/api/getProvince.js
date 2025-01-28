import _ from 'lodash'

// 内库使用-start
import Request from './../../../../utils/Request'
// 内库使用-end

/* 测试使用-start
import { Request } from 'seedsui-react'
测试使用-end */

function getProvince(countryId = '86') {
  return new Promise((resolve) => {
    const language = window.seedsLocaleLanguage || 'zh_CN'

    // 测试，后台完成后删除此段
    // window.provinceData = {
    //   86: require('library/components/Cascader/utils/data/chinaData')
    // }

    // 优先读取缓存
    window.provinceData =
      window.provinceData || JSON.parse(window.sessionStorage.getItem('provinceData') || '{}')
    if (window.provinceData?.[countryId]) {
      resolve(window.provinceData[countryId])
      return
    }

    // 加载语言对应的文件
    Request.get(`https://res.waiqin365.com/p/platform/district/${language}/${countryId}.json`)
      // ApiAxios.get(`http://waiqin365-test.oss-cn-hangzhou.aliyuncs.com/p/platform/district/${language}/${countryId}.json`)
      .then(function (json) {
        // 存到缓存中
        window.provinceData = JSON.parse(window.sessionStorage.getItem('provinceData') || '{}')
        window.provinceData[countryId] = json || []
        window.sessionStorage.setItem('provinceData', JSON.stringify(window.provinceData))
        resolve(window.provinceData[countryId])
      })
      .catch(() => {
        resolve(null)
      })
  })
}

export default getProvince
