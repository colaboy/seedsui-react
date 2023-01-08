import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../locale'

const TopContainer = forwardRef(({ children, caption, type, ...props }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })
  return (
    <div ref={rootRef} className="SID-Dragrefresh-TopContainer layout-pull-push">
      <div className="layout-pull-push-box">
        <div className="layout-pull-push-icon"></div>
        <div className="layout-pull-push-caption">{locale('下拉可以刷新', 'pull_down')}</div>
      </div>
    </div>
  )
})

export default TopContainer
