import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

function Type({ type, onClick }) {
  return (
    <div className="share-item" onClick={onClick}>
      <i className={`share-icon ${type}`}></i>
      <p className="share-title">
        {type === 'wechat' && LocaleUtil.text('微信')}
        {type === 'moments' && LocaleUtil.text('朋友圈')}
        {type === 'miniprogram' && LocaleUtil.text('小程序')}
        {type === 'wecom' && LocaleUtil.text('企业微信')}
        {type === 'dingtalk' && LocaleUtil.text('钉钉')}
        {type === 'lark' && LocaleUtil.text('飞书')}
      </p>
    </div>
  )
}

export default Type
