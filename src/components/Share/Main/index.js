import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import support from './../utils/support'
import WeChat from './WeChat'
import WeCom from './WeCom'
import Lark from './Lark'
import DingTalk from './DingTalk'
import Qince from './Qince'

// 内库使用-start
import locale from './../../../utils/locale'
import Bridge from './../../../utils/Bridge'
import Device from './../../../utils/Device'
import Result from './../../Result'
// 内库使用-end

/* 测试使用-start
import { locale, Bridge, Device, Result } from 'seedsui-react'
测试使用-end */

// 分享
function Main({ shareTo, ...props }, ref) {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      support: (externalShareTo) => {
        return support(externalShareTo || shareTo)
      }
    }
  })

  function getShareNodes() {
    if (Bridge.platform === 'wechat') {
      return <WeChat {...props} shareTo={shareTo} />
    }
    if (Bridge.platform === 'wework') {
      return <WeCom {...props} shareTo={shareTo} />
    }
    if (Bridge.platform === 'lark') {
      return <Lark {...props} shareTo={shareTo} />
    }
    if (Bridge.platform === 'dingtalk') {
      return <DingTalk {...props} shareTo={shareTo} />
    }
    if (Bridge.platform === 'wq' && Device.os !== 'harmony') {
      return <Qince {...props} shareTo={shareTo} />
    }
    return <Result title={locale('此平台暂不支持分享')} />
  }
  return (
    <div className="share" ref={rootRef}>
      {getShareNodes()}
    </div>
  )
}

export default forwardRef(Main)
