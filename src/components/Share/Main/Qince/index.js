import React from 'react'
import Type from './../Type'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Device from './../../../../utils/Device'
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { locale, Device, Toast } from 'seedsui-react'
测试使用-end */

// 企业微信只支持分享到企业微信
function Qince({ shareTo }) {
  // 低版本安卓提示分享失败
  function handleFail(err, onFail) {
    if (Device.os === 'android' && Device.compareVersion(Device.platformVersion, '7.2.65') < 0) {
      Toast.show({
        content: LocaleUtil.text('分享失败')
      })
    }
    onFail &&
      onFail({
        errMsg: err?.errMsg || LocaleUtil.text('分享失败')
      })
  }

  // Render Nodes
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
                console.log('QinCe Share result:', res)
                //  返回格式 {errMsg: "shareWechatMessage:fail, the permission value is offline verifying"}
                if (res.errMsg === 'shareWechatMessage:ok') {
                  onSuccess && onSuccess()
                } else {
                  handleFail(res, onFail)
                }
              }
            )
          }}
        />
      )
    }
    // 微信小程序
    if (shareTo?.miniprogram && Device.compareVersion(Device.platformVersion, '7.2.65') >= 0) {
      let { title, description, url, imageUrl, miniProgramId, miniProgramPath, onSuccess, onFail } =
        shareTo?.miniprogram || {}
      shareNodes.push(
        <Type
          key="miniprogram"
          type="miniprogram"
          onClick={() => {
            window.top.wq.invoke(
              'shareWeChatMiniProgram',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || '',
                miniProgramId: miniProgramId || '', // 小程序的原始ID
                miniProgramPath: miniProgramPath || '' // 小程序的路径，用户点击后打开的小程序页面
              },
              function (res) {
                console.log('QinCe Share result:', res)
                if (res.errMsg === 'shareWeChatMiniProgram:ok') {
                  onSuccess && onSuccess()
                } else {
                  handleFail(res, onFail)
                }
              }
            )
          }}
        />
      )
    }
    // 微信朋友圈
    if (shareTo?.moments) {
      let { title, description, url, imageUrl, onSuccess, onFail } = shareTo?.moments || {}
      shareNodes.push(
        <Type
          key="moments"
          type="moments"
          onClick={() => {
            window.top.wq.invoke(
              'shareTimeline',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                console.log('QinCe Share result:', res)
                if (res.errMsg === 'shareTimeline:ok') {
                  onSuccess && onSuccess()
                } else {
                  handleFail(res, onFail)
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
                console.log('QinCe Share result:', res)
                if (res.errMsg === 'shareAppMessage:ok') {
                  onSuccess && onSuccess()
                } else {
                  handleFail(res, onFail)
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
                console.log('QinCe Share result:', res)
                if (res.errMsg === 'shareDingTalkMessage:ok') {
                  onSuccess && onSuccess()
                } else {
                  handleFail(res, onFail)
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
                console.log('QinCe Share result:', res)
                if (res.errMsg === 'shareFeishuMessage:ok') {
                  onSuccess && onSuccess()
                } else {
                  handleFail(res, onFail)
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
