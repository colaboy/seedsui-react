import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import Bridge from './../Bridge'
import Context from '../Context/instance.js'

function ShareChoose({
  portal,
  show,
  config = {},
  shareTo,
  animation = 'slideUp',
  onHide,
  maskAttribute = {},
  ...others
}) {
  // 点击
  async function handlerClick(e) {
    var target = e.target
    e.stopPropagation()
    if (target.classList.contains('wechat')) {
      // 微信
      Bridge.invoke('shareWechatMessage', config, function (res) {
        if (res.errMsg === 'shareWechatMessage:ok') {
          console.log('分享成功')
        } else {
          console.log('分享失败')
        }
      })
    } else if (target.classList.contains('wework')) {
      // 企业微信
      Bridge.invoke('shareAppMessage', config, function (res) {
        if (res.errMsg === 'shareAppMessage:ok') {
          console.log('分享成功')
        } else {
          console.log('分享失败')
        }
      })
    } else if (target.classList.contains('moments')) {
      // 朋友圈
      Bridge.invoke('shareTimeline', config, function (res) {
        if (res.errMsg === 'shareTimeline:ok') {
          console.log('分享成功')
        } else {
          console.log('分享失败')
        }
      })
    } else {
      if (onHide) onHide(e)
    }
  }
  // 构建动画
  let animationClassName = ''
  switch (animation) {
    case 'slideLeft':
      animationClassName = 'popup-animation right-middle'
      break
    case 'slideRight':
      animationClassName = 'popup-animation left-middle'
      break
    case 'slideUp':
      animationClassName = 'popup-animation bottom-center'
      break
    case 'slideDown':
      animationClassName = 'popup-animation top-center'
      break
    case 'zoom':
      animationClassName = 'popup-animation middle'
      break
    case 'fade':
      animationClassName = 'popup-animation middle'
      break
    case 'none':
      animationClassName = ''
      break
    default:
      animationClassName = 'popup-animation middle'
  }
  // context
  const context = useContext(Context) || {}
  const locale =
    context.locale ||
    function (remark) {
      return remark || ''
    }
  // 返回列表
  if (!shareTo || !shareTo.length) return null
  return createPortal(
    <div
      className={`mask share-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${
        show ? ' active' : ''
      }`}
      {...maskAttribute}
      onClick={handlerClick}
    >
      <div
        data-animation={animation}
        {...others}
        className={`share-panel${animationClassName ? ' ' + animationClassName : ''}${
          others.className ? ' ' + others.className : ''
        }${show ? ' active' : ''}`}
      >
        {shareTo.map((share, index) => {
          return (
            <div className="share-item" key={index}>
              <i className={`share-icon ${share}`}></i>
              <p className="share-caption">
                {share === 'wechat' && locale('微信好友', 'SeedsUI_wechat_friend')}
                {share === 'wework' && locale('企业微信好友', 'SeedsUI_wework_friend')}
                {share === 'moments' && locale('微信朋友圈', 'SeedsUI_wechat_moments')}
              </p>
            </div>
          )
        })}
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  )
}

export default ShareChoose
