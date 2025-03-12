import { LocaleUtil, Request, Device, Loading, Toast } from 'seedsui-react'
import serverData from './serverData'
const locale = LocaleUtil.locale

// 提交数据
async function saveData({ baseData, data, token }) {
  Loading.show()

  // 构建服务器参数
  let params = await serverData({ baseData, data })

  // 新增
  let url = '/platform/param/v1/getLoginUser.do'

  // 编辑
  let id = Device.getUrlParameter('id')
  if (id) {
    params.id = id
    url = '/platform/param/v1/getLoginUser.do'
  }

  return new Promise((resolve) => {
    Request.post(url, params, {
      headers: {
        tokenDup: token,
        contentType: 'application/json'
      }
    })
      .then((result) => {
        Loading.hide()
        resolve(result)
      })
      .catch(() => {
        Loading.hide()
        resolve({
          code: '0',
          message: err?.data?.message || locale('服务器繁忙，请稍后重试！')
        })
      })
  })
}

export default saveData
