import React from 'react'
import Type from './../Type'
import share from './../../utils/share'

// 钉钉分享合成面板
function DingTalk({ shareTo }) {
  return (
    <>
      <Type
        type="dingtalk"
        onClick={() => {
          share(shareTo?.dingtalk || {})
        }}
      />
    </>
  )
}

export default DingTalk
