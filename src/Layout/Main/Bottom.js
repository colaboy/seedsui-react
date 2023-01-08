import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../locale'

// type: loading,noMore,failed
const BottomFinish = forwardRef(({ children, caption, type, ...props }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })

  // 获取提示
  function getCaption() {
    if (caption) return caption
    if (type === 'loading') {
      return (
        <div className="layout-pull-push-box">
          <div className="layout-pull-push-icon layout-pull-push-icon-loading"></div>
          <div className="layout-pull-push-caption">{locale('正在加载...', 'loading')}</div>
        </div>
      )
    } else {
      return (
        <div className="layout-pull-push-box">
          <div className="layout-pull-push-caption">
            {type === 'noMore'
              ? locale('没有更多数据了', 'no_more_data')
              : locale('加载失败, 请稍后再试', 'refreshing_failed')}
          </div>
        </div>
      )
    }
  }
  return (
    <div
      ref={rootRef}
      className="SID-Dragrefresh-ErrorContainer layout-pull-push"
      style={{ height: '50px' }}
      {...props}
    >
      {!children && getCaption()}
      {children}
    </div>
  )
})

export default BottomFinish
