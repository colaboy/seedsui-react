import React, { forwardRef } from 'react'
import { validateMaxMin } from './../utils'
import BaseModal from './../../Select/Modal'
// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'

import MultipleMain from './../MultipleMain'

const Modal = forwardRef(({ type = 'date', onBeforeChange, ...props }, ref) => {
  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      type={type}
      multiple={false}
      onBeforeChange={async (tabs) => {
        // eslint-disable-next-line
        return new Promise(async (resolve) => {
          // 校验值是否合法
          for (let tab of tabs) {
            let newValue = validateMaxMin(tab.value, {
              type: tab?.type || type,
              min: props?.min,
              max: props?.max,
              onError: props?.onError
            })
            if (newValue === false) {
              resolve(false)
              return
            }
            tab.value = newValue
          }

          // 外部传入的校验
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(tabs)
            if (goOn === false) {
              resolve(false)
              return
            }
          }

          // 通过校验，并赋予新值
          resolve(tabs)
        })
      }}
      MainComponent={MultipleMain}
    />
  )
})

export default Modal
