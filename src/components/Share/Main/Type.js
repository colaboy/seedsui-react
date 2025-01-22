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
        {type === 'wechat' && LocaleUtil.text('微信', 'SeedsUI_we_chat')}
        {type === 'moments' && LocaleUtil.text('朋友圈', 'SeedsUI_we_moment')}
        {type === 'miniprogram' && LocaleUtil.text('小程序', 'SeedsUI_we_mini_program')}
        {type === 'wecom' && LocaleUtil.text('企业微信', 'SeedsUI_we_com')}
        {type === 'dingtalk' && LocaleUtil.text('钉钉', 'SeedsUI_ding_talk')}
        {type === 'lark' && LocaleUtil.text('飞书', 'SeedsUI_lark')}
      </p>
    </div>
  )
}

export default Type
