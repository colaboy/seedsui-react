import React from 'react'
import getLocaleValue from './../locale'

const Context = React.createContext({
  locale: function (...params) {
    return getLocaleValue(...params)
  },
  portal: null
})

export default Context
