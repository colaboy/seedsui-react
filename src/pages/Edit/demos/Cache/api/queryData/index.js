import { LocaleUtil, Storage, Request, Device, Loading } from 'seedsui-react'
import cacheConfig from './../cacheConfig'
const locale = LocaleUtil.locale

// 获取数据
function queryData() {
  return new Promise((resolve) => {
    // 修改或者复制id
    let id = Device.getUrlParameter('id') || Device.getUrlParameter('copyId')

    // 新增
    if (!id) {
      resolve({
        baseData: { test: 'test' },
        formData: Storage.getCache(`${cacheConfig.name}:data`)
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
            formData: {
              input: 'Input content',
              textarea: 'Textarea content',
              autoFit:
                'AutoFit overlength content: AI as a feature involves incorporating AI technologies into existing products to improve their functionalities. On the other hand, AI as a product entails creating standalone AI-driven applications (AI Copilots or Agents) intended to perform specific tasks or deliver unique services',
              select: [{ id: '2', name: 'Option2' }]
            }
          })
        } else {
          resolve(locale('获取数据错误！'))
        }
      })
      .catch(() => {
        Loading.hide()
        resolve(locale('获取数据异常！'))
      })
  })
}

export default queryData
