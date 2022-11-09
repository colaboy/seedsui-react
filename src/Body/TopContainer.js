import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../locale'

const TopContainer = forwardRef(({ children, caption, type, ...others }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })
  return (
    <div ref={rootRef} className="SID-Dragrefresh-TopContainer body-pull-push">
      <div className="body-pull-push-box">
        <div className="body-pull-push-icon"></div>
        <div className="body-pull-push-caption">{locale('下拉可以刷新', 'pull_down')}</div>
      </div>
    </div>
  )
})

export default TopContainer
