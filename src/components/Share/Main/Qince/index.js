import React from 'react'
import Type from './../Type'

// 内库使用-start
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'seedsui-react'
测试使用-end */

// 企业微信只支持分享到企业微信
function Qince({ shareTo }) {
  // 微信
  if (shareTo.wechat) {
    let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.wechat
    return (
      <>
        <Type
          type="wechat"
          onClick={() => {
            top.window.wq.invoke(
              'shareWechatMessage',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                //  返回格式 {errMsg: "shareWechatMessage:fail, the permission value is offline verifying"}
                if (res.errMsg === 'shareWechatMessage:ok') {
                  Toast.show({
                    content: res?.errMsg || '分享成功'
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || '分享失败'
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || '分享失败'
                    })
                }
              }
            )
          }}
        />
      </>
    )
  }
  // 企业微信
  if (shareTo.wecom) {
    let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.wecom
    return (
      <>
        <Type
          type="wecom"
          onClick={() => {
            top.window.wq.invoke(
              'shareAppMessage',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                if (res.errMsg === 'shareAppMessage:ok') {
                  Toast.show({
                    content: res?.errMsg || '分享成功'
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || '分享失败'
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || '分享失败'
                    })
                }
              }
            )
          }}
        />
      </>
    )
  }

  // 钉钉
  if (shareTo.shareDingTalkMessage) {
    let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.dingtalk
    return (
      <>
        <Type
          type="dingtalk"
          onClick={() => {
            top.window.wq.invoke(
              'shareDingTalkMessage',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                if (res.errMsg === 'shareDingTalkMessage:ok') {
                  Toast.show({
                    content: res?.errMsg || '分享成功'
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || '分享失败'
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || '分享失败'
                    })
                }
              }
            )
          }}
        />
      </>
    )
  }

  // 飞书
  if (shareTo.shareFeishuMessage) {
    let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.lark
    return (
      <>
        <Type
          type="lark"
          onClick={() => {
            top.window.wq.invoke(
              'shareFeishuMessage',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                if (res.errMsg === 'shareFeishuMessage:ok') {
                  Toast.show({
                    content: res?.errMsg || '分享成功'
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || '分享失败'
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || '分享失败'
                    })
                }
              }
            )
          }}
        />
      </>
    )
  }
  return null
}

export default Qince
