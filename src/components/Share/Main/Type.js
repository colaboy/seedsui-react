import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

function Type({ type, onClick }) {
  return (
    <div className="share-item" onClick={onClick}>
      <i className={`share-item-icon ${type}`}></i>
      <p className="share-item-label">
        {type === 'wechat' && LocaleUtil.locale('微信', 'SeedsUI_we_chat')}
        {type === 'moments' && LocaleUtil.locale('朋友圈', 'SeedsUI_we_moment')}
        {type === 'miniprogram' && LocaleUtil.locale('小程序', 'SeedsUI_we_mini_program')}
        {type === 'wecom' && LocaleUtil.locale('企业微信', 'SeedsUI_we_com')}
        {type === 'dingtalk' && LocaleUtil.locale('钉钉', 'SeedsUI_ding_talk')}
        {type === 'lark' && LocaleUtil.locale('飞书', 'SeedsUI_lark')}
      </p>
    </div>
  )
}

export default Type
