import { Device } from 'seedsui-react'
import locale from 'library/utils/locale'

// 因SeedsUI不能升级, 暂时使用本地的方式
function uploadImage(params = {}) {
  // self = this
  let uploadParams = Object.clone(params)
  if (!params.uploadDir) {
    if (params.fail)
      params.fail({
        errMsg:
          'uploadImage:fail' + locale('没有上传目录', 'library.10fd54bbc5120ce86ba97753d1e5c71a')
      })
    return
  }
  if (!params.localId) {
    if (params.fail)
      params.fail({
        errMsg:
          'uploadImage:fail' + locale('没有上传地址', 'library.38818a1934deffbb0db98907702f6053')
      })
    return
  }
  if (params.tenantId) uploadParams.tenantId = params.tenantId
  // ext参数: isAutoCheck: '0'/'1'是否自动识别|cmId: 客户Id|appId：应用Id|menuId: 菜单Id(必填)|funcId: 表单Id
  let menuId = Device.getUrlParameter('menuId') || ''
  uploadParams.ext = {
    menuId: menuId,
    ...(params.ext || {})
  }
  // 构建成功回调的参数
  uploadParams.success = function (res) {
    if (params.success) {
      params.success({
        errMsg: 'uploadImage:ok',
        ...res,
        path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
        serverId: res && res.serverId ? res.serverId : '',
        tenantId: params.tenantId
      })
    }
  }
  if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0 && uploadParams.ext) {
    delete uploadParams.ext
  }
  console.log('外勤WK内核上传')
  console.log(uploadParams)
  window.top.wq.uploadImage(uploadParams) // eslint-disable-line
}

export default uploadImage
