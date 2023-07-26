import React, { forwardRef, useRef, useImperativeHandle, useContext } from 'react'
import Context from './../../Context/instance.js'

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
      className="SID-Dragrefresh-ErrorContainer containerpull-pull"
      style={{ height: '50px' }}
      {...others}
      ref={rootRef}
    >
      {!children && (
        <div className="containerpull-pull-box">
          <div className="containerpull-pull-caption">
            {locale('加载失败, 请稍后再试', 'loading_failed')}
          </div>
        </div>
      )}
      {children}
    </div>
  )
})

export default BottomError
