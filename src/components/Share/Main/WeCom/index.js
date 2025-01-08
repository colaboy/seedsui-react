import React from 'react'
import Type from './../Type'

// 企业微信只支持分享到企业微信
function WeCom({ shareTo }) {
  if (shareTo?.wecom) {
    let { title, description, url, imageUrl, onSuccess, onFail } = shareTo?.wecom || {}
    return (
      <>
        <Type
          type="wecom"
          onClick={() => {
            window.top.wx.invoke(
              'shareAppMessage',
              {
                title: title || '',
                desc: description || '',
                link: url || '',
                imgUrl: imageUrl || ''
              },
              function (res) {
                console.log('WeCom Share result:', res)

                if (res.err_msg === 'shareAppMessage:ok') {
                  onSuccess && onSuccess()
                } else {
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
