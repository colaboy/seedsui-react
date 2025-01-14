import React from 'react'

// 内库使用-start
import locale from './../../../utils/locale'
// 内库使用-end

/* 测试使用-start
import { locale } from 'seedsui-react'
测试使用-end */

function Type({ type, onClick }) {
  return (
    <div className="share-item" onClick={onClick}>
      <i className={`share-icon ${type}`}></i>
      <p className="share-title">
        {type === 'wechat' && locale('微信')}
        {type === 'moments' && locale('朋友圈')}
        {type === 'miniprogram' && locale('小程序')}
        {type === 'wecom' && locale('企业微信')}
        {type === 'dingtalk' && locale('钉钉')}
        {type === 'lark' && locale('飞书')}
      </p>
    </div>
  )
}

export default Type
