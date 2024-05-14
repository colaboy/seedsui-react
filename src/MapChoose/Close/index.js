import React, { useContext } from 'react'
import Context from './../../Context/instance.js'

function Close({ ...props }) {
  // context
  const context = useContext(Context) || {}
  const locale =
    context.locale ||
    function (remark) {
      return remark || ''
    }
  return (
    <div {...props} className={`map-close${props.className ? ' ' + props.className : ''}`}>
      <div className={`map-close-label`}>{locale('关闭', 'SeedsUI_close')}</div>
    </div>
  )
}

export default Close
