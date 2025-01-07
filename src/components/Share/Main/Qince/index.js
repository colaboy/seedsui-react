import React from 'react'
import Type from './../Type'

// 内库使用-start
import locale from './../../../../utils/locale'
import Device from './../../../../utils/Device'
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { locale, Device, Toast } from 'seedsui-react'
测试使用-end */

// 企业微信只支持分享到企业微信
function Qince({ shareTo }) {
  function getShareNodes() {
    let shareNodes = []
    // 微信
    if (shareTo?.wechat) {
      let { title, description, url, imageUrl, onSuccess, onFail } = shareTo?.wechat || {}
      shareNodes.push(
        <Type
          key="wechat"
          type="wechat"
          onClick={() => {
            window.top.wq.invoke(
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
                    content: res?.errMsg || locale('分享成功')
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || locale('分享失败')
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || locale('分享失败')
                    })
                }
              }
            )
          }}
        />
      )
    }
    // 企业微信
    if (shareTo?.wecom) {
      let { title, description, url, imageUrl, onSuccess, onFail } = shareTo?.wecom || {}
      shareNodes.push(
        <Type
          key="wecom"
          type="wecom"
          onClick={() => {
            window.top.wq.invoke(
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
                    content: res?.errMsg || locale(locale('分享成功'))
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || locale('分享失败')
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || locale('分享失败')
                    })
                }
              }
            )
          }}
        />
      )
    }

    // 钉钉
    if (shareTo?.dingtalk && Device.compareVersion(Device.platformVersion, '7.2.65') >= 0) {
      let { title, description, url, imageUrl, onSuccess, onFail } = shareTo?.dingtalk || {}
      shareNodes.push(
        <Type
          key="dingtalk"
          type="dingtalk"
          onClick={() => {
            window.top.wq.invoke(
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
                    content: res?.errMsg || locale('分享成功')
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || locale('分享失败')
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || locale('分享失败')
                    })
                }
              }
            )
          }}
        />
      )
    }

    // 飞书
    if (shareTo?.lark && Device.compareVersion(Device.platformVersion, '7.2.65') >= 0) {
      let { title, description, url, imageUrl, onSuccess, onFail } = shareTo?.lark || {}
      shareNodes.push(
        <Type
          key="lark"
          type="lark"
          onClick={() => {
            window.top.wq.invoke(
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
                    content: res?.errMsg || locale('分享成功')
                  })
                  onSuccess && onSuccess()
                } else {
                  Toast.show({
                    content: res?.errMsg || locale('分享失败')
                  })
                  onFail &&
                    onFail({
                      errMsg: res?.errMsg || locale('分享失败')
                    })
                }
              }
            )
          }}
        />
      )
    }
    return shareNodes
  }

  let shareNodes = getShareNodes()

  return shareNodes
}

export default Qince
