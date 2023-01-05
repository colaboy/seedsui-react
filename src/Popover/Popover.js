import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

/**
 * @deprecated since version 5.2.8
 * use Tooltip instead
 */
export default class Popover extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    animation: PropTypes.string, // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    onClick: PropTypes.func,
    maskAttribute: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    animation: 'zoom'
  }
  componentDidMount = () => {}
  // 点击popover主体
  onClick = (e) => {
    e.stopPropagation()
  }
  render() {
    const {
      portal,
      show,
      animation,
      duration,
      onClick,
      maskAttribute = {},
      children,
      ...others
    } = this.props

    // 构建动画
    let animationClassName = ''
    if (animation !== 'none') {
      animationClassName = 'popup-animation'
    }

    // 动画时长
    let durationStyle = {}
    if (typeof duration === 'number') {
      durationStyle = {
        WebkitTransitionDuration: duration + 'ms'
      }
    }

    return createPortal(
      <div
        ref={(el) => {
          this.$el = el
        }}
        {...maskAttribute}
        className={`mask popover-mask${
          maskAttribute.className ? ' ' + maskAttribute.className : ''
        }${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, maskAttribute.style || {})}
      >
        <div
          {...others}
          className={`popover${animationClassName ? ' ' + animationClassName : ''}${
            others.className ? ' ' + others.className : ''
          }${show ? ' active' : ''}`}
          style={Object.assign({}, durationStyle, others.style || {})}
          data-animation={animation}
          onClick={onClick ? onClick : this.onClick}
        >
          {children && children}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
}
