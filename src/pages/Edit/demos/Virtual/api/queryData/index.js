import { LocaleUtil, Request, Device, Loading } from 'seedsui-react'

// 获取数据
function queryData() {
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
    Request.post('/platform/param/v1/getLoginUser.do', {
      id: id
    })
      .then((result) => {
        Loading.hide()
        if (result.code === '1') {
          resolve({
            baseData: { test: 'test' },
            formData: { input: '单行', select: [{ id: '1', name: '选项1' }] }
          })
        } else {
          resolve(LocaleUtil.locale('获取数据错误！'))
        }
      })
      .catch(() => {
        Loading.hide()
        resolve(LocaleUtil.locale('获取数据异常！'))
      })
  })
}

export default queryData
