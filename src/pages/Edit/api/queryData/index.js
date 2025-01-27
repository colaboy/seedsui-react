import { Device, Loading } from 'seedsui-react'
import ApiAxios from 'library/deprecated/ApiAxios'
import locale from 'library/utils/locale'

// 获取数据
function queryData(params) {
  return new Promise((resolve) => {
    // 修改或者复制id
    let id = Device.getUrlParameter('id') || Device.getUrlParameter('copyId')

    // 新增
    if (!id) {
      resolve({
        baseData: { test: 'test' },
        formData: {}
      })
      return
    }

    // 修改或者复制
    Loading.show()
    ApiAxios.post('/platform/param/v1/getLoginUser.do', {
      data: { id: id },
      contentType: 'application/json'
    })
      .then((result) => {
        Loading.hide()
        if (result.code === '1') {
          resolve({
            baseData: { test: 'test' },
            formData: {}
          })
        } else {
          resolve(locale('获取数据错误！', 'library.9c62a21f2d7a4426f205f92e85ea64b9'))
        }
      })
      .catch(() => {
        Loading.hide()
        resolve(locale('获取数据异常！', 'library.a085fb7c5cb81143dcec0f299fff709a'))
      })
  })
}

export default queryData
