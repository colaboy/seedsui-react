import { Component } from 'react'
import PropTypes from 'prop-types'
import getLocaleValue from './../locale'

export default class ConfigProvider extends Component {
  static propTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.any
  }

  static childContextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object,
    onChange: PropTypes.func
  }

  getChildContext() {
    let { locale = {}, portal, onChange } = this.props
    let data = null
    data = locale
    if (data) window.localeData = data
    return {
      locale: function (...params) {
        return getLocaleValue(...params)
      },
      portal,
      onChange
    }
  }

  render() {
    return this.props.children
  }
}
