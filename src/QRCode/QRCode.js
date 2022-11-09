import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Instance from './instance.js'

export default class QRCode extends Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {}
  componentDidUpdate() {
    const { text, style = {} } = this.props
    if (!this.instance || !text) return
    const width = Object.getUnitNum(style.width || 0)
    const height = Object.getUnitNum(style.height || 0)
    const color = style.color
    const backgroundColor = style.backgroundColor
    if (width) this.instance._htOption.width = width
    if (height) this.instance._htOption.height = height
    if (color) this.instance._htOption.colorDark = color
    if (backgroundColor) this.instance._htOption.colorLight = backgroundColor
    this.instance.makeCode(text)
  }
  componentDidMount() {
    if (this.instance) return
    const { text, style = {} } = this.props
    this.instance = new Instance(this.$el, {
      text: text || '',
      width: Object.getUnitNum(style.width || 230),
      height: Object.getUnitNum(style.width || 230),
      colorDark: style.color || '#000000',
      colorLight: style.backgroundColor || '#ffffff',
      correctLevel: Instance.CorrectLevel.M // L,M,Q,H
    })
  }
  render() {
    const { text, style, children, ...others } = this.props
    if (!text) return null
    return (
      <span
        ref={(el) => {
          this.$el = el
        }}
        style={style}
        {...others}
        className={`qrcode${others.className ? ' ' + others.className : ''}`}
      >
        {children}
      </span>
    )
  }
}
