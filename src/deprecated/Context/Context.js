import React from 'react'
import Instance from './instance'
import getLocaleValue from './../../utils/locale'

// 加载基本库
import './../PrototypeArray.js'
import './../PrototypeMath.js'
import './../PrototypeObject.js'
import './../PrototypeString.js'
import './../PrototypeNumber.js'
import './../PrototypeDate.js'
// import './../PrototypePinyin.js' // 不常用

// 加载国际化
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
