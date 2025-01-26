// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

// 刷新完成
function topRefreshOk(topContainer, isOk) {
  return new Promise((resolve) => {
    let topText = topContainer?.querySelector?.('.layout-main-pull-push-text')

    // 完成提示信息
    let finishMsg = ''
    // 失败
    if (isOk === false) {
      finishMsg = LocaleUtil.locale('刷新失败', 'SeedsUI_refresh_failed')
    }
    // 自定义提示信息
    else if (typeof isOk === 'string') {
      finishMsg = isOk
    }
    // 成功
    else {
      finishMsg = LocaleUtil.locale('刷新成功', 'SeedsUI_refresh_success')
    }
    if (topText) topText.innerHTML = finishMsg

    setTimeout(() => {
      // 重置样式
      let topIcon = topContainer?.querySelector?.('.layout-main-pull-push-icon')
      if (topIcon) {
        topIcon.classList.remove('layout-main-pull-push-icon-down')
        topIcon.classList.remove('layout-main-pull-push-icon-loading')
      }
      if (topContainer) topContainer.style.height = '0'

      resolve(true)
    }, 1000)
  })
}

export default topRefreshOk
