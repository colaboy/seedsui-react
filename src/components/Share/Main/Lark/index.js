import React from 'react'
import Type from './../Type'

// 内库使用-start
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'seedsui-react'
测试使用-end */

// 钉钉分享合成面板
function Lark({ shareTo }) {
  let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.lark
  return (
    <>
      <Type
        type="lark"
        onClick={() => {
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
                content: err?.errMsg || '分享失败'
              })
              onFail &&
                onFail({
                  errMsg: err?.errMsg || '分享失败'
                })
            }
          })
        }}
      />
    </>
  )
}

export default Lark
