// 内库使用-start
import Request from './../../../../utils/Request'
// 内库使用-end

/* 测试使用-start
import { Request } from 'seedsui-react'
测试使用-end */

function getStreet(districtId) {
  return new Promise((resolve) => {
    if (window.streetsMap && window.streetsMap[districtId]) {
      resolve(window.streetsMap[districtId])
      return
    }

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
        if (!Array.isArray(list) || !list.length) {
          resolve(null)
          return
        }
        let data = list.map((item) => {
          return {
            parentid: districtId,
            name: item.text,
            id: item.id,
            type: ['street'],
            isStreet: true,
            isLeaf: true
          }
        })
        if (!window.streetsMap) window.streetsMap = {}
        window.streetsMap[districtId] = data
        resolve(data)
      })
      .catch(() => {
        resolve('获取街道异常')
      })
  })
}

export default getStreet
