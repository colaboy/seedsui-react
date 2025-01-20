import bmapQueryNearby from './bmapQueryNearby'
import googleQueryNearby from './googleQueryNearby'
import defaultQueryNearby from './defaultQueryNearby'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

// 测试使用-start
// import { locale } from 'seedsui-react'
// 测试使用-end

// 搜索附近
async function queryNearby({ map, keyword, longitude, latitude, type, radius }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let isTimeout = false
    // Search error protect: google and bmap error no callback
    let errorTimeout = window.setTimeout(() => {
      isTimeout = true
      resolve(LocaleUtil.text('查询超时'))
    }, 5000)

    let result = null
    if (window.google) {
      result = await googleQueryNearby({ map, keyword, longitude, latitude, type, radius })
    } else if (window.BMap) {
      result = await bmapQueryNearby({ map, keyword, longitude, latitude, type, radius })
    } else {
      result = await defaultQueryNearby({ map, keyword, longitude, latitude, type, radius })
    }
    if (isTimeout) return
    window.clearTimeout(errorTimeout)
    resolve(result)
  })
}

export default queryNearby
