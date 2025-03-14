import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import support from './../utils/support'
import WeChat from './WeChat'
import WeCom from './WeCom'
import Lark from './Lark'
import DingTalk from './DingTalk'
import Qince from './Qince'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Bridge from './../../../utils/Bridge'
import Device from './../../../utils/Device'
import Result from './../../Result'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Bridge, Device, Result } from 'seedsui-react'
测试使用-end */

// 分享
function Main({ className, style, shareTo, ...props }, ref) {
  const mainRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      mainDOM: mainRef.current,
      getMainDOM: () => mainRef.current,
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
    return null
  }

  let isSupport = support(shareTo)
  return (
    <div
      className={`share${className ? ' ' + className : ''}${isSupport ? '' : ' error'}`}
      style={style}
      ref={mainRef}
    >
      {isSupport ? (
        getShareNodes()
      ) : (
        <Result
          className="share-main-result"
          status="empty"
          title={LocaleUtil.locale('此平台暂不支持分享', 'SeedsUI_share_no_support')}
        />
      )}
    </div>
  )
}

export default forwardRef(Main)
