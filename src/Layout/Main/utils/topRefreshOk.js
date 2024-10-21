// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 刷新完成
function topRefreshOk(topContainer, isOk) {
  return new Promise((resolve) => {
    let topCaption = topContainer.querySelector('.layout-main-pull-push-caption')

    // 完成提示信息
    let finishMsg = ''
    // 失败
    if (isOk === false) {
      finishMsg = locale('刷新失败', 'SeedsUI_refresh_failed')
    }
    // 自定义提示信息
    else if (typeof isOk === 'string') {
      finishMsg = isOk
    }
    // 成功
    else {
      finishMsg = locale('刷新成功', 'SeedsUI_refresh_success')
    }
    if (topCaption) topCaption.innerHTML = finishMsg

    setTimeout(() => {
      // 重置样式
      let topIcon = topContainer.querySelector('.layout-main-pull-push-icon')
      if (topIcon) {
        topIcon.classList.remove('layout-main-pull-push-icon-down')
        topIcon.classList.remove('layout-main-pull-push-icon-loading')
      }
      topContainer.style.height = '0'

      resolve(true)
    }, 1000)
  })
}

export default topRefreshOk
