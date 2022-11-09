import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Instance from './instance.js'
import Bridge from './../Bridge'
import BridgeBrowser from './../Bridge/browser'
import locale from './../locale' // 国际化

export default class ImgMark extends Component {
  static propTypes = {
    // 数据源
    data: PropTypes.array, // [{strokeStyle: '', lineWidth: '', setLineDash: [], x1: '', y1: '', x2: '', y2: ''}]
    src: PropTypes.string,
    // canvas样式
    isDrawSrc: PropTypes.bool, // 是否绘制背景
    watermark: PropTypes.string,
    strokeStyle: PropTypes.string,
    lineWidth: PropTypes.number,
    quality: PropTypes.number,
    style: PropTypes.object,
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    width: PropTypes.number, // 宽度
    height: PropTypes.number, // 高度

    onClick: PropTypes.func,

    preview: PropTypes.bool, // 是否预览

    children: PropTypes.node
  }
  static defaultProps = {
    isDrawSrc: false,
    strokeStyle: '#00ff00',
    lineWidth: 3,
    quality: 0.92,
    height: 300,
    preview: true
  }
  componentDidUpdate(prevProps) {
    if (this.instance) {
      let params = {}
      if (prevProps.isDrawSrc !== this.props.isDrawSrc) {
        params.isDrawSrc = this.props.isDrawSrc
      }
      if (prevProps.strokeStyle !== this.props.strokeStyle) {
        params.strokeStyle = this.props.strokeStyle
      }
      if (prevProps.lineWidth !== this.props.lineWidth) {
        params.lineWidth = this.props.lineWidth
      }
      if (prevProps.quality !== this.props.quality) {
        params.quality = this.props.quality
      }
      if (prevProps.data !== this.props.data) {
        params.data = this.props.data
      }
      if (Object.getOwnPropertyNames(params) && Object.getOwnPropertyNames(params).length) {
        this.instance.updateParams(params)
      }
    }
  }
  componentDidMount() {
    if (this.instance) return
    this.instance = new Instance(this.$canvas, {
      src: this.props.src,
      data: this.props.data,
      isDrawSrc: this.props.isDrawSrc,
      height: this.props.height,
      strokeStyle: this.props.strokeStyle,
      lineWidth: this.props.lineWidth,
      quality: this.props.quality,
      fail: this.fail,
      success: this.success
    })
  }
  validSrc = false
  fail = () => {
    this.validSrc = false
  }
  success = () => {
    this.validSrc = true
  }
  onClick = () => {
    var layer = '' // 绘制的base64编码
    if (this.props.preview) {
      if (!this.validSrc) {
        Bridge.showToast(
          `${locale('图片加载失败', 'hint_image_failed_to_load')}, ${locale(
            '无法预览',
            'cannot_preview'
          )}`,
          { mask: false }
        )
        return
      }
      if (this.props.isDrawSrc) {
        // 绘制背景
        layer = this.instance.save()
        if (layer) {
          Bridge.previewImage({ urls: [layer], index: 0 })
        }
      } else {
        // 不绘制背景
        layer = this.instance.save()
        var previewHTML = `<div class="preview-layer" style="background-image:url(${layer})"></div>`
        if (this.props.watermark) {
          // 水印
          previewHTML += `<div class="preview-layer" style="background-image:url(${this.props.watermark});background-repeat: repeat; background-size:auto;"></div>`
        }
        BridgeBrowser.previewImage({ urls: [this.props.src], layerHTML: previewHTML })
      }
    }
    if (this.props.onClick) this.props.onClick(layer)
  }
  render() {
    // 全局配置
    let { locale } = this.context
    if (!locale)
      locale = function (remark) {
        return remark || ''
      }
    const {
      data,
      src,
      isDrawSrc,
      watermark,
      strokeStyle,
      lineWidth,
      quality,
      style,
      width,
      height,
      onClick,
      preview,
      children,
      ...others
    } = this.props
    let isDrawSrcStyle = {}
    if (!isDrawSrc) {
      isDrawSrcStyle = { backgroundImage: `url(${src})` }
    }
    return (
      <div
        ref={(el) => {
          this.$el = el
        }}
        {...others}
        className={`imgmark${others.className ? ' ' + others.className : ''}`}
        style={Object({ width: width, height: height }, style || {})}
        onClick={this.onClick}
      >
        <div className={`imgmark-loading active`}>
          <div className={`imgmark-loading-icon`}></div>
        </div>
        <canvas
          ref={(el) => {
            this.$canvas = el
          }}
          className={`imgmark-wrapper`}
          style={isDrawSrcStyle}
        >
          Canvas画板
        </canvas>
        <div className={`imgmark-error`}>
          <div className={`imgmark-error-icon`}></div>
          <div className={`imgmark-error-caption`}>
            {locale('图片加载失败', 'hint_image_failed_to_load')}
          </div>
        </div>
        {/* 内容 */}
        {children}
      </div>
    )
  }
}
