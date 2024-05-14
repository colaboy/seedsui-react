import React, { forwardRef, useRef, useImperativeHandle, useContext } from 'react'
import Context from './../../Context/instance.js'

const BottomNoData = forwardRef(({ children, ...others }, ref) => {
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
      className="SID-Dragrefresh-NoDataContainer containerpull-pull"
      style={{ height: '50px' }}
      {...others}
      ref={rootRef}
    >
      {!children && (
        <div className="containerpull-pull-box">
          <div className="containerpull-pull-caption">
            {locale('没有更多数据了', 'SeedsUI_no_more_data')}
          </div>
        </div>
      )}
      {children}
    </div>
  )
})

export default BottomNoData
