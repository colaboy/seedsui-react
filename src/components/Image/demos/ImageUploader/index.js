import React, { forwardRef, useEffect } from 'react'
import { Device } from 'seedsui-react'
import DB from 'library/deprecated/DB'
import Bridge from 'library/utils/Bridge'
import useCurrentUser from 'library/utils/useCurrentUser'

import WeMini from './WeMini'
import WechatMiniprogram from './WechatMiniprogram'
import Browser from './Browser'
import Qince from './Qince'
import Wechat from './Wechat'

// 照片上传
function Main(
  {
    timeout,
    type,
    readOnly,
    reUpload,
    onLoad,
    // 小程序附带参数
    weMiniProps,
    ...props
  },
  ref
) {
  // 在表单模式下, onChange只读时不显示+号
  if (readOnly) {
    if (props?.onChange) props.onChange = null
  }

  // 加载用户信息
  const loginUser = useCurrentUser()
  useEffect(() => {
    if (loginUser !== undefined) {
      onLoad && onLoad()
    }
    // eslint-disable-next-line
  }, [loginUser])

  if (loginUser === undefined) return null

  // 优先调用客户端能力
  if (Bridge.platform === 'wq' || Bridge.platform === 'dinghuo') {
    return <Qince timeout={timeout} reUpload={reUpload} {...props} ref={ref} />
  }

  // file框模式上传
  if (type === 'browser' || Device.device === 'pc') {
    return <Browser {...props} ref={ref} />
  }

  // In Wechat Miniprogram When Real-time upload， just use WeMini
  if (
    DB.getSession('wechatMiniprogram') === '0.2' &&
    Bridge.platform === 'wechatMiniprogram' &&
    !props?.async
  ) {
    return <WechatMiniprogram {...props} ref={ref} />
  }

  // 老小程序不动, 如有问题切成新的
  if (
    DB.getSession('_captureMethod_') === 'native' &&
    Bridge.platform === 'wechatMiniprogram' &&
    !props?.async
  ) {
    return <WeMini {...props} weMiniProps={weMiniProps} ref={ref} />
  }

  if (
    Bridge.platform === 'wechat' ||
    Bridge.platform === 'wework' ||
    Bridge.platform === 'wechatMiniprogram' ||
    Bridge.platform === 'weworkMiniprogram'
  ) {
    return <Wechat reUpload={reUpload} {...props} ref={ref} />
  }
  return <Browser {...props} ref={ref} />
}

export default forwardRef(Main)
