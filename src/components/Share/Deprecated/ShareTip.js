import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Toast from './../../../utils/Toast'

function ShareTip({ portal, show, config = {}, originConfig, maskAttribute = {}, onHide }) {
  // 生命周期
  useEffect(() => {
    return () => {
      // 更新分享
      if (originConfig) {
        // eslint-disable-next-line
        wx.updateAppMessageShareData({
          ...originConfig,
          success: () => {
            console.log('还原好友分享成功')
          },
          fail: (res = {}) => {
            console.log(res.errMsg || '还原好友分享失败, 请稍后再试', { mask: false })
          }
        })
        // eslint-disable-next-line
        wx.updateTimelineShareData({
          // eslint-disable-line
          ...originConfig,
          success: () => {
            console.log('还原朋友圈分享成功')
          },
          fail: (res = {}) => {
            console.log(res.errMsg || '还原朋友圈分享失败, 请稍后再试', { mask: false })
          }
        })
      }
    }
  })

  useEffect(() => {
    if (!show) return
    async function shareConfig() {
      // 更新分享
      // eslint-disable-next-line
      wx.updateAppMessageShareData({
        // eslint-disable-line
        ...config,
        success: () => {
          console.log('更新好友分享成功')
        },
        fail: (res = {}) => {
          Toast.show({ content: res.errMsg || '更新好友分享失败, 请稍后再试' })
        }
      })
      // eslint-disable-next-line
      wx.updateTimelineShareData({
        // eslint-disable-line
        ...config,
        success: () => {
          console.log('更新朋友圈分享成功')
        },
        fail: (res = {}) => {
          Toast.show({ content: res.errMsg || '更新朋友圈分享失败, 请稍后再试' })
        }
      })
    }
    shareConfig()
    // eslint-disable-next-line
  }, [show])

  // 点击
  const handlerClick = (e) => {
    let target = e.target
    e.stopPropagation()
    if (target.classList.contains('share-mask')) {
      if (onHide) onHide(e)
    }
  }
  return createPortal(
    <div
      className={`mask share-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${
        show ? ' active' : ''
      }`}
      {...maskAttribute}
      onClick={handlerClick}
    >
      <div className="share-tip-arrow"></div>
      <div className={`share-tip`}>
        <p>1.点击右上角</p>
        <p>
          2.点击
          <img alt="" src="//res.waiqin365.com/d/seedsui/share/tip_friend.png" />
          发送给朋友或
          <img alt="" src="//res.waiqin365.com/d/seedsui/share/tip_moments.png" />
          分享给朋友圈
        </p>
      </div>
    </div>,
    portal || document.getElementById('root') || document.body
  )
}

export default ShareTip
