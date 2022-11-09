import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Peg extends Component {
  static propTypes = {
    type: PropTypes.string, // line
    className: PropTypes.string,
    iconAttribute: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    className: 'top right'
  }
  render() {
    const { type, className, iconAttribute, children, ...others } = this.props

    // 根据类型使用不同的className
    let typeClassName = ''
    switch (type) {
      case 'line':
        typeClassName = 'sticker-line'
        break
      default:
        typeClassName = 'sticker'
    }
    // 如果有图标, 则使用图标类型的样式sticker-icon
    if (iconAttribute) {
      typeClassName = typeClassName + ' sticker-icon'
    }
    return (
      <span
        ref={(el) => {
          this.$el = el
        }}
        {...others}
        className={`${typeClassName}${className ? ' ' + className : ''}`}
      >
        {iconAttribute && (
          <span
            {...iconAttribute}
            class={`size12${iconAttribute.className ? ' ' + iconAttribute.className : ''}`}
          ></span>
        )}
        {children && <span>{children}</span>}
      </span>
    )
  }
}
