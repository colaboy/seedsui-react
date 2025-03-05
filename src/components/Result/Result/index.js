import React from 'react'
import getStatusDefault from './getStatusDefault'

// 结果页, status: empty|500|success|waiting|info|warning|error
function Result({ status, title, description, image, children, ...props }) {
  let statusDefault = getStatusDefault(status)
  if (statusDefault) {
    if (!image) {
      // eslint-disable-next-line
      image = statusDefault.image
    }
    if (!title) {
      // eslint-disable-next-line
      title = statusDefault.title
    }
  }

  // 渲染图片
  function getImageNode() {
    if (!image) return null

    if (typeof image === 'function') {
      return image()
    }
    if (React.isValidElement(image)) {
      return image
    }
    if (typeof image === 'string') {
      return <img alt="" src={image} className="result-image" />
    }
    return image
  }

  return (
    <div {...props} className={`result${props?.className ? ' ' + props.className : ''}`}>
      {/* Image */}
      {getImageNode()}

      {/* Title */}
      {title && <div className="result-title">{title}</div>}

      {/* Description */}
      {description && <div className="result-description">{description}</div>}

      {children}
    </div>
  )
}

export default Result
