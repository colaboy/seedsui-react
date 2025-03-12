import { LocaleUtil, Request, Device, Loading, Toast } from 'seedsui-react'
import serverData from './serverData'
const locale = LocaleUtil.locale

// 提交数据
async function saveData({ formData, tokenRef }) {
  Loading.show()

  // 自定义校验
  // let isOk = await validateData({ formData })
  // if (isOk === 'string') {
  //   Toast.show({
  //     content: isOk
  //   })
  //   return
  // }

  // 构建服务器参数
  let params = await serverData({ formData })

  // 新增
  let url = '/app/esss/web/purchase_order/add.do'

  // 编辑
  let id = Device.getUrlParameter('id')
  if (id) {
    params.id = id
    url = '/app/esss/web/purchase_order/edit.do'
  }

  return new Promise((resolve) => {
    Request.post(url, params, {
      headers: {
        tokenDup: tokenRef.current,
        contentType: 'application/json'
      }
    })
      .then((result) => {
        Loading.hide()

        // 发生错误并且非重复提交的错误时，重新生成token
        if (result.code === '0') {
          tokenRef.current = '' + Date.now()
        }

        if (result.code === '1') {
          Toast.show({
            content: locale('提交成功!', 'library.8149522e59382cf0d07185296fcc87b2'),
            onVisibleChange: (visible) => {
              // 提交完成后处理逻辑
              if (visible === false) resolve(true)
            }
          })
        } else {
          Toast.show({
            content:
              result.message || locale('提交数据失败！', 'library.c1f9adb330715bccdee0731409c712d2')
          })
          resolve(false)
        }
      })
      .catch(() => {
        Loading.hide()
        Toast.show({
          content: locale('提交数据异常！', 'library.6626f193336b7664a4eb3443c12f8df7')
        })
        resolve(false)
      })
  })
}

export default saveData
