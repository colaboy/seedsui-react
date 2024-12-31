import React from 'react'
import getLocaleValue from './../../utils/locale'

const Context = React.createContext({
  locale: function (...params) {
    return getLocaleValue(...params)
  },
  portal: null
})

export default Context
