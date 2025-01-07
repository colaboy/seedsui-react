// 内库使用-start
import locale from './../../../utils/locale'
import Bridge from './../../../utils/Bridge'
import Toast from './../../Toast'
// 内库使用-end

/* 测试使用-start
import { locale, Bridge, Toast } from 'seedsui-react'
测试使用-end */

// 分享至
function share(params) {
  let { title, description, url, imageUrl, onSuccess, onFail } = params || {}

  if (Bridge.platform === 'lark') {
    window.top.tt.share({
      channelType: ['wx', 'wx_timeline', 'system'],
      contentType: 'url',
      title: title,
      content: description,
      url: url,
      image: imageUrl,
      success() {
        onSuccess && onSuccess()
      },
      fail(err) {
        Toast.show({
          content: err?.errMsg || locale('分享失败')
        })
        onFail &&
          onFail({
            errMsg: err?.errMsg || locale('分享失败')
          })
      }
    })
  } else if (Bridge.platform === 'dingtalk') {
    window.top.dd.biz.util.share({
      type: 0, // 分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
      url: url,
      title: title,
      content: description,
      image: imageUrl,
      onSuccess: function () {
        onSuccess && onSuccess()
      },
      onFail: function (err) {
        Toast.show({
          content: err?.errMsg || locale('分享失败')
        })
        onFail &&
          onFail({
            errMsg: err?.errMsg || locale('分享失败')
          })
      }
    })
  }
}

export default share
