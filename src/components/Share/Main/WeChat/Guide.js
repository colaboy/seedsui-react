import React from 'react'
import { createPortal } from 'react-dom'

function Guide({ portal, visible, maskProps = {}, onVisibleChange }) {
  const handlerClick = (e) => {
    e.stopPropagation()
    if (onVisibleChange) onVisibleChange(e)
  }

  return createPortal(
    <div
      className={`mask share-mask${maskProps.className ? ' ' + maskProps.className : ''}${
        visible ? ' active' : ''
      }`}
      {...maskProps}
      onClick={handlerClick}
    >
      <div className="share-tip-arrow"></div>
      <div className={`share-tip`}>
        <p>1.点击右上角</p>
        <p>
          2.点击
          <img alt="" src="//res.waiqin365.com/d/seedsui/images/share/tip_friend.png" />
          发送给朋友或
          <img alt="" src="//res.waiqin365.com/d/seedsui/images/share/tip_moments.png" />
          分享给朋友圈
        </p>
      </div>
    </div>,
    portal || document.getElementById('root') || document.body
  )
}

export default Guide
