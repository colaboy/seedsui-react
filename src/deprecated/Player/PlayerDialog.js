import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import Context from '../Context/instance.js'

export default class PlayerDialog extends Component {
  static contextType = Context
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    src: PropTypes.string,
    maskAttribute: PropTypes.object,
    videoAttribute: PropTypes.object,
    onHide: PropTypes.func
  }
  render() {
    const { portal, show, src, maskAttribute = {}, videoAttribute = {}, onHide } = this.props
    return createPortal(
      <div
        ref={(el) => {
          this.$el = el
        }}
        {...maskAttribute}
        className={`mask video-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${
          show ? ' active' : ''
        }`}
      >
        <video controls {...videoAttribute}>
          <source src={src} />
          您的浏览器不支持 video 标签。
        </video>
        <div className="video-line"></div>
        <div className="video-close" onClick={onHide}></div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
}
