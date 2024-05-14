import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../locale'

// type: loading,noMore,failed
const BottomFinish = forwardRef(({ children, caption, type, ...props }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  // 获取提示
  function getCaption() {
    if (caption) return caption
    if (type === 'loading') {
      return (
        <div className="layout-main-pull-push-wrapper">
          <div className="layout-main-pull-push-icon layout-main-pull-push-icon-loading"></div>
          <div className="layout-main-pull-push-caption">
            {locale('正在加载...', 'SeedsUI_loading')}
          </div>
        </div>
      )
    } else {
      return (
        <div className="layout-main-pull-push-wrapper">
          <div className="layout-main-pull-push-caption">
            {type === 'noMore'
              ? locale('没有更多数据了', 'SeedsUI_no_more_data')
              : locale('加载失败, 请稍后再试', 'SeedsUI_load_failed')}
          </div>
        </div>
      )
    }
  }
  return (
    <div
      className="SID-Dragrefresh-ErrorContainer layout-main-pull-push"
      style={{ height: '50px' }}
      {...props}
      ref={rootRef}
    >
      {!children && getCaption()}
      {children}
    </div>
  )
})

export default BottomFinish
