import React, { forwardRef, useRef, useImperativeHandle, useContext } from 'react'
import Context from './../Context/instance.js'

const BottomError = forwardRef(({ children, ...others }, ref) => {
  // context
  const context = useContext(Context) || {}
  const locale =
    context.locale ||
    function (remark) {
      return remark || ''
    }

  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return rootRef.current
  })

  return (
    <div
      ref={rootRef}
      className="SID-Dragrefresh-BottomContainer containerpull-pull"
      style={{ height: '50px' }}
      {...others}
    >
      {!children && (
        <div className="containerpull-pull-box">
          <div className="containerpull-pull-icon containerpull-pull-icon-loading"></div>
          <div className="containerpull-pull-caption">{locale('正在加载...', 'loading')}</div>
        </div>
      )}
      {children}
    </div>
  )
})

export default BottomError
