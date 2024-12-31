import React, { Fragment } from 'react'

function Type({ type }) {
  return (
    <Fragment>
      <i className={`share-icon ${type}`}></i>
      <p className="share-title">
        {type === 'wechat' && '微信'}
        {type === 'wecom' && '企业微信'}
        {type === 'dingtalk' && '钉钉'}
        {type === 'lark' && '飞书'}
      </p>
    </Fragment>
  )
}

export default Type
