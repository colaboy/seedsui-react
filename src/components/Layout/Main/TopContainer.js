import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import LocaleUtil from './../../../utils/LocaleUtil'

const TopContainer = forwardRef(({}, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })
  return (
    <div ref={rootRef} className="layout-main-pull-push">
      <div className="layout-main-pull-push-wrapper">
        <div className="layout-main-pull-push-icon"></div>
        <div className="layout-main-pull-push-text">
          {LocaleUtil.locale('下拉可以刷新', 'SeedsUI_refresh')}
        </div>
      </div>
    </div>
  )
})

export default TopContainer
