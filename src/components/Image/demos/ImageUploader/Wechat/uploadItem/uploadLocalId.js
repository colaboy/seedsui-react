import Bridge from 'library/utils/Bridge'

// 上传localId
function uploadLocalId(localId) {
  return new Promise((resolve) => {
    Bridge.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 0, // 全屏遮罩被Loading.show接管
      success: function (res) {
        resolve(res) // 返回图片的服务器端ID
        console.log(`微信上传照片成功${localId}:` + JSON.stringify(res))
      },
      fail: function (err) {
        resolve(err.errMsg)
        console.error(`微信上传照片失败${localId}:` + JSON.stringify(err))
      }
    })
  })
}

export default uploadLocalId
