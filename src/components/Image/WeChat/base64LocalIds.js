import { Device } from 'seedsui-react'

// 订货和外勤原生不支持localId显示图片，需要转成base64后显示
function base64LocalIds(localIds) {
  // 安卓可直接显示，无需要转换
  if (Device.os !== 'ios') {
    return localIds
  }
  // 非法的列表直接返回
  if (!Array.isArray(localIds) || !localIds.length) {
    return localIds
  }
  // localId转base64缩略图
  return new Promise((resolve) => {
    let base64List = []
    let loop = (index) => {
      if (!localIds[index]) {
        resolve(base64List)
        return
      }
      // 客户端localId就是图片名称
      let localId = localIds[index]
      // localId转base64
      // eslint-disable-next-line
      top.wx.getLocalImgData({
        localId: localId,
        sizeType: 'compressed',
        isScheme: 1,
        success: function (res) {
          // 设置新的缩略图
          base64List.push(res.localData)
          // eslint-disable-next-line
          loop(++index)
        },
        fail: function () {
          // 图片损坏缩略图不展现
          base64List.push('')
          // eslint-disable-next-line
          loop(++index)
        }
      })
    }
    loop(0)
  })
}

export default base64LocalIds
