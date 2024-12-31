import React, { Fragment } from 'react'

function ShareType({ type }) {
  return (
    <Fragment>
      <i className={`share-icon ${type}`}></i>
      <p className="share-title">
        {type === 'wechat' && '微信好友'}
        {type === 'wework' && '企业微信好友'}
        {type === 'moments' && '微信朋友圈'}
      </p>
    </Fragment>
  )
}

export default ShareType
