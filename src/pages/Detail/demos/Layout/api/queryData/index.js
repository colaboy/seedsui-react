import { Request, LocaleUtil } from 'seedsui-react'
import localData from './localData'

// 获取详情
function queryData(params) {
  return new Promise((resolve) => {
    Request.post('/platform/param/v1/getLoginUser.do')
      .then((result) => {
        if (result.code === '1') {
          // 将服务器返回的数据转成本地数据
          let data = localData(result)
          resolve(data)
        } else {
          resolve(
            result.message ||
              LocaleUtil.locale(
                '服务器繁忙，请稍后重试',
                'library.3adc7cd58b0694f0078804a786a33bde'
              )
          )
        }
      })
      .catch((err) => {
        resolve(
          LocaleUtil.locale('服务器繁忙，请稍后重试', 'library.3adc7cd58b0694f0078804a786a33bde')
        )
      })
  })
}

export default queryData
