import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import support from './../utils/support'
import WeChat from './WeChat'
import WeCom from './WeCom'
import Lark from './Lark'
import DingTalk from './DingTalk'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Bridge from './../../../utils/Bridge'
import Result from './../../Result'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Bridge, Result } from 'seedsui-react'
测试使用-end */

// 分享, shareTo: {extensions: [{isVisible: ({ shareTo }) => ture|false, render: ({ shareTo }) => Node, }]}
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

    // Custom Extension Items
    if (Array.isArray(shareTo?.extensions) && shareTo?.extensions.length) {
      for (let extension of shareTo.extensions) {
        if (typeof extension?.render === 'function') {
          let ExtensionNode = extension.render({ shareTo })
          if (ExtensionNode) return ExtensionNode
        }
      }
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
