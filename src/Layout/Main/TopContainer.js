import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../locale'

const TopContainer = forwardRef(({ children, caption, type, ...props }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })
  return (
    <div ref={rootRef} className="SID-Dragrefresh-TopContainer layout-main-pull-push">
      <div className="layout-main-pull-push-wrapper">
        <div className="layout-main-pull-push-icon"></div>
        <div className="layout-main-pull-push-caption">{locale('下拉可以刷新', 'pull_down')}</div>
      </div>
    </div>
  )
})

export default TopContainer
