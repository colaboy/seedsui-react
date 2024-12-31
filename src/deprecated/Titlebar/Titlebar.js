import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Device from './../../utils/Device'
import Bridge from './../../utils/Bridge'

export default class Titlebar extends Component {
  static propTypes = {
    className: PropTypes.string,

    showUrlTitle: PropTypes.bool, // 标题是否显示url中的titlebar
    caption: PropTypes.node,
    captionAttribute: PropTypes.object, // 只有caption为string类型或者显示地址栏标题时才有用

    lButtons: PropTypes.array, // [{caption: string, className: string, style: object, icon: node, iconAttribute: {className: ''}}]
    rButtons: PropTypes.array,

    backButtonAttribute: PropTypes.object, // {caption: string, className: string, style: object, icon: node, iconAttribute: {className: ''}}

    children: PropTypes.node
  }
  static defaultProps = {
    showUrlTitle: true,
    lButtons: ['$back'],
    className: 'border-b'
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 默认的返回按键
  onClickBack = (e) => {
    const { backButtonAttribute = {} } = this.props
    // 如果有返回按钮的点击事件,则优先执行props的方法
    if (backButtonAttribute.onClick) {
      backButtonAttribute.onClick(e)
      return
    }
    // 否则走默认的返回
    Bridge.back()
  }
  // 解析返回按钮dom
  getButtonsDOM = (arr) => {
    const { backButtonAttribute = {} } = this.props
    return arr.map((item, index) => {
      if (item === '$back') {
        // eslint-disable-next-line
        item = {
          className: backButtonAttribute.className || null,
          style: backButtonAttribute.style || null,
          icon: backButtonAttribute.icon || null,
          iconAttribute:
            backButtonAttribute.iconAttribute !== undefined
              ? backButtonAttribute.iconAttribute
              : { className: 'shape-arrow-left' },
          caption: backButtonAttribute.caption || null,
          onClick: this.onClickBack
        }
      }
      return (
        <span
          key={index}
          disabled={item.disabled}
          onClick={(e) => {
            if (item.onClick) item.onClick(e, item, index)
          }}
          className={`titlebar-button button${item.className ? ' ' + item.className : ' bar'}`}
          style={item.style}
        >
          {item.iconAttribute && (
            <span
              {...item.iconAttribute}
              className={`icon${
                item.iconAttribute.className ? ' ' + item.iconAttribute.className : ''
              }`}
            ></span>
          )}
          {item.icon && item.icon}
          {item.caption && <span>{item.caption}</span>}
        </span>
      )
    })
  }
  render() {
    let {
      className,

      showUrlTitle,
      caption,
      captionAttribute = {},

      lButtons,
      rButtons,

      // eslint-disable-next-line
      backButtonAttribute = {},

      children,
      ...others
    } = this.props
    // 构建左右按钮
    let lButtonsDOM = null
    if (Array.isArray(lButtons)) {
      lButtonsDOM = this.getButtonsDOM(lButtons)
    }
    let rButtonsDOM = null
    if (Array.isArray(rButtons)) {
      rButtonsDOM = this.getButtonsDOM(rButtons)
    }
    // 设置显示标题
    let title = Device.getUrlParameter('titlebar')
    if (showUrlTitle && title) {
      caption = (
        <h1
          {...captionAttribute}
          className={`titlebar-caption nowrap text-center${
            captionAttribute.className ? ' ' + captionAttribute.className : ''
          }`}
        >
          {decodeURIComponent(decodeURIComponent(title))}
        </h1>
      )
    } else if (typeof caption === 'string') {
      caption = (
        <h1
          {...captionAttribute}
          className={`titlebar-caption nowrap text-center${
            captionAttribute.className ? ' ' + captionAttribute.className : ''
          }`}
        >
          {caption}
        </h1>
      )
    }
    return (
      <div
        ref={(el) => {
          this.$el = el
        }}
        {...others}
        className={`titlebar${className ? ' ' + className : ''}`}
      >
        <div className="titlebar-left">{lButtonsDOM}</div>
        {caption}
        {children}
        <div className="titlebar-right">{rButtonsDOM}</div>
      </div>
    )
  }
}
