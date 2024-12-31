import React from 'react'
import Type from './../Type'

// 内库使用-start
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'seedsui-react'
测试使用-end */

// 企业微信只支持分享到企业微信
function WeCom({ shareTo }) {
  if (shareTo.wecom) {
    let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.wecom
    return (
      <>
        <Type
          type="wecom"
          onClick={() => {
            top.window.wx.invoke(
              'shareAppMessage',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                if (res.err_msg === 'shareAppMessage:ok') {
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

export default WeCom
