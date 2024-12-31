import React from 'react'
import Type from './../Type'

// 内库使用-start
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'seedsui-react'
测试使用-end */

// 钉钉分享合成面板
function DingTalk({ shareTo }) {
  let { title, description, url, imageUrl, onSuccess, onFail } = shareTo.dingtalk
  return (
    <>
      <Type
        type="dingtalk"
        onClick={() => {
          top.window.dd.biz.util.share({
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
                content: res?.errMsg || '分享失败'
              })
              onFail &&
                onFail({
                  errMsg: res?.errMsg || '分享失败'
                })
            }
          })
        }}
      />
    </>
  )
}

export default DingTalk
