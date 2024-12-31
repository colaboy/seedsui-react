import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import WeChat from './WeChat'
import WeCom from './WeCom'

// 分享
const Main = ({ shareTo }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
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
      return <Lark {...props} shareTo={shareTo} ref={rootRef} />
    }
    if (Bridge.platform === 'dingtalk') {
      return <DingTalk {...props} shareTo={shareTo} ref={rootRef} />
    }
    if (Bridge.platform === 'wq') {
      return <Qince {...props} shareTo={shareTo} ref={rootRef} />
    }
    return <div>此平台暂不支持分享</div>
  }
  return (
    <div className="share-main" ref={rootRef}>
      {getShareNodes()}
    </div>
  )
}

export default forwardRef(Main)
