import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../utils/locale'

const TopContainer = forwardRef(({ children, caption, type, ...others }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })
  return (
    <div ref={rootRef} className="SID-Dragrefresh-TopContainer body-pull-push">
      <div className="body-pull-push-box">
        <div className="body-pull-push-icon"></div>
        <div className="body-pull-push-caption">
          {locale('下拉可以刷新', 'SeedsUI_pull_down_refresh')}
        </div>
      </div>
    </div>
  )
})

export default TopContainer
