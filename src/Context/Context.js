import React from 'react'
import Instance from './instance'
import getLocaleValue from './../locale'

function Context({ locale = {}, portal, children }) {
  let data = null
  data = locale
  if (!data || Object.keys(data).length === 0) {
    console.log('国际化数据为空')
  }
  if (data && Object.keys(data).length) {
    window.localeData = data
  }
  return (
    <Instance.Provider
      value={{
        locale: function (...params) {
          return getLocaleValue(...params)
        },
        portal: portal
      }}
    >
      {children}
    </Instance.Provider>
  )
}

export default Context
