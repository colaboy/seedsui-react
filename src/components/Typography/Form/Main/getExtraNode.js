import React from 'react'

function getExtraNode(extra, { params, className } = {}) {
  let ExtraNode = null
  if (React.isValidElement(extra)) {
    ExtraNode = extra
  } else if (typeof extra === 'function') {
    ExtraNode = extra(params)
  } else {
    return null
  }
  return <div className={className}>{ExtraNode}</div>
}

export default getExtraNode
