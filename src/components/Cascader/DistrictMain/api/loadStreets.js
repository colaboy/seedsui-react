// 内库使用-start
import Request from './../../../../utils/Request'
// 内库使用-end

/* 测试使用-start
import { Request } from 'seedsui-react'
测试使用-end */

function loadStreets(districtId) {
  return new Promise((resolve) => {
    // 优先读取缓存
    window.districtStreets =
      window.districtStreets || JSON.parse(window.sessionStorage.getItem('districtStreets') || '{}')
    if (window.districtStreets?.[districtId]) {
      resolve(window.districtStreets[districtId])
      return
    }

    // 加载语言对应的文件
    Request.post(
      '/platform/combo/v1/getComboBox.do?comboCode=district_street',
      {
        districtId: districtId
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
      .then(function (list) {
        // 存到缓存中
        window.districtStreets = JSON.parse(
          window.sessionStorage.getItem('districtStreets') || '{}'
        )
        window.districtStreets[districtId] = list || []
        window.sessionStorage.setItem('districtStreets', JSON.stringify(window.districtStreets))
        resolve(window.districtStreets[districtId])
      })
      .catch(() => {
        resolve('获取街道异常')
      })
  })
}

export default loadStreets
