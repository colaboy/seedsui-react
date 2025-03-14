// 获取手机型号(ios返回版本号, 因为ios取不到型号), 用于h5水印
function getModel() {
  let userAgent = navigator.userAgent
  let model = ''
  if (userAgent.toLowerCase().match(/android\s*(\d*\.*\d*)/)) {
    let infos = userAgent.split(';')
    for (let info of infos) {
      if (info.indexOf('Build') !== -1) {
        info = info.trim()
        model = info.substring(0, info.indexOf(' Build'))
        break
      }
    }
    if (!model) model = ''
  } else {
    let iosVersion = ''
    let iosExp = userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
    if (iosExp && iosExp[1]) {
      iosVersion = iosExp[1].replace(/_/gim, '.')
    }
    model = `iPhone ${iosVersion}`
  }
  return model
}

export default getModel
