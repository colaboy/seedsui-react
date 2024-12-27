import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Ticket extends Component {
  static propTypes = {
    legend: PropTypes.node,
    legendAttribute: PropTypes.object,
    contentAttribute: PropTypes.object,
    children: PropTypes.node
  }

  render() {
    const { legend, legendAttribute = {}, contentAttribute = {}, children, ...others } = this.props
    return (
      <div
        ref={(el) => {
          this.$el = el
        }}
        {...others}
        className={'ticket' + (others.className ? ' ' + others.className : '')}
      >
        <div
          {...legendAttribute}
          className={`ticket-legend${
            legendAttribute.className ? ' ' + legendAttribute.className : ''
          }`}
        >
          {legend}
        </div>
        <div
          {...contentAttribute}
          className={`ticket-content${
            contentAttribute.className ? ' ' + contentAttribute.className : ''
          }`}
        >
          {children}
        </div>
      </div>
    )
  }
}
