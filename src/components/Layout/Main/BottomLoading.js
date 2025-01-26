import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import LocaleUtil from './../../../utils/LocaleUtil'

// type: loading,complete,failed
const BottomLoading = forwardRef(({ children, type, ...props }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  // 获取提示
  function getDefaultChildren() {
    return (
      <div className="layout-main-bottom-loading-wrapper">
        <div className="layout-main-bottom-loading-text">
          {type === 'loading' && LocaleUtil.locale('正在加载...', 'SeedsUI_loading')}
          {type === 'complete' && LocaleUtil.locale('没有更多了', 'SeedsUI_no_more_data')}
          {type === 'failure' && LocaleUtil.locale('加载失败, 请稍后再试', 'SeedsUI_load_failed')}
        </div>
      </div>
    )
  }
  return (
    <div className="layout-main-bottom-loading" {...props} ref={rootRef}>
      {!children && getDefaultChildren()}
      {children}
    </div>
  )
})

export default BottomLoading
