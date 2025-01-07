import React from 'react'
import Type from './../Type'
import share from './../../utils/share'

// 钉钉分享合成面板
function Lark({ shareTo }) {
  return (
    <>
      <Type
        type="lark"
        onClick={() => {
          share(shareTo?.lark || {})
        }}
      />
    </>
  )
}

export default Lark
