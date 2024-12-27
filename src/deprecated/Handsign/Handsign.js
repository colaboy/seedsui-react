import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Instance from './instance.js'

/**
 * @deprecated since version 5.2.8
 * 请使用<Signature/>
 */
export default class Handsign extends Component {
  static propTypes = {
    strokeStyle: PropTypes.string,
    lineWidth: PropTypes.number,
    quality: PropTypes.number,
    suffix: PropTypes.string,
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    width: PropTypes.number, // 宽度
    height: PropTypes.number // 高度
  }
  static defaultProps = {
    strokeStyle: '#000',
    lineWidth: 3,
    quality: 0.92,
    width: 300,
    height: 300
  }
  componentDidUpdate(prevProps) {
    if (this.instance) {
      let params = {}
      if (prevProps.strokeStyle !== this.props.strokeStyle) {
        params.strokeStyle = this.props.strokeStyle
      }
      if (prevProps.lineWidth !== this.props.lineWidth) {
        params.lineWidth = this.props.lineWidth
      }
      if (prevProps.quality !== this.props.quality) {
        params.quality = this.props.quality
      }
      if (prevProps.suffix !== this.props.suffix) {
        params.suffix = this.props.suffix
      }
      if (Object.getOwnPropertyNames(params) && Object.getOwnPropertyNames(params).length) {
        this.instance.updateParams(params)
      }
    }
  }
  componentDidMount() {
    if (this.instance) return
    var instance = new Instance(this.$el, {
      strokeStyle: this.props.strokeStyle,
      lineWidth: this.props.lineWidth,
      quality: this.props.quality,
      suffix: this.props.suffix
    })
    this.instance = instance
  }
  render() {
    const { strokeStyle, lineWidth, quality, width, height, ...others } = this.props
    return (
      <canvas
        ref={(el) => {
          this.$el = el
        }}
        {...others}
        width={width}
        height={height}
      >
        Canvas画板
      </canvas>
    )
  }
}
