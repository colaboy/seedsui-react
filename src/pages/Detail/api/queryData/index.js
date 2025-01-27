import ApiAxios from 'library/deprecated/ApiAxios'
import locale from 'library/utils/locale'
import localData from './localData'

// 获取详情
function queryData(params) {
  return new Promise((resolve) => {
    // 查询
    ApiAxios.post('/app/apaas/formvisit/getGeocoder.do', {
      // 测试参数
      data: Object.params({
        latlon: `39.909187,116.397451`
        // pointType: `${type}`
      }),
      head: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json;UTF-8'
      }
    })
      .then((result) => {
        if (result.code === '1') {
          // 将服务器返回的数据转成本地数据
          let data = localData(result)
          resolve(data)
        } else {
          resolve(
            result.message ||
              locale('服务器繁忙，请稍后重试', 'library.3adc7cd58b0694f0078804a786a33bde')
          )
        }
      })
      .catch((err) => {
        resolve(locale('服务器繁忙，请稍后重试', 'library.3adc7cd58b0694f0078804a786a33bde'))
      })
  })
}

export default queryData
